class DevNotes {
    constructor() {
        this.currentNoteId = null;
        this.notes = this.loadNotes();

        this.initElements();
        this.initEventListeners();
        this.renderNotesList();
        this.updatePreview();
        this.updateWordCount();
    }

    initElements() {
        this.editor = document.getElementById('editor');
        this.preview = document.getElementById('preview');
        this.wordCount = document.getElementById('wordCount');
        this.noteSelect = document.getElementById('noteSelect');
        this.newNoteBtn = document.getElementById('newNoteBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.deleteBtn = document.getElementById('deleteBtn');
        this.notification = document.getElementById('notification');
        this.togglePreviewBtn = document.getElementById('togglePreview');
        this.previewPanel = document.querySelector('.preview-panel');
        this.editorPanel = document.querySelector('.editor-panel');
    }

    initEventListeners() {
        this.editor.addEventListener('input', () => {
            this.updatePreview();
            this.updateWordCount();
        });

        this.noteSelect.addEventListener('change', (e) => {
            const noteId = e.target.value;
            if (noteId) {
                this.loadNote(noteId);
            }
        });

        this.newNoteBtn.addEventListener('click', () => this.createNewNote());
        this.saveBtn.addEventListener('click', () => this.saveCurrentNote());
        this.exportBtn.addEventListener('click', () => this.exportNote());
        this.deleteBtn.addEventListener('click', () => this.deleteCurrentNote());

        // mobile preview toggle
        if (this.togglePreviewBtn) {
            this.togglePreviewBtn.addEventListener('click', () => this.togglePreview());
        }
    }

    createNewNote() {
        // TODO: maybe use a modal instead of prompt? looks kinda dated
        const title = prompt('Enter note title:', 'Untitled Note');
        if (!title) return;

        const note = {
            id: Date.now().toString(), // simple but works
            title: title,
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.push(note);
        this.saveNotes();
        this.renderNotesList();
        this.loadNote(note.id);
        this.showNotification('Note created!');
    }

    loadNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (!note) return;

        this.currentNoteId = noteId;
        this.editor.value = note.content;
        this.noteSelect.value = noteId;
        this.updatePreview();
        this.updateWordCount();
    }

    saveCurrentNote() {
        if (!this.currentNoteId) {
            this.createNewNote();
            return;
        }

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        note.content = this.editor.value;
        note.updatedAt = new Date().toISOString();

        this.saveNotes();
        this.showNotification('Note saved!');
    }

    deleteCurrentNote() {
        if (!this.currentNoteId) {
            this.showNotification('No note selected!');
            return;
        }

        if (!confirm('Are you sure you want to delete this note?')) {
            return;
        }

        this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
        this.saveNotes();
        this.renderNotesList();

        this.currentNoteId = null;
        this.editor.value = '';
        this.noteSelect.value = '';
        this.updatePreview();
        this.updateWordCount();

        this.showNotification('Note deleted!');
    }

    exportNote() {
        if (!this.currentNoteId) {
            this.showNotification('No note selected!');
            return;
        }

        const note = this.notes.find(n => n.id === this.currentNoteId);
        if (!note) return;

        const blob = new Blob([note.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Note exported!');
    }

    renderNotesList() {
        this.noteSelect.innerHTML = '<option value="">Select a note...</option>';

        this.notes
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .forEach(note => {
                const option = document.createElement('option');
                option.value = note.id;
                option.textContent = note.title;
                this.noteSelect.appendChild(option);
            });
    }

    updatePreview() {
        const markdown = this.editor.value;
        this.preview.innerHTML = this.parseMarkdown(markdown);
    }

    updateWordCount() {
        const text = this.editor.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        this.wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
    }

    parseMarkdown(markdown) {
        let html = markdown;

        // Escape HTML
        html = html.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.+?)_/g, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Images
        html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

        // Blockquotes
        html = html.replace(/^&gt; (.+)/gim, '<blockquote>$1</blockquote>');

        // Horizontal rules
        html = html.replace(/^---$/gim, '<hr />');

        // Unordered lists
        html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
        html = html.replace(/^- (.+)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Ordered lists
        html = html.replace(/^\d+\. (.+)/gim, '<li>$1</li>');

        // Line breaks
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br />');

        // Wrap in paragraphs
        html = '<p>' + html + '</p>';

        // Clean up
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(<h[1-6]>)/g, '$1');
        html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>)/g, '$1');
        html = html.replace(/(<\/ul>)<\/p>/g, '$1');
        html = html.replace(/<p>(<blockquote>)/g, '$1');
        html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
        html = html.replace(/<p>(<pre>)/g, '$1');
        html = html.replace(/(<\/pre>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr \/>)<\/p>/g, '$1');

        return html;
    }

    loadNotes() {
        const saved = localStorage.getItem('devnotes');
        return saved ? JSON.parse(saved) : [];
    }

    saveNotes() {
        localStorage.setItem('devnotes', JSON.stringify(this.notes));
    }

    togglePreview() {
        // Toggle between editor and preview on mobile
        if (window.innerWidth <= 768) {
            this.editorPanel.classList.toggle('mobile-hidden');
            this.previewPanel.classList.toggle('mobile-show');
        }
    }

    showNotification(message) {
        this.notification.textContent = message;
        this.notification.classList.add('show');

        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 2000);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new DevNotes();
});
