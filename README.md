# RIVER — website

A Jekyll site built on the
[Lab Website Template](https://greene-lab.gitbook.io/lab-website-template-docs)
by the Greene Lab, restyled with the RIVER brand and set up for
**English + Indonesian** content.

The site ships with no real content: every collection contains a single
`example-*` file that documents its front matter. Delete those once you have
written the real thing.

---

## Bilingual convention

There is no i18n plugin. Both languages live in the same file, English first:

* **Titles and headings** use the pattern `English / Indonesian`. The template
  splits on the ` / ` separator and renders the first half large and the second
  half small (see `_includes/header.html`, `_layouts/member.html`).
* **Body text** puts the English paragraph first, then `<br>`, then the
  Indonesian paragraph — usually in italics.

Keep the spaces around the slash. `Research / Riset` works; `Research/Riset`
will be treated as one string.

---

## Where things live

| Path | What it holds |
| --- | --- |
| `_posts/` | News items |
| `_members/` | One file per person (roles come from `_data/types.yaml`) |
| `_themes/` | Research themes shown on `/research` |
| `_outreach/` | Public lectures, school visits, etc. |
| `_gallery/` | Photos shown on `/team` |
| `_employment/` | Where alumni went |
| `_data/sources.yaml` | Publication DOIs, one per line |
| `_data/sources-cms.yaml` | Publication DOIs added via the CMS |
| `_data/citations.yaml` | Generated automatically — do not edit |
| `images/` | All images, including the brand assets |
| `_styles/-theme.scss` | Colours and fonts — start here for design changes |

Top-level pages are `index.md`, `research/`, `team/`, `projects/`,
`outreach/`, `blog/`, `contact/`.

---

## Brand

From the RIVER design guide:

| Colour | Hex | Used for |
| --- | --- | --- |
| Deep river blue | `#2C506E` | `--primary` |
| Mid river blue | `#4A92C2` | `--accent` |
| Pale sky blue | `#BDE5FF` | `--secondary` |
| Soft sand yellow | `#FCEA9E` | `--sand` |
| Cream | `#F1EDE8` | `--cream` |
| Warm taupe | `#6B5D52` | `--taupe` |

Fonts: **Georgia Pro** for headings and **Arial** for body text. Neither is a
webfont, so the site loads metric-compatible Google Fonts as the primary
family and falls back to the real thing when it is installed:

* Georgia Pro → `Gelasio`, falling back to `Georgia`
* Arial → `Arimo`, falling back to `Arial`

Brand images in `images/`: `logo.png` (mark, used in the header),
`logo-horizontal.png`, `logo-stacked.png` (used on the home page),
`icon.png` (favicon), `share.png` (social preview), `background.jpg`
(header/footer banner), `placeholder.jpg` (stand-in for missing photos).

---

## Deploying

See `DEPLOY.md` for the full first-time GitHub setup.

Short version: push to `main`, set **Settings → Pages → Deploy from a branch →
`gh-pages` / `(root)`**, and the `on-push` workflow builds the site and commits
the result to `gh-pages`.

Note: the template's `first-time-setup.yaml` workflow has been **removed**. It
overwrites `_config.yaml` and `README.md` with generic placeholder values, which
would undo the RIVER setup. Everything it did that is actually needed is handled
by `.nojekyll` and the normal build.

---

## Running it locally

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>.

Alternatively, use the Docker setup in `.docker/`.

---

## Content editing (CMS)

The CMS is **not** part of this repository. It ships separately as
`river-cms.zip`, because it needs its own GitHub OAuth setup before it will
work. See `CMS-SETUP.md` in that bundle.

---

## First-time checklist

1. Fill in `title`, `subtitle`, `description`, `links`, and `timezone` in `_config.yaml`.
2. Replace the placeholder email and address in `contact/index.md`.
3. Write the two intro paragraphs in `index.md`.
4. Add real people to `_members/` and delete `example-member.md`.
5. Add DOIs to `_data/sources.yaml` — the citation workflow fills in the rest.
6. Delete every remaining `example-*` file.
