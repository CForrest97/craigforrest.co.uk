# Deployment infrastructure

OpenTofu configuration that provisions the site's hosting and DNS on Cloudflare, per [ADR-0003](../docs/adr/0003-cloudflare-pages-hosting.md). It creates:

- a Cloudflare Pages project (no git integration — see below);
- custom domains for `craigforrest.co.uk` (canonical) and `www.craigforrest.co.uk`;
- proxied DNS records pointing both hostnames at the Pages project;
- zone settings enforcing HTTPS (`always_use_https`, SSL mode `full`);
- a redirect from `www` to the canonical apex domain.

This config provisions infrastructure only — it does not build or deploy the site. Routine deploys are handled by the [`Deploy` workflow](../.github/workflows/deploy.yml), which builds the site and publishes it with `wrangler pages deploy` on every push to `main`.

Infra changes are applied by the [`Infra` workflow](../.github/workflows/infra.yml): it runs `tofu plan` on pull requests touching `infra/**` (for review), and `tofu apply` automatically on push to `main` touching `infra/**`. There's no routine reason to run `tofu apply` from your own machine, or to hold a Cloudflare API token there.

## One-time setup

State lives in a Cloudflare R2 bucket (S3-compatible) rather than a local file, since GitHub Actions runners don't persist anything between runs. Setting this up is a one-off, dashboard-only task:

1. **Create the state bucket** — Cloudflare dashboard → R2 → Create bucket. The bucket name is configured through the `R2_STATE_BUCKET_NAME` GitHub environment variable rather than committed in [`versions.tf`](versions.tf).
2. **Create an R2 API token** — R2 → Manage API tokens → Create API token, with Object Read & Write permissions scoped to that bucket. This gives you an access key ID and secret access key (separate from your regular Cloudflare API token).
3. **Create a Cloudflare API token** for provisioning (Cloudflare dashboard → My Profile → API Tokens → Create Token) with:
   - Account → Cloudflare Pages → Edit
   - Zone → DNS → Edit
   - Zone → Zone Settings → Edit
   - Zone → Page Rules → Edit
     scoped to the account and the `craigforrest.co.uk` zone.
4. **Add a `production` environment** in GitHub (Settings → Environments) with:
   - Secrets: `CLOUDFLARE_API_TOKEN` (from step 3), `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` (from step 2).
   - Variables: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`, `R2_BUCKET_URL`, and `R2_STATE_BUCKET_NAME` (not secrets; `R2_BUCKET_URL` is the S3 API endpoint shown in the R2 dashboard).

Once these exist, push to `main` (or merge a PR) touching `infra/**` and the `Infra` workflow provisions everything.

## Changing DNS or hosting config

Edit the relevant resource in [`main.tf`](main.tf), open a PR — the `Infra` workflow posts a `tofu plan` you can review — and merge. Applying happens automatically; don't make ad hoc changes in the Cloudflare dashboard for anything defined here, they'll drift from state and get reverted on the next apply.

## Rolling back a deploy

Routine deploys happen via the `Deploy` workflow, not this config. To roll back a bad deploy, use the Cloudflare dashboard: **Pages → craigforrest-co-uk → Deployments → select a previous deployment → Rollback to this deployment**. No workflow or infra change is needed.

## Running Tofu locally (occasional/optional)

Only needed for a one-off local `plan` (e.g. debugging a failing CI run). Requires the same R2 and Cloudflare credentials as CI, held only for the duration of the session — never commit them:

```sh
cd infra
export AWS_ACCESS_KEY_ID=<R2 access key id>
export AWS_SECRET_ACCESS_KEY=<R2 secret access key>
export AWS_ENDPOINT_URL_S3=<R2 bucket URL>
export R2_STATE_BUCKET_NAME=<R2 state bucket name>
export TF_VAR_cloudflare_api_token=<Cloudflare API token>
export TF_VAR_cloudflare_account_id=<Cloudflare account ID>
export TF_VAR_cloudflare_zone_id=<zone ID for craigforrest.co.uk>
tofu init -backend-config="bucket=${R2_STATE_BUCKET_NAME}"
tofu plan
```
