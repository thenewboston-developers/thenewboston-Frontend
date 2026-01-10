import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter15: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 15: Pruning</S.Title>

        <ImagePlaceholder>
          Illustration: hands pruning a bonsai branch with sharp shears, showing proper cutting angle and branch
          structure before and after the cut
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Pruning is the most fundamental bonsai technique. Every other skill builds upon it. Through selective
            removal of growth, we shape trees, control energy distribution, encourage ramification, and maintain the
            miniature scale that defines bonsai. Understanding how and why trees respond to pruning transforms random
            cuts into purposeful design.
          </S.Paragraph>
          <S.Paragraph>
            Pruning is not simply about making trees smaller. It is about directing growth, balancing vigor, and working
            with the tree's natural responses to achieve specific goals. The same cut made at different times, on
            different species, or in different locations produces vastly different results.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Structural pruning vs maintenance pruning</S.Bold>: understanding the two fundamentally different
              approaches and when to use each
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Directional pruning and bud selection</S.Bold>: how to guide growth in specific directions through
              strategic cuts
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Reducing coarse growth</S.Bold>: techniques for refining heavy branches without weakening the tree
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Wound management</S.Bold>: understanding how trees heal and how to optimize recovery
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Structural Pruning vs Maintenance Pruning</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: two versions of the same tree—one showing structural pruning with major branch removal,
            the other showing maintenance pruning with fine tip work—with labeled differences in approach and goals
          </ImagePlaceholder>
          <S.Paragraph>
            These two types of pruning serve entirely different purposes and follow different rules. Confusing them
            leads to trees that never develop properly or that lose refinement over time.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Structural pruning</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Purpose</S.Bold>: Structural pruning establishes the fundamental architecture of the tree. It
              involves selecting primary branches, removing competing growth, and creating the basic framework upon
              which all future refinement builds.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>When to perform</S.Bold>: Structural pruning is done during initial styling and during major
              redesigns. For most species, late winter to early spring before growth begins is ideal—the bare structure
              is visible, and strong spring growth will follow to heal wounds. However, heavy structural work on
              conifers may be spread across multiple seasons to avoid over-stressing the tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Characteristics of structural pruning</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Removes entire branches, often large ones</S.ListItem>
              <S.ListItem>Creates significant wounds that take years to heal</S.ListItem>
              <S.ListItem>Changes the fundamental silhouette of the tree</S.ListItem>
              <S.ListItem>May remove 30-50% or more of foliage in a single session</S.ListItem>
              <S.ListItem>Requires recovery time before additional major work</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Step-by-step illustration: structural pruning sequence on a deciduous tree—initial raw material, branch
              selection with unwanted branches marked, after removal showing basic structure, recovery growth
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Decision criteria</S.Bold>: When selecting which branches to keep during structural pruning,
              consider:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Position</S.Bold>: branches should emerge at appropriate heights and angles; avoid branches
                directly opposite each other (bar branches)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Taper</S.Bold>: branches should decrease in thickness as they extend from the trunk; remove
                branches that are too thick for their position
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Direction</S.Bold>: primary branches should generally extend outward and slightly downward;
                remove branches growing straight up, straight down, or directly toward the viewer
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Spacing</S.Bold>: branches should have visual space between them; crowded areas create confusion
                and prevent light penetration
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Maintenance pruning</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Purpose</S.Bold>: Maintenance pruning preserves and refines existing structure. It controls
              extension growth, maintains shape, encourages back-budding and ramification, and keeps the tree in
              balance.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>When to perform</S.Bold>: Maintenance pruning occurs throughout the growing season. The specific
              timing depends on species and goals—some trees are pruned after each flush of growth, others only once or
              twice per year.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Characteristics of maintenance pruning</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Removes shoot tips and small branches</S.ListItem>
              <S.ListItem>Creates minimal wounds that heal quickly</S.ListItem>
              <S.ListItem>Preserves the established silhouette</S.ListItem>
              <S.ListItem>Removes relatively small amounts of foliage at a time</S.ListItem>
              <S.ListItem>Can be performed frequently without stressing the tree</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: maintenance pruning on a refined branch pad—showing elongated shoots before pruning, cutting
              locations marked, and the compact result after pruning with internode spacing labeled
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Common maintenance pruning techniques</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Clip and grow</S.Bold>: allow shoots to extend, then cut back to one or two nodes—used primarily
                on deciduous trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pinching</S.Bold>: removing soft new growth with fingers before it hardens—gentle, produces
                shortest internodes
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Candle pruning</S.Bold>: specific technique for pines involving removal or reduction of spring
                candles
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Shoot selection</S.Bold>: when multiple shoots emerge at a point, reducing to one or two
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The danger of mixing approaches</S.SubSectionTitle>
            <S.Paragraph>
              Problems arise when practitioners apply maintenance techniques to trees needing structural work, or
              perform structural cuts during refinement phases:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Constant tip pruning on undeveloped trees</S.Bold>: produces bushy growth without developing
                proper branch structure—the tree never matures beyond a ball of foliage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heavy structural cuts on refined trees</S.Bold>: destroys years of ramification development; the
                tree must rebuild fine branching from scratch
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Removing large branches during growing season</S.Bold>: wastes energy the tree invested in that
                growth; weakens the tree more than dormant-season removal
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Know what phase your tree is in and prune accordingly. A tree in development requires patience with coarse
              growth; a refined tree requires restraint from major alterations.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Directional Pruning and Bud Selection</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: branch cross-section showing bud positions around the circumference, with arrows indicating growth
            direction each bud would produce if selected—demonstrating how bud choice determines branch movement
          </ImagePlaceholder>
          <S.Paragraph>
            Every pruning cut is an instruction to the tree. Where you cut determines which buds activate and therefore
            which direction growth continues. Understanding this relationship allows precise control over branch
            development.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How buds respond to pruning</S.SubSectionTitle>
            <S.Paragraph>
              When a shoot is cut, the buds nearest the cut become dominant. In most species, the topmost remaining bud
              receives the strongest growth signal. The direction that bud faces determines the direction the new shoot
              will grow.
            </S.Paragraph>
            <S.Paragraph>
              This response is governed by <S.Bold>apical dominance</S.Bold>—the hormonal system that normally
              concentrates growth at branch tips. When you remove the tip, dominance transfers to the remaining highest
              point. Understanding this allows you to:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Direct branches left or right by selecting appropriately positioned buds</S.ListItem>
              <S.ListItem>Create movement and taper through alternating direction cuts</S.ListItem>
              <S.ListItem>Encourage back-budding by cutting to interior buds</S.ListItem>
              <S.ListItem>Control branch thickness by regulating extension growth</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Sequential illustration: directional pruning over three seasons—showing cut to outward-facing bud,
              resulting growth, cut to inward-facing bud, resulting growth, demonstrating how alternating creates
              natural movement
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Bud selection principles</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Outward-facing buds</S.Bold>: Cutting to outward-facing buds opens the tree structure, allows
              light penetration, and creates the characteristic horizontal layering of refined bonsai. Most cuts on most
              trees favor outward-facing buds.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Inward-facing buds</S.Bold>: Occasionally useful to fill gaps in the silhouette, create movement
              toward the trunk, or correct branches that have grown too far outward. Use sparingly—interior growth is
              typically weaker and more likely to be shaded out.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Upward vs downward-facing buds</S.Bold>: Upward buds produce stronger growth due to apical
              dominance. Downward buds produce weaker growth but can create graceful weeping effects on appropriate
              species. On most trees, slightly upward or horizontal buds are preferred.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Opposite buds</S.Bold>: Species like maples have opposite bud arrangement—two buds at each node.
              Always remove one to prevent forking. Choose based on desired direction; the remaining bud becomes the
              continuation of the branch.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison diagram: alternate vs opposite bud arrangements, showing correct bud selection and resulting
              branch patterns for each type—including the forking problem when both opposite buds are left
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Creating taper through directional pruning</S.SubSectionTitle>
            <S.Paragraph>
              Taper—the gradual decrease in branch thickness from base to tip—is essential to convincing bonsai design.
              It cannot be faked; it must be grown. Directional pruning is the primary tool for developing taper.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>The principle</S.Bold>: Each time you cut back and allow regrowth, the new segment is thinner than
              what preceded it. The transition point between the old cut and new growth becomes a slight change in
              direction. Over many cycles, this creates graceful taper with natural movement.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Growing for taper</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                Allow extension growth to run until the base of the extension thickens to the desired diameter
              </S.ListItem>
              <S.ListItem>Cut back to an appropriately positioned bud</S.ListItem>
              <S.ListItem>Allow the new shoot to extend and thicken</S.ListItem>
              <S.ListItem>Repeat until the branch reaches desired length and taper</S.ListItem>
            </S.List>
            <S.Paragraph>
              Patience is essential. Cutting back too soon produces thin, whippy branches. Waiting too long produces
              abrupt transitions. The rate varies by species—vigorous deciduous trees may need cutting every few weeks
              during growing season; conifers may need a full season between cuts.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Working with species differences</S.SubSectionTitle>
            <S.Paragraph>Different species respond differently to the same cuts:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Vigorous deciduous (elm, maple, privet)</S.Bold>: Strong back-budding, rapid recovery, tolerant
                of repeated hard pruning. Cut back frequently to maintain shape.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moderate deciduous (beech, hornbeam)</S.Bold>: Good response but slower recovery. Allow more
                time between pruning sessions.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Conifers (juniper, pine, spruce)</S.Bold>: Limited or no back-budding from old wood. Must
                maintain foliage on every branch you want to keep. Pruning strategy fundamentally different.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tropical and subtropical</S.Bold>: Often very vigorous with strong back-budding. May need
                pruning every few weeks during growing season.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Know your species before pruning. A cut that rejuvenates an elm may kill a branch on a pine.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Reducing Coarse Growth Without Weakening the Tree</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: branch reduction techniques—showing a thick branch being reduced through staged cuts over
            multiple seasons rather than a single drastic reduction
          </ImagePlaceholder>
          <S.Paragraph>
            Trees in development often produce thick, straight growth that must be reduced for refinement. The challenge
            is removing unwanted mass without weakening the branch or creating wounds the tree cannot heal.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Understanding the problem</S.SubSectionTitle>
            <S.Paragraph>
              When trees grow freely, apical dominance drives energy to branch tips. The tips extend rapidly while side
              branches remain suppressed. The result is long, straight branches that are thick at the base and thin at
              the tips—the opposite of the taper we want.
            </S.Paragraph>
            <S.Paragraph>
              Simply cutting these branches back to the desired length creates several problems:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Large wounds where thick wood is cut</S.ListItem>
              <S.ListItem>Loss of foliage that was supplying the branch with energy</S.ListItem>
              <S.ListItem>Sudden reverse in taper (thick stub with thin regrowth)</S.ListItem>
              <S.ListItem>Risk of dieback if the branch lacks interior buds to regenerate from</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The staged reduction approach</S.SubSectionTitle>
            <S.Paragraph>Rather than making one drastic cut, reduce coarse growth over multiple seasons:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Year one</S.Bold>: Make initial reduction partway back, leaving more length than ultimately
              desired. This keeps foliage on the branch and stimulates back-budding closer to the trunk. The remaining
              foliage continues feeding the branch and roots.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Year two</S.Bold>: Once new interior growth has established, reduce further back to stronger
              interior shoots. Remove or shorten the original tip growth.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Year three and beyond</S.Bold>: Continue refining, always maintaining some foliage on the branch.
              Each reduction brings the bulk closer to where you want it while maintaining branch health.
            </S.Paragraph>
            <ImagePlaceholder>
              Timeline diagram: staged branch reduction over three years—showing initial long branch, first reduction
              with interior budding stimulated, second reduction with new leader selected, final refined branch
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Sacrificial branches</S.SubSectionTitle>
            <S.Paragraph>
              A sacrificial branch is intentionally grown long and strong to thicken the trunk or parent branch below
              it, with the understanding that it will eventually be removed. This technique exploits how trees work:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Vigorous growth above a point causes thickening below that point</S.ListItem>
              <S.ListItem>
                A branch allowed to grow freely produces more trunk thickening than one kept pruned
              </S.ListItem>
              <S.ListItem>Strategic placement of sacrificial branches can thicken specific areas</S.ListItem>
            </S.List>
            <S.Paragraph>
              When the desired thickening is achieved, the sacrificial branch is removed. The key is removing it before
              the branch gets so large that the wound cannot heal attractively. Judge the balance between thickening
              benefit and scar size.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Energy management during reduction</S.SubSectionTitle>
            <S.Paragraph>
              Branches need foliage to survive. Reduce too much foliage at once and the branch may die back or weaken
              permanently. Follow these principles:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Never remove all foliage from a branch</S.Bold>: even a few leaves or needles keep the branch
                alive and recovering
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Maintain foliage near the trunk</S.Bold>: interior foliage is the hardest to regenerate; protect
                it during reduction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Time reductions with the growth cycle</S.Bold>: reduce during periods of active growth when the
                tree can respond with new buds
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Allow recovery between major reductions</S.Bold>: do not compound stress by reducing multiple
                major branches simultaneously
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Wound Management and Healing Speed</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: wound healing process over time—showing initial cut, callus formation at edges, gradual rollover
            from all sides, and final healed wound with visible scar pattern
          </ImagePlaceholder>
          <S.Paragraph>
            Trees do not heal wounds the way animals do. They cannot regenerate tissue to fill gaps. Instead, they
            compartmentalize damage and grow new tissue over and around wounds. Understanding this process helps you
            make cuts that heal efficiently and attractively.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How trees close wounds</S.SubSectionTitle>
            <S.Paragraph>When a cut is made, the tree responds in two ways:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Compartmentalization</S.Bold>: The tree creates chemical and physical barriers to isolate the
              wound from healthy tissue. This prevents decay from spreading into the trunk. The wood exposed by the cut
              will never become healthy wood again—it is sealed off.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Callus formation</S.Bold>: The cambium layer (the thin growing layer just beneath the bark) begins
              producing callus tissue around the wound edges. This callus gradually rolls inward over the exposed wood.
              Given enough time, it may completely cover the wound.
            </S.Paragraph>
            <S.Paragraph>
              The key insight: healing comes from the edges, not from within the wound. A wound heals fastest when it
              has the shortest distance from edge to center.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison illustration: two wounds of equal area—one circular and one elongated—showing how the elongated
              wound heals faster because edges are closer to the center throughout
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Cutting for fast healing</S.SubSectionTitle>
            <S.Paragraph>Several factors affect healing speed:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Wound shape</S.Bold>: Elongated wounds parallel to the trunk heal faster than round wounds. When
              removing branches, cut close to the trunk but preserve the branch collar—the slightly swollen area at the
              branch base where healing tissue concentrates.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Wound size</S.Bold>: Smaller wounds heal faster. When possible, reduce branch size over time
              rather than removing large branches in one cut.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Cut cleanliness</S.Bold>: Clean cuts from sharp tools heal faster than ragged cuts from dull tools
              or torn branches. Torn tissue extends the wound boundary irregularly.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Location</S.Bold>: Wounds on vigorous parts of the tree heal faster. A wound on an actively
              growing branch heals faster than one on a struggling branch.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The branch collar and cutting angle</S.SubSectionTitle>
            <S.Paragraph>
              The <S.Bold>branch collar</S.Bold> is the swollen area where a branch joins a larger branch or trunk. It
              contains specialized tissue that compartmentalizes wounds and generates callus growth. Proper cuts
              preserve the branch collar.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Too close (flush cut)</S.Bold>: destroys the branch collar and its healing tissue; creates
                larger wound that heals slowly; may allow decay into trunk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Too far (stub)</S.Bold>: leaves dead wood that cannot heal over; stub dies back and may harbor
                decay
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Correct cut</S.Bold>: just outside the branch collar; preserves healing tissue; allows clean
                callus formation
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Diagram: branch collar anatomy showing correct cutting line, with comparison to flush cut (too close) and
              stub cut (too far)—including resulting callus patterns for each
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Concave cuts and carving</S.SubSectionTitle>
            <S.Paragraph>
              Bonsai practitioners often use <S.Bold>concave cutters</S.Bold>—tools that create a slightly hollow cut
              rather than a flat cut. The hollow allows callus to roll over the wound and eventually produce a flat or
              slightly convex healed surface rather than a raised bump.
            </S.Paragraph>
            <S.Paragraph>For larger wounds, carving the edges can accelerate healing:</S.Paragraph>
            <S.List>
              <S.ListItem>Smooth any ragged bark edges with a sharp knife</S.ListItem>
              <S.ListItem>
                Create a slight hollow in the wound center so callus growth produces a smooth surface
              </S.ListItem>
              <S.ListItem>Taper the edges to allow bark to roll over naturally</S.ListItem>
            </S.List>
            <S.Paragraph>
              This detailed wound treatment matters most for prominent wounds on the trunk or visible primary branches.
              Small cuts on secondary branches heal fine without special treatment.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Wound sealers: use and controversy</S.SubSectionTitle>
            <S.Paragraph>
              Wound sealers are paste-like products applied to cuts. Their role in bonsai is debated:
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Potential benefits</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Reduce moisture loss from exposed tissue</S.ListItem>
              <S.ListItem>Protect wounds from contamination during vulnerable early period</S.ListItem>
              <S.ListItem>Provide visual cover for unsightly cuts during display</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Potential drawbacks</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>May trap moisture and promote fungal growth in some conditions</S.ListItem>
              <S.ListItem>Does not speed actual healing (which depends on cambium activity)</S.ListItem>
              <S.ListItem>Can delay detection of problems beneath the sealer</S.ListItem>
            </S.List>
            <S.Paragraph>
              Research in arboriculture generally finds wound sealers do not improve healing in full-sized trees. In
              bonsai, opinions vary. If used, apply thinly and only to larger wounds. Many experienced practitioners
              skip sealers entirely except for cosmetic purposes or specific situations like preventing sap bleeding on
              pines.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Species variation in healing</S.SubSectionTitle>
            <S.Paragraph>Healing rates vary dramatically between species:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Fast healers</S.Bold>: ficus, elm, trident maple—produce abundant callus, close wounds quickly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moderate healers</S.Bold>: most deciduous species—reasonable healing with proper technique
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Slow healers</S.Bold>: pines, spruces, most conifers—limited callus production, wounds remain
                visible for many years
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Plan your pruning strategy around species characteristics. On slow-healing species, every visible cut
              matters because the scar will persist. On fast healers, more aggressive techniques become practical.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Tools and Technique</S.SectionTitle>
          <ImagePlaceholder>
            Tool identification illustration: essential pruning tools—bypass shears, concave cutters, knob cutters, jin
            pliers, pruning saw—with labeled parts and typical uses for each
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Essential pruning tools</S.SubSectionTitle>
            <S.Paragraph>Quality tools make clean cuts possible:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Bypass shears</S.Bold>: scissor-action cutting for shoots and small branches; the workhorse tool
                for maintenance pruning
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Concave cutters</S.Bold>: create hollow cuts for branch removal; essential for wounds that need
                smooth healing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Knob cutters</S.Bold>: spherical cutting action for removing stubs and knobs; produce clean
                hollow wounds
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wire cutters</S.Bold>: specifically designed to cut wire close to bark without damaging the
                branch
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pruning saw</S.Bold>: for branches too large for cutters; use pull-stroke saws for control
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Keeping tools sharp and clean</S.SubSectionTitle>
            <S.Paragraph>
              Dull tools crush tissue rather than cutting cleanly. Crushed tissue dies back beyond the cut line and
              heals slowly. Maintain sharp edges on all cutting tools.
            </S.Paragraph>
            <S.Paragraph>
              Clean tools between trees to prevent disease transmission. A quick wipe with rubbing alcohol or dilute
              bleach solution is sufficient. This is especially important after working on trees showing signs of
              disease.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Making the cut</S.SubSectionTitle>
            <S.List>
              <S.ListItem>Position the tool before cutting—ensure correct angle and location</S.ListItem>
              <S.ListItem>Cut decisively—hesitation causes crushing and tearing</S.ListItem>
              <S.ListItem>Support the branch being removed—do not let it fall and tear bark</S.ListItem>
              <S.ListItem>
                For large branches, use the three-cut method: undercut first to prevent tearing, then top cut to remove
                weight, then final cut to proper position
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: pruning decision framework showing structural vs maintenance decision, bud selection
            compass, staged reduction timeline, and wound healing stages
          </ImagePlaceholder>
          <S.Paragraph>
            Pruning is the foundation of bonsai technique. Through thoughtful removal of growth, we guide trees toward
            aesthetic goals while maintaining their health and vigor. Every cut teaches the tree something—make sure the
            lesson serves your long-term vision.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Match pruning type to development stage</S.Bold>. Structural pruning establishes framework during
            early development; maintenance pruning preserves and refines that framework over time. Know which phase your
            tree is in and prune accordingly.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Use directional pruning to guide growth</S.Bold>. Every cut is an instruction. Select buds that
            point in the direction you want growth to continue. Build taper and movement through successive cycles of
            extension and reduction.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Reduce coarse growth gradually</S.Bold>. Dramatic single cuts create problems—large wounds, energy
            imbalance, weak regrowth. Stage reductions over seasons, maintaining foliage throughout the process.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Cut for efficient healing</S.Bold>. Preserve the branch collar, make clean cuts with sharp tools,
            and shape wounds to allow callus to roll over smoothly. Know your species' healing characteristics and plan
            accordingly.
          </S.Paragraph>
          <S.Paragraph>
            With practice, pruning becomes intuitive—you see not just the tree as it is but as it will become through
            your guidance. This vision, combined with technical skill, is what transforms raw material into refined
            bonsai.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-15" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter15;
