# Deployment infrastructure

OpenTofu provisions production and preview hosting on Cloudflare without using Cloudflare's Git integration. The reusable Pages module under [`modules/pages-site`](modules/pages-site) is consumed by two peer roots with independent state:

- [`environments/production`](environments/production) owns `craigforrest-co-uk`, the apex and `www` domains and DNS, shared zone settings, and the `www` redirect;
- [`environments/preview`](environments/preview) owns `craigforrest-co-uk-preview`, `preview.craigforrest.co.uk`, and its proxied DNS record.

Both environment `main.tf` files contain the same Pages module call; only their input defaults differ. Production-only shared-zone resources are isolated in `environments/production/zone.tf`, making the intentional parity boundary visible without changing state ownership.

Production state uses `site.tfstate`; preview state uses `preview.tfstate`. Both objects live in the same Cloudflare R2 bucket but must never own the same Cloudflare resource. Both backends enable OpenTofu's native S3 lockfile mechanism, supported by R2 conditional writes, while workflow concurrency serialises CI access as an additional safeguard. Infrastructure workflows queue rather than cancel in-progress runs so an apply is never interrupted deliberately.

The existing zone cannot safely duplicate singleton zone settings or phase entry-point rulesets. Consequently, preview applies only environment-scoped Pages, custom-domain, and DNS changes. Changes to production redirects and zone settings are planned and applied only by the production root.

The preview `X-Robots-Tag: noindex` policy is application-owned rather than zone-owned. [`public/_headers`](../public/_headers) is included in the Pages deployment artefact and uses an absolute hostname rule, so it affects `preview.craigforrest.co.uk` without changing production responses or claiming the zone's singleton `http_response_headers_transform` phase. A repository that centrally owns the zone can manage that phase independently if it is needed later.

The production root contains a non-destructive `removed` block for the former `cloudflare_ruleset.preview_response_headers` address. If that provisional resource ever reached production state, the next apply relinquishes it without deleting a potentially shared zone entry-point ruleset. After confirming that the address is absent from state, the block can be removed; any obsolete live rule should be reconciled by the zone's owner rather than destroyed from this application state.

## GitHub environments

State lives in a Cloudflare R2 bucket because GitHub runners are ephemeral. Create an R2 bucket and an R2 API token with Object Read & Write access to it.

Create a Cloudflare API token for the `production` GitHub environment with:

- Account → Cloudflare Pages → Edit
- Zone → Dynamic URL Redirects → Edit
- Zone → DNS → Edit
- Zone → Zone Settings → Edit

Configure the `production` environment with:

- Secrets: `CLOUDFLARE_API_TOKEN`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`.
- Variables: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`, `R2_BUCKET_URL`, `R2_STATE_BUCKET_NAME`.

Configure the `preview` environment with the same R2 credentials and identifiers. Its Cloudflare token needs only Account → Cloudflare Pages → Edit and Zone → DNS → Edit.

Both workflows expose the Cloudflare token through the provider-native `CLOUDFLARE_API_TOKEN` environment variable. It is not declared as an OpenTofu input variable.

## Production infrastructure

The [`Infra` workflow](../.github/workflows/infra.yml) runs a production plan for pull requests changing `infra/**` and applies production automatically after those changes merge to `main`. State-preserving `moved` blocks record the refactor of existing Pages and DNS resources into the shared module; review the first production plan and confirm it reports moves rather than replacement.

For an occasional local production plan:

```sh
cd infra/environments/production
tofu init -backend-config="bucket=${R2_STATE_BUCKET_NAME}"
tofu plan
```

The required `AWS_*`, `TF_VAR_*`, `AWS_ENDPOINT_URL_S3`, and `R2_STATE_BUCKET_NAME` values are the same as those configured in GitHub. Never commit credentials or generated state.

## Manual preview

Run Actions → **Preview** → **Run workflow**, then enter a branch, tag, or commit SHA. The workflow checks out that revision and initialises `infra/environments/preview` against `preview.tfstate`.

The workflow creates a saved OpenTofu plan for every run. It applies that exact plan before the application only when `tofu plan -detailed-exitcode` reports changes. OpenTofu—not Git metadata—therefore decides whether infrastructure needs updating.

Production-only changes may legitimately produce an empty preview plan because shared zone resources cannot be duplicated. Once infrastructure succeeds, the workflow validates and builds the application and uploads it to `craigforrest-co-uk-preview` with Wrangler. The custom hostname follows the latest successful manual run; failures leave the previous deployment live.

For the first rollout, merge the infrastructure refactor so production state records its moves, then run Preview with `main`. The first run creates the isolated preview state, Pages project, custom domain, DNS record, and application deployment, including the hostname-scoped `noindex` header policy.

## Rollback and recovery

Production application rollback uses Cloudflare Pages deployment history. Preview is updated by rerunning the manual workflow with a known-good branch, tag, or commit SHA. OpenTofu state should be repaired through normal import/move procedures rather than dashboard edits or state deletion.
