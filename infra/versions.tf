terraform {
  required_version = ">= 1.7.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }

  # State lives in Cloudflare R2 (S3-compatible) so it survives across
  # GitHub Actions runs rather than sitting only on one machine. See
  # infra/README.md for the one-time bucket setup. Credentials come from
  # the AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env vars (an R2 API
  # token), never from a committed file.
  backend "s3" {
    key                         = "site.tfstate"
    region                      = "auto"
    use_path_style              = true
    skip_credentials_validation = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
