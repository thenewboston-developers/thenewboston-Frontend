# Hex artwork

Created as independent illustrations with the built-in image generation tool, then optimized with `cwebp` (hero quality 90, thumbnail quality 92). These are promotional scenes, not specific recorded game positions.

| Asset                           | Dimensions | Usage                                     |
| ------------------------------- | ---------- | ----------------------------------------- |
| `src/assets/hex-arena.webp`     | 1440 × 960 | Transparent lobby hero, alpha quality 100 |
| `src/assets/hex-thumbnail.webp` | 1200 × 800 | Separate close-up arcade card             |

Hero prompt: Premium tactile 3D Hex board cutout on a truly transparent background. Entire rhombus visible with spacious transparent margins. Thick dark navy beveled base, regular ivory porcelain hexagonal cells, luminous ruby-red and cobalt-blue glass stones in a midgame arrangement. Fine metallic edge accents, warm coral rim light and cool blue key light. Opposite rails share a color: upper-left/lower-right red, upper-right/lower-left blue. No text, logos, labels, dice, hands, background panel, surface, frame, or decorative rectangle. Transparent alpha outside the object with a subtle shadow, designed to sit directly on a CSS navy gradient.

Thumbnail prompt: A premium, nearly top-down macro composition of a perfect regular honeycomb lattice of identical ivory porcelain hexagonal cells with fine navy grooves. Show only a small central area, cropped beyond the image edges, without outer rails or border corners. Exactly three ruby-red and three cobalt-blue circular glass stones, each centered inside its own cell with an ivory margin. Warm directional studio light, subtle cool reflections, elegant minimalism, sharp readable shapes at card size. No text, logos, letters, hands, dice, confetti, lens flare, UI, or watermark. Avoid warped tiles, irregular polygons, gaps, and oversized stones spanning cell grooves.

The hero's transparency is essential: keep the alpha channel when replacing or recompressing it. Its ambient light and shadow blend with the hero's CSS gradients. Do not add an opaque image background, border, or rounded image panel.
