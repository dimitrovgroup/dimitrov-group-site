# Editing the website — a guide for clinicians

You do not need to install anything or use the command line. Everything below is done in your web browser.

After every change, the site rebuilds automatically and the new version appears on
[dimitrov-group.eu](https://dimitrov-group.eu) in about a minute.

> Throughout this guide replace `<org>/<repo>` with the actual GitHub URL of this repository
> (you can copy it from the address bar when you are looking at the project on GitHub).

---

## 1. Adding a publication

1. Open the publications file in your browser:
   `https://github.com/<org>/<repo>/edit/main/src/data/publications.yml`

   <!-- screenshot: "Edit this file" pencil icon, top-right -->

2. Click the small pencil icon (top-right of the file) to start editing.

3. Copy any of the existing publication blocks (they all start with `- id:`) and paste it
   at the **top** of the list. Edit the fields:

   - `id` — a unique short identifier (lowercase, dashes only).
   - `title` — full article title, in quotes.
   - `authors` — one per line, like `"Dimitrov N."`.
   - `journal` — journal name in quotes.
   - `year` — four-digit year, no quotes.
   - `pmid` — PubMed ID, digits only, in quotes. Omit the line if there isn't one yet.
   - `doi` — full DOI, like `10.1007/s00264-024-06000-0`. Omit the line if not yet available.
   - `members` — list of slugs (e.g. `n-dimitrov`) of group members who are co-authors.
   - `seniorAuthor` — `true` if a group member is the senior (last) author, otherwise `false`.

4. Scroll to the bottom of the page and click **Commit changes to main**.
5. Wait about a minute. The new publication appears on the site.

---

## 2. Adding a team member

1. In your browser, go to:
   `https://github.com/<org>/<repo>/new/main/src/content/members/`

2. Name the file `<slug>.md` — for example `j-smith.md`. The slug becomes part of the URL
   for the profile (`/team/j-smith/`).

3. Open an existing member file in another tab as a template (for instance `n-cherkezov.md`)
   and copy its frontmatter. Edit the fields for the new person.

4. **Portrait (optional).** Drop a square JPG into `public/team/` and reference it as
   `portrait: ../../../public/team/<slug>.jpg` in the frontmatter. The site picks it up
   automatically.

5. Commit the file. The new profile and team-grid card appear after the next build.

   <!-- screenshot: "Commit new file" green button at bottom of page -->

---

## 3. Adding a project or activity

Same pattern as for members, but in different folders:

- Projects: `src/content/projects/<short-id>.md`
- Activities: `src/content/activities/<short-id>.md` — use the date in the filename, like `2026-eors.md`.

Use the existing files as templates. The schema for each (the list of allowed fields) is
defined in `src/content/config.ts` if you ever need to look it up.

---

## 4. Updating the homepage copy

- Hero (the big headline on the front page): `src/components/Hero.astro`
- Section copy (About, Research lines, etc.): `src/pages/index.astro`

Look for `<!-- TODO -->` comments to find the lines that were left as placeholders for the PI.

---

## 5. Editing your own profile

Open your member file:

`https://github.com/<org>/<repo>/edit/main/src/content/members/<your-slug>.md`

Edit either the frontmatter (the YAML at the top, between `---` lines) or the bio body
underneath. Save. Done.

---

## If something looks wrong

If the site doesn't update after a couple of minutes, or you see a red X on the
[Actions tab](https://github.com/<org>/<repo>/actions), ask the maintainer to take a look —
usually it's a tiny YAML typo (a missing quote, a misaligned indent).
