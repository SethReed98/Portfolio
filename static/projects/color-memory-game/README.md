# Color Memory Game

Simon Says style game. Repeat the color patterns, see how far you can get.

## How it works

Watch the colors light up in sequence, then tap them in the same order. Each round adds another color. Pretty simple concept but gets tricky fast.

Tracks your high score in localStorage so it remembers even if you close the tab.

## The mobile stuff

Got touch events working with some trial and error. Had to use `preventDefault()` to stop the click events from firing twice on mobile. Also added vibration feedback which feels pretty nice on phones.

Tested on my iPhone and a friend's Android - works on both.

## Tech

Vanilla JS, no frameworks. Used the Web Audio API for the beep sounds - each color has a different frequency. CSS Grid for the layout.

## Just open index.html

No build step, just works in the browser.

## Things I learned

- Web Audio API is weird but powerful once you figure it out
- Touch events need preventDefault or you get double-firing
- CSS Grid made the responsive part way easier than I thought
- localStorage is super handy for simple stuff like high scores

## TODO
- Maybe add difficulty levels?
- Sound on/off toggle would be nice
- Could track stats beyond just high score
