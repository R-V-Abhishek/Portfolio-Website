import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
export default defineConfig({
  site: process.env.SITE_URL || "https://rvabhishek.dev",
  base: process.env.BASE_PATH || "/",
  output: "static",
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({ filter: (page) => !page.includes("/404") }),
  ],
});
