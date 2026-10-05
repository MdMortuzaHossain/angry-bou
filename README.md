# Angry Bou — সংসারের স্লিংশট!

A playful Bengali browser game with original canvas artwork, five levels, drag-to-launch controls, keyboard aiming, chain reactions, sound effects and a local best score. Fictional couple banter; gifts and everyday disagreements are the targets.

## Play

Open `index.html` in a modern browser. No install, dependencies, network, or build step is needed. Drag the character backward and release. Break every gift box before shots run out. Aim at wooden supports to trigger chain reactions.

- Mouse/touch: drag and release the character.
- Keyboard: focus the canvas; Left/Right adjust angle, Up/Down adjust power, Space launches, R restarts the current level.
- Sound is opt-in. Best score stays in your browser when storage is available.
- Restart retries the current level. Complete all five levels to replay.

## GitHub Pages

Create an `angry-bou` repository and push these files to its `main` branch. In Settings → Pages, choose **Deploy from a branch**, branch **main**, folder **/(root)**, and Save. The game uses relative file paths so it works on a project Pages URL.

## Project

- `index.html` — Bengali interface.
- `style.css` — responsive layout.
- `game.js` — physics, drawing, input, levels, sound, scoring.

This is an original lightweight slingshot game inspired by the genre. No Angry Birds artwork, audio, characters, or source code is included. Future ideas: moving targets, more dialogue, additional levels, and more elaborate rigid-body physics.
