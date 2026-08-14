resource "cloudflare_pages_project" "site" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = var.production_branch
}

resource "cloudflare_pages_domain" "site" {
  for_each = var.domains

  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  name         = each.value.hostname
}

resource "cloudflare_dns_record" "site" {
  for_each = var.domains

  zone_id = var.cloudflare_zone_id
  name    = each.value.dns_name
  type    = "CNAME"
  content = cloudflare_pages_project.site.subdomain
  proxied = true
  ttl     = 1
}
