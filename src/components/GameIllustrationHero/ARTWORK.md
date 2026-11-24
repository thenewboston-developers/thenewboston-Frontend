# Game hero artwork

These illustrations use transparent backgrounds so the complete game objects sit on a continuous CSS gradient. The square images use `object-fit: contain`; no game object is cropped to fill a panel.

Created with the built-in image generation tool. Original PNGs are preserved outside the repository; the shipped assets are 1000 × 1000 WebP images encoded at quality 88 with full-quality alpha.

| Game       | Asset                             |   Bytes |
| ---------- | --------------------------------- | ------: |
| Battleship | `src/assets/battleship-hero.webp` | 178,396 |
| Backgammon | `src/assets/backgammon-hero.webp` |  97,112 |
| Checkers   | `src/assets/checkers-hero.webp`   |  86,666 |

## Battleship prompts

```text
Use case: stylized-concept. Asset type: transparent hero artwork for a premium Battleship browser game. Create a beautiful high-end 3D product render: a complete small square naval strategy diorama seen from an elevated three-quarter perspective, an elegant dark navy beveled board holding a luminous deep blue ocean with a subtle cyan tactical grid and five distinct meticulously detailed miniature naval ships arranged with breathing room. One prominent sleek battleship in foreground and smaller carrier, cruiser, submarine and destroyer farther back. Tiny coral and ice-blue map pins sparingly mark a few cells. All ships, masts, board corners and edges FULLY VISIBLE. Square composition with the entire diorama comfortably centered, at least 12 percent completely transparent margin on every side. Refined cinematic studio lighting, brushed dark metal, realistic tiny wave detail, restrained cool cyan glow, warm coral accents; sophisticated collectible product photography, cohesive crafted scale model. Actual transparent background with alpha, no solid colored backdrop, no floor plane, no large shadows outside board; only a very soft short contact shadow. No text, no words, no logos, no numbers, no labels, no frame, no exploded perspective, no cropping. The asset will sit on a continuous dark navy-to-teal website gradient; silhouette must be clean and crisp and the whole object must remain completely in frame.
```

## Backgammon prompts

```text
Mode: built-in image_gen, transparent_background: true. No fallback CLI generation.

INITIAL GENERATION
Use case: product-mockup. Asset type: transparent hero artwork for a premium Backgammon browser game. Generate a cinematic physically realistic 3D product render of one COMPLETE open backgammon board, isolated on a genuinely transparent alpha background. Square 1024x1024 composition. The entire board and all four outer corners must be fully visible, centered with 12–15 percent empty transparent margin on ALL four edges. Camera is a three-quarter overhead diagonal perspective, showing the walnut frame thickness and the playing surface clearly. The board has richly grained dark walnut frame and central bar with understated brass hinges; deep emerald playing field; exactly twenty-four long alternating ivory and muted rust triangles, six points in each of the four quadrants, twelve at the far edge and twelve at the near edge. Polished ivory and muted coral circular checkers in a believable arrangement on several points, exactly two ivory dice with black pips resting near the center. Luxury handcrafted material quality, subtle gloss, crisp beveled details, confident soft studio lighting with warm highlights and emerald reflected accents. No crop, no closeup, no truncated corners, no extra board, no floating loose pieces beyond the board. No text, logos, labels, watermark, people, environment, horizon, tabletop, background plane, checkerboard transparency pattern, rectangular color backdrop, or colored vignette. Background must be actual alpha transparency. Only a very subtle translucent contact shadow immediately below the board, so this isolated object can sit naturally on a dark emerald CSS gradient. Refined luxury app-store art, not cartoon.

FRAMING EDIT (selected final image)
Edit this transparent Backgammon hero image only to correct framing. Preserve the entire rendered board, camera perspective, materials, emerald field, triangle layout, checkers, dice, hinges, shadows, lighting, and colors exactly. Reduce the board's size uniformly and recenter it within a square canvas so ALL four outer board corners have at least 12 percent empty transparent margin from the nearest canvas edge, with the total board width about 74 percent of canvas width. Keep all corners fully visible. Do not crop or stretch the board. Output genuine alpha transparency everywhere outside the object and its subtle contact shadow, no opaque background, no checkerboard pattern, no text. This is an isolated product render for a dark emerald CSS gradient. Square composition.

Export: 1000x1000 WebP, cwebp q88 alpha_q100. Both generated originals preserved.
```

## Checkers prompts

```text
Use case: product-mockup
Asset type: premium app-store game hero, a transparent cutout that will sit directly over a warm dark amber CSS gradient.
Primary request: create a cinematic, exceptionally polished 3D product render of a COMPLETE square Checkers board in a three-quarter diagonal perspective. The board must have exactly 8 by 8 alternating rich warm walnut and warm ivory squares, with a finely crafted walnut frame. Show several polished black and ivory round checkers in a plausible midgame, placed ONLY on dark squares, with one king represented by two stacked round checkers. These are plain low cylindrical checkers, not chess pieces.
Composition/framing: square 1024x1024 composition. Entire board, all four corners, all edges and all pieces fully visible. Center the entire object with 12–15% genuinely transparent breathing room on every edge. The complete board reads as a confident diamond-like diagonal at a flattering 3/4 overhead angle, with visible board thickness. Never crop, zoom in, or let a corner touch the image boundary.
Style/materials: high-end photoreal 3D product photography, crisp natural wood grain, warm walnut joinery, clean ivory inlay, subtly rounded polished resin checkers with controlled reflections. Beautiful silhouette and clear game readability at small app-store card sizes.
Lighting/mood: refined cinematic studio lighting with soft warm key light, subtle cool highlights, rich but readable shadow detail. Soft, limited contact shadow immediately underneath the board only.
Scene/backdrop: ACTUAL TRANSPARENT ALPHA BACKGROUND. No floor or tabletop, no background plane, no rectangular backdrop, no solid color background, no environment. Every surrounding pixel outside the object and its short soft contact shadow must be transparent, not a checkerboard transparency illustration.
Constraints: exactly 8x8 playable grid; full complete board and pieces visible; pieces only on dark squares; one stacked king; no text, logos, letters, numbers, coordinate labels, watermark, people, hands, chess pieces, crowns, extra props or floating spare checkers. No artificial outer glow, no cropped corners.

Final framing edit (built-in image_gen, transparent_background=true):
Edit only the framing of this transparent Checkers product render. Preserve the exact board, all pieces, walnut and ivory materials, lighting, perspective, and actual transparent alpha. Scale the complete board and its soft contact shadow down together, centered within a square image, until there is 13–15% clear transparent breathing room to BOTH the left and right outermost edges, and at least 13% to the top and bottom. All four corners must remain fully visible. Do not crop or change the board design. No new objects, no backdrop, no ground plane, no text, no rectangular shadow. The output must retain a genuinely transparent background and crisp premium product quality.
```
