---
layout: post
title: "What Attention Actually Needs: From Logistic Regression to RoPE"
date: 2026-07-17
categories: [machine-learning, deep-learning]
tags: [attention, transformers, positional-encoding, rope, self-attention]
excerpt: "Attention isn't a universal power-up you can bolt onto any model — it only makes sense when there are parts to weigh against each other. Tracing that idea forward explains why transformers needed positional encoding, and why modern LLMs have largely moved to RoPE instead."
---

## Introduction

A student of mine once tried to add attention to a logistic regression model for a class project. It didn't just fail to help — it made no sense to even try. That moment stuck with me, because it exposed a misconception I'd been quietly carrying myself: that attention is a kind of universal upgrade, something you can bolt onto any model to make it "smarter."

It isn't. Attention is a tool for a very specific shape of problem, and understanding what that shape is turns out to explain a lot of transformer architecture that otherwise looks like arbitrary engineering — including why transformers needed a fix for word order, why that fix had a real weakness, and why most modern large language models have moved on to something else entirely.

## When Does Attention Even Apply?

Attention only matters when there are multiple parts to weigh against each other — words in a sentence, patches in an image, steps in a sequence. The entire mechanism is about computing relationships *between* parts and deciding which ones matter more given the context.

Logistic regression takes a single flat feature vector. There's nothing to attend "between." No parts, no relationships, nothing to weigh against anything else. Adding attention to it isn't a bad idea that fails gracefully — it's a type error. The mechanism has no object to operate on.

The general rule: attention helps when parts of your input interact, and some matter more than others depending on context. RNNs, transformers, and vision transformers all have that structure. Logistic regression, SVMs, and random forests don't — there's nothing there to attend to in the first place.

Attention isn't a power-up. It's a tool for a specific shape of problem. It's worth sitting with that distinction, because a lot of unnecessary architectural complexity in machine learning comes from treating powerful tools as universal ones.

## The Problem Attention Doesn't Solve: Order

Once you're in a domain where attention *does* apply — like language — a second, subtler problem shows up. Consider two sentences:

> "Dog bites man" and "Man bites dog."

Same words. Opposite meaning. When I gave my students this pair after teaching self-attention and asked whether attention could tell the difference, half the room said yes. It can't. Attention has no built-in sense of order at all.

Here's the part that catches people, myself included, when they first learn this: attention computes relationships between words using dot products between their vector representations. Shuffle the input words and you get the exact same set of relationships, just relabeled. Position isn't encoded anywhere in that computation. As far as the raw attention mechanism is concerned, a sentence is a *set* of words, not a *sequence*.

{% include figure.liquid loading="eager" path="assets/img/dog-bites-man-attention.jpg" class="img-fluid rounded z-depth-1" caption="Self-attention applied to `Dog bites man` vs. `Man bites dog.`" title="Figure 1: Self-attention applied to `Dog bites man` vs. `Man bites dog.`" %}

## The Original Fix: Sinusoidal Positional Encoding

The original transformer paper addresses this with positional encoding. (Vaswani et al., 2017) Before words go into the model, a pattern built from sine and cosine waves gets added to each word's vector, with one unique pattern per position. Position 1 gets one wave pattern, position 2 gets a slightly different one, and so on. The model learns to read these patterns as "where am I in the sentence."

Why waves specifically, rather than just labeling positions 1, 2, 3? Raw integers like position 500 would dominate the arithmetic and destabilize training — the scale of the numbers would swamp the actual word representations. Sine and cosine waves stay small and bounded regardless of position, and because they're built from overlapping frequencies, they let the model infer the *distance* between any two positions, not just each word's raw index.

This one fix is why "dog bites man" and "man bites dog" stop looking identical to a transformer. Order — which the core attention mechanism throws away entirely — gets reintroduced as a signal baked into the input itself.

## The Weakness Nobody Mentions

I taught positional encoding as "the model's GPS" for a while — as if each word needed to know its exact coordinates in the sentence. That framing is wrong, and I explained it that way for longer than I'd like to admit.

Sinusoidal encoding gives each position a fixed, absolute label. Position 500 always looks like position 500, no matter what surrounds it. But what actually matters for meaning is usually the *distance* between words, not their absolute spot in the sentence. Take "the cat that I adopted last year" — the words "cat" and "adopted" need to be linked in the model's understanding regardless of whether that phrase starts at word 3 or word 300. Absolute position is the wrong quantity to be encoding. Relative distance is what carries meaning.

This is the real weakness: it's also the reason most modern large language models don't use plain sinusoidal encoding anymore.

## RoPE: Encoding Distance Instead of Position

Rotary Position Embeddings (RoPE) fix this by changing *what* gets encoded, not just *how*. Instead of adding a fixed positional label to each word's vector, RoPE rotates each word's representation by an angle determined by its position. (Su et al., 2024)

The key idea: when the model compares two words during attention, the *difference* between their rotation angles naturally encodes how far apart they are — not where either one sits in absolute terms. Distance falls directly out of the geometry of the comparison, rather than being something the model has to separately infer from two absolute labels.

{% include figure.liquid loading="eager" path="assets/img/nothing-to-weigh.jpg" class="img-fluid rounded z-depth-1" caption="Rotary Position Embedding — word vectors rotated by position." title="Rotary Position Embedding — word vectors rotated by position." %}

This shift matters more than it might initially seem. Relative position generalizes to sequence lengths the model never saw during training, because the model is learning about *distances*, which are a stable, reusable concept — not fixed absolute slots, which run out the moment you exceed the training length. Fixed positional encoding doesn't generalize this way. This is a significant part of why long-context models are possible at all.

{% include figure.liquid loading="eager" path="assets/img/distance-not-address.jpg" class="img-fluid rounded z-depth-1" caption="Positional encoding performance vs. sequence length." title="Positional encoding performance vs. sequence length." %}

## Takeaway

The throughline here isn't really about positional encoding specifically — it's about being precise regarding what a mechanism actually does versus what you assume it does. Attention doesn't make models smarter in general; it only helps when there are interacting parts to weigh. Attention doesn't understand order by default; that has to be added deliberately. And even the first fix for order encoded the wrong quantity — absolute position instead of relative distance — which is exactly the kind of subtle mismatch that doesn't show up until you push a system past the conditions it was designed for (like longer sequences).

None of these are exotic failures. They're the ordinary kind of misconception that comes from learning a technique's name before its actual shape.

Where have you run into a model — or a technique more broadly — being pushed past the conditions it was actually built for?

## References

1. Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems, 30*. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)

2. Su, J., Lu, Y., Pan, S., Murtadha, A., Wen, B., & Liu, Y. (2024). RoFormer: Enhanced transformer with rotary position embedding. *Neurocomputing, 568*, 127063. [arXiv:2104.09864](https://arxiv.org/abs/2104.09864)
