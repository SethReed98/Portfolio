# DevNotes

Quick markdown editor I made for taking notes. Wanted something simple that works offline and doesn't need an account.

## Features

- **Split-pane editor:** Live markdown preview alongside your editor
- **Auto-save:** Notes are automatically saved to localStorage
- **Export:** Download notes as `.md` files
- **Mobile responsive:** Toggleable view for mobile devices
- **Multiple notes:** Create and manage multiple notes with a sidebar

## Supported Markdown Syntax

- Headers (h1-h6)
- **Bold** and *italic* text
- Links and images
- Bulleted and numbered lists
- Blockquotes
- Inline `code` and code blocks

Custom markdown parser implementation (no external libraries).

## Mobile quirks

Had to make the font-size 16px on inputs to prevent iOS from zooming in. That was annoying to figure out. Also added a toggle to switch between editor/preview since split view doesn't work well on phones.

## Technologies Used

- **JavaScript:** Vanilla JS, no frameworks
- **localStorage API:** Client-side note persistence
- **Blob API:** File export functionality
- **CSS Grid:** Responsive layout

## Running the Application

No build process required. Open `index.html` in any modern web browser.

## Things to maybe add later

- Syntax highlighting for code blocks would be nice
- Dark mode (already have it on the main site)
- Some keyboard shortcuts
- Maybe tags or folders if I use this enough to need organization

Honestly works fine as-is for what I needed though.
