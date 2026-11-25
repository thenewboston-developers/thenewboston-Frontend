# Roulette hero artwork

The hero shows `src/assets/roulette-thumbnail.webp`, the same walnut and brass wheel used on the Games page (900 × 600 WebP; its prompt is recorded in `src/assets/casino-artwork.md`). No new image was generated for the hero.

The image fills the right 62% of the hero and fades into the hero's emerald (`#062b1f`) through a mask, so its own green backdrop never shows an edge. Below 820px the image moves under the copy, smaller, and fades out on every side instead.

The rest of the page takes its palette from this image: emerald felt, walnut, brass and ivory. The tokens live in `src/pages/Roulette/theme.ts`.

The playable wheel on the table is not an image. It is drawn as SVG in `src/pages/Roulette/Wheel` so the rotor and the ball can be animated.
