module "site" {
  source = "../../modules/pages-site"

  cloudflare_account_id = var.cloudflare_account_id
  cloudflare_zone_id    = var.cloudflare_zone_id
  pages_project_name    = var.pages_project_name
  production_branch     = var.production_branch
  domains               = var.domains
}
