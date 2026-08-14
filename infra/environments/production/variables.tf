variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the Pages project."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for craigforrest.co.uk."
  type        = string
}

variable "pages_project_name" {
  description = "Name of the Cloudflare Pages project."
  type        = string
  default     = "craigforrest-co-uk"
}

variable "production_branch" {
  description = "Branch identifier Wrangler uses for production deployments to this Pages project."
  type        = string
  default     = "main"
}

variable "domains" {
  description = "Production custom hostnames and their DNS record names."
  type = map(object({
    hostname = string
    dns_name = string
  }))
  default = {
    apex = {
      hostname = "craigforrest.co.uk"
      dns_name = "@"
    }
    www = {
      hostname = "www.craigforrest.co.uk"
      dns_name = "www"
    }
  }
}
