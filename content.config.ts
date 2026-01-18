import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const pageSchema = z.object({
  layout: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.object({
    src: z.string(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
  images: z.array(z.object({
    src: z.string(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
})

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: 'en/**/*.md',
      schema: pageSchema,
    }),
    content_es: defineCollection({
      type: 'page',
      source: 'es/**/*.md',
      schema: pageSchema,
    }),
  }
})
