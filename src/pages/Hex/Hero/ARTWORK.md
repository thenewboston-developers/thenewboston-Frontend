# Hex artwork

Created as two independent illustrations with the built-in image generation tool, then optimized to WebP quality 90 with `cwebp`. These are promotional scenes, not specific recorded game positions.

| Asset                           | Dimensions | Usage                                     |
| ------------------------------- | ---------- | ----------------------------------------- |
| `src/assets/hex-arena.webp`     | 1440 × 960 | Transparent lobby hero, alpha quality 100 |
| `src/assets/hex-thumbnail.webp` | 1200 × 800 | Separate close-up arcade card             |

Hero prompt: Premium tactile 3D Hex board cutout on a truly transparent background. Entire rhombus visible with spacious transparent margins. Thick dark navy beveled base, regular ivory porcelain hexagonal cells, luminous ruby-red and cobalt-blue glass stones in a midgame arrangement. Fine metallic edge accents, warm coral rim light and cool blue key light. Opposite rails share a color: upper-left/lower-right red, upper-right/lower-left blue. No text, logos, labels, dice, hands, background panel, surface, frame, or decorative rectangle. Transparent alpha outside the object with a subtle shadow, designed to sit directly on a CSS navy gradient.

Thumbnail prompt: A distinct cinematic close three-quarter view across a porcelain Hex board with ruby and cobalt glass stones, deep navy base and fine brass trim. A tighter, lower camera angle with tactile foreground stones, readable honeycomb geometry, warm coral light from the left, electric blue rim light from the right, and a midnight cobalt studio atmosphere. Opposite rails share the correct colors. Rich contrast and clear silhouettes at small card sizes; no text, logos, labels, dice, people, or hands.

The hero's transparency is essential: keep the alpha channel when replacing or recompressing it. Its ambient light and shadow blend with the hero's CSS gradients. Do not add an opaque image background, border, or rounded image panel.
