# nabin47.github.io

Personal academic website of **Jubair Ahmed Nabin**, live at <https://nabin47.github.io>.

Built with [Jekyll](https://jekyllrb.com/) on the [al-folio](https://github.com/alshedivat/al-folio) theme and deployed to GitHub Pages by GitHub Actions.

## Where things live

| What                       | File(s)                                                    |
| -------------------------- | ---------------------------------------------------------- |
| Site settings              | `_config.yml`                                              |
| About page (home)          | `_pages/about.md`, photo in `assets/img/prof_pic.jpg`      |
| Publications               | `_bibliography/papers.bib`                                 |
| CV web page                | `assets/json/resume.json`                                  |
| CV PDF (built by RenderCV) | `_data/cv.yml` → `assets/rendercv/rendercv_output/`        |
| News                       | `_news/`                                                   |
| Blog posts                 | `_posts/`                                                  |
| Courses                    | `_teachings/`                                              |
| Social links               | `_data/socials.yml`                                        |
| Citation counts            | `_data/citations.yml` (updated automatically, do not edit) |

## Automation (`.github/workflows/`)

- **deploy.yml** builds the site and publishes it to the `gh-pages` branch on every push to `main`, and after the CV and citation workflows commit.
- **render-cv.yml** regenerates the CV PDF whenever `_data/cv.yml` changes.
- **update-citations.yml** refreshes Google Scholar citation counts three times a week.
- **broken-links-site.yml** checks the built site for broken internal links after each deploy.
- **prettier.yml** checks formatting; run `npx prettier . --write` before committing.

## Local development

```bash
docker compose pull && docker compose up   # http://localhost:8080
```

Or without Docker (needs Ruby, ImageMagick and Python `nbconvert`):

```bash
bundle install
bundle exec jekyll serve
```

Theme documentation: [INSTALL.md](INSTALL.md), [CUSTOMIZE.md](CUSTOMIZE.md), [FAQ.md](FAQ.md), [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## License

Theme code is MIT-licensed (see [LICENSE](LICENSE)). Site content © Jubair Ahmed Nabin.
