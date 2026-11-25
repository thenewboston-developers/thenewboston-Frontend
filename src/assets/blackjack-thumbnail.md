# Blackjack Games thumbnail

`src/assets/blackjack-thumbnail.webp` is the 900 × 600 Games list artwork: an ace of spades and king of hearts on emerald felt, with green-and-gold chips and a walnut and leather rail. The 3:2 composition leaves space for the existing upper-left badge.

Created with the built-in image generation tool at 1536 × 1024, then exported with `cwebp -q 86 -m 6 -resize 900 600`. The palette follows `src/pages/Blackjack/theme.ts`: felt `#0c6a45` / `#18905f` / `#07442e`, gold `#e4bf62` / `#f9e5a6`, ivory `#fdfcf7`, walnut `#3b2517`, ink `#15171c`, and heart red `#d0202f`.

The original generated PNG is kept outside the repository. The existing `blackjack-thumbnail.svg` is retained as the original artwork.

## Generation prompt

```text
Use case: product-mockup
Asset type: premium Blackjack game thumbnail for the thenewboston Games gallery, landscape 3:2, 1536 by 1024 pixels.
Primary request: Create an exceptionally beautiful cinematic casino tabletop still life matching a classic emerald-green, walnut, gold and ivory Blackjack playing area.
Scene/backdrop: rich emerald-green felt with fine tactile weave; a subtle curved dark walnut and padded dark-green leather rail in the far background, a delicate restrained gold arc printed on the felt. Elegant private games club atmosphere.
Subject: exactly TWO ivory playing cards forming a natural Blackjack hand, an ACE OF SPADES and a KING OF HEARTS, gracefully overlapping at a small fan angle. Both rank/suit corners must be clear and correct. Large elegant black spade on the ace; coherent traditional red, black and gold mirrored king illustration on the king. Two small stacks of substantial emerald-green casino chips with ivory edge inserts and subtle brass-gold detailing beside the cards, plus one loose matching chip in front.
Composition/framing: close elevated three-quarter overhead view. Cards are the unmistakable central focal point, large enough to read at 300-pixel-wide card size. All card corners comfortably inside the canvas, no cropped cards. Quiet green negative space in the upper-left for an existing small UI badge. Chips support the composition in the lower-right without covering either rank corner. Full-bleed landscape scene with gentle depth, no frame.
Color palette: dominant felt #0c6a45, brighter felt #18905f, deep felt #07442e and #04281b; warm gold #e4bf62 and #f9e5a6; ivory cardstock #fdfcf7; walnut #3b2517; black ink #15171c, crisp heart red #d0202f. Green should remain rich and luminous, not teal or blue.
Style/medium: polished high-end photorealistic 3D product photography, exquisite tactile cardstock, fine felt and realistic chip materials, refined shadows and warm soft studio spotlight. Restrained, premium, believable.
Constraints: no people, no hands, no floating objects, no dice, no roulette, no banknotes, no game title, no slogans, no logos, no watermarks. The only lettering is standard playing card ranks A and K. Do not add any other cards.
```

## Composition refinement

The final image was edited with the built-in image tool after checking the gallery at its smallest desktop card width. This keeps the existing badge clear of both card ranks.

```text
Use case: precise-object-edit.
Edit target: the provided Blackjack thumbnail.
Change ONLY the composition spacing: pull the camera back a little and move the complete two-card and chip arrangement into the lower two-thirds of the image. The top 32 percent of the 1536x1024 canvas must be quiet uninterrupted green felt with the subtle walnut/leather rail restricted to the extreme upper edge. Both top card rank corners A and K must sit BELOW y=360 pixels, so a website badge across the upper-left will not cover them. All cards and chips must remain fully inside the canvas with comfortable bottom and side margins. Cards should still be prominent, large and clear in the lower two-thirds.
Preserve precisely the luxurious emerald-green felt, warm gold and walnut palette, realistic tactile photography, the ace of spades and king of hearts artwork, exactly two cards, two green-and-gold chip stacks and one loose chip, soft warm lighting. Do not add any objects, words, title, badge or logos. Landscape 3:2, 1536x1024.
```
