# Quick Start Guide

## What You Have

A complete portfolio website with 3 showcase projects:

1. **Color Memory Game** - Browser game testing memory skills
2. **DevNotes** - Markdown editor with live preview
3. **WeatherNow Dashboard** - Weather app with API integration demo

## Immediate Next Steps

### 1. Test the Portfolio Locally

**Using Command Prompt (Recommended):**
```bash
cd c:\Users\18105\Desktop\Code\portfolio
npm run dev
```

Then open http://localhost:5173 in your browser.

### 2. Customize Your Information

Edit these files with your actual information:

**Personal Info:**
- [src/lib/About.svelte](src/lib/About.svelte) - Line 11: Change "Your Name"
- [src/lib/About.svelte](src/lib/About.svelte) - Lines 14-20: Update bio
- [src/lib/About.svelte](src/lib/About.svelte) - Lines 31-42: Update email and location

**Social Links:**
- [src/lib/Header.svelte](src/lib/Header.svelte) - Line 24: Your GitHub URL
- [src/lib/Header.svelte](src/lib/Header.svelte) - Line 30: Your LinkedIn URL

**GitHub Repo Links (for projects):**
- [src/lib/Projects.svelte](src/lib/Projects.svelte) - Lines 7, 15, 23: Update GitHub URLs once you push to GitHub

### 3. Add Your Resume

Replace the placeholder:
```bash
# Delete the placeholder
del static\resume.pdf

# Add your actual PDF resume to static\resume.pdf
```

### 4. Test All Projects

Each project works standalone:

1. **Color Memory Game**: Open `static/projects/color-memory-game/index.html`
2. **DevNotes**: Open `static/projects/devnotes/index.html`
3. **WeatherNow**: Open `static/projects/weather-dashboard/index.html`

## Deploying to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name it something like "portfolio"
3. Make it public
4. Don't initialize with README (you already have one)

### Step 2: Push Your Code

```bash
cd c:\Users\18105\Desktop\Code\portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **GitHub Actions**
4. Wait a few minutes for the deployment

Your site will be live at:
```
https://YOUR-USERNAME.github.io/portfolio/
```

### Step 4: Update Project GitHub Links

After pushing, update the GitHub links in `src/lib/Projects.svelte`:
```typescript
github: 'https://github.com/YOUR-USERNAME/portfolio',
```

Then rebuild and push:
```bash
npm run build
git add .
git commit -m "Update GitHub links"
git push
```

## Project Files Overview

### Portfolio Structure
```
portfolio/
├── src/                    # Source files
│   ├── lib/               # Svelte components
│   └── routes/            # Pages
├── static/                # Static assets
│   └── projects/          # Your showcase projects
├── build/                 # Built site (created by npm run build)
└── package.json          # Dependencies
```

### Individual Projects
```
projects/
├── color-memory-game/     # Memory game
│   ├── index.html
│   ├── game.js
│   ├── style.css
│   └── README.md
├── devnotes/              # Markdown editor
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── README.md
└── weather-dashboard/     # Weather app
    ├── index.html
    ├── app.js
    ├── style.css
    └── README.md
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type check
npm run check
```

## Troubleshooting

### PowerShell Script Execution Error

If you get "running scripts is disabled" error:

**Solution 1:** Use Command Prompt instead of PowerShell
- Press Win + R
- Type `cmd`
- Navigate to project: `cd c:\Users\18105\Desktop\Code\portfolio`
- Run: `npm run dev`

**Solution 2:** Fix PowerShell (requires admin)
- Open PowerShell as Administrator
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Type Y to confirm

### Port Already in Use

If port 5173 is in use:
```bash
# The dev server will automatically try the next available port
# Just use the URL it shows in the terminal
```

### Build Errors

Make sure you're in the right directory:
```bash
cd c:\Users\18105\Desktop\Code\portfolio
```

## What to Update Before Showing to Employers

✅ **Must Update:**
1. Your name in About section
2. Your bio/description
3. Your email and location
4. GitHub and LinkedIn URLs
5. Resume PDF file

⚠️ **Should Update:**
1. GitHub repository links in Projects section (after you create repos)
2. Add actual project screenshots
3. Consider adding more real projects over time

📝 **Nice to Have:**
1. Custom favicon (replace static/favicon.png)
2. Profile picture in About section
3. More detailed project descriptions
4. Additional sections (blog, testimonials, etc.)

## Next Steps

1. ✅ Test locally with `npm run dev`
2. ✅ Customize your information
3. ✅ Add your resume PDF
4. ✅ Push to GitHub
5. ✅ Enable GitHub Pages
6. ✅ Share your portfolio URL with employers!

## Resources

- [SvelteKit Docs](https://kit.svelte.dev/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Detailed technical overview
- [README.md](README.md) - Full documentation

## Questions?

If something isn't working:
1. Check that you're in the `portfolio` directory
2. Make sure you ran `npm install`
3. Try using Command Prompt instead of PowerShell
4. Check the console for error messages

Good luck with your portfolio! 🚀
