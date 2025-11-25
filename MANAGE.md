# How to Manage Your Portfolio

## 1. Updating Content
All your content is stored in the `src/data/` folder. You can edit these files with any text editor.

- **Profile**: `src/data/profile.json` (Bio, links, contact info)
- **Publications**: `src/data/publications.json` (Add new papers here)
- **Experience**: `src/data/experience.json` (Work and teaching history)
- **Blog Posts**: `src/data/posts.json` (Links to your blog posts)

**Example: Adding a new publication**
Open `src/data/publications.json` and add a new block to the list:
```json
{
  "title": "My New Amazing Paper",
  "link": "https://link-to-paper.com",
  "year": "2025"
}
```

## 2. Publishing Changes
After you make changes to the JSON files, you must **re-build** the website and upload the new files.

1.  **Build**: Run this command in your project folder:
    ```bash
    npm run build
    ```
2.  **Upload**:
    - Go to the `dist` folder.
    - Upload the **new contents** of the `dist` folder to your `nabin47.github.io` repository, overwriting the old files.

## Testing Locally (Optional)
If you want to see your changes before uploading, run:
```bash
npm run dev
```
This will give you a local link (like `http://localhost:3000`) to preview your site.
