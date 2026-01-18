# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bianca Reynoso Photos is a photography portfolio built with Nuxt 4, using a document-driven architecture where pages are defined in Markdown files with Vue components embedded via MDC (Markdown Components) syntax.

## Commands

```bash
# Development
pnpm dev          # Start dev server (nuxi dev)
pnpm build        # Production build (nuxi build)
pnpm generate     # Static site generation (nuxi generate)
pnpm preview      # Preview production build (nuxi preview)
pnpm lint         # Run ESLint
```

## Architecture

### Document-Driven Content

The site uses `@nuxt/content` with `documentDriven: true`. Pages are Markdown files in `content/`:
- `content/1.index.md` - Home page
- `content/2.galleries.md` - Gallery listing
- `content/3.stories.md` - Blog/stories listing
- `content/4.hire-me.md` - Contact page
- `content/galleries/*.md` - Individual gallery pages
- `content/stories/*.md` - Individual blog posts

The numeric prefix (e.g., `1.`, `2.`) controls navigation order.

### MDC Component Syntax

Vue components in `app/components/content/` are used directly in Markdown:

```markdown
::ComponentName{prop="value"}
Content slot

#namedSlot
Named slot content
::
```

Props can also be defined in YAML blocks:
```markdown
::ComponentName
---
prop1: value1
prop2: value2
---
::
```

### Layouts

- `app/layouts/default.vue` - Standard pages with Container wrapper
- `app/layouts/story.vue` - Blog post layout with prose styling

Layouts are specified in frontmatter: `layout: default` or `layout: story`

### Key Modules

- **@nuxt/content** - Document-driven pages from Markdown
- **@nuxtjs/tailwindcss** - Styling with Tailwind CSS
- **@nuxt/image** - Optimized images via `<NuxtImg>`
- **@nuxtjs/color-mode** - Dark/light mode toggle (class-based)
- **@nuxt/icon** - Icon component with 100k+ icons
- **@vueuse/nuxt** - Vue composition utilities

### Image Handling

Use the `Image` type from `app/types/image.ts` for image props:
```typescript
interface Image {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}
```

Gallery images use PhotoSwipe lightbox via `app/components/PhotoSwipe.vue` wrapper.

### Custom Plugins

- `app/plugins/cls.ts` - Provides `$cls()` helper for conditional class merging
- `app/plugins/parallax/index.ts` - `v-parallax` directive using Rellax library

### Tailwind Configuration

Custom theme in `tailwind.config.cjs`:
- Fonts: `font-display` (Cormorant Garamond), `font-body` (Poppins)
- Custom color: `body-dark` (#121213)
- Custom utilities: `content-visibility`, `contain-intrinsic-size`
