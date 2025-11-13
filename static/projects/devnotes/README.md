# DevNotes - Markdown Note Editor

A lightweight, browser-based markdown editor with live preview. Perfect for developers who want to take quick notes, write documentation, or draft README files.

## Features

- **Live Preview** - See your markdown rendered in real-time as you type
- **Multiple Notes** - Create and manage multiple notes
- **LocalStorage Persistence** - Your notes are saved automatically in your browser
- **Export to Markdown** - Download your notes as `.md` files
- **Word Counter** - Track your writing progress
- **Clean Interface** - Distraction-free writing environment
- **Split View** - Editor and preview side-by-side

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid
- **Vanilla JavaScript (ES6+)** - No frameworks or dependencies
- **LocalStorage API** - Client-side data persistence
- **Blob API** - File export functionality

## Supported Markdown Syntax

- Headers (`# H1`, `## H2`, `### H3`)
- **Bold** (`**text**` or `__text__`)
- *Italic* (`*text*` or `_text_`)
- `Inline code` (`` `code` ``)
- Code blocks (` ``` code ``` `)
- [Links](`[text](url)`)
- Images (`![alt](url)`)
- > Blockquotes (`> quote`)
- Lists (`-` or `*` for unordered, `1.` for ordered)
- Horizontal rules (`---`)

## How to Use

1. **Create a Note**: Click "New" and enter a title
2. **Write**: Start typing markdown in the left panel
3. **Preview**: See the rendered output in the right panel
4. **Save**: Click "Save" to persist your note (auto-saved to localStorage)
5. **Export**: Download your note as a `.md` file
6. **Switch Notes**: Use the dropdown to load different notes

## Running Locally

Simply open `index.html` in any modern web browser. No build process or dependencies required!

## Code Highlights

- Custom markdown parser implemented from scratch
- Object-oriented design with `DevNotes` class
- Real-time preview updates
- File download using Blob API
- Responsive design for mobile and desktop

## Future Enhancements

- Dark mode toggle
- Syntax highlighting for code blocks
- Cloud sync option
- Folder/tag organization
- Search functionality
- Keyboard shortcuts

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Live Demo

[Try DevNotes](#) <!-- Update with your deployed URL -->
