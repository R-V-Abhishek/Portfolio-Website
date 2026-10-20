import { defineCollection, z } from "astro:content";
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
const projects = defineCollection({
  type: "content",
  schema: z.object({
    projectSlug: z.string(),
    format: z.enum(["case-study", "note"]),
    published: z.boolean().default(false),
    role: z.string(),
    status: z.string(),
    contribution: z.string(),
    limitations: z.string(),
    walkthrough: z.boolean().default(false),
  }),
});
export const collections = { blog, projects };
