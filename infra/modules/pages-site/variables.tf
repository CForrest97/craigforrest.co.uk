variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the Pages project."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone in which the site DNS records are created."
  type        = string
}

variable "pages_project_name" {
  description = "Name of the Cloudflare Pages project."
  type        = string
}

variable "production_branch" {
  description = "Branch identifier Wrangler uses for production deployments to this Pages project."
  type        = string
}

variable "domains" {
  description = "Custom hostnames and their DNS record names."
  type = map(object({
    hostname = string
    dns_name = string
  }))
}
