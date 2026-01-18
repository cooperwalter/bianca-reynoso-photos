import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
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
    })
  }
})
