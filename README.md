# R V Abhishek - Portfolio Website

A modern, high-performance, and responsive portfolio website built with **Astro 5**. Designed with a "terminal-sleek" aesthetic, focusing on speed, accessibility, and clean data-driven architecture.

## 🚀 Key Features

- ⚡ **Astro 5 + React**: Hybrid performance with partial hydration.
- 🎨 **Terminal Aesthetics**: Dark-mode first design with vibrant accent gradients and glassmorphism.
- 📦 **Data-Driven Architecture**: Easily update content by editing TypeScript data files instead of tracing HTML.
- 📱 **Adaptive UI**: Optimized for every screen size from mobile to ultra-wide displays.
- ♿ **Inclusive Design**: ARIA labels, semantic landmarks, and skip-to-content links.
- 🔍 **SEO & RSS**: Automatic sitemap generation, MDX blogging, and RSS feed support.
- 🖼️ **Image Optimization**: Powered by Astro's built-in `sharp` integration for lightning-fast loads.

## 📦 Tech Stack

- **Framework**: [Astro 5](https://astro.build) (Static SSG)
- **UI Logic**: [React 19](https://react.dev) (for interactive components)
- **Content**: [MDX](https://mdxjs.com) (for blog posts and structured content)
- **Styling**: Vanilla CSS with a centralized CSS Variable design system.
- **Analysis**: Sitemap and RSS integrations.

## 📁 Project Structure

```text
/
├── public/              # Static assets (fonts, icons, favicon)
├── src/
│   ├── components/      # UI components (Hero, Section headers, Layout pieces)
│   │   └── previews/    # Component previews for the landing page
│   ├── content/         # MDX collections (Blog posts)
│   ├── data/            # 💡 THE BRAIN: Content definitions (Project, Skills, Exp)
│   ├── layouts/         # Base HTML wrappers
│   ├── pages/           # File-based routing (Index, Projects, Blog, etc.)
│   ├── styles/          # Global styles & CSS variable tokens
│   └── utils/           # Helper functions for data processing
├── astro.config.mjs     # Framework & tool configuration
├── package.json         # Dependencies and build scripts
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Local Development

### Prerequisites
- **Node.js**: v18.17.1 or higher
- **Package Manager**: npm (default)

### Setup
```bash
# Clone the repository
git clone https://github.com/R-V-Abhishek/portfolio.git

# Enter the directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```
Visit `http://localhost:4321` to see your changes in real-time.

## 🔧 Customization Guide

This website uses a **Data-First** approach. Most updates don't require editing Astro files.

### 1. Update Personal Info
Edit `src/data/config.ts`:
- Change your name, email, GitHub/LinkedIn URLs.
- Update `availabilityLabel` for your current status.

### 2. Update Professional Data
Modify the following TypeScript files to inject your own content:
- `src/data/projects.ts`: Add/remove projects with descriptions, tags, and links.
- `src/data/skills.ts`: Update technical competencies and categories.
- `src/data/experience.ts`: Add professional roles, certifications, and leadership.

### 3. Writing Blog Posts
Add `.mdx` files to `src/content/blog/`. The site automatically picks up new posts and updates the RSS feed.

### 4. Visual Theming
Edit `src/styles/global.css`:
- Tweak `--accent-gradient` for a new color scheme.
- Adjust `--bg-primary` and `--text-base` for custom colors.

## 🚀 Deployment

### Recommended: Vercel
1. Connect your GitHub repository to Vercel.
2. The `astro-build` command and `dist` output folder are auto-detected.
3. Click **Deploy**.

### Alternative: Static Hosting
Run `npm run build`. The resulting `dist/` directory can be hosted on GitHub Pages, Netlify, or any static server.

## 📝 Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local dev server with HMR |
| `npm run build` | Bundles the site for production |
| `npm run preview` | Previews the production build locally |
| `npm run astro` | Access the Astro CLI |

## 🤝 Contact & Support

Maintainer: **R V Abhishek**
- Email: [rvabhi2504@gmail.com](mailto:rvabhi2504@gmail.com)
- Portfolio: [rvabhishek.dev](https://rvabhishek.dev)

---
Licensed under MIT. Built with ❤️ and [Astro](https://astro.build).
