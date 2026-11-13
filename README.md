# craigforrest.co.uk

The repository for Craig Forrest's personal website.

Initiative [0001-build-website-foundation](docs/product/initiatives/0001-build-website-foundation/brief.md) has produced a single-page, sample-content foundation built with [Astro](https://astro.build) (see [ADR-0001](docs/adr/0001-astro-build-tooling.md)). Approved initiatives [0002](docs/product/initiatives/0002-deploy-site/brief.md) and [0003](docs/product/initiatives/0003-shared-preview-environment/README.md) provide production deployment and a manually selected preview environment. Final content and later features remain separate work.

## Documentation

- [Documentation map](docs/README.md)
- [Product overview](docs/product/overview.md)
- [Architecture overview](docs/architecture.md)
- [Product decision log](docs/product/decisions.md)
- [Architecture Decision Records](docs/adr/README.md)
- [Product initiatives](docs/product/initiatives/)
- [Design system reference](docs/design-system/README.md)
- [Deployment infrastructure](infra/README.md) — Cloudflare Pages/DNS provisioning and how to operate it

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
