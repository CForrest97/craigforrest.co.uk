output "pages_subdomain" {
  description = "The *.pages.dev subdomain Cloudflare assigned to the project."
  value       = module.site.pages_subdomain
}

output "site_url" {
  description = "Canonical public URL of the deployed site."
  value       = "https://${var.domains["apex"].hostname}"
}
