# Angry Bou — সংসারের স্লিংশট!

[🎮 এখনই খেলুন / Play Angry Bou](https://mdmortuzahossain.github.io/angry-bou/)

## Activity edition — v5.0

The six dialogue-choice chapters are now hands-on mini-games (chapters 8–13):

- Match four invitation fragments to reveal the whole family's fair invitation. Drag pieces, or tap a piece then its numbered slot.
- Match a sari's color and border to the sample in the tailor shop.
- Put away the buzzing phone and deliver six requested objects before their deadlines.
- Move through a market grid with arrow keys or adjacent tiles, collect all four groceries, and return home within 40 seconds. Baskets block the path; timeout restarts the route.
- Move a plate to catch three falling cakes, place three candles, and pop five moving balloons.
- Rub twelve dirty patches off a dish with a pointer, then stop a moving sugar meter in the green zone twice. Dirt patches and timing controls also support keyboard activation.

The original eight arcade chapters, village characters, fair finale, fullscreen controls, sound effects and saved best score remain. Mini-game stars depend on mistakes, with retries supported.

New files: `mini-games.js` and `mini-games.css`. The old `reconcile.js` remains archived in the repository but is no longer loaded by the game.

## Village edition — v3.0

Eight story chapters, village husband and wife animations, correct-gift delivery missions, startled chickens, and a fair finale with three collectible bangles. [Full update notes](VILLAGE-UPDATE.md).

Bengali speech requires a Bengali voice available in the browser. Captions and effects work without one. Turn sound on to hear effects and available speech.

## Powers and scoring

- **মেগা অভিমান:** tap again in flight (or press Space) to burst nearby gifts and supports. Timing matters!
- **ঝড়ের বেগ:** choose the turbo shot before launching, then activate it in flight to charge through the tower.
- One special activation per shot; switching is available before launch.
- A moving golden gift gives an extra shot and 300 points when hit or caught in a blast.
- Destroy several gifts in one shot for escalating combo points, floating scores, impact effects, and live Bengali reactions.
- Earn 1–3 stars per level: finish within 2 shots for three stars, within 4 for two. Retry a level to improve.
- Wider later-level towers, a tea-holding husband, confetti, and new victory lines.

A playful Bengali browser game with original canvas artwork, fourteen chapters, drag-to-launch controls, keyboard aiming, chain reactions, interactive mini-games, sound effects and a local best score. All characters and stories are fictional.

## Play

Use the play link above, or open `index.html` in a modern browser. No install, dependencies, or build step is needed. Drag the slingshot's gift backward and release. Follow each chapter's objective: break towers, deliver the requested gift, or collect three bangles. Tap again in flight for a special power or delivery parachute. On phones, landscape orientation gives you more room to aim.

- Mouse/touch: drag and release the slingshot's gift.
- Keyboard: focus the canvas; Left/Right adjust angle, Up/Down adjust power, Space launches or activates the special in flight, R restarts the current level.
- Sound is opt-in. Best score stays in your browser when storage is available.
- Restart retries the current level. Complete all fourteen chapters to replay, or choose a chapter from the story menu. Reconciliation chapters use on-screen choice buttons rather than the slingshot. Timed listening pauses while the tab is hidden.

## GitHub Pages

The live game is published from **main**, folder **/(root)** using GitHub Pages. Future commits to that branch update the same play link after deployment. The game uses relative file paths so it also works on a fork's project Pages URL.

## Project

- `index.html` — Bengali interface.
- `style.css` — responsive layout.
- `village.js` — current physics, missions, input, speech and scoring.
- `scene.js` — animated village characters, courtyard and fair.
- `game.js` — previous v2 engine, retained but not loaded.

This is an original lightweight slingshot game inspired by the genre. No Angry Birds artwork, audio, characters, or source code is included. Future ideas: moving targets, more dialogue, additional levels, and more elaborate rigid-body physics.

