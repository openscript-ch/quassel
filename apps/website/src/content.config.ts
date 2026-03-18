import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

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
