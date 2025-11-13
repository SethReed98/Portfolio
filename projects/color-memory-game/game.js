class ColorMemoryGame {
    constructor() {
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.highScore = this.loadHighScore();
        this.isPlaying = false;
        this.isShowingSequence = false;

        this.initElements();
        this.initEventListeners();
        this.updateDisplay();
    }

    initElements() {
        this.colorButtons = document.querySelectorAll('.color-button');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.levelDisplay = document.getElementById('level');
        this.highScoreDisplay = document.getElementById('highScore');
        this.messageDisplay = document.getElementById('message');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());

        // Add both click and touch support for mobile
        this.colorButtons.forEach(button => {
            // Click event for desktop
            button.addEventListener('click', (e) => {
                if (this.isPlaying && !this.isShowingSequence) {
                    const color = e.target.dataset.color;
                    this.handlePlayerInput(color);
                }
            });

            // Touch events for mobile - prevent default to avoid double-firing
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (this.isPlaying && !this.isShowingSequence) {
                    const color = e.target.dataset.color;
                    // Add visual feedback
                    e.target.classList.add('touch-active');
                    // Vibrate on mobile if supported
                    this.vibrate(50);
                }
            });

            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                if (this.isPlaying && !this.isShowingSequence) {
                    const color = e.target.dataset.color;
                    e.target.classList.remove('touch-active');
                    this.handlePlayerInput(color);
                }
            });
        });
    }

    startGame() {
        this.isPlaying = true;
        this.sequence = [];
        this.level = 1;
        this.startBtn.style.display = 'none';
        this.resetBtn.style.display = 'block';
        this.showMessage('Watch carefully!', 'info');
        this.nextLevel();
    }

    resetGame() {
        this.isPlaying = false;
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.startBtn.style.display = 'block';
        this.resetBtn.style.display = 'none';
        this.updateDisplay();
        this.showMessage('');
        this.enableButtons();
    }

    nextLevel() {
        this.playerSequence = [];
        this.addToSequence();
        this.updateDisplay();
        this.showMessage(`Level ${this.level}`, 'info');

        setTimeout(() => {
            this.playSequence();
        }, 1000);
    }

    addToSequence() {
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.sequence.push(randomColor);
    }

    async playSequence() {
        this.isShowingSequence = true;
        this.disableButtons();
        this.showMessage('Watch the sequence...', 'info');

        for (let i = 0; i < this.sequence.length; i++) {
            await this.sleep(400);
            await this.lightUpButton(this.sequence[i]);
        }

        this.isShowingSequence = false;
        this.enableButtons();
        this.showMessage('Your turn!', 'info');
    }

    async lightUpButton(color) {
        const button = document.querySelector(`[data-color="${color}"]`);
        button.classList.add('active');
        this.playSound(color);

        await this.sleep(500);
        button.classList.remove('active');
    }

    handlePlayerInput(color) {
        this.playerSequence.push(color);
        this.lightUpButton(color);

        const currentIndex = this.playerSequence.length - 1;

        if (this.playerSequence[currentIndex] !== this.sequence[currentIndex]) {
            this.gameOver();
            return;
        }

        if (this.playerSequence.length === this.sequence.length) {
            this.levelComplete();
        }
    }

    levelComplete() {
        this.level++;
        this.updateHighScore();
        this.disableButtons();
        this.showMessage('Great! Next level coming...', 'success');

        setTimeout(() => {
            this.nextLevel();
        }, 1500);
    }

    gameOver() {
        this.isPlaying = false;
        this.disableButtons();
        this.showMessage(`Game Over! Final Level: ${this.level}`, 'error');

        setTimeout(() => {
            this.startBtn.style.display = 'block';
            this.resetBtn.style.display = 'none';
            this.startBtn.textContent = 'Play Again';
            this.showMessage('');
        }, 2000);
    }

    updateHighScore() {
        if (this.level > this.highScore) {
            this.highScore = this.level;
            this.saveHighScore();
            this.updateDisplay();
        }
    }

    saveHighScore() {
        localStorage.setItem('colorMemoryHighScore', this.highScore.toString());
    }

    loadHighScore() {
        const saved = localStorage.getItem('colorMemoryHighScore');
        return saved ? parseInt(saved) : 0;
    }

    updateDisplay() {
        this.levelDisplay.textContent = this.level;
        this.highScoreDisplay.textContent = this.highScore;
    }

    showMessage(text, type = '') {
        this.messageDisplay.textContent = text;
        this.messageDisplay.className = 'message';
        if (type) {
            this.messageDisplay.classList.add(type);
        }
    }

    disableButtons() {
        this.colorButtons.forEach(btn => btn.classList.add('disabled'));
    }

    enableButtons() {
        this.colorButtons.forEach(btn => btn.classList.remove('disabled'));
    }

    playSound(color) {
        // Create a simple beep using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Different frequencies for different colors
        const frequencies = {
            red: 261.63,    // C4
            blue: 329.63,   // E4
            green: 392.00,  // G4
            yellow: 523.25  // C5
        };

        oscillator.frequency.value = frequencies[color];
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }

    vibrate(duration) {
        // Haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColorMemoryGame();
});
