moved {
  from = cloudflare_pages_project.site
  to   = module.site.cloudflare_pages_project.site
}

moved {
  from = cloudflare_pages_domain.apex
  to   = module.site.cloudflare_pages_domain.site["apex"]
}

moved {
  from = cloudflare_pages_domain.www
  to   = module.site.cloudflare_pages_domain.site["www"]
}

moved {
  from = cloudflare_dns_record.apex
  to   = module.site.cloudflare_dns_record.site["apex"]
}

moved {
  from = cloudflare_dns_record.www
  to   = module.site.cloudflare_dns_record.site["www"]
}
