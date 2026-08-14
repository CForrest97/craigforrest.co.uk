locals {
  apex_domain = var.domains["apex"].hostname
  www_domain  = var.domains["www"].hostname
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
          expression = "concat(\"https://${local.apex_domain}\", http.request.uri.path)"
        }

        preserve_query_string = true
      }
    }
  }]
}
