# My Portfolio

Personal portfolio site I built to showcase my projects. Went with SvelteKit since I wanted to learn it, and it's been pretty nice to work with.

## What's in here

- Dark/light mode (saves your preference)
- Works on mobile - tested on my phone
- Three projects I'm proud of
- Pretty fast, tried to keep it simple

## Stack

Built with SvelteKit and TypeScript. CSS is mostly custom with some variables for theming. Deployed on GitHub Pages since it's free and easy.

## Running it locally

Requirements: Node.js 18 or newer

```bash
npm install
npm run dev
```

Open your browser to `http://localhost:5173`

To build for production:
```bash
npm run build
```

The production build will be output to the `build/` directory.

## Deployment

1. Push your repository to GitHub
2. In repository settings, enable GitHub Pages
3. Set the source to "GitHub Actions"
4. The deployment workflow is already configured in `.github/workflows/deploy.yml`

Your site will be available at `https://yourusername.github.io/repo-name/`

## Customization

To customize this portfolio for your own use:

- **Personal information:** Update `src/lib/About.svelte`
- **Social links:** Update `src/lib/Header.svelte`
- **Projects:** Update `src/lib/Projects.svelte`
- **Colors/theme:** Modify CSS variables in `src/app.css`
- **Resume:** Add your resume as `static/resume.pdf`

## Notes

Struggled a bit with getting the mobile touch events working right at first - turned out I needed to prevent default on touchstart. Left some notes in the game code about that.

The theme switcher was easier than I thought it would be. Just localStorage and a data attribute on the HTML element.

## TODO
- Maybe add a blog section later
- Could use some animations on scroll
- Want to add more projects as I build them
