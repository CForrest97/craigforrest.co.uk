# Deployment infrastructure

OpenTofu provisions production and preview hosting on Cloudflare without using Cloudflare's Git integration. The reusable Pages module under [`modules/pages-site`](modules/pages-site) is consumed by two peer roots with independent state:

- [`environments/production`](environments/production) owns `craigforrest-co-uk`, the apex and `www` custom domains, and their DNS records;
- [`environments/preview`](environments/preview) owns `craigforrest-co-uk-preview`, `preview.craigforrest.co.uk`, and its proxied DNS record.

Both environment `main.tf` files contain the same Pages module call; only their input defaults differ. Shared zone settings, HTTPS enforcement, and the `www` redirect are managed by the central infrastructure repository. Make changes to those resources there. The hosting ADRs describe the original ownership before zone management moved out of this repository.

Production state uses `site.tfstate`; preview state uses `preview.tfstate`. Both objects live in the same Cloudflare R2 bucket but must never own the same Cloudflare resource. Both backends enable OpenTofu's native S3 lockfile mechanism, supported by R2 conditional writes, while workflow concurrency serialises CI access as an additional safeguard. Infrastructure workflows queue rather than cancel in-progress runs so an apply is never interrupted deliberately.

The existing zone cannot safely duplicate singleton zone settings or phase entry-point rulesets. Both roots therefore manage only environment-scoped Pages projects, custom domains, and DNS records. Shared zone changes are outside both roots and cannot be exercised through this repository's preview workflow.

The preview `X-Robots-Tag: noindex` policy is application-owned rather than zone-owned. [`public/_headers`](../public/_headers) is included in the Pages deployment artefact and uses an absolute hostname rule, so it affects `preview.craigforrest.co.uk` without changing production responses or claiming the zone's singleton `http_response_headers_transform` phase. A repository that centrally owns the zone can manage that phase independently if it is needed later.

## GitHub environments

State lives in a Cloudflare R2 bucket because GitHub runners are ephemeral. Create an R2 bucket and an R2 API token with Object Read & Write access to it.

Configure the `production` environment with:

- Secrets: `CLOUDFLARE_API_TOKEN`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`.
- Variables: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`, `R2_BUCKET_URL`, `R2_STATE_BUCKET_NAME`.

Configure the `preview` environment with the same R2 credentials and identifiers.

Both workflows expose the Cloudflare token through the provider-native `CLOUDFLARE_API_TOKEN` environment variable. It is not declared as an OpenTofu input variable.

## Production infrastructure

The [`Infra` workflow](../.github/workflows/infra.yml) runs a production plan for pull requests changing `infra/**` and applies production automatically after those changes merge to `main`. The root describes the current module addresses; it no longer contains the historical `moved` or `removed` blocks. Restoring an older state requires reviewing its addresses and preparing any necessary state migration before applying.

For an occasional local production plan:

```sh
cd infra/environments/production
tofu init -backend-config="bucket=${R2_STATE_BUCKET_NAME}"
tofu plan
```

The required `AWS_*`, `TF_VAR_*`, `AWS_ENDPOINT_URL_S3`, and `R2_STATE_BUCKET_NAME` values are the same as those configured in GitHub. Never commit credentials or generated state.

## Manual preview

Run Actions → **Preview** → **Run workflow**, select the branch using GitHub's built-in branch selector, then run the workflow. The selected commit supplies both the workflow definition and deployed revision. Direct tag and commit-SHA inputs are not supported; to preview a particular commit, first make it the tip of a branch. See [ADR-0005](../docs/adr/0005-use-built-in-branch-selection-for-preview.md).

The workflow installs dependencies, type-checks, checks formatting, and builds the application before initialising `infra/environments/preview` against `preview.tfstate`. Validation or build failures stop the run before infrastructure changes.

Each run that passes application validation creates a saved OpenTofu plan. It applies that exact plan before the application upload only when `tofu plan -detailed-exitcode` reports changes. OpenTofu—not Git metadata—therefore decides whether infrastructure needs updating.

Once infrastructure succeeds, the workflow uploads the built application to `craigforrest-co-uk-preview` with Wrangler. The custom hostname follows the latest successful upload. A failed upload leaves the previous application deployment in place, but infrastructure changes applied earlier in the run may already have taken effect.

For initial preview provisioning, run Preview with `main`. The run creates the isolated preview state, Pages project, custom domain, DNS record, and application deployment, including the hostname-scoped `noindex` header policy.

## Rollback and recovery

Production application rollback uses Cloudflare Pages deployment history. Preview is updated by rerunning the manual workflow with a known-good branch; to restore a particular commit, make it the tip of a branch and select that branch. OpenTofu state should be repaired through normal import/move procedures rather than dashboard edits or state deletion.
