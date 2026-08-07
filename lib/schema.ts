const SITE_URL = "https://innovably.digital";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innovably",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo-dark.png`,
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+16138508278", contactType: "customer service", areaServed: "CA" },
    { "@type": "ContactPoint", telephone: "+250786653794", contactType: "customer service", areaServed: "RW" },
  ],
  sameAs: [],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Innovably",
  url: SITE_URL,
};
