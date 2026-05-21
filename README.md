# Dimitrov Group — public website

The public website of the **Orthopaedic Research Group — Prof. N. Dimitrov**.
A small, calm, content-first site for the group's people, publications, projects
and congress activities.

Live at **[dimitrov-group.eu](https://dimitrov-group.eu)**.

## Tech stack

- [Astro 5](https://astro.build/) — static site generator, no client framework.
- Content collections (`src/content/`) for members, projects, and activities; YAML
  for publications.
- Sitemap via `@astrojs/sitemap`.
- Hosted on GitHub Pages with a custom domain (`dimitrov-group.eu`).
- Apple-inspired design system with a single calm-teal accent, full light/dark theme.

## Editing content

If you are a clinician adding a publication, member, project, or activity, you do
not need any of the developer instructions below. See **[CONTRIBUTING.md](./CONTRIBUTING.md)**
— it is written for people who only use a browser.

## Local development (developers only)

Requires Node 20 or higher.

```bash
npm install
npm run dev
```

The site opens at <http://localhost:4321>.

```bash
npm run build    # production build to ./dist
npm run preview  # serve the built site locally
```

`npm run build` runs `astro check` first, so type and content-schema errors fail the
build the same way they fail the deploy.

## Project structure

- `src/layouts/Base.astro` — the single shared layout (head, theme bootstrap, nav, footer).
- `src/components/` — small composable components.
- `src/pages/` — routes.
- `src/content/` — markdown content (members, projects, activities). Schemas in `config.ts`.
- `src/data/publications.yml` — the publication list.
- `src/styles/global.css` — design tokens and utility classes; everything else is scoped.
- `public/` — static assets including `CNAME`, `robots.txt`, `favicon.svg`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes
to GitHub Pages. The `CNAME` file in `public/` sets the custom domain.

## License

<!-- TODO: confirm license. -->
All content © Dimitrov Group. Code released under the MIT License unless noted otherwise.

## Acknowledgements

Built for the Orthopaedic Research Group. With thanks to all collaborators, including
colleagues at the Universitätsspital Zürich (USZ).
