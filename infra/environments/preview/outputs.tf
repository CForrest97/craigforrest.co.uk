output "pages_subdomain" {
  description = "The *.pages.dev subdomain Cloudflare assigned to the preview project."
  value       = module.site.pages_subdomain
}

output "preview_url" {
  description = "Public URL of the persistent preview environment."
  value       = "https://${var.domains["preview"].hostname}"
}
