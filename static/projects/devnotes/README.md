# DevNotes

Quick markdown editor I made for taking notes. Wanted something simple that works offline and doesn't need an account.

## What it does

Type markdown on the left, see the preview on the right. Your notes get saved to localStorage automatically. Can export to .md files when you need them.

On mobile it switches to a single view with a toggle button - learned that the hard way when testing on my phone.

## Markdown support

Handles the basics:
- Headers, bold, italic, code
- Links and images
- Lists (bullets and numbered)
- Blockquotes
- Code blocks

Built my own parser for this instead of using a library. Probably reinvented the wheel but it was a good learning experience.

## Mobile quirks

Had to make the font-size 16px on inputs to prevent iOS from zooming in. That was annoying to figure out. Also added a toggle to switch between editor/preview since split view doesn't work well on phones.

## Tech stuff

Vanilla JS, no frameworks. Uses:
- localStorage for saving notes
- Blob API for exporting files
- CSS Grid for layout

## Just open the file

No build process, just open index.html

## Things to maybe add later

- Syntax highlighting for code blocks would be nice
- Dark mode (already have it on the main site)
- Some keyboard shortcuts
- Maybe tags or folders if I use this enough to need organization

Honestly works fine as-is for what I needed though.
