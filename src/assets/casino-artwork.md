# Casino game thumbnails

Created with the built-in image generation tool for the Games gallery. The images match the existing board-game thumbnails: studio product scenes, tactile materials, a clear central subject, and a 3:2 frame. They are decorative card artwork, not gameplay diagrams.

All assets are exported at 900 × 600 pixels as WebP: Slots and Roulette at quality 85, Let It Ride at quality 86. Generated PNG originals remain outside the repository.

| Game        | Asset                                   |
| ----------- | --------------------------------------- |
| Slots       | `src/assets/slots-thumbnail.webp`       |
| Roulette    | `src/assets/roulette-thumbnail.webp`    |
| Let It Ride | `src/assets/let-it-ride-thumbnail.webp` |

## Slots palette

The Slots UI uses burgundy and charcoal surfaces, brass/gold trim, ivory reels, and red controls. This follows the classic fruit-machine look seen in [Play’n GO’s Fire Joker](https://www.playngo.com/games/fire-joker) and [Pragmatic Play’s Fire Strike](https://www.pragmaticplay.com/en/news/pragmatic-play-unveils-latest-hit-fire-strike/). These are visual references, not an industry-wide color-frequency survey; themed slots use many different palettes.

The existing Slots thumbnail already shares the burgundy backdrop, brass trim, ivory reels, and red sevens, so it is retained. The UI palette is defined in `src/pages/Slots/theme.ts`.

## Slots prompt

```text
Use case: product-mockup. Asset type: landscape 3:2 game-gallery thumbnail for thenewboston, matching refined photographic 3D board-game thumbnails. Create a beautiful premium miniature classic three-reel slot machine, centered and fully visible, elevated three-quarter front view. Warm cream enamel body with dark walnut side panels and restrained brushed brass edges, three ivory mechanical reels showing three red sevens on the center payline, a small brass lever with red knob on the right. No top sign. Machine sits on a seamless deep warm burgundy studio surface and background, soft dramatic overhead light with warm brass reflections, realistic subtle materials, handcrafted luxury tabletop-game aesthetic. Compact simple strong silhouette reads at small card sizes. Machine fills central 70 percent with comfortable margin, landscape 1536x1024 composition. No coins flying, no people, no hands, no busy casino floor, no words, no logos, no watermark, no text except the reel symbols.
```

## Roulette prompt

```text
Use case: product-mockup. Asset type: landscape 3:2 game-gallery thumbnail for thenewboston, matching refined photographic 3D board-game thumbnails. A complete premium European single-zero roulette wheel, centered and fully visible in elevated three-quarter view. Rich dark walnut circular bowl, polished brass spindle and elegant radial spokes, ivory ball resting on the outer track, a neat ring of alternating muted red and charcoal pockets with one emerald-green zero pocket, small restrained ivory number markings. Seamless deep emerald-green studio surface and backdrop, warm precise overhead light, beautiful tactile wood grain and subtle brass gleam. Sophisticated realistic miniature tabletop-game product photography, clean uncluttered composition, wheel fills central 80 percent with all edges comfortably visible, landscape 1536x1024. No people, no hands, no stacks of chips, no betting table, no words, no logos, no watermark, no extra wheels.
```

## Let It Ride

`src/assets/let-it-ride-thumbnail.webp` is the Games list thumbnail: a royal flush in spades and three blue-and-gold chip stacks on midnight-blue felt. It was created with the built-in image generation tool at 1536 × 1024 and exported to 900 × 600 with `cwebp -q 86 -m 6 -resize 900 600` (105,590 bytes). The palette follows `src/pages/LetItRide/theme.ts`: felt `#17377c` / `#0d2251`, brighter blue `#2250a8`, night `#081430`, gold `#e0b459` / `#f8e2a4`, and ivory `#f7f2e4`.

The existing hand-drawn `src/assets/let-it-ride-thumbnail.svg` remains the game-page hero artwork.

### Let It Ride prompt

```text
Use case: ads-marketing
Asset type: premium casino game thumbnail for the thenewboston Games list, landscape 3:2.
Primary request: Create a beautiful, polished cinematic still life for the game Let It Ride, matching its existing midnight-blue, gold and ivory playing area.
Scene: a rich midnight-blue felt casino poker table, deep navy background, subtle curved gold table markings and a dark blue padded rail near the distant edge. Five ivory playing cards form a graceful, clearly readable royal-flush fan across the middle: 10, J, Q, K, A, all spades. Each card is a coherent standard playing card with its correct rank and black spade symbol; sophisticated traditional face-card illustrations on J, Q, K, an elegant large spade on the ace. In front of the cards, exactly three short stacks of substantial blue-and-gold casino chips sit in three delicate gold circular wager outlines. Keep these three betting spots distinct and arranged in a gentle arc.
Style: high-end tactile 3D product photography, finely textured felt, crisp ivory cardstock, intricate restrained brass detailing, believable shadows, elegant and dramatic rather than flashy.
Palette: dominant felt #17377c and #0d2251, brighter blue #2250a8, deep shadows #081430, warm gold #e0b459 with #f8e2a4 highlights, ivory #f7f2e4. No green felt, purple neon or red scene lighting.
Composition: landscape 3:2, close three-quarter overhead camera; cards and chips large enough to read at a 300-pixel-wide thumbnail, all key objects comfortably inside the frame. Quiet blue negative space in the top-left corner for the site's small badge overlay. Balanced composition with cards centered and chips in the lower third. Full-bleed scene, no border.
Lighting: soft warm spotlight grazing the cards and gold chips against luminous blue felt, subtle rim lighting, rich contrast, refined depth of field while keeping all five rank corners sharp.
Constraints: no people, no hands, no dice, no roulette, no money, no game title, no slogans, no watermark. The only visible lettering should be standard card ranks. Create one final image at 1536 by 1024 pixels.
```
