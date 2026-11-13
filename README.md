# craigforrest.co.uk

The repository for Craig Forrest's personal website.

A single-page professional profile built with [Astro](https://astro.build) and TypeScript, with experience and contact content in `src/data/`. Global styles and design tokens live in `src/styles/global.css`.

GitHub Actions deploys the static build to Cloudflare Pages, with automatic production deployment from `main` and a manually selected preview environment. See the [deployment guide](infra/README.md) for provisioning, environment ownership, and operating instructions.

## Development

```sh
npm install          # install dependencies
npm run dev          # start the local dev server at http://localhost:4321
npm run check        # type-check .astro and .ts files
npm run format       # format the codebase with Prettier
npm run format:check # check formatting without writing changes
npm run build        # produce a static production build in ./dist
npm run preview      # preview the production build locally
```

The [Validate workflow](.github/workflows/validate.yml) runs type-checking, formatting checks, and a production build for every pull request. Production and preview workflows also run these checks before deployment. See the [deployment guide](infra/README.md) for environment ownership, preview selection, and recovery instructions.
