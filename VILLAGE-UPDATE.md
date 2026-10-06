# Village edition — v3.0

[Play Angry Bou](https://mdmortuzahossain.github.io/angry-bou/)

Eight story chapters alternate between the wife breaking excuse towers and the husband delivering the requested gift. The finale requires collecting all three bangles before the couple walks into the fair.

- Original animated village characters: sari, bun and bangles; lungi, gamcha and moustache. Hands-on-hips, happy dance, smile and head-scratching reactions.
- Tin house, pond, banana tree, grain store, clay pots and roaming chickens. Missed shots startle the chickens.
- Coriander shopping, wedding selfies, sugary tea, flowers, jalebi, bangles and the forgotten fair outing.
- Choose the correct gift in delivery chapters. Wrong gifts consume a shot without completing the mission. Bangles versus puffed rice has its own dialogue.
- Tap or press Space a second time during flight for a blast, turbo or delivery parachute. One special per shot.
- Animated Ferris wheel, bonus balloons and a gift stall in the finale. Collect 3 bangles to open the fair entrance.
- Bengali voice uses the browser's speech synthesis with a Bengali voice when available. It does not include recorded dialogue. If no Bengali voice is installed, captions and sound effects remain available. Sound is off by default; voice has a separate toggle.
- Select any chapter from the story menu. Selecting a chapter resets the campaign score; retrying preserves earlier completed chapters' score.

Implementation: `village.js` contains the current game logic and `scene.js` draws the characters and scenery. `game.js` is the previous v2 engine, retained for reference and not loaded by the current page.

Validation: all 8 levels are solvable; complete campaign and replay tested; wrong-gift rejection, parachute single-use/reset, fair gate and walk-in, miss animations and loss/retry tested. Rendering code exercised for every chapter.
