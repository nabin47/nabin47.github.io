---
layout: post
title: "From RNNs to Transformers: Why Attention Actually Works"
date: 2026-07-14
categories: [machine-learning, deep-learning]
tags: [transformers, attention-mechanism, self-attention, cross-attention, multi-head-attention, rnn]
excerpt: "A first-principles walkthrough of why transformers replaced RNNs — from the vanishing-context problem, through self-attention and cross-attention, to why multiple attention heads learn different jobs without ever being told to."
---
# From RNNs to Transformers: Why Attention Actually Works

## Why This Matters

For years, "transformers are better than RNNs" was something I accepted without really interrogating. It's the kind of claim that gets repeated in papers, in lectures, in casual conversation, until it hardens into an assumption nobody re-derives. I taught it that way for a while too. But "better" is not an explanation, and if you're going to teach a mechanism, you owe your students the actual reason it works — not just the verdict.

This post is my attempt to lay out that reason properly, in one continuous argument rather than the fragments I originally worked through over several days. It starts with a genuine limitation of recurrent networks, follows the fix (attention) through increasing levels of sophistication — self-attention, cross-attention, multi-head attention — and ends with what I think is the single most useful sentence for holding all of it in your head at once.

## The Problem: RNNs Read One Word at a Time

Recurrent neural networks process a sequence the way a student reads a sentence with their finger — one word, then the next, carrying a running summary forward as they go. For short sentences, this works fine. Take:

> "The boy is hungry."

*Boy* and *hungry* sit right next to each other. The dependency is trivial to capture: by the time the network reaches "hungry," "boy" is still fresh in the running summary.

Now stretch the sentence:

> "The boy who plays in the field every afternoon with his friends and has a bicycle is hungry."

*Boy* and *hungry* are still the two words that matter to each other — grammatically, semantically, nothing has changed about their relationship. But now there's a long chain of intervening words between them. An RNN has to carry the information about "boy" forward through every one of those intermediate steps, and at each step, that information gets compressed a little further into a fixed-size summary vector. By the time the network reaches "hungry," the signal from "boy" has been squeezed through so many transformations that it's substantially degraded.

This is the core limitation: RNNs don't have a mechanism for *directly* connecting two words based on their actual relevance to each other. They only have a shrinking, sequential summary.

LSTMs (and GRUs) were built specifically to address this — gating mechanisms that let the network selectively preserve or discard information as it moves through the sequence. But it's worth being precise about what they do: **they patch the problem. They don't fix it.** The fundamental architecture is still step-by-step, still passing information forward through a bottleneck, just with better bookkeeping about what to keep. Long-range dependencies improve, but the structural issue — no direct line between distant relevant words — remains.


{% include figure.liquid loading="eager" path="assets/img/rnn-transformer-example.jpg" class="img-fluid rounded z-depth-1" caption="RNN vs Transformers" title="RNN vs Transformer" %}


## The Fix: Attention Looks Back Directly

Attention solves this by abandoning the sequential summary altogether. Instead of passing a compressed running state forward step by step, it lets the model look back at *every* word in the sequence directly, regardless of distance, and decide how much each one matters to the word currently being processed.

Take the same long sentence. When the model processes "hungry," it doesn't rely on whatever survived the compression chain. It computes a direct relevance score against every other word in the sentence. Something like:

| Word | Attention weight |
|---|---|
| The | 0.03 |
| boy | 0.68 |
| is | 0.24 |
| hungry | 0.05 |

The exact numbers here are illustrative, not measured [CITATION NEEDED if you want real weights from a trained model] — but the *pattern* is the point. "Boy" gets the overwhelming share of attention, because it's the word that actually explains "hungry," and the model doesn't have to route that information through every intervening word to get it. Distance in the sentence stops being a cost.

This is also, incidentally, why transformers train faster than RNNs on top of being more accurate on long-range dependencies: because attention computes relationships across the whole sequence in parallel, rather than being forced into the strictly sequential, one-step-at-a-time processing that RNNs require. That parallelism is a training-efficiency win as much as it is an accuracy win.

The whole trick, distilled: **stop passing a shrinking summary forward — just let the model look directly at what matters.**

## Self-Attention: Every Word Checks In With Every Other Word

The mechanism described above, where words within a single sequence attend to each other, is called **self-attention**, and it's worth sitting with how simple the underlying idea is, because the results it produces can feel disproportionate to the mechanism.

Consider a classic ambiguous sentence:

> "The trophy didn't fit in the suitcase because it was too big."

What does "it" refer to — the trophy or the suitcase? You resolve this instantly, without conscious effort. But it's a real inference problem: "it" is grammatically ambiguous, and resolving it requires understanding the *semantics* of fitting one object inside another (if the trophy is too big, it's the trophy that doesn't fit; "it" refers back to the trophy).

Self-attention gives the model a mechanism to work this out. The word "it" gets to look at every other word in the sentence and effectively ask, "how relevant are you to me, right now?" "Trophy" receives a high relevance score. "Suitcase" receives a lower one. "Because" barely registers. There's no fixed order to this process, and no step-by-step memory chain being maintained — just every word checking in with every other word, simultaneously, and weighting the relationships accordingly.

That's the entire idea. It sounds almost too simple to produce the results it does — but stacked across many layers and scaled up across many parameters, this single mechanism is what allows transformer-based models to hold coherent context across entire paragraphs, not just sentences.

## Cross-Attention: When Two Different Sequences Need to Talk

Self-attention has a boundary, though: it only operates *within* one sequence. In a sentence, "dog" can attend to "frisbee" because they're both part of the same sequence. But plenty of real tasks involve two *different* sequences that need to inform each other.

The clearest example is image captioning. A model generating the caption "a dog catching a frisbee" is producing a sequence of words, but it needs to ground those words in a completely different kind of sequence — regions of an image. The words being generated and the image being described are not the same sequence at all. So how does the model know, at each word, where in the image to look?

This is **cross-attention**: one sequence attends to a different sequence entirely. When the model writes "dog," it attends heavily to the image region containing the dog. When it writes "frisbee," attention shifts to a completely different region. It is not staring at the whole image uniformly and hoping the right features surface for every word — the attention target moves, word by word, in step with what's being generated.

I'll admit this distinction wasn't always obvious to me in an explicit way. I understood captioning models produced accurate captions, but I had implicitly assumed something closer to the model processing the whole image equally for every generated word. It took a student asking, essentially, "how does the model know where to look?" for me to realize I'd only ever explained the *static* version of attention — self-attention within one sequence — and never actually walked through the *dynamic*, cross-sequence version explicitly. That gap between the two is exactly what cross-attention closes.

This is the mechanism underlying captioning, machine translation, and essentially any transformer task involving two distinct sequences (source and target). The line worth keeping: **self-attention looks within; cross-attention looks across.**



## Multi-Head Attention: Asking Several Questions at Once

There's a further wrinkle. Even within a single sentence, self-attention alone can only chase one kind of relationship at a time per attention computation — but a sentence often raises more than one question simultaneously. Take:

> "The bank near the river closed."

Here, several distinct relationships are worth tracking at once: Is "bank" being used in the financial or geographical sense? What's the main verb, and which word is its subject? Which words modify which? A single attention layer, computing one set of relevance scores, can't cleanly capture all of these different relationship types simultaneously — they call for different lenses.

This is what **multi-head attention** provides. I used to think of it, incorrectly, as running attention multiple times "just to be safe" — a kind of redundancy or ensembling for robustness. That's not what's happening. Each attention head specializes in tracking a *different type* of relationship, entirely on its own, without any explicit instruction about what it should focus on. One head might end up locking onto the "bank"/"river" disambiguation. Another might track subject-verb structure. Nobody assigns these roles in advance — no engineer writes "head 3, handle grammar." These specializations **emerge from training** as a consequence of how the heads are optimized jointly.

This clicked for me in a similar way to the cross-attention gap above — a student asked, quite reasonably, "how do we tell head 3 to look at grammar?" And the honest answer is: we don't, and we can't. It just happens, as an emergent property of gradient descent operating over many parallel attention computations. That's a genuinely different claim from "we run attention several times for robustness," and it's worth being precise about the distinction when teaching this.

The result is that transformers can hold *several* relationships in a sentence active simultaneously, rather than being forced to commit to just one. The line worth keeping here: **multiple attention heads means multiple questions asked at the same time — not one question asked more carefully.**


{% include figure.liquid loading="eager" path="assets/img/the-bank-near-river-example.jpg" class="img-fluid rounded z-depth-1" caption="Different Heads, Different Jobs" title="different heads, different jobs" %}


## Putting It Together

None of these ideas are individually exotic — that's part of what makes the overall picture satisfying rather than intimidating. The arc is:

1. **RNNs** process sequentially and lose long-range information to compression, even with LSTM-style patches.
2. **Self-attention** replaces the sequential bottleneck by letting every word look directly at every other word in the same sequence, all at once.
3. **Cross-attention** extends this across two *different* sequences — letting one (say, generated text) pull targeted information from another (say, an image).
4. **Multi-head attention** runs several independent attention computations in parallel, each free to specialize in a different kind of relationship, with no explicit supervision on what those specializations should be.

Stacked and scaled, this is the mechanism underneath essentially every modern large language model, image captioning system, and translation system currently in use.

If there's one discussion prompt worth sitting with, it's this: multi-head attention's specializations emerge without anyone assigning them. Where else — in your own reading of a sentence, or in your own work — have you noticed yourself implicitly holding two different interpretations open at once before consciously picking the right one? That kind of parallel, unassigned disambiguation is precisely what these models are doing computationally, and I think it's a useful mirror to hold up to our own reading comprehension.
