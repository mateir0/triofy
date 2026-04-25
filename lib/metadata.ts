import type { Metadata } from "next";
import { defaultSeo } from "@/config/seo";
import { site } from "@/config/site";

export function createMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  const pageTitle = title === site.name ? title : `${title} | ${site.name}`;
  const pageDescription = description ?? defaultSeo.description;
  const pageUrl = path ? `${site.url}${path}` : site.url;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: defaultSeo.twitterCard,
      title: pageTitle,
      description: pageDescription,
      site: defaultSeo.twitterSite,
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: defaultSeo.robots,
  };
}
