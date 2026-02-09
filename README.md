# R V Abhishek - Portfolio Website

A modern, fast, and responsive portfolio website built with **Astro** - perfect for showcasing projects, skills, and experience.

## 🚀 Features

- ⚡ **Blazing Fast** - Built with Astro for optimal performance
- 🎨 **Modern Design** - Clean, professional, and attractive UI
- 🌓 **Dark/Light Mode** - Theme toggle for better user experience
- 📱 **Fully Responsive** - Works perfectly on all devices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🎯 **SEO Optimized** - Meta tags and sitemap included
- 🔧 **Easy to Customize** - Clean code structure
- ☁️ **Cloud-Ready** - Optimized for deployment on Vercel/Netlify

## 📦 Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: CSS with CSS Variables for theming
- **Integrations**: React (for interactive components), MDX, Sitemap
- **Deployment**: Vercel / Netlify

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm

### Installation

```bash
# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

## 🎨 Customization

### Update Your Information

1. **Personal Details**: Edit components in `src/components/`
   - `Hero.astro` - Name, tagline, social links
   - `About.astro` - Bio and highlights
   - `Skills.astro` - Technical skills
   - `Projects.astro` - Your projects
   - `Experience.astro` - Leadership and certifications
   - `Contact.astro` - Contact information

2. **Styling**: Modify `src/styles/global.css`
   - Change color scheme via CSS variables
   - Adjust spacing, fonts, animations

3. **Site Config**: Update `astro.config.mjs`
   - Change site URL
   - Add/remove integrations

## ☁️ Cloud Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Astro - click "Deploy"
6. Done! Your site is live 🎉

**Or use Vercel CLI:**

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

**Or use Netlify CLI:**

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Other Platforms

Astro builds to static files in the `dist/` folder. You can deploy this folder to:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📁 Project Structure

```
/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── components/      # Astro components
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Experience.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── package.json
└── tsconfig.json
```

## 🎯 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Zero JS by default**: Only hydrates interactive components
- **Optimized images**: Automatic image optimization
- **Fast page loads**: < 1s First Contentful Paint

## 🤝 Contributing

Suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 📧 Contact

**R V Abhishek**
- Email: rvabhi2504@gmail.com
- GitHub: [@R-V-Abhishek](https://github.com/R-V-Abhishek)
- LinkedIn: [r-v-abhishek](https://linkedin.com/in/r-v-abhishek)

---

Built with ❤️ using [Astro](https://astro.build)
