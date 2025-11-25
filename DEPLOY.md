# How to Deploy to nabin47.github.io

Since `nabin47.github.io` is your main portfolio site, GitHub expects the **built** website files (HTML, CSS, JS) to be in the repository, not the React source code.

## Step 1: Build the Project
We need to convert your React code into standard HTML/CSS/JS that browsers can understand.
Run this command in your terminal (I will run this for you):
```bash
npm run build
```
This creates a `dist` folder in your project directory.

## Step 2: Upload to GitHub
1.  Go to your `dist` folder.
2.  **These are the files you must upload** to your `nabin47.github.io` repository.
3.  **Do not** upload the `src`, `node_modules`, or other folders to the *root* of your `nabin47.github.io` repo if you want the site to just work immediately.
    *   *Note: If you want to save your source code on GitHub too (recommended), you should create a separate repository (e.g., `portfolio-source`) for this entire project folder, or use a separate branch.*

## Summary
- **Source Code**: Keep this safe (on your computer or a separate repo).
- **Website (dist folder)**: Upload the **contents** of this folder to `nabin47.github.io`.
