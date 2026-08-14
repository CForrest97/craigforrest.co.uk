variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the preview Pages project."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for craigforrest.co.uk."
  type        = string
}

variable "pages_project_name" {
  description = "Name of the preview Cloudflare Pages project."
  type        = string
  default     = "craigforrest-co-uk-preview"
}

variable "production_branch" {
  description = "Branch identifier Wrangler uses for production deployments to this Pages project."
  type        = string
  default     = "preview"
}

variable "domains" {
  description = "Preview custom hostnames and their DNS record names."
  type = map(object({
    hostname = string
    dns_name = string
  }))
  default = {
    preview = {
      hostname = "preview.craigforrest.co.uk"
      dns_name = "preview"
    }
  }
}
