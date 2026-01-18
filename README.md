# Bianca Reynoso Photos

A photography portfolio built with Nuxt.js and Tailwind CSS.

## Features

- Create pages in Markdown in the `content/` directory
- Use [Tailwind CSS](https://tailwindcss.com/) for styling
- Use [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin) for typographic styling
- Pages:
  - Home/Landing page
  - List of blog/story posts
  - List of galleries
  - Masonry gallery page
  - Story/blog post page
  - Hire me page
  - More coming soon...
- Switch between Light & Dark mode 🌗
- Access 100,000 icons from 100+ icon sets with the `<Icon>` component
- Create **Vue components** and use them in Markdown
- Deploy on any Node or Static hosting: GH Pages, Vercel, Netlify, Heroku, etc.
- Live edit on [Nuxt Studio](https://nuxt.studio) (WIP)

## Getting Started

### Prerequisites

- Node.js 16+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The dev server will be available at `http://localhost:3311`.

### Other Commands

```bash
pnpm build        # Production build
pnpm generate     # Static site generation
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

## Nuxt Studio

This project uses the [Nuxt Studio](https://nuxt.studio) module for browser-based content editing.

### Local Development

Access the studio editor at `http://localhost:3311/_studio` while running the dev server.

### Production Setup

For production, Nuxt Studio requires:

1. **SSR deployment** - Use `pnpm build` (not `generate`) and deploy to a platform that supports server-side rendering (Vercel, Netlify, etc.)

2. **GitHub OAuth** (optional) - Set these environment variables for GitHub authentication:

   ```bash
   STUDIO_GITHUB_CLIENT_ID=your_client_id
   STUDIO_GITHUB_CLIENT_SECRET=your_client_secret
   ```

See the [Nuxt Studio Setup Guide](https://nuxt.studio/setup) for full documentation.
