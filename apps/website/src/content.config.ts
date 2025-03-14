import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const features = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./content/features" }),
  schema: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
      screenshot: z.string(),
    })
  ),
});

export const collections = { features };
