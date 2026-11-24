# Reversi and Mancala hero artwork

Created with the built-in image generation tool. These transparent renders sit directly on the shared hero gradient; the complete boards remain visible with `object-fit: contain` at every breakpoint. The existing cover images remain in use on the Games page.

Both assets are 1000 × 1000 WebP images encoded with `cwebp -q 88 -alpha_q 100`.

| Game    | Asset                          |  Bytes |
| ------- | ------------------------------ | -----: |
| Reversi | `src/assets/reversi-hero.webp` | 80,428 |
| Mancala | `src/assets/mancala-hero.webp` | 74,854 |

## Reversi prompts

```text
Use case: product-mockup.
Asset type: premium Reversi browser-game hero artwork, isolated transparent object to sit on a continuous emerald CSS gradient.
Primary request: Create an exceptionally polished photorealistic 3D product render of a COMPLETE elegant square Reversi board seen from an elevated three-quarter diagonal perspective. The entire playing surface is deep emerald green, with exactly eight rows and eight columns (64 square cells) separated by fine understated lighter green lines. NOT a checkerboard: every square is the same emerald material. A handsome near-black walnut frame with subtle real wood grain and neatly beveled edges surrounds it.
Subject: black and warm ivory low cylindrical disks on the cells in a believable Reversi midgame arrangement concentrated toward the center, each disk centered in its cell. About 22 disks total, two colors dispersed in orderly connected groups, not chessmen. Include one single disk elegantly caught half-turn just above the central board, showing its black face and ivory reverse, as a restrained dynamic detail.
Composition: square 1024x1024 image, whole board centered, all four outer corners and frame edges fully visible. Leave at least 12 percent genuinely transparent empty margin on each side, with no piece touching the image edges. Camera high enough that the exact 8x8 board grid reads clearly. Show the crafted thickness of the board and subtle shadows from the disks.
Lighting: refined cinematic studio product lighting, soft warm highlights on ivory disks, delicate cool green reflected light, rich readable shadows. Crisp details and controlled realistic gloss. Beautiful collectible board game quality, sophisticated and tactile, not cartoon.
Scene/backdrop: ACTUAL transparent alpha background, no floor, no tabletop, no environment, no colored vignette, no rectangular backdrop. A very soft short contact shadow immediately below the board only, otherwise transparent surrounding pixels.
Constraints: exact 8x8 all-green grid, all corners in frame, black and ivory Reversi disks only, no labels, no text, no numbers, no logos, no watermark, no extraneous objects, no checkerboard pattern in background, no cropping.

Framing edit:
Edit only the framing of this transparent Reversi product render. Preserve the entire board design, exact 8 by 8 emerald green grid, all black and ivory disks and their arrangement, one half-turn disk, walnut frame, camera angle, material textures and lighting. Scale the complete board and its shadow down uniformly and center it in the square canvas, so that the whole object's maximum horizontal extent is only 74 percent of the canvas width, leaving at least 13 percent completely transparent empty margin at both left and right edges. Also keep at least 13 percent empty transparent margin at top and bottom. All four board corners fully visible. Do not crop or stretch the board. Retain genuine alpha transparency everywhere outside the object and short soft shadow. No backdrop, no floor, no extra objects, no text. Square image.
```

## Mancala prompts

```text
Mode: built-in image_gen, transparent_background: true.

INITIAL GENERATION
Use case: product-mockup. Asset type: premium browser-game hero artwork, a transparent cutout that sits directly on a dark amber CSS gradient. Create a cinematic, exceptionally polished photorealistic 3D product render of one COMPLETE carved walnut Kalah Mancala board. Correct board structure is essential: exactly TWO parallel rows of SIX small circular bowls (twelve small bowls total), plus exactly TWO large elongated oval stores, one at each short end of the board. Arrange several beautifully polished translucent tumbled glass stones in turquoise, amber, emerald and warm ivory in each bowl, with a few captured stones in the end stores. The individual bowls must remain clearly countable, equally spaced, and separated by carved wooden ridges. Elevated three-quarter overhead view, long board angled gently from lower left toward upper right, predominantly horizontal, all fourteen hollows visible. Show exceptional natural walnut grain, smoothly rounded edges and carved hollows, subtle bevels, accurate glass refraction and restrained glints. Sophisticated warm studio lighting, softly luminous stones, richly detailed wood; high-end luxury product photography, not cartoon. Square 1024x1024 composition, entire board and every edge fully visible with at least 12 percent transparent breathing room around all extremities. Genuine transparent alpha background: no floor plane, tabletop, room, horizon, rectangular backdrop, colored vignette, fake checkerboard, or opaque background. Only a very soft short translucent contact shadow immediately under board. No cropping, no cut-off corners, no extra bowls, no third row, no loose stones outside the board. No people, hands, text, numbers, labels, logo, watermark, frame or decorative props.

FRAMING EDIT (selected final)
Edit ONLY the framing of this transparent Mancala product render. Preserve the exact complete walnut board, all fourteen hollows (two rows of six small pits plus two end stores), stones, colors, lighting, perspective, texture and silhouette. Reduce the whole existing object uniformly and center it within a square canvas, until there is 12 percent EMPTY transparent margin to BOTH its leftmost and rightmost extents, with generous transparent margin above and below. Make the board total width 76 percent of the canvas width. No cropping or stretching. Keep all edges and every stone completely visible. Preserve genuine alpha transparency outside the board and its very small soft contact shadow. Do not add any new shapes, words, floor plane, solid background or checkerboard pattern. Output square canvas.

Export: 1000x1000 WebP, cwebp q88 alpha_q100.
```
