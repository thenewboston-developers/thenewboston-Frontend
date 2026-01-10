import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter21: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 21: Pots, Display, and Presentation</S.Title>

        <ImagePlaceholder>
          Illustration: formal bonsai display arrangement showing tree in carefully selected pot on appropriate stand,
          with accent plant and scroll creating complete composition, demonstrating how all elements work together
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            A bonsai is not complete until it is properly presented. The pot frames the tree. The stand elevates it.
            Accent elements add context. Display transforms a well-grown tree into a complete artistic statement. This
            final layer of attention separates casual hobbyists from serious practitioners.
          </S.Paragraph>
          <S.Paragraph>
            Presentation choices communicate. A rugged unglazed pot on a rough wooden stand tells one story; a refined
            glazed pot on a polished display table tells another. Every element should reinforce the tree's character
            and the story you want to tell.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Pot selection</S.Bold>: color, texture, shape, and proportion choices that complement trees
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Front selection and viewing angles</S.Bold>: finding and presenting the tree's best face
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Display basics</S.Bold>: stands, accent plants, scrolls, and composition
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Show preparation</S.Bold>: grooming, timing, and presentation for exhibition
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Pot Selection: The Foundation of Presentation</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: variety of bonsai pot shapes and styles—oval, rectangular, round, hexagonal, drum, cascade
            pots, crescent moon, showing different lip styles, foot styles, and proportions
          </ImagePlaceholder>
          <S.Paragraph>
            The pot is more than a container—it is the frame that presents the tree. A well-chosen pot disappears,
            allowing the tree to command attention. A poorly chosen pot competes with or diminishes the tree. Pot
            selection is one of the most important aesthetic decisions you will make.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Proportion guidelines</S.SubSectionTitle>
            <S.Paragraph>
              Traditional guidelines provide starting points for pot size relative to tree dimensions:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Length</S.Bold>: approximately two-thirds of tree height for most styles; wider for spreading
                trees, narrower for tall slender ones
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Depth</S.Bold>: roughly equal to trunk diameter at soil line; deeper for cascade, shallower for
                literati
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Width</S.Bold>: sufficient to contain the root mass with room for some growth
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These are guidelines, not rules. The pot should feel right for the specific tree—sometimes that means
              departing from standard ratios. Trust your eye, but know the conventions you are departing from.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: pot proportion relationships—showing how pot length relates to tree height, pot depth to trunk
              diameter, and how different tree styles modify these relationships
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Shape selection</S.SubSectionTitle>
            <S.Paragraph>Pot shape affects visual character significantly:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Rectangular</S.Bold>: formal, structured, masculine energy; suits conifers and powerful
                deciduous trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Oval</S.Bold>: softer than rectangular, still formal; versatile for many species and styles
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Round</S.Bold>: feminine, flowing energy; suits literati, cascade, and delicate flowering trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Square/hexagonal</S.Bold>: geometric precision; often used for cascade and semi-cascade
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Irregular/natural</S.Bold>: hand-formed or deliberately asymmetric; suits wild, collected
                material
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Matching tree character</S.Bold>: powerful, masculine trees with angular trunks suit angular pots.
              Graceful, flowing trees with gentle curves suit softer shapes. The pot should echo, not contradict, the
              tree's energy.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Lip and foot details</S.SubSectionTitle>
            <S.Paragraph>Small details affect overall impression:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Lip style</S.Bold>: rolled, flat, or flared lips change visual weight; heavier lips for
                substantial trees, delicate lips for refined ones
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Feet</S.Bold>: cloud feet, simple bars, or integrated bases affect formality; taller feet
                elevate the composition, lower feet ground it
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Corners</S.Bold>: sharp corners feel formal; rounded corners soften rectangular shapes
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Color and Texture</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: pot color and texture examples—showing unglazed in various clay colors, glazed in blue, green,
            cream, and earth tones, with different surface textures from smooth to heavily textured
          </ImagePlaceholder>
          <S.Paragraph>
            Pot color and surface finish create immediate visual impact. These choices set tone before the viewer even
            focuses on the tree.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Glazed versus unglazed</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Unglazed pots</S.Bold>: traditional for conifers and powerful deciduous trees. The matte, earthy
              surface suggests age and naturalness. Colors range from gray to brown to red depending on clay and firing.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Glazed pots</S.Bold>: traditional for flowering and fruiting trees, refined deciduous species, and
              smaller trees. Glazes add color and visual interest but must not compete with the tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>The general principle</S.Bold>: conifers and rugged trees in unglazed pots; flowering, fruiting,
              and delicate deciduous trees in glazed pots. But principles have exceptions—follow what serves the
              specific tree.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Color selection</S.SubSectionTitle>
            <S.Paragraph>Pot color should complement, not match or clash with, foliage and bark:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Earth tones</S.Bold>: brown, tan, rust—safe choices that complement most trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Blues and blue-greens</S.Bold>: complement green foliage through contrast; traditional for
                flowering trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cream and off-white</S.Bold>: elegant, formal; suit refined trees but show dirt easily
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Green glazes</S.Bold>: can work but risk competing with foliage; use carefully
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Red and warm tones</S.Bold>: complement autumn color but may clash with summer foliage
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Pick up accent colors</S.Bold>: a pot color that echoes bark color, autumn foliage, or flower
              color creates subtle harmony. A blue-glazed pot for a tree with autumn blue berries; a rust pot echoing
              peeling bark.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison illustration: same tree in different pot colors—showing how color choice affects overall
              impression, which combinations harmonize, and which create discord
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Texture considerations</S.SubSectionTitle>
            <S.Paragraph>Surface texture affects visual weight and character:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Smooth</S.Bold>: refined, formal; suits well-developed trees with clean styling
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Textured</S.Bold>: rugged, natural; suits collected material and trees with dramatic bark
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heavily textured</S.Bold>: dramatic statement that can compete with tree; use sparingly
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Match pot texture to bark texture—rough bark with textured pots, smooth bark with smoother pots. Contrast
              can work but requires careful consideration.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Front Selection and Viewing Angles</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: tree viewed from multiple angles around 360 degrees, with analysis of each angle showing trunk
            visibility, branch arrangement, negative space, and identifying the strongest front
          </ImagePlaceholder>
          <S.Paragraph>
            Every tree has a best viewing angle—its "front." Finding this angle is fundamental to presentation. Display
            the wrong front and even a great tree fails to communicate its quality.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What makes a good front</S.SubSectionTitle>
            <S.Paragraph>The front should reveal the tree's best qualities:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk visibility</S.Bold>: the trunk line should be clearly visible, not hidden by foliage or
                branches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trunk movement</S.Bold>: curves and taper should be apparent; the most interesting trunk
                movement should face forward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branch arrangement</S.Bold>: branches should not directly face the viewer (eye-poking branches)
                or directly face away; they should extend to the sides with some depth front and back
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Negative space</S.Bold>: openings in the canopy should reveal trunk and create depth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Balance</S.Bold>: the composition should feel stable from this angle
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Finding the front</S.SubSectionTitle>
            <S.Paragraph>
              Place the tree at eye level on a turntable or lazy Susan. Rotate slowly, observing from a consistent
              distance. Most trees have a narrow range of good viewing angles—often only 20-30 degrees of rotation where
              everything works.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Look for the angle that shows trunk line best</S.ListItem>
              <S.ListItem>Check that major branches extend to sides, not toward or away from viewer</S.ListItem>
              <S.ListItem>Verify nebari is visible and balanced</S.ListItem>
              <S.ListItem>Confirm negative space opens properly</S.ListItem>
              <S.ListItem>Assess overall balance and stability</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Mark the front</S.Bold>: once identified, mark the pot so you can consistently return to this
              angle. A small dot on the pot rim with a permanent marker serves well.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: front-finding process—showing rotation analysis with checkmarks for good elements and concerns at
              each angle, demonstrating how to evaluate and select the best front
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Viewing height</S.SubSectionTitle>
            <S.Paragraph>
              Bonsai are traditionally viewed at eye level or slightly below, as if looking at a full-sized tree from
              ground level. This perspective maintains the illusion of scale.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Display height</S.Bold>: stands and tables position trees at appropriate viewing height. The soil
              surface should be roughly at viewer's eye level for standing display; lower for seated viewing.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Tilt and angle in pot</S.SubSectionTitle>
            <S.Paragraph>The tree's angle in the pot affects presentation significantly:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Forward tilt</S.Bold>: tilting the apex slightly toward the viewer creates a welcoming, engaging
                presence
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Backward tilt</S.Bold>: tilting away creates distance and formality
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Side position</S.Bold>: trees are rarely centered in rectangular pots; typically placed
                off-center toward the direction opposite the visual weight
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Display Stands</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: variety of bonsai display stands—formal carved tables, simple board stands, tall jita for
            cascade, low platforms, rustic natural wood slabs, showing how stand style affects presentation
          </ImagePlaceholder>
          <S.Paragraph>
            Stands elevate bonsai physically and aesthetically. They lift the tree to proper viewing height and add a
            layer of formality and finish to the presentation.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Stand types</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Formal tables (shoku)</S.Bold>: carved wooden stands with legs, often with decorative aprons;
                traditional for display and exhibition
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Board stands (jita)</S.Bold>: flat boards, often with curved or carved edges; more casual than
                tables
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tall stands</S.Bold>: elevated platforms for cascade styles, allowing the cascade to fall freely
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Natural wood</S.Bold>: slabs of interesting wood, burls, or root sections; rustic and
                complementary to wild-looking trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Simple platforms</S.Bold>: low, minimal stands that add elevation without visual impact
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Stand selection principles</S.SubSectionTitle>
            <S.Paragraph>The stand should complement tree and pot without competing:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Size</S.Bold>: slightly larger than the pot, providing visual base without overwhelming
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Style match</S.Bold>: formal trees on formal stands, rustic trees on natural wood or simple
                boards
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Color consideration</S.Bold>: wood tone should complement pot and tree; avoid exact matches with
                pot color
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Visual weight</S.Bold>: heavier trees benefit from more substantial stands; delicate trees suit
                lighter stands
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Comparison diagram: same tree on different stands—showing how stand choice affects overall presentation,
              from formal carved table to rustic wood slab to simple platform
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Stand position</S.SubSectionTitle>
            <S.Paragraph>How the pot sits on the stand matters:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Centered vs offset</S.Bold>: pots are sometimes placed slightly off-center on stands to create
                more dynamic compositions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Rotation</S.Bold>: rectangular pots may be rotated slightly on stands to add visual interest
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Edge relationship</S.Bold>: pot edges should not align perfectly with stand edges; slight offset
                looks more natural
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Accent Plants and Companion Objects</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: accent plant varieties in appropriate containers—grasses, small flowering plants, moss
            compositions, ferns, miniature wild plants—showing scale relationship to main bonsai
          </ImagePlaceholder>
          <S.Paragraph>
            Accent plants add seasonal context and complete formal displays. These small plantings suggest the
            environment where the bonsai might grow in nature—a flowering accent evokes spring meadows; grasses suggest
            autumn fields.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Accent plant selection</S.SubSectionTitle>
            <S.Paragraph>Choose accents that suggest season and environment:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Spring</S.Bold>: small flowering plants, early grasses, moss compositions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Summer</S.Bold>: lush grasses, ferns, small flowering herbs
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Autumn</S.Bold>: grasses with seed heads, chrysanthemums, colored foliage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Winter</S.Bold>: evergreen accents, dried grasses, simple moss or stone compositions
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Scale relationship</S.Bold>: accents should be significantly smaller than the main tree—they
              suggest wildflowers at the base of a large tree, not competing vegetation.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Accent containers</S.SubSectionTitle>
            <S.Paragraph>Accent plants require appropriate containers:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Slab or suiban</S.Bold>: shallow tray or flat stone for moss compositions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Small pots</S.Bold>: tiny containers complementing main pot style
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Natural materials</S.Bold>: stone hollows, shells, or natural containers
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Container style should harmonize with main pot and stand—not match exactly but exist in the same visual
              vocabulary.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Viewing stones</S.SubSectionTitle>
            <S.Paragraph>
              Viewing stones (suiseki) may accompany bonsai in display. These naturally shaped stones suggest
              landscapes—mountains, islands, waterfalls—and add contemplative depth to the composition.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Selection</S.Bold>: stones should be naturally weathered, not cut or obviously shaped by human
              hands. Quality suiseki have interesting form, good color, and evocative presence.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Scroll Logic and Traditional Display</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: traditional three-point display arrangement showing bonsai on stand, accent plant at lower
            level, and hanging scroll behind creating triangular composition with proper spacing
          </ImagePlaceholder>
          <S.Paragraph>
            Formal bonsai display follows conventions developed in Japanese tokonoma (display alcove) tradition. A
            hanging scroll behind the tree adds vertical element and thematic connection.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The three-point display</S.SubSectionTitle>
            <S.Paragraph>Classic formal display includes three elements:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Main tree</S.Bold>: the bonsai on its stand, positioned as the primary element
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Accent element</S.Bold>: accent plant or viewing stone at lower level, smaller scale
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hanging scroll</S.Bold>: vertical element behind, providing backdrop and context
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These three points form a triangle in space, with the scroll providing height, the tree providing mass,
              and the accent grounding the composition.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Scroll selection</S.SubSectionTitle>
            <S.Paragraph>Scrolls add thematic context through imagery or calligraphy:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Seasonal imagery</S.Bold>: moon for autumn, bamboo for winter, cherry blossoms for spring
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Landscape elements</S.Bold>: mountains, water, distant forests
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Calligraphy</S.Bold>: poems or phrases relating to season or mood
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Abstract suggestion</S.Bold>: brushwork that evokes rather than depicts
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>The principle of connection</S.Bold>: scroll imagery should relate to tree and season without
              duplicating. A pine tree displayed with a pine painting is redundant; a pine with a moon scroll creates
              atmosphere.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: scroll and tree relationships—showing effective pairings where scroll adds context versus
              redundant pairings where scroll repeats the tree's subject
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Spatial arrangement</S.SubSectionTitle>
            <S.Paragraph>Elements in formal display relate through careful positioning:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Asymmetric balance</S.Bold>: elements are not centered but balanced through visual weight
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Breathing room</S.Bold>: adequate space between elements prevents crowding
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Directional tension</S.Bold>: tree and accent can face toward or away from each other to create
                different effects
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Vertical variation</S.Bold>: scroll highest, tree middle, accent lowest creates visual flow
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Show Preparation and Grooming</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: show preparation checklist visualization—showing tree grooming steps, pot cleaning, moss
            refreshing, wire removal, and timing considerations for peak presentation
          </ImagePlaceholder>
          <S.Paragraph>
            Exhibiting bonsai requires preparation beyond normal maintenance. The goal is presenting the tree at its
            absolute best—every detail attended to, every distraction removed.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Timing</S.SubSectionTitle>
            <S.Paragraph>Preparation begins well before the exhibition:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Months before</S.Bold>: assess tree health and address any issues; plan styling work
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Weeks before</S.Bold>: complete any major pruning or wiring; allow recovery time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Days before</S.Bold>: remove visible wire; clean pot; refresh moss
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Day of</S.Bold>: final grooming; transport carefully; set up
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Deciduous timing</S.Bold>: for spring shows, trees should be in fresh leaf but not yet fully
              expanded; for autumn shows, peak color. Plan defoliation and feeding schedules accordingly.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Wire removal</S.SubSectionTitle>
            <S.Paragraph>
              Visible wire detracts from exhibition quality. All wire should be removed before showing:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Remove wire carefully using proper technique to avoid branch damage</S.ListItem>
              <S.ListItem>Allow time for any wire marks to heal or be hidden by growth</S.ListItem>
              <S.ListItem>
                If wire is truly necessary for branch position, consider whether the tree is ready for exhibition
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Foliage grooming</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Remove damaged leaves</S.Bold>: any yellowed, torn, or pest-damaged foliage should go
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clean foliage</S.Bold>: dust and water spots diminish appearance; gentle washing or wiping
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Thin if needed</S.Bold>: overly dense areas may benefit from selective leaf removal for clarity
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Check for pests</S.Bold>: exhibiting a tree with visible insects is embarrassing
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Pot and soil surface</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Clean the pot</S.Bold>: remove salt deposits, algae, and water stains; polish if appropriate for
                pot type
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Refresh moss</S.Bold>: replace tired moss with fresh, properly scaled pieces
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Top dressing</S.Bold>: some exhibitors add decorative gravel or akadama surface layer
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove debris</S.Bold>: fallen leaves, dead moss, and stray particles
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Before/after comparison: show preparation—showing tree before grooming with wire, debris, and tired moss
              versus finished exhibition-ready presentation
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Deadwood treatment</S.SubSectionTitle>
            <S.Paragraph>If the tree has jin or shari:</S.Paragraph>
            <S.List>
              <S.ListItem>Clean deadwood of algae or dirt accumulation</S.ListItem>
              <S.ListItem>Reapply lime sulfur if color has faded; allow time to dry completely</S.ListItem>
              <S.ListItem>Check for any soft spots or deterioration</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Transport</S.SubSectionTitle>
            <S.Paragraph>Getting the tree to the show safely:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Secure the pot</S.Bold>: prevent movement during transport; wedge or strap in place
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Protect foliage</S.Bold>: branches can be damaged by jostling; box or cover delicate trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Bring supplies</S.Bold>: misting bottle, small tools for last-minute adjustments, clean cloth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Allow time</S.Bold>: rushing leads to mistakes and stress
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Everyday Display</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: home display options—showing bonsai on window stand, on dedicated display shelf, in garden
            setting, demonstrating how to integrate bonsai into living spaces
          </ImagePlaceholder>
          <S.Paragraph>
            Formal exhibition standards need not govern everyday display. Most bonsai spend their lives in growing
            areas, brought out for enjoyment rather than competition. Home display can be simpler while still honoring
            the tree.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Indoor display considerations</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Light</S.Bold>: most bonsai need outdoor conditions; indoor display should be temporary
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Duration</S.Bold>: rotate trees in for display, then return to growing conditions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Placement</S.Bold>: choose viewing locations that allow appreciation without harming the tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Protection</S.Bold>: protect surfaces from water damage; use appropriate trays or catches
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Simple but effective</S.SubSectionTitle>
            <S.Paragraph>
              Home display need not include scrolls and accents. A single tree, well-positioned at proper height on an
              appropriate stand, can be fully effective. The goal is appreciation, not replication of formal display
              conventions.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Rotation</S.Bold>: displaying different trees at different times keeps the experience fresh and
              gives each tree its moment of attention.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: presentation elements overview—showing pot, stand, accent, and scroll relationships,
            with key principles for each element and how they combine into unified display
          </ImagePlaceholder>
          <S.Paragraph>
            Presentation transforms good trees into complete artistic statements. Every choice—pot, stand, accent,
            position—either supports or undermines the tree's impact.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Pot selection is foundational</S.Bold>. Proportion, shape, color, and texture all matter. The right
            pot disappears, letting the tree command attention. Traditional guidelines provide starting points: pot
            length around two-thirds of tree height, depth matching trunk caliper. But ultimately the pot must feel
            right for the specific tree.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Find the front and present it well</S.Bold>. Every tree has optimal viewing angles—usually a narrow
            range where trunk line, branch arrangement, and negative space all work together. Study your trees from all
            angles to find and mark their best face.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Stands elevate physically and aesthetically</S.Bold>. The right stand lifts the tree to proper
            viewing height and adds finish to the presentation. Match stand formality to tree character—carved tables
            for refined trees, rustic wood for wild material.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Accents add context without competing</S.Bold>. Small seasonal plantings suggest environment and
            time of year. They should be significantly smaller than the main tree, complementary rather than competing.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Show preparation requires planning</S.Bold>. Begin months ahead, addressing health issues and
            styling well before exhibition. Final grooming—wire removal, foliage cleaning, moss refreshing, pot
            cleaning—brings the tree to peak presentation.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Everyday display can be simple</S.Bold>. Formal conventions serve exhibitions but need not govern
            home enjoyment. A single tree, properly positioned for appreciation, is fully sufficient.
          </S.Paragraph>
          <S.Paragraph>
            The tree is primary—all presentation choices serve to reveal and enhance its qualities. When presentation is
            done well, viewers see only the tree. The pot, stand, and accents become invisible support, and the tree
            speaks for itself.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-21" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter21;
