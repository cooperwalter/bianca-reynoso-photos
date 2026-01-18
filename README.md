# Bianca Reynoso Photos

A photography portfolio built with Nuxt 4 and Tailwind CSS.

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
- Switch between Light & Dark mode
- Access 100,000 icons from 100+ icon sets with the `<Icon>` component
- Create **Vue components** and use them in Markdown
- Deploy on any Node or Static hosting: GH Pages, Vercel, Netlify, Heroku, etc.

## Getting Started

### Prerequisites

- Node.js 18+
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

## Project Structure

This project uses the Nuxt 4 directory structure:

```text
app/                  # Application source files
  components/         # Vue components
  composables/        # Composable functions
  layouts/            # Page layouts
  plugins/            # Nuxt plugins
  types/              # TypeScript type definitions
  app.vue             # Root component
  router.options.ts   # Router configuration
assets/               # Unprocessed assets (CSS, etc.)
content/              # Markdown content files
public/               # Static files served as-is
```
