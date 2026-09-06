# Deploying the RIVER website on GitHub

From an empty GitHub account to a live site. Allow about 30 minutes for the
first run, most of which is waiting for builds.

The site is built by GitHub Actions, not by GitHub's own Jekyll. The flow is:

```
you push to `main`
      ↓
on-push workflow  →  updates citations  →  builds the site with Jekyll
      ↓
commits the built site to the `gh-pages` branch
      ↓
GitHub Pages serves `gh-pages`
```

You only ever edit `main`. Never edit `gh-pages` by hand — it is overwritten on
every build.

---

## Step 1 — Create the repository

1. On GitHub, click **+ → New repository**.
2. **Repository name:** something like `river-website`. This becomes part of the
   URL, so keep it lowercase with hyphens.
3. **Owner:** your account, or a GitHub organisation if the group has one. An
   organisation is worth considering — it survives people leaving, and the URL
   reads better.
4. **Public**. Free GitHub Pages requires public repositories.
5. Do **not** tick "Add a README", ".gitignore", or a licence — the zip already
   has them, and an initialised repo makes the first push more awkward.
6. **Create repository.**

Leave the page open. GitHub shows you the repository URL, which you'll need next.

---

## Step 2 — Get the files into the repository

Pick whichever route you're comfortable with. Both end up in the same place.

### Route A — the web interface, no command line

1. Unzip `river-website.zip` on your computer.
2. On the empty repository page, click **uploading an existing file**.
3. Open the unzipped `river-website` folder, select **everything inside it**
   (not the folder itself), and drag it into the browser.
4. Commit with a message like `Initial site`.

Two warnings for this route:

* GitHub's uploader **silently skips files and folders starting with a dot**.
  That means `.github/` (all the workflows), `.gitignore`, and `.nojekyll` will
  not upload, and nothing will build. You'll need to create those by hand,
  which is tedious — so if the workflows matter to you, use Route B.
* The uploader caps at 100 files per drag. The site is well under that.

### Route B — the command line (recommended)

Install [Git](https://git-scm.com/downloads) if you don't have it, then:

```bash
cd path/to/unzipped/river-website

git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/OWNER/REPO.git
git push -u origin main
```

Replace `OWNER/REPO` with your own. Git will ask you to sign in; on the browser
prompt, authorise it.

`git add .` does include dotfiles, so the workflows and `.nojekyll` come along.

### Route C — GitHub Desktop

If you'd rather not use a terminal but need the dotfiles:
[GitHub Desktop](https://desktop.github.com) → **File → New repository**, point
it at the unzipped folder, commit, then **Publish repository**. It handles
dotfiles correctly.

---

## Step 3 — Let Actions write to the repository

The build workflow commits the built site back to the repo, so it needs write
permission. This is off by default on new repositories.

1. **Settings → Actions → General**.
2. Scroll to **Workflow permissions**.
3. Select **Read and write permissions**.
4. Tick **Allow GitHub Actions to create and approve pull requests**.
5. **Save**.

Skipping this is the single most common reason the first build fails with a
`403` on the commit step.

---

## Step 4 — Run the first build

1. Go to the **Actions** tab. If it asks you to enable workflows, click
   **I understand my workflows, go ahead and enable them**.
2. In the left sidebar, click **on-push**.
3. Click **Run workflow → Run workflow** (on `main`).

It takes 2–4 minutes. When it finishes green, a new `gh-pages` branch will
exist containing the built site.

If it fails, jump to Troubleshooting below — but do read the failing step's log
first, it usually says exactly what's wrong.

**Do not run `first-time-setup`.** It has been deleted from your copy, but if
you ever pull a fresh version of the upstream template, note that it overwrites
`_config.yaml` and `README.md` with generic placeholders.

---

## Step 5 — Turn on GitHub Pages

Only possible once `gh-pages` exists, which is why this comes after step 4.

1. **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. **Branch:** `gh-pages`, folder `/ (root)`.
4. **Save**.

GitHub now runs its own `pages-build-deployment` job. Wait a minute or two and
the Pages settings page will show your URL:

```
https://OWNER.github.io/REPO/
```

Open it. You should see the RIVER home page.

---

## Step 6 — Let it fix its own URLs

The first build didn't know the final URL, so internal links and the social
preview image may point to the wrong place.

The `on-pages` workflow notices the Pages deployment and rebuilds automatically.
If it doesn't fire, go to **Actions → build-site → Run workflow** once more.

After that rebuild, check that the logo appears in the header and the CSS is
applied. If the page looks like unstyled text, see Troubleshooting.

---

## Step 7 — Make it yours

Now edit on `main`. Every push triggers a rebuild.

1. `_config.yaml` — `title`, `subtitle`, `description`, `links`, `timezone`.
2. `contact/index.md` — real email and address.
3. `index.md` — the two welcome paragraphs.
4. `_members/` — add real people, delete `example-member.md`.
5. `_data/sources.yaml` — add DOIs, one `- id:` line each.
6. Delete every remaining `example-*` file across the collections.

You can edit files directly on github.com: open the file, click the pencil
icon, edit, **Commit changes**. Good enough for text tweaks.

---

## Step 8 — The CMS (optional, later)

Once the site is live and stable, set up the editor so other people can post
without touching GitHub's interface. That's `river-cms.zip` and its
`CMS-SETUP.md`. It needs a GitHub OAuth app and a small Cloudflare worker.

Get the site live first. The CMS is independent and can wait.

---

## Using a custom domain later

If RIVER gets its own domain, or needs to sit on an institutional server:

* **Own domain** (e.g. `river-group.org`): **Settings → Pages → Custom domain**,
  then add the DNS records GitHub shows you. The workflows pick up the new URL
  automatically on the next build.
* **A path on someone else's server** (like `example.ac.id/~river`): GitHub
  Pages can't serve that. You'd build the site and upload the contents of
  `_site/` to that server. Worth checking early whether that server allows
  SFTP from off-campus, since some university servers don't.

---

## Troubleshooting

**`on-push` fails at "Commit live site to Pages branch" with a 403**
Step 3 was skipped. Set workflow permissions to read and write, then re-run.

**Settings → Pages has no `gh-pages` branch to select**
The build hasn't succeeded yet. Fix the failing build first; the branch is
created by the deploy step.

**Site loads but has no styling — plain black text on white**
GitHub is running its own Jekyll over the built site and dropping `/_styles`.
Check that a `.nojekyll` file exists in the root of the `gh-pages` branch. It
should get there automatically via the `include:` list in `_config.yaml`; if
it's missing, the dotfile probably didn't upload (Route A above).

**Images are broken, CSS 404s, links go to the wrong path**
The `baseurl` is wrong. Re-run `build-site` manually — it reads the real Pages
path from `actions/configure-pages` each time.

**`update-citations` fails**
Harmless while `_data/sources.yaml` is still empty. It runs before the build,
and `on-push` skips it entirely on run number 1. If it keeps failing once you
add DOIs, check that each is a bare DOI (`10.xxxx/yyyy`) and not a full URL.

**Nothing happens when I push**
Check the **Actions** tab is enabled, and that you pushed to `main` — the
workflow only triggers on that branch.

**I edited `gh-pages` and my change disappeared**
Expected. That branch is regenerated on every build. Edit `main`.

---

## Everyday use, once it's running

* Write a news post → add a file to `_posts/` → push → live in ~3 minutes.
* Add a person → add a file to `_members/` → push.
* Add a paper → add its DOI to `_data/sources.yaml` → push; the citation
  workflow fetches the title, authors and journal for you.
* There's also a scheduled workflow that refreshes citations periodically, so
  new papers on your ORCID can appear without you doing anything.
