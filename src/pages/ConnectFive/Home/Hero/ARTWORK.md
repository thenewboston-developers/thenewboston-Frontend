# Connect Five cosmos artwork

Created using the built-in imagegen tool with `transparent_background: false`. The expansive scene blends into the page hero using CSS gradients; a smaller export provides the matching Games thumbnail.

| Asset                                    | Dimensions |   Bytes | Encoding        |
| ---------------------------------------- | ---------- | ------: | --------------- |
| `src/assets/connect-five-cosmos.webp`    | 1440 × 960 | 126,666 | WebP quality 85 |
| `src/assets/connect-five-thumbnail.webp` | 900 × 600  |  67,458 | WebP quality 85 |

Selected source: `exec-3dae991d-17ea-410f-987a-2e2bb810e8de.png` (1536 × 1024), preserved outside the repository. Both exports use `cwebp -q 85 -resize`; no compositing or painted changes were made outside imagegen.

## Exact prompts

```text
Use case: stylized-concept / premium game key art.
Asset type: landscape 3:2 cinematic hero artwork and game thumbnail for a Connect Five browser game. Generate 1536x1024.
Primary scene: an extraordinary modern cosmic strategy arena. One substantial square board of polished deep violet black glass, with a perfectly regular fine square grid (roughly 15 lines in each direction) made of luminous subtle lavender lines. Camera elevated at a readable three-quarter perspective. Whole main board visible, prominently fills about 80 percent image width. This is a grid-intersection stone placement game, not chess or Reversi.
Game pieces: polished black and ivory smooth low rounded stones seated at grid intersections in a believable midgame. The hero feature is ONE unmistakable straight diagonal winning row of EXACTLY FIVE luminous warm ivory-gold stones, equally spaced at FIVE CONSECUTIVE GRID INTERSECTIONS. Count carefully: one, two, three, four, five. Only these five stones have warm golden light and they are connected by a fine glowing gold line traveling straight through their centers. The glowing line stops at the center of the first and fifth stone. No sixth glowing stone. Place a few ordinary black and plain ivory stones elsewhere, none extending the winning row. Keep that five-stone row open and clearly readable.
Setting: elevated midnight-violet arena amidst a subtle cosmic atmosphere, restrained violet nebula haze, deep indigo infinity, delicate sparse stars. A few elegant thin orbital light arcs curve in the distance behind the board, never obscure the five winning stones. Reflections of lavender and gold on the polished board edge and glass surface. No planets, no spaceships, no giant glowing sphere. Scene is tactile premium 3D game product art, not a flat illustration.
Composition: landscape 1536x1024, subject centered slightly right, a dark purple quiet region along the left edge suitable for CSS blending behind website copy. Board occupies scene boldly without large empty margins. All key game pieces and full winning line visible. Dynamic yet polished, mesmerizing and sophisticated.
Lighting: gorgeous cinematic violet and ultraviolet rim light, radiant warm gold around the five-stone winning row, clean white highlights, luxurious depth and dark contrast. Image edges naturally blend toward dark midnight purple #100b26. No wooden board.
Constraints: EXACTLY FIVE golden connected stones in one straight diagonal row on consecutive intersections; many other board intersections remain empty. No writing, letters, numbers, logos, captions, UI, watermark, extra boards, hands, cartoon styling or checkerboard squares.

Precise-object edit to enforce exactly five winning stones:
Make exactly ONE precise correction to this Connect Five key art. The diagonal winning line currently contains SIX golden stones. REMOVE the LOWEST LEFTMOST golden stone, located near x=700,y=590 in this 1536x1024 image, along with its gold glow/reflection and the gold line segment connecting it to the next stone. Restore the underlying purple board and regular lavender grid at that removed stone's position. Keep the OTHER FIVE golden stones in their exact positions, connected by the remaining straight gold line that now begins at the stone near x=782,y=536 and ends near x=1089,y=343. Final winning row MUST have exactly FIVE gold stones: 1 at 782,536; 2 at 863,484; 3 at 940,435; 4 at 1013,386; 5 at 1089,343. Preserve all other black/ivory stones, whole board, cosmic setting, lighting, frame, perspective, colors and composition exactly. Do not add any stones. No lettering.
```
