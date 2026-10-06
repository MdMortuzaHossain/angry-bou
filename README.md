# Angry Bou — সংসারের স্লিংশট!

[🎮 এখনই খেলুন / Play Angry Bou](https://mdmortuzahossain.github.io/angry-bou/)

## Reconciliation stories — v4.0

14 chapters: the eight village arcade chapters plus six new relationship stories. Choose actions to reduce the anger meter; gifts alone do not solve every problem.

- Relatives' hearsay: listen, explain the actual fair plan, then clear up the misunderstanding together.
- Jealousy: explain who the tailor is, listen, and spend time together.
- Phone: listen for eight seconds without picking it up; interruptions reset listening.
- Missing coriander: bring coriander, acknowledge the mistake, help prepare dinner. Flowers alone fail.
- Birthday: apologize, bring cake, then spend eight uninterrupted seconds together.
- Chores: scrub six times, then serve tea with exactly two spoons of sugar. Too much sugar requires making a new cup.
- More detailed characters with blinking, moving mouths and costume patterns; animated leaves, birds, ripples, water lilies, fence and alpana; wedding flowers and a tea stall; evening fair lights and a shared Ferris-wheel ride after winning.
- Fullscreen (with an expanded-layout fallback), larger touch controls, and hideable instructions.

New files: `reconcile.js` (story mechanics), `play-ui.js` (view controls), `story.css` (responsive story controls).

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

A playful Bengali browser game with original canvas artwork, fourteen chapters, drag-to-launch controls, keyboard aiming, chain reactions, dialogue choices, sound effects and a local best score. All characters and stories are fictional.

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
