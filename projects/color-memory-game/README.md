# Color Memory Game

Simon Says style game. Repeat the color patterns, see how far you can get.

## How to Play

1. Click "Start Game" to begin
2. Watch as the colored buttons light up in sequence
3. Repeat the sequence by clicking the buttons in the same order
4. Each round adds one more button to the sequence
5. Game ends when you make a mistake

Your high score is saved in localStorage and persists between sessions.

## The mobile stuff

Got touch events working with some trial and error. Had to use `preventDefault()` to stop the click events from firing twice on mobile. Also added vibration feedback which feels pretty nice on phones.

Tested on my iPhone and a friend's Android - works on both.

## Technologies Used

- **JavaScript:** Vanilla JS, no frameworks required
- **Web Audio API:** Generates unique tones for each color button
- **CSS Grid:** Responsive layout system
- **localStorage API:** Persistent high score storage

## Running the Game

No build process required. Simply open `index.html` in any modern web browser.

## Things I learned

- Web Audio API is weird but powerful once you figure it out
- Touch events need preventDefault or you get double-firing
- CSS Grid made the responsive part way easier than I thought
- localStorage is super handy for simple stuff like high scores

## TODO
- Maybe add difficulty levels?
- Sound on/off toggle would be nice
- Could track stats beyond just high score
