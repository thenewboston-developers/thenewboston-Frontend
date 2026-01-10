import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter12: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 12: Repotting and Root Work</S.Title>

        <ImagePlaceholder>
          Illustration: bonsai being removed from pot showing the root ball, with fresh substrate and tools nearby
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Unlike trees in the ground, bonsai grow in a closed system. The pot limits root expansion, and over time the
            root mass fills the available space. Substrate breaks down, drainage slows, and the balance that supports
            healthy growth deteriorates. Repotting addresses all of these problems—it is not merely transplanting, but a
            complete renewal of the growing environment.
          </S.Paragraph>
          <S.Paragraph>
            Root work during repotting also serves design purposes. Pruning roots controls growth, directs development,
            and shapes the visible root base (nebari) that anchors the tree visually.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Timing</S.Bold>: when to repot based on species and developmental signals
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Pot and soil selection</S.Bold>: matching container and substrate to tree stage
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Root pruning strategy</S.Bold>: what to cut, what to keep, and why
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Aftercare</S.Bold>: supporting recovery after the stress of repotting
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Why Repotting Is Necessary</S.SectionTitle>
          <ImagePlaceholder>
            Cross-section diagram: comparing a recently repotted tree (open substrate, visible air spaces, healthy root
            tips) with a root-bound tree (compacted roots, broken-down substrate, poor drainage)
          </ImagePlaceholder>
          <S.Paragraph>Several problems develop over time in a bonsai pot that repotting addresses:</S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Root mass expansion</S.SubSectionTitle>
            <S.Paragraph>
              Roots grow continuously. In a pot, they eventually fill all available space, circling the container and
              becoming densely packed. A root-bound tree:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Has less soil volume relative to root mass</S.ListItem>
              <S.ListItem>Dries out faster as roots replace water-holding substrate</S.ListItem>
              <S.ListItem>May have reduced vigor as root function declines</S.ListItem>
              <S.ListItem>Becomes increasingly difficult to water thoroughly</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Substrate breakdown</S.SubSectionTitle>
            <S.Paragraph>
              Even the best substrates deteriorate over time. Organic components decompose, particles break down, and
              the structure that provides drainage and aeration collapses. Degraded substrate:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Drains slowly, holding excess water</S.ListItem>
              <S.ListItem>Compacts, reducing oxygen to roots</S.ListItem>
              <S.ListItem>Accumulates salts from fertilizer</S.ListItem>
              <S.ListItem>Creates conditions favorable to root rot</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Nutrient depletion</S.SubSectionTitle>
            <S.Paragraph>
              While fertilization replaces mobile nutrients, some elements become locked in unavailable forms or
              accumulate to toxic levels. Fresh substrate resets the chemical environment.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Timing: When to Repot</S.SectionTitle>
          <ImagePlaceholder>
            Seasonal timeline diagram: showing optimal repotting windows for deciduous trees (late winter/early spring
            as buds swell), conifers (early spring or early fall), and tropicals (during active growth in warm
            conditions)
          </ImagePlaceholder>
          <S.Paragraph>
            Repotting is stressful. Timing it correctly allows trees to recover quickly; poor timing can weaken or kill
            a tree.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The general principle</S.SubSectionTitle>
            <S.Paragraph>
              Repot when the tree is about to push new growth but has not yet committed energy to extending shoots. At
              this stage:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Energy reserves are high from the previous growing season</S.ListItem>
              <S.ListItem>New root growth is imminent and will quickly establish in fresh substrate</S.ListItem>
              <S.ListItem>Foliage is minimal or absent, reducing water demand during recovery</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Deciduous trees</S.SubSectionTitle>
            <S.Paragraph>
              The optimal window for most deciduous species is late winter to early spring, as buds begin to swell but
              before they open:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Buds visibly swelling indicates the tree is mobilizing for growth</S.ListItem>
              <S.ListItem>Roots begin active growth slightly before buds open</S.ListItem>
              <S.ListItem>Repotting at this stage allows immediate root regeneration</S.ListItem>
            </S.List>
            <S.Paragraph>
              Repotting deciduous trees in full leaf is risky—the root reduction cannot support existing foliage, and
              the tree must shed leaves to survive.
            </S.Paragraph>
            <ImagePlaceholder>
              Close-up illustration: deciduous bud stages from dormant winter bud to swelling bud to opening bud, with
              the optimal repotting window indicated at the swelling stage
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Conifers</S.SubSectionTitle>
            <S.Paragraph>
              Conifers have different root growth patterns than deciduous trees. Common timing approaches:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Pines</S.Bold>: often repotted as candles extend in spring, when root growth is active. Some
                practitioners prefer early fall when a second root growth period occurs.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Junipers</S.Bold>: can be repotted from early spring through early summer; they tolerate a wider
                window than most species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Spruces and firs</S.Bold>: early spring as buds begin to swell, similar to deciduous timing
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Conifers retain foliage year-round, so water demand never drops to zero. Leave more roots than you would
              on a dormant deciduous tree.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Tropical species</S.SubSectionTitle>
            <S.Paragraph>
              Tropicals do not have true dormancy. Repot during active growth in warm conditions:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Late spring through summer in temperate climates</S.ListItem>
              <S.ListItem>Avoid repotting when temperatures are cool or decreasing</S.ListItem>
              <S.ListItem>Ensure warm temperatures for several weeks after repotting to support recovery</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Signs that repotting is needed</S.SubSectionTitle>
            <S.Paragraph>Beyond timing, watch for signals that a tree needs repotting:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Water sits on the surface</S.Bold>: substrate is too compacted to absorb water quickly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Roots circling the pot bottom or emerging from drainage holes</S.Bold>: the pot is full
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Declining vigor without other cause</S.Bold>: poor root environment may be limiting growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Two or more years since last repotting</S.Bold>: many species need repotting every 2-3 years;
                young trees more frequently
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree pushes itself out of the pot</S.Bold>: root mass is lifting the tree
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: visual signs indicating repotting is needed—water pooling on surface, roots visible at
              drainage holes, tree lifted above pot rim by root mass
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Pot Selection</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: pot size progression showing development containers (larger, utilitarian) versus refinement pots
            (proportional to tree, aesthetic consideration), with guidelines for depth and width relative to tree size
          </ImagePlaceholder>
          <S.Paragraph>
            The pot serves both horticultural and aesthetic functions. Pot selection depends on whether the tree is in
            development or refinement.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Development containers</S.SubSectionTitle>
            <S.Paragraph>
              Trees being developed need root space to support vigorous growth. At this stage, aesthetics are secondary:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Larger containers</S.Bold>: more soil volume supports more root mass and faster growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Grow boxes or pond baskets</S.Bold>: maximize root space with good drainage; aesthetics do not
                matter
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Colanders and mesh containers</S.Bold>: promote fine root development through air pruning
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ground growing</S.Bold>: for maximum trunk development, planting in the ground produces fastest
                growth
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Trees in development may be stepped down into progressively smaller containers as they approach
              refinement.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Refinement pots</S.SubSectionTitle>
            <S.Paragraph>
              For refined bonsai, pot selection is an aesthetic decision integrated with tree design:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Proportional sizing</S.Bold>: pot depth typically matches trunk diameter at the base; width
                roughly equals two-thirds of tree height for upright styles
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Shape selection</S.Bold>: oval and rectangular pots for formal styles; round and irregular
                shapes for informal styles; cascades require deep pots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Color and texture</S.Bold>: glazed pots for flowering/fruiting trees and some deciduous species;
                unglazed earth tones for conifers and rugged deciduous trees
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              A refined tree in too large a pot looks unfinished; too small a pot creates watering challenges and stunts
              growth. The pot should complement, not dominate.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: properly proportioned tree-to-pot relationships for different styles—formal upright in
              rectangular pot, informal upright in oval pot, cascade in tall pot
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Drainage requirements</S.SubSectionTitle>
            <S.Paragraph>All bonsai pots must have adequate drainage holes:</S.Paragraph>
            <S.List>
              <S.ListItem>Cover holes with mesh to prevent soil loss while allowing water through</S.ListItem>
              <S.ListItem>
                Larger pots need proportionally larger or multiple holes to prevent water retention at the bottom
              </S.ListItem>
              <S.ListItem>Shallow pots drain faster than deep pots due to physics of water in soil columns</S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Root Pruning Strategy</S.SectionTitle>
          <ImagePlaceholder>
            Step-by-step illustration: root ball removed from pot, old soil raked out, circling roots identified,
            strategic cuts being made, final prepared root ball ready for new pot
          </ImagePlaceholder>
          <S.Paragraph>
            Root pruning is not random reduction—it is strategic removal that serves specific purposes. What you cut and
            what you keep matters.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Goals of root pruning</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Maintain the root:shoot balance</S.Bold>: reducing root mass proportionally to any foliage
                reduction keeps the tree in equilibrium
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stimulate fine root development</S.Bold>: cutting roots promotes branching, creating more fine
                feeder roots close to the trunk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fit the pot</S.Bold>: roots must be reduced to fit the container with space for fresh substrate
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Improve nebari</S.Bold>: removing poorly positioned roots and encouraging well-placed ones
                improves the visible root base
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove problems</S.Bold>: dead, circling, or downward-growing roots are removed
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What to remove</S.SubSectionTitle>
            <S.Paragraph>Prioritize removing:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Circling roots</S.Bold>: roots that wrap around the trunk base will eventually girdle the tree;
                cut them back to where they grow outward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Downward-growing tap roots</S.Bold>: encourage horizontal root spread by removing strong
                downward roots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dead or rotting roots</S.Bold>: brown, mushy roots are dead; remove them cleanly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Roots crossing over surface roots</S.Bold>: these create visual tangles and pressure points;
                remove to preserve nebari clarity
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Excessively thick roots</S.Bold>: proportionally thick roots can be reduced to encourage finer
                branching
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Diagram: root types to remove—circling root, downward tap root, crossing surface root, dead root—each
              clearly labeled with cut lines indicated
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What to keep</S.SubSectionTitle>
            <S.Paragraph>Prioritize keeping:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Radial surface roots</S.Bold>: roots spreading evenly in all directions from the trunk create
                the best nebari
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fine feeder roots</S.Bold>: these are the working roots; preserve as many as possible
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Roots in weak areas</S.Bold>: if one side of the nebari is underdeveloped, preserve roots there
                even if they are not ideal
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Enough root mass for survival</S.Bold>: never remove so much that the remaining roots cannot
                support the tree
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>How much to remove</S.SubSectionTitle>
            <S.Paragraph>The safe amount depends on species, vigor, and timing:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Healthy deciduous trees</S.Bold>: can often tolerate removal of 50% or more of root mass when
                repotted at optimal timing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Conifers</S.Bold>: more conservative—typically remove 25-30%; conifers recover more slowly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Weak or recovering trees</S.Bold>: minimal root work—just enough to refresh substrate
              </S.ListItem>
              <S.ListItem>
                <S.Bold>First repotting from nursery stock</S.Bold>: be conservative; assess root health before deciding
                how much to remove
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              When in doubt, remove less. You can always take more at the next repotting; you cannot put roots back.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Tools and technique</S.SubSectionTitle>
            <S.Paragraph>Use appropriate tools for clean cuts:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Root hooks and chopsticks</S.Bold>: for raking out old soil and untangling roots without tearing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root shears or sharp scissors</S.Bold>: for cutting small to medium roots cleanly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Concave cutters or saw</S.Bold>: for large roots that need flush removal
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clean tools</S.Bold>: sanitize between trees to prevent disease transmission
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Clean cuts heal faster than torn or crushed roots. Work efficiently—roots should not dry out during the
              process.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>The Repotting Process</S.SectionTitle>
          <ImagePlaceholder>
            Sequential illustration: complete repotting process from gathering materials through final watering—pot
            preparation, tree removal, root work, positioning, filling with substrate, securing with wire, initial
            watering
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Preparation</S.SubSectionTitle>
          </S.SubSection>
          <S.Paragraph>Before starting, gather everything you need:</S.Paragraph>
          <S.List>
            <S.ListItem>Fresh substrate, pre-moistened if using akadama or similar</S.ListItem>
            <S.ListItem>The new pot with drainage mesh secured</S.ListItem>
            <S.ListItem>Anchor wires threaded through drainage holes</S.ListItem>
            <S.ListItem>Root tools: hooks, chopsticks, shears</S.ListItem>
            <S.ListItem>Work surface that can get dirty</S.ListItem>
            <S.ListItem>Water source ready for final watering</S.ListItem>
          </S.List>

          <S.SubSection>
            <S.SubSectionTitle>Removing the tree</S.SubSectionTitle>
            <S.Paragraph>
              Work around the pot edge with a root sickle or thin blade to free the root ball. For trees wired in, cut
              the anchor wires. Lift the tree out carefully—if it resists, continue loosening the edges rather than
              forcing.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Working the root ball</S.SubSectionTitle>
            <S.Paragraph>Remove old substrate systematically:</S.Paragraph>
            <S.List>
              <S.ListItem>Start from the bottom and outer edges, working inward</S.ListItem>
              <S.ListItem>Use root hooks to rake out old soil without tearing roots</S.ListItem>
              <S.ListItem>For severely compacted roots, a gentle water stream can help loosen soil</S.ListItem>
              <S.ListItem>Remove 50-80% of old substrate depending on tree condition</S.ListItem>
            </S.List>
            <S.Paragraph>Once soil is removed, assess the root structure and make pruning cuts as planned.</S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Positioning in the pot</S.SubSectionTitle>
            <S.Paragraph>Placement matters for both aesthetics and root development:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Not centered</S.Bold>: most trees are positioned off-center for visual interest, slightly toward
                the back of the pot
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Correct height</S.Bold>: the root flare should be visible at or slightly above the soil surface;
                burying the trunk invites rot
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Front established</S.Bold>: position the tree's best viewing angle toward the front of the pot
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Add a base layer of substrate, position the tree, and work roots outward over the soil before adding more.
            </S.Paragraph>
            <ImagePlaceholder>
              Top-down diagram: proper tree positioning in oval and rectangular pots, showing off-center placement and
              front orientation
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Filling and securing</S.SubSectionTitle>
            <S.Paragraph>Add substrate in layers, working it into root spaces:</S.Paragraph>
            <S.List>
              <S.ListItem>Use chopsticks to work soil between roots—no air pockets</S.ListItem>
              <S.ListItem>Fill to just below the pot rim, leaving space for watering</S.ListItem>
              <S.ListItem>Secure the tree with anchor wires, snugging them over major roots</S.ListItem>
              <S.ListItem>The tree should not wobble—movement prevents root establishment</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Initial watering</S.SubSectionTitle>
            <S.Paragraph>
              Water thoroughly until water flows freely from drainage holes. This settles substrate around roots and
              ensures the entire root ball is hydrated. Continue watering until runoff is clear, not cloudy from soil
              particles.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Aftercare: Supporting Recovery</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: recently repotted tree in protected location—partial shade, sheltered from wind, with visual
            indicators of proper aftercare environment
          </ImagePlaceholder>
          <S.Paragraph>
            The weeks following repotting are critical. The tree has reduced root capacity and needs support until new
            roots establish.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Protection from stress</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Shade</S.Bold>: protect from direct sun for 2-4 weeks; reduced root mass cannot supply water to
                meet full sun demand
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wind shelter</S.Bold>: wind increases water loss and can rock the tree, disrupting root
                regeneration
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stable temperature</S.Bold>: avoid extreme heat or late frosts during recovery
              </S.ListItem>
              <S.ListItem>
                <S.Bold>No fertilizer</S.Bold>: wait 3-4 weeks before fertilizing; damaged roots cannot handle
                fertilizer salts
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Watering after repotting</S.SubSectionTitle>
            <S.Paragraph>Watering requires extra attention:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Check daily</S.Bold>: fresh substrate and reduced root mass change watering needs
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Water when surface begins to dry</S.Bold>: overwatering is as dangerous as underwatering when
                roots are limited
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ensure thorough penetration</S.Bold>: fresh substrate may be hydrophobic at first; water slowly
                and repeatedly until it absorbs fully
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Signs of successful recovery</S.SubSectionTitle>
            <S.Paragraph>Look for these indicators that the tree has recovered:</S.Paragraph>
            <S.List>
              <S.ListItem>New growth appears healthy and vigorous</S.ListItem>
              <S.ListItem>Leaves or needles maintain good color without wilting</S.ListItem>
              <S.ListItem>Tree feels solid in the pot—roots are anchoring</S.ListItem>
              <S.ListItem>Water absorption normalizes</S.ListItem>
            </S.List>
            <S.Paragraph>
              Once new growth hardens off and the tree shows normal vigor, gradually return it to regular conditions and
              begin normal fertilization.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Signs of trouble</S.SubSectionTitle>
            <S.Paragraph>Watch for warning signs requiring intervention:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wilting despite moist soil</S.Bold>: roots may be damaged or rotting; reduce watering and
                increase shade
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Yellowing leaves</S.Bold>: may indicate overwatering, underwatering, or root damage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>No new growth after several weeks</S.Bold>: tree may be stressed; extend recovery conditions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dieback</S.Bold>: severe stress may cause branch death; protect remaining foliage and wait
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Trees can survive significant stress if given time and appropriate care. Do not compound stress by making
              additional changes.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Special Situations</S.SectionTitle>
          <ImagePlaceholder>
            Illustration grid: bare-rooting an overgrown nursery stock, slip-potting a weak tree, emergency repotting of
            a waterlogged tree
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>First repotting from nursery stock</S.SubSectionTitle>
            <S.Paragraph>
              Trees from nurseries often have problematic root systems—circling roots, buried root flares, or organic
              soil at the core surrounded by different media. The first repotting:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Excavate to find the true root flare; it may be buried several inches deep</S.ListItem>
              <S.ListItem>Remove all nursery soil, especially incompatible organic media</S.ListItem>
              <S.ListItem>Correct circling roots now—they will only worsen with time</S.ListItem>
              <S.ListItem>
                Accept that significant reduction may be needed; spread work over multiple seasons if unsure
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Slip-potting</S.SubSectionTitle>
            <S.Paragraph>
              When a tree needs a larger container but should not be disturbed, slip-potting moves it without root work:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Remove from old pot without disturbing the root ball</S.ListItem>
              <S.ListItem>Place intact in a larger container</S.ListItem>
              <S.ListItem>Fill around with fresh substrate</S.ListItem>
              <S.ListItem>Useful for weak trees, wrong timing, or when only container size needs to change</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Emergency repotting</S.SubSectionTitle>
            <S.Paragraph>
              Sometimes repotting is necessary outside the optimal window—waterlogged soil, contamination, or severe
              root problems:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Do minimal root work—only what is necessary to address the problem</S.ListItem>
              <S.ListItem>Provide maximum aftercare protection</S.ListItem>
              <S.ListItem>Accept that recovery may be slow or that the tree may decline</S.ListItem>
              <S.ListItem>Emergency repotting is a rescue attempt, not an ideal procedure</S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap infographic: repotting timing by species type, pot selection guidelines, root pruning priorities,
            aftercare checklist, warning signs to watch for
          </ImagePlaceholder>
          <S.Paragraph>
            Repotting renews the growing environment that bonsai depend on. It addresses root crowding, substrate
            breakdown, and provides an opportunity to improve root structure. Done at the right time with appropriate
            care, trees recover quickly and grow with renewed vigor.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Timing is critical</S.Bold>. Repot when trees are about to grow but have not yet committed energy to
            extending shoots—typically late winter to early spring for most species. Species vary; learn the specific
            needs of your trees.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Pot selection serves goals</S.Bold>. Development trees need space to grow; use larger containers.
            Refined trees need proportional pots that complement their design.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Root pruning is strategic</S.Bold>. Remove circling roots, downward tap roots, and dead material.
            Preserve radial surface roots and fine feeders. Remove enough to fit the pot with fresh substrate, but not
            so much that survival is threatened.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Aftercare determines success</S.Bold>. Protect recently repotted trees from sun, wind, and stress.
            Monitor watering carefully. Wait to fertilize until new roots establish. Most repotting failures occur not
            during the procedure but in the weeks following when inadequate aftercare allows problems to develop.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-12" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter12;
