# Connect Five classic artwork

Generated using the built-in imagegen tool with an opaque background. The hero and Games thumbnail use the same honey wood, charcoal, ivory, and walnut palette as the UI. The hero leaves dark space for the HTML headline; the thumbnail uses a closer overhead view.

| Asset                                            | Dimensions |  Bytes | Encoding        |
| ------------------------------------------------ | ---------- | -----: | --------------- |
| `src/assets/connect-five-classic-hero.webp`      | 1440 × 960 | 82,734 | WebP quality 85 |
| `src/assets/connect-five-classic-thumbnail.webp` | 900 × 600  | 55,098 | WebP quality 85 |

Exports use `cwebp -q 85 -resize`; no compositing or painted changes were made outside imagegen.

## Exact prompts

```json
{
  "tool": "built-in imagegen",
  "transparent_background": false,
  "hero": "Use case: product-mockup.\nAsset type: 3:2 landscape premium hero artwork for a Connect Five (Gomoku) online game.\nCreate a quiet, beautifully crafted honey-wood 15-by-15 line Gomoku board on a dark walnut tabletop. Precisely regular fine dark brown grid; each stone sits centered at a grid intersection, not in a square. Smooth charcoal-black and warm ivory low-domed stones in a believable sparse midgame. One short straight line of five black stones is the focal detail; several ivory stones nearby. The board itself is honey wood #d8b47a with grid #755231 and walnut rim #8a6038; stones #20201e and #fff8e7.\nComposition: wide landscape 1536x1024. Board centered in the right-hand two thirds of the frame, comfortably visible, viewed from an elevated three-quarter angle, enough depth to show its crafted edge. The left third is a quiet dark walnut background #211a16 with usable negative space for real website headline overlay. Generous breathing space, crisp board and stones, subdued wood grain so the game remains easy to read. Soft warm amber #edc58b studio light, gentle natural shadows, restrained premium editorial product photography / physically realistic 3D.\nConstraints: Only the board and seated stones; no text, lettering, numbers, logos, watermarks, graphic overlays, glowing lines, neon, purple, cosmic scenery, particles, floating stones, chess squares, people, hands, bowls or clutter. Stones remain black and ivory; no gold-colored stones.",
  "thumbnail": "Use case: product-mockup. Make a premium Connect Five / Gomoku game thumbnail, landscape 3:2 at 1536x1024. A clean overhead / nearly straight-down photograph of ONE honey-wood board (#d8b47a), fine regular dark brown grid (#755231), crafted walnut rim and dark walnut tabletop (#211a16). Board fills the frame, with subtle tactile wood grain, a restrained warm light and soft natural shadows.\n\nThe board has exactly FIFTEEN horizontal and FIFTEEN vertical thin grid lines. Horizontal grid lines stay horizontal in the image. One precise horizontal row of EXACTLY FIVE charcoal-black stones (#20201e), on five neighboring grid intersections, close to center of image. Count exactly 1, 2, 3, 4, 5; all on the SAME HORIZONTAL GRID LINE. Four ivory stones (#fff8e7) on separate nearby grid intersections, two above the row and two below. No additional black stones. Each stone's center rests at an intersection, as in Gomoku or Go. Stones are glossy low-domed circular disks. Subject readable, quiet, well-balanced, sophisticated product photography.\n\nNo text, numbers, letters, logos, neon, purple, cosmic effects, colored pieces, glow, floating stones, hands, bowls, props, checkerboard squares. Accurate geometry: five black stones evenly spaced, along one existing straight horizontal grid line, not placed arbitrarily."
}
```
