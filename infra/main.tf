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
  name         = var.domain
}

resource "cloudflare_pages_domain" "www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  name         = local.www_domain
}

# Cloudflare flattens CNAMEs at the zone apex automatically when proxied.
resource "cloudflare_dns_record" "apex" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "CNAME"
  content = cloudflare_pages_project.site.subdomain
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  content = cloudflare_pages_project.site.subdomain
  proxied = true
  ttl     = 1
}

resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = var.cloudflare_zone_id
  setting_id = "always_use_https"
  value      = "on"
}

resource "cloudflare_zone_setting" "fonts" {
  zone_id    = var.cloudflare_zone_id
  setting_id = "fonts"
  value      = "on"
}

resource "cloudflare_zone_setting" "ssl" {
  zone_id    = var.cloudflare_zone_id
  setting_id = "ssl"
  value      = "full"
}

# www is not canonical; redirect it to the apex domain while preserving the
# request path and query string.
resource "cloudflare_ruleset" "www_redirect" {
  zone_id     = var.cloudflare_zone_id
  name        = "www redirect"
  description = "Redirect www requests to the canonical apex domain"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules = [{
    ref         = "redirect_www_to_apex"
    description = "Redirect www requests to the canonical apex domain"
    expression  = "(http.host eq \"${local.www_domain}\")"
    action      = "redirect"

    action_parameters = {
      from_value = {
        status_code = 302

        target_url = {
          expression = "concat(\"https://${var.domain}\", http.request.uri.path)"
        }

        preserve_query_string = true
      }
    }
  }]
}
