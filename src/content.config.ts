import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.array(z.string()),
    coverImage: z.string(),
    coverImageHover: z.string().optional(),
    coverAlt: z.string(),
    nextCaseSlug: z.enum(['lucida', 'vaia']),
    prototypeUrls: z.object({
      problem1: z.string().url(),
      problem2: z.string().url(),
      problem3: z.string().url(),
    }),
  }),
});

export const collections = { cases };
