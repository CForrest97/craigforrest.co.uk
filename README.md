# craigforrest.co.uk

The repository for Craig Forrest's personal website.

The site is being rebuilt from a clean slate. Initiative [0001-build-website-foundation](docs/product/initiatives/0001-build-website-foundation/brief.md) has produced a single-page, sample-content foundation built with [Astro](https://astro.build) (see [ADR-0001](docs/adr/0001-astro-build-tooling.md)); final content, hosting, and later features are separate, not-yet-approved initiatives.

## Documentation

- [Documentation map](docs/README.md)
- [Product overview](docs/product/overview.md)
- [Architecture overview](docs/architecture.md)
- [Product decision log](docs/product/decisions.md)
- [Architecture Decision Records](docs/adr/README.md)
- [Product initiatives](docs/product/initiatives/)
- [Design system reference](docs/design-system/README.md)

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
