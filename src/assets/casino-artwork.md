# Casino game thumbnails

Created with the built-in image generation tool for the Games gallery. The images match the existing board-game thumbnails: studio product scenes, tactile materials, a clear central subject, and a 3:2 frame. They are decorative card artwork, not gameplay diagrams.

Both assets are exported at 900 × 600 pixels as WebP at quality 85. Generated PNG originals remain outside the repository.

| Game     | Asset                                |
| -------- | ------------------------------------ |
| Slots    | `src/assets/slots-thumbnail.webp`    |
| Roulette | `src/assets/roulette-thumbnail.webp` |

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

`src/assets/let-it-ride-thumbnail.svg` (900 × 600) was drawn by hand as SVG, like the Blackjack and Plinko thumbnails: a royal flush in spades fanned over the three bet spots of a Let It Ride layout (1, 2 and $), on midnight-blue felt with gold trim. The same file is the hero image of the game page. Its palette is defined in `src/pages/LetItRide/theme.ts`.
