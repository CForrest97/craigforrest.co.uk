locals {
  www_domain = "www.${var.domain}"
}

resource "cloudflare_pages_project" "site" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = "main"
}

resource "cloudflare_pages_domain" "apex" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  domain       = var.domain
}

resource "cloudflare_pages_domain" "www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  domain       = local.www_domain
}

# Cloudflare flattens CNAMEs at the zone apex automatically when proxied.
resource "cloudflare_record" "apex" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "CNAME"
  content = cloudflare_pages_project.site.subdomain
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  content = cloudflare_pages_project.site.subdomain
  proxied = true
}

resource "cloudflare_zone_settings_override" "site" {
  zone_id = var.cloudflare_zone_id

  settings {
    always_use_https = "on"
    ssl              = "full"
  }
}

# www is not canonical; redirect it to the apex domain.
resource "cloudflare_page_rule" "www_redirect" {
  zone_id  = var.cloudflare_zone_id
  target   = "${local.www_domain}/*"
  priority = 1

  actions {
    forwarding_url {
      url         = "https://${var.domain}/$1"
      status_code = 301
    }
  }
}
