# Tribes Games thumbnail

`src/assets/tribes-thumbnail.webp` is the 900 × 600 Games list artwork: a fortified timber settlement with golden banners, pine forests, and sunlit alpine mountains. The upper-left mountains and sky leave room for the existing card badge. The palette and architecture follow the Tribes hero scene and shared theme.

Created with the built-in image generation tool at 1536 × 1024, then exported with `cwebp -q 86 -m 6 -resize 900 600`. The original PNG is kept outside the repository; the previous SVG illustration is retained.

## Generation prompt

```text
Use case: stylized-concept
Asset type: premium Tribes strategy game thumbnail for the thenewboston games gallery, landscape 3:2, 1536 by 1024 pixels.
Primary request: Create an exceptionally beautiful cinematic miniature world depicting a fortified timber settlement in a lush alpine valley. Visually polished handcrafted 3D diorama with tactile wood, stone, grass and fabric, sophisticated game key art that remains readable at only 220 pixels wide.
Subject: one strong central timber great hall with steep warm cedar roofs, a stout wooden palisade and open gate, a taller wooden watchtower, simple golden ochre and muted red cloth banners. A winding ochre path leads from the foreground through the gate. A little wheat field and stacked cut logs hint at building an economy. Grouped evergreen pines frame the settlement, with layered blue-green snow-tipped mountains behind. No characters needed.
Composition/framing: slightly elevated three-quarter view of a compact coherent settlement, comfortably within the center and lower two-thirds of the frame, not an aerial map. Strong large silhouette, clear inviting gate as focal point. Broad calm misty sky and distant mountains across the upper 25 percent so an existing dark UI badge in the upper left will remain readable and not cover buildings or flags. Full-bleed scene, immersive environment, no visible base, no frame.
Lighting/mood: warm dawn sunlight from upper right, soft gold rim light across roofs and pine trees, a little valley mist, welcoming yet epic, crisp focal detail with subtle atmospheric depth.
Color palette: deep forest and pine #11302a #17443a, moss #2c6b55, leaf #4f9a6d, warm timber #8a5a34 #b27a48, parchment #efe6d2, honey gold #e6aa3c #f6c865, restrained red #d9573b, blue-green mountains. Rich luminous green world rather than gloomy darkness.
Constraints: no words, letters, game title, logos, watermarks, coins, modern objects, giant castles, fantasy creatures, people, interface elements, border or frame. Carefully composed premium miniature game photography, not flat vector art.
```

## TNB branding

`src/assets/tnb-logo.svg` recreates the existing TNB currency mark from `thenewboston-Backend/media/images/tnb-logo.png` as a scalable red tile with its white chevron and long shadow. Tribes uses it through the shared `ItemIcon` TNB entry so wallet links, inventory, marketplace, land prices, and guide graphics share the same branding.
