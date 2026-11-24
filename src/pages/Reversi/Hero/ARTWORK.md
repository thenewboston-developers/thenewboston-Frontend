# Reversi artwork

Generated separately with the built-in imagegen tool using `transparent_background: false`. The hero uses a three-quarter board view; the Games list thumbnail uses a near-overhead composition for readability at small sizes. Both use classic felt green, black and ivory disks, a dark forest frame, and a restrained gold inlay to match the lobby and playable board.

| Asset                               | Dimensions |  Bytes | Encoding        |
| ----------------------------------- | ---------- | -----: | --------------- |
| `src/assets/reversi-arena.webp`     | 1440 × 960 | 85,910 | WebP quality 85 |
| `src/assets/reversi-thumbnail.webp` | 900 × 600  | 52,256 | WebP quality 85 |

The two original 1536 × 1024 PNGs are preserved outside the repository as `exec-2aba3ed5-76fd-4a51-8554-3160c61c3a13.png` and `exec-430eaec7-ca74-4732-8446-1b0ea9ebc3e6.png`. Exports use `cwebp -q 85 -resize`. Images were visually checked for the 8 × 8 grid, four central opening disks, legible piece colors, and absence of text.

## Exact hero generation prompt

```text
Use case: stylized-concept.
Asset type: premium cinematic Reversi website hero artwork, landscape 3:2, 1536 by 1024 pixels.
Create a realistic polished 3D product image of a classic Reversi board on a near-black forest-green studio surface. The board is exactly eight rows by eight columns of uniformly felt-green square cells (#278052), with fine dark forest grid lines (#12452e). It is a square board in a substantial beveled charcoal / very dark forest frame (#102b21), with a restrained thin satin-brass perimeter inlay (#f2cc79). The grid must be exactly 8 by 8, never checkered. Four low round reversible disks form the familiar opening position precisely in the center four squares: two black disks diagonally opposite and two warm ivory disks diagonally opposite. Disks have slightly rounded bevels, glossy charcoal-black tops and warm ivory #f4efe3 tops; readable silhouettes and subtle real shadows, not chess pieces.
Three-quarter elevated camera angle about 45 degrees, whole square board and all corners visible. Board centered slightly right, filling roughly 80 percent of the width and 65 percent of height. The left edge of the image fades into dark forest #071a12 negative space to blend beside website copy. Calm dramatic lighting with a broad softbox, tactile felt, controlled ivory highlights, subtle soft green background atmosphere. A premium strategy game, sophisticated and familiar, realistic PBR materials. Green remains visibly green, not blue or teal.
No text, lettering, numbers, coordinates, logos, watermark, user interface, people, extra props, checkers crowns, airborne disks, cyan, blue, purple or neon lighting. No brown wooden table. Opaque background.
```

## Exact thumbnail generation prompt

```text
Use case: stylized-concept.
Asset type: dedicated landscape 3:2 thumbnail for a Reversi game in a games list; generate 1536 by 1024 pixels.
A premium classic Reversi board photographed in realistic 3D, unmistakable and extremely readable at small size. Show exactly an eight by eight square grid of uniformly medium felt-green cells (#278052) divided by fine dark forest lines (#12452e), with a narrow beveled near-black forest frame (#102b21) and a hairline satin gold inlay (#f2cc79). Four large but correctly cell-sized low round Reversi disks occupy the central four cells in the opening position: two black diagonally opposite and two warm ivory #f4efe3 diagonally opposite. Rich glossy black, softly polished ivory, rounded disk edges and crisp subtle shadows. No other pieces.
Composition: elevated near-overhead three-quarter view with minimal perspective, board diagonally turned just slightly, full board including all corners visible and filling most of the image. Simple centered iconic composition with four opening disks visibly the focus. Tight uncluttered crop suitable for a wide games card; dark forest #071a12 studio backdrop, warm neutral softbox lighting, delicate green ambient rim light. Green felt is visibly saturated natural green, never cyan or teal. Sophisticated high-quality tactile product photography.
No writing, numbers, coordinates, logos, watermark, labels, interface, wood, extra props, players, neon, cyan, purple, checkerboard squares, crowns, chess pieces, stacked or flying disks. Opaque background.
```
