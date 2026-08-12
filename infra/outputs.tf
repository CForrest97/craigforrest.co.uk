output "pages_subdomain" {
  description = "The *.pages.dev subdomain Cloudflare assigned to the project."
  value       = cloudflare_pages_project.site.subdomain
}

output "site_url" {
  description = "Canonical public URL of the deployed site."
  value       = "https://${var.domain}"
}
