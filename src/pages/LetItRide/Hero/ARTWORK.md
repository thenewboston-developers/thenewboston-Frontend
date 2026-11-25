# Let It Ride hero artwork

The hero shows `src/assets/let-it-ride-thumbnail.svg` (900 × 600): a royal flush in spades fanned over the three bet spots of a Let It Ride table, marked 1, 2 and $ as on a casino layout. It was drawn as SVG by hand; no image was generated for this hero. The Games page uses a separate generated WebP thumbnail, documented in `src/assets/casino-artwork.md`.

The image fills the right 62% of the hero and fades into the hero's midnight blue (`#0a1a40`) through a mask, so its own backdrop never shows an edge. Below 820px the image moves under the copy, smaller, and fades out on every side instead.

The rest of the page takes its palette from this image: blue felt, gold and ivory. The tokens live in `src/pages/LetItRide/theme.ts`.

The cards on the playable table are not images. They are HTML drawn in `src/pages/LetItRide/Card`, so they can turn over.
