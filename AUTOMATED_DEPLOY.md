# Automated Deployment Setup

This setup allows you to keep your **source code** in the `main` branch, and automatically deploy the **built website** to a `gh-pages` branch whenever you push changes.

## 1. One-Time Setup on GitHub

1.  **Push your code**: Push this entire project folder to the `main` branch of your `nabin47.github.io` repository.
2.  **Wait for Action**: Go to the "Actions" tab in your repository. You should see a workflow running called "Deploy to GitHub Pages". Wait for it to finish (green checkmark).
3.  **Configure Pages**:
    - Go to **Settings** > **Pages**.
    - Under "Build and deployment", select **Deploy from a branch**.
    - Under "Branch", select **gh-pages** and folder **/(root)**.
    - Click **Save**.

## 2. How to Update Your Site

From now on, you only need to do this:

1.  **Edit** your files locally.
2.  **Push** your changes to the `main` branch:
    ```bash
    git add .
    git commit -m "Update portfolio content"
    git push origin main
    ```

GitHub will automatically detect the push, build your site, and update the live website within a minute or two.

## Note
- Your **Source Code** lives in `main`.
- Your **Live Site** lives in `gh-pages` (managed automatically).
