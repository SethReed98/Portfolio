# Portfolio Website

A modern, responsive portfolio website built with SvelteKit and TypeScript.

## Features

- 🎨 Dark/Light mode toggle with localStorage persistence
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🎯 SEO optimized
- 🚀 Static site generation for GitHub Pages

## Tech Stack

- **Framework**: SvelteKit 2.0
- **Language**: TypeScript
- **Styling**: CSS with CSS Variables
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site.

### Building for Production

```bash
npm run build
```

The static files will be generated in the `build` directory.

## Deploying to GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```
3. Create `.github/workflows/deploy.yml` with the GitHub Actions workflow (included in this project)
4. Go to your repository Settings > Pages
5. Set Source to "GitHub Actions"
6. Your site will be deployed to `https://yourusername.github.io/your-repo/`

### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `build` directory to GitHub Pages using `gh-pages`:
   ```bash
   npm install -g gh-pages
   gh-pages -d build
   ```

## Customization

### Update Personal Information

Edit the following files to customize with your information:

- `src/lib/About.svelte` - Update your name, description, and contact info
- `src/lib/Header.svelte` - Update GitHub and LinkedIn URLs
- `src/lib/Projects.svelte` - Add your projects
- `src/lib/Footer.svelte` - Update footer text

### Add Projects

Edit `src/lib/Projects.svelte` and update the `projects` array:

```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    tags: ['React', 'TypeScript'],
    github: 'https://github.com/yourusername/project',
    demo: 'https://your-demo.com', // Optional
    isPlaceholder: false
  }
];
```

### Add Resume

Place your resume PDF in the `static` directory as `resume.pdf`.

### Color Theme

Customize colors in `src/app.css` by editing the CSS custom properties in `:root` and `[data-theme='dark']`.

## Project Structure

```
portfolio/
├── src/
│   ├── lib/              # Reusable components
│   │   ├── Header.svelte
│   │   ├── About.svelte
│   │   ├── Skills.svelte
│   │   ├── Projects.svelte
│   │   └── Footer.svelte
│   ├── routes/           # Pages
│   │   ├── +layout.svelte
│   │   ├── +layout.ts
│   │   └── +page.svelte
│   ├── app.css           # Global styles
│   └── app.html          # HTML template
├── static/               # Static assets
│   └── .nojekyll         # GitHub Pages config
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## License

MIT
