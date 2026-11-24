# Hex hero artwork

Not made with image generation. Both images show the final position of a game the Hex computer played against itself on an 11 × 11 board: Red's winning chain runs between the two red edges. A script draws the scene as an SVG with a perspective projection, headless Chrome captures it, and `cwebp` resizes and encodes it. The hero image has a transparent background and sits on the hero's CSS gradient; the thumbnail is the same board in a dark scene at card resolution.

| Asset                           | Dimensions |  Bytes | Encoding                                 |
| ------------------------------- | ---------- | -----: | ---------------------------------------- |
| `src/assets/hex-arena.webp`     | 1440 × 960 | 78,336 | WebP quality 85, alpha quality 100       |
| `src/assets/hex-thumbnail.webp` | 900 × 600  | 45,298 | WebP quality 85, resized from 1200 × 800 |

Both can be replaced by generated artwork in the style of the other games without a code change, as long as the file names and dimensions stay the same.
