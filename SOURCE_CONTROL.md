# How to Keep Track of Development Files

Since your `nabin47.github.io` repository only holds the **built** website (the result), you need a place to save your **source code** (the recipe).

## Recommended Approach: Separate Repository

1.  Create a **new repository** on GitHub called `portfolio-source` (or similar).
2.  Upload **all the files** in your `portfolio-v2` folder to this new repository.
    *   *Exception: Do NOT upload the `node_modules` folder. It is huge and can be re-installed anytime with `npm install`.*
    *   *Exception: You don't strictly need to upload the `dist` folder here, as you generate it.*

## Workflow
1.  **Edit Code**: Make changes on your computer.
2.  **Save Source**: Upload changes to `portfolio-source` to keep them safe.
3.  **Publish Site**: Run `npm run build` and upload the `dist` folder to `nabin47.github.io`.

## Why?
- `nabin47.github.io` = The **Showroom** (What people see).
- `portfolio-source` = The **Factory** (Where you build it).
