import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://encryptedlist.xyz",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: "https://encryptedlist.xyz/submit",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8
    }
  ];
}
