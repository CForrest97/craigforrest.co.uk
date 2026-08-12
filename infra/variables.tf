variable "cloudflare_api_token" {
  description = "Cloudflare API token with Pages:Edit, DNS:Edit, Zone Settings:Edit, and Dynamic URL Redirects:Edit permissions on the target zone."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the Pages project."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for craigforrest.co.uk."
  type        = string
}

variable "domain" {
  description = "Canonical apex domain the site is served from."
  type        = string
  default     = "craigforrest.co.uk"
}

variable "pages_project_name" {
  description = "Name of the Cloudflare Pages project."
  type        = string
  default     = "craigforrest-co-uk"
}
