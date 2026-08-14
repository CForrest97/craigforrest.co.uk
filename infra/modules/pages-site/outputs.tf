output "pages_project_name" {
  description = "Name of the provisioned Cloudflare Pages project."
  value       = cloudflare_pages_project.site.name
}

output "pages_subdomain" {
  description = "The *.pages.dev subdomain Cloudflare assigned to the project."
  value       = cloudflare_pages_project.site.subdomain
}
