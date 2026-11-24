# Checkers artwork

Created with the built-in image generation tool. The hero and Games thumbnail share a single composition with the same green-and-ivory board and ivory/charcoal pieces as the playable UI. The pale sage studio background blends into the lobby hero through CSS gradient masks.

| Asset                                | Dimensions |  Bytes |
| ------------------------------------ | ---------- | -----: |
| `src/assets/checkers-crown.webp`     | 1440 × 960 | 37,344 |
| `src/assets/checkers-thumbnail.webp` | 900 × 600  | 19,950 |

Both exports use WebP quality 85. The generated PNG original is preserved outside the repository. Visual inspection confirmed eight rows and eight columns, all four board corners inside the image, and all pieces placed on green squares. The stacked charcoal disks identify a king.

## Generation prompt

```text
Use case: product-mockup. Asset type: Checkers website hero and matching games-list thumbnail, landscape 3:2 canvas 1536x1024. Create a refined premium 3D studio product scene of one complete standard EIGHT BY EIGHT checkers board. Exactly eight columns and eight rows, sixty-four equal alternating squares, like a tournament board. Camera elevated three-quarter view, enough elevation to clearly count all eight rows and columns. The entire square board and all four corners visible with at least 9 percent canvas margin. Board squares are muted tournament green #769656 and warm ivory #eeeed2, with a thick dark forest green #1f382c beveled frame. Familiar low cylindrical ridged checkers disks in warm ivory #fff8e6 and deep charcoal #25332c, neatly centered ONLY on green squares. Show a believable sparse midgame position with five ivory disks and five charcoal disks, one charcoal king represented by exactly two stacked charcoal disks. No chess pieces, no sculpted crowns. The disks have tactile satin resin surfaces and rounded edges, visually distinct from squares. Board placed on a seamless very light sage studio surface #e5ecdc, subtle clean shadows, soft directional studio light, elegant contemporary product photography, calm competitive energy, crisp geometric craftsmanship. No text, logos, coordinates, numbers, watermark, hands, people, other props, floating pieces or cropped edges. Precisely regular eight-by-eight board geometry is essential.
```

## Piece-placement correction

```text
Edit this image only to correct the placement of four checkers disks. Keep the exact existing eight-by-eight board geometry, camera, entire board and frame, materials, lighting, background, colors and every other detail unchanged. All checker pieces MUST stand on GREEN squares, never ivory squares. Counting rows 1 through 8 from the far/top edge toward the viewer and columns 1 through 8 from left to right: move the charcoal disk currently on ivory row 2 column 6 one square LEFT onto GREEN row 2 column 5; move the stacked charcoal king currently on ivory row 4 column 4 one square LEFT onto GREEN row 4 column 3; move the ivory disk currently on ivory row 8 column 2 one square LEFT onto GREEN row 8 column 1; move the ivory disk currently on ivory row 8 column 8 one square LEFT onto GREEN row 8 column 7. Remove the pieces from their old squares and recreate their clean shadows only at new positions. All remaining pieces stay exactly on their existing GREEN squares. Do not recolor the squares or change the checkerboard pattern. No text, no coordinates. Exact eight rows by eight columns.
```
