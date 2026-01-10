import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter4: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 4: Trunk</S.Title>

        <ImagePlaceholder>
          Full-page image: cross-section of a mature bonsai trunk showing growth rings, cambium layer, bark, heartwood,
          and sapwood with labels
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            The trunk is the central visual element of any bonsai. It connects the root base to the canopy, carries
            water and nutrients between them, and stores the reserves that allow the tree to survive stress and push new
            growth. More than any other feature, the trunk communicates the tree's age, history, and character.
          </S.Paragraph>
          <S.Paragraph>
            A well-developed trunk shows <S.Bold>taper</S.Bold>—thicker at the base, narrowing toward the apex. It has{' '}
            <S.Bold>movement</S.Bold>—subtle curves and directional changes that create visual interest. And it carries
            the marks of time: textured bark, healed wounds, and the accumulated evidence of decades or centuries of
            growth.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>How trunks thicken</S.Bold>: the cambium, growth rings, and what drives diameter increase
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Taper, movement, and trunk line</S.Bold>: the visual qualities that define trunk character
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Sacrifice branches</S.Bold>: using temporary branches to accelerate trunk development
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Healing and scar formation</S.Bold>: how trees respond to wounds and what this means for styling
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Creating age</S.Bold>: bark development, deadwood, and the long-term cultivation of character
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>How Trunks Thicken</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: cross-section of a trunk showing the cambium as a thin ring between bark and wood, with arrows
            indicating that new wood forms inward and new bark forms outward
          </ImagePlaceholder>
          <S.Paragraph>
            Trees do not grow like animals. A branch does not get longer by stretching—it grows only at the tips. And a
            trunk does not get thicker by expanding from within—it adds new layers on the outside. Understanding this
            growth pattern is essential for developing bonsai trunks.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The cambium layer</S.SubSectionTitle>
            <S.Paragraph>
              All trunk thickening happens in a single layer of actively dividing cells called the{' '}
              <S.Bold>cambium</S.Bold>. This thin cylinder of tissue lies just beneath the bark and surrounds the entire
              trunk and all branches.
            </S.Paragraph>
            <S.Paragraph>The cambium produces two types of tissue:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Xylem</S.Bold> (wood) forms on the inside, adding to trunk diameter and creating the plumbing
                system that carries water upward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Phloem</S.Bold> (inner bark) forms on the outside, creating the tissue that transports sugars
                downward from leaves
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Each year's growth adds a new ring of xylem inside the cambium. This is why tree rings can be counted to
              determine age—each ring represents one season of cambial activity.
            </S.Paragraph>
            <ImagePlaceholder>
              Microscopic view: cambium layer magnified showing cell division, with arrows pointing to newly formed
              xylem cells on one side and phloem cells on the other
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Growth rings and what they reveal</S.SubSectionTitle>
            <S.Paragraph>
              In temperate climates, cambial activity follows a seasonal pattern. Growth is rapid in spring when water
              is abundant, producing large, thin-walled cells (early wood or spring wood). Growth slows in summer,
              producing smaller, denser cells (late wood or summer wood). This alternation creates visible rings.
            </S.Paragraph>
            <S.Paragraph>Ring width varies with growing conditions:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wide rings</S.Bold> indicate favorable years with abundant water, nutrients, and foliage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Narrow rings</S.Bold> indicate stress—drought, defoliation, root damage, or heavy pruning
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Asymmetric rings</S.Bold> develop when one side of the tree grows more than another, often in
                response to leaning or uneven light
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              For bonsai development, the implication is direct: trunk thickening requires vigorous growth. A tree kept
              heavily pruned in a small pot will add trunk diameter slowly. A tree given room to grow—in the ground or a
              large container—can add rings much faster.
            </S.Paragraph>
            <ImagePlaceholder>
              Cross-section showing growth rings: annotation pointing to wide rings ("favorable growing conditions") and
              narrow rings ("stress year"), with early wood and late wood labeled within a single ring
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What drives trunk thickening</S.SubSectionTitle>
            <S.Paragraph>Cambial activity—and therefore trunk thickening—depends on several factors:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Foliage mass</S.Bold>: leaves produce sugars through photosynthesis, and sugars fuel cambial
                growth. More foliage generally means faster thickening.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Water and nutrients</S.Bold>: adequate resources are necessary for cell division and expansion.
                Well-watered, well-fed trees grow faster.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hormones</S.Bold>: auxins produced in growing shoot tips travel downward and stimulate cambial
                activity. This is why trunks thicken more directly below active branches.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root health</S.Bold>: cytokinins from roots promote overall growth. A restricted or damaged root
                system limits what the top can achieve.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The practical consequence: trunk development is fastest when the tree is allowed to grow freely. Bonsai
              styling—which involves pruning, wiring, and containment—is inherently a compromise between development and
              refinement. Understanding when to prioritize each is central to bonsai strategy.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Taper, Movement, and Trunk Line</S.SectionTitle>
          <ImagePlaceholder>
            Three bonsai trunk silhouettes side by side: (1) straight trunk with no taper (marked as weak), (2) trunk
            with taper but no movement (acceptable), (3) trunk with taper and natural movement (ideal)
          </ImagePlaceholder>
          <S.Paragraph>
            The trunk is the backbone of bonsai design. Its shape establishes the tree's fundamental character before a
            single branch is considered. Three qualities define trunk excellence: <S.Bold>taper</S.Bold>,{' '}
            <S.Bold>movement</S.Bold>, and <S.Bold>trunk line</S.Bold>.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Taper</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Taper</S.Bold> refers to the gradual decrease in trunk diameter from base to apex. In nature,
              taper develops because the lower trunk has accumulated more years of cambial growth and must support more
              weight than the upper trunk.
            </S.Paragraph>
            <S.Paragraph>Taper creates several visual effects:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Age</S.Bold>: strong taper suggests decades of growth and gives a tree visual maturity
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stability</S.Bold>: a wide base narrowing upward looks anchored and permanent
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Scale</S.Bold>: taper helps a small tree read as a large tree in miniature
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The opposite—a trunk that maintains the same diameter or even widens above—looks unnatural and immature.
              This is called <S.Bold>reverse taper</S.Bold> and is considered a significant flaw.
            </S.Paragraph>
            <ImagePlaceholder>
              Side-by-side comparison: trunk with good taper vs trunk with reverse taper (caused by a branch swelling
              the trunk above), with measurements marked
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Developing taper</S.SubSectionTitle>
            <S.Paragraph>
              Taper does not happen automatically. A young tree grown without intervention often develops a straight,
              uniform trunk. Taper must be cultivated through deliberate techniques:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk chops</S.Bold>: cutting the trunk and allowing a new leader to develop from a side branch
                creates an abrupt change in diameter. Multiple chops at different heights build compound taper.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sacrifice branches</S.Bold>: allowing a branch to grow unchecked thickens the trunk below it
                (discussed in detail later in this chapter).
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ground growing</S.Bold>: planting in the ground accelerates overall growth, including trunk
                thickening at the base.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Selection</S.Bold>: choosing material that already has natural taper, such as collected trees or
                well-grown nursery stock.
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Step-by-step diagram: trunk chop technique showing (1) original straight trunk, (2) cut made above a side
              branch, (3) side branch trained as new leader, (4) result after healing showing taper at the transition
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Movement</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Movement</S.Bold> refers to the curves, bends, and directional changes in a trunk. A perfectly
              straight trunk can feel static or artificial. Movement adds visual interest and suggests that the tree has
              responded to environmental forces over its lifetime.
            </S.Paragraph>
            <S.Paragraph>Movement can be:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Subtle</S.Bold>: gentle curves that flow from base to apex, as in most informal upright styles
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dramatic</S.Bold>: sharp bends and directional changes, as in literati or cascade styles
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Directional</S.Bold>: a consistent lean or sweep suggesting wind or light response
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Movement should generally decrease toward the apex—larger, more dramatic curves in the lower trunk, with
              progressively finer curves above. This mirrors how flexibility changes with trunk thickness and
              contributes to the sense of natural development.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Creating movement</S.SubSectionTitle>
            <S.Paragraph>Movement must be established when the trunk is still flexible:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wiring young trunks</S.Bold>: heavy wire can bend young trunks into desired shapes, which then
                fix in place as the trunk thickens
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Guy wires and anchors</S.Bold>: pulling the trunk with wires attached to the pot or ground can
                create curves over time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trunk chops with directional leaders</S.Bold>: each chop can change the trunk's direction,
                building movement through successive cuts
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Selection</S.Bold>: choosing material with existing natural movement
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Once a trunk has thickened beyond a certain point, adding movement becomes extremely difficult or
              impossible without major intervention. This is why trunk design decisions must be made early in
              development.
            </S.Paragraph>
            <ImagePlaceholder>
              Before/after illustration: young straight trunk wired into curves, then the same tree years later with the
              curves locked in and the trunk thickened
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Trunk line</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Trunk line</S.Bold> refers to the visual path the eye follows from the base of the tree to the
              apex. A well-designed trunk line:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Is easy to follow from nebari to apex without confusion</S.ListItem>
              <S.ListItem>
                Shows consistent character throughout (curves get finer but maintain the same style)
              </S.ListItem>
              <S.ListItem>
                Positions the apex appropriately relative to the base (typically over the root spread for stability)
              </S.ListItem>
              <S.ListItem>Avoids abrupt changes in character or direction that break visual flow</S.ListItem>
            </S.List>
            <S.Paragraph>
              Common trunk line problems include: bar branches that visually interrupt the line, awkward trunk chop
              transitions, and reverse taper that creates bulges. These issues are easier to prevent during development
              than to correct later.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Sacrifice Branches</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: bonsai in development showing a large sacrifice branch growing freely from the lower trunk, with
            annotation showing the thickening effect on the trunk below the branch
          </ImagePlaceholder>
          <S.Paragraph>
            A <S.Bold>sacrifice branch</S.Bold> is a branch that is allowed to grow unchecked, not for its own sake, but
            to accelerate trunk development. The branch will eventually be removed—hence "sacrifice"—but while it grows,
            it serves critical developmental purposes.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How sacrifice branches work</S.SubSectionTitle>
            <S.Paragraph>The mechanism is straightforward:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Increased photosynthesis</S.Bold>: the sacrifice branch produces leaves, which produce sugars,
                which fuel growth throughout the tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Auxin flow</S.Bold>: hormones from the actively growing branch tip travel downward, stimulating
                cambial activity in the trunk below
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Vascular demand</S.Bold>: the branch requires water and nutrients, which the trunk must conduct,
                stimulating vascular development
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The result is that the trunk thickens more rapidly below a sacrifice branch than it would with that branch
              pruned back. This is one of the most effective techniques for building trunk caliper quickly.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Placement strategy</S.SubSectionTitle>
            <S.Paragraph>Where you place a sacrifice branch determines where the trunk thickens most:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Low sacrifice branch</S.Bold>: thickens the lower trunk and base, improving taper and nebari
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Mid-trunk sacrifice branch</S.Bold>: can help fill in a weak section or smooth a trunk chop
                transition
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Apex sacrifice</S.Bold>: allowing the leader to run builds the entire trunk line but sacrifices
                existing fine branching
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Multiple sacrifice branches can run simultaneously, though the tree's energy will be divided among them.
            </S.Paragraph>
            <ImagePlaceholder>
              Three-panel comparison: (1) sacrifice branch at base thickening the lower trunk, (2) sacrifice branch
              mid-trunk filling a transition zone, (3) apical sacrifice branch extending the entire trunk
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Managing sacrifice branches</S.SubSectionTitle>
            <S.Paragraph>Sacrifice branches require attention during their development:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Allow unrestricted growth</S.Bold>: do not prune, wire, or style the sacrifice branch—its
                purpose is to grow as vigorously as possible
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Monitor the scar</S.Bold>: the larger the branch grows, the larger the removal scar. There is a
                balance between maximum thickening benefit and acceptable scar size.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Plan the removal</S.Bold>: sacrifice branches are typically removed before they grow so thick
                that the scar becomes a permanent feature
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Consider position</S.Bold>: placing sacrifice branches on the back or sides of the trunk means
                any scar will be less visible in the final design
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to remove a sacrifice branch</S.SubSectionTitle>
            <S.Paragraph>
              The decision to remove a sacrifice branch involves tradeoffs. Keeping it longer provides more thickening
              benefit; removing it earlier limits scar size. General guidelines:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Remove when the trunk has reached the desired diameter for that section</S.ListItem>
              <S.ListItem>
                Remove before the branch diameter exceeds roughly one-third of the trunk diameter at that point, to keep
                the scar manageable
              </S.ListItem>
              <S.ListItem>
                Remove during the dormant season or early spring to minimize sap bleeding (species-dependent)
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              On species with good healing ability, even relatively large sacrifice branch scars can close over
              time—though this may take years or decades.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Healing and Scar Formation</S.SectionTitle>
          <ImagePlaceholder>
            Time-lapse sequence: large pruning wound on trunk showing (1) fresh cut, (2) callus beginning at edges after
            one growing season, (3) callus rolling inward after several years, (4) wound mostly closed with scar tissue
          </ImagePlaceholder>
          <S.Paragraph>
            Trees do not heal wounds the way animals do. When you cut your skin, new tissue fills the gap and the wound
            disappears. When you cut a tree, the wound remains—the tree grows around it, eventually sealing it off, but
            the damaged tissue stays inside forever.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The compartmentalization process</S.SubSectionTitle>
            <S.Paragraph>
              Trees respond to wounds through a process called <S.Bold>compartmentalization</S.Bold>. Instead of
              repairing damaged tissue, the tree walls it off:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Chemical barriers</S.Bold>: the tree deposits antimicrobial compounds around the wound to limit
                pathogen spread
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Structural barriers</S.Bold>: new growth forms walls of dense cells that isolate the damaged
                area from healthy tissue
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Callus formation</S.Bold>: the cambium at wound edges produces callus tissue that gradually
                rolls inward to cover the wound
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why wound placement matters permanently. A branch stub in the wrong location will always be
              there—even if callus eventually covers it, the wood beneath contains the sealed-off wound forever.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Callus and wound closure</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Callus</S.Bold> is the tissue that forms at wound margins and gradually grows to cover the exposed
              wood. Callus formation is driven by the cambium, so it only occurs where living cambium borders the wound.
            </S.Paragraph>
            <S.Paragraph>Factors affecting callus speed:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Species</S.Bold>: some species (like trident maple) produce callus rapidly; others (like pines)
                are much slower
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree vigor</S.Bold>: a healthy, actively growing tree produces callus faster than a stressed or
                weak one
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wound size</S.Bold>: smaller wounds close faster; large wounds may never fully close
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wound shape</S.Bold>: wounds that are taller than wide close faster because callus rolls in from
                the sides where it forms most readily
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Season</S.Bold>: wounds made during active growth typically begin healing faster than wounds
                made during dormancy
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Comparison diagram: round wound vs elongated vertical wound, showing how the elongated wound closes faster
              because callus travels less distance from each side
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Pruning cuts for healing</S.SubSectionTitle>
            <S.Paragraph>
              How you make a pruning cut affects how well it heals. The goal is to minimize wound size while leaving
              healthy cambium at all edges:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Avoid flush cuts</S.Bold>: cutting perfectly flush with the trunk removes the branch collar (the
                slightly swollen ring where the branch meets the trunk), which contains the cambium best positioned to
                produce callus
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid long stubs</S.Bold>: leaving a protruding stub means the wound edge is far from the trunk,
                and the stub will die back and rot
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cut to the branch collar</S.Bold>: the ideal cut removes the branch just outside the collar,
                leaving the collar intact to drive healing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clean cuts</S.Bold>: use sharp tools; torn or crushed tissue heals slower than clean cuts
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Three-part diagram showing: flush cut (too close, removes collar), stub cut (too long, will die back),
              correct cut (just outside the branch collar)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Concave cutters and wound carving</S.SubSectionTitle>
            <S.Paragraph>
              In bonsai, specialized techniques are used to improve healing and minimize visible scarring:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Concave cutters</S.Bold>: these tools create a slightly hollow cut rather than a flat one,
                allowing callus to roll over and eventually create a smoother surface
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wound carving</S.Bold>: shaping the wound edges to be clean and slightly tapered can improve how
                callus forms
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Vertical orientation</S.Bold>: when possible, elongating wounds vertically rather than
                horizontally speeds closure
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These techniques are most important for large cuts on featured portions of the trunk. For small cuts or
              cuts on the back of the tree, standard pruning is usually sufficient.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Wound sealers</S.SubSectionTitle>
            <S.Paragraph>
              The use of wound sealers in bonsai is debated. Research on full-sized trees generally shows that sealers
              do not speed healing and may even slow it by trapping moisture or preventing gas exchange. However, some
              bonsai practitioners use cut paste for specific purposes:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Preventing desiccation</S.Bold>: in dry climates, sealing can prevent wound edges from drying
                out before callus forms
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cosmetic darkening</S.Bold>: some pastes darken the wound surface, making it less visible during
                display
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species-specific uses</S.Bold>: certain species that bleed heavily (like maples) may benefit
                from sealing to reduce sap loss
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              If using wound sealer, apply only a thin layer to the cut surface—do not cover the cambium at the wound
              edges, as this can impede callus formation.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Creating Age: Bark, Wounds, and Time</S.SectionTitle>
          <ImagePlaceholder>
            Photo comparison: young tree with smooth bark vs mature tree of the same species with deeply fissured,
            plated bark showing decades of character
          </ImagePlaceholder>
          <S.Paragraph>
            The ultimate goal of trunk development is to create a tree that appears old, even if it is not. Age is
            communicated through multiple features: bark texture, trunk taper, healed wounds, deadwood, and the
            accumulated evidence of environmental history. Some of these develop naturally over decades; others can be
            accelerated or simulated through deliberate technique.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Bark development</S.SubSectionTitle>
            <S.Paragraph>
              Bark character is largely species-dependent. Some trees develop deeply fissured, craggy bark at relatively
              young ages; others remain smooth for decades. However, certain factors influence bark development:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk diameter</S.Bold>: bark typically becomes more textured as trunks thicken, because the
                outer layers crack as they are stretched by inner growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Growing conditions</S.Bold>: trees grown in full sun with good air circulation often develop
                more textured bark than those grown in protected conditions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species selection</S.Bold>: if textured bark is important to you, choose species known for
                developing it (cork bark elm, cork oak, certain pines)
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Bark cannot be rushed significantly. Techniques that claim to "age" bark quickly are largely cosmetic.
              Real bark character comes from real growth over real time.
            </S.Paragraph>
            <ImagePlaceholder>
              Grid showing bark types: smooth bark (beech), fissured bark (oak), plated bark (pine), peeling bark
              (birch), corky bark (cork elm)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Deadwood: jin and shari</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Deadwood</S.Bold> is exposed wood that has died but remains attached to the tree. In nature, this
              occurs when branches die from shading, damage, or disease, or when portions of the trunk are killed by
              lightning, wind, or other trauma. In bonsai, deadwood is often created deliberately to suggest age and
              hardship.
            </S.Paragraph>
            <S.Paragraph>Two main types of deadwood are recognized:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Jin</S.Bold>: a dead branch, typically stripped of bark and bleached or treated to prevent rot
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Shari</S.Bold>: a dead area on the trunk where bark has been removed to expose the wood beneath
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Deadwood is most associated with conifers, particularly pines and junipers, which have resinous wood that
              resists decay. On deciduous trees, deadwood tends to rot quickly and is used less commonly—though it can
              be effective on certain species.
            </S.Paragraph>
            <ImagePlaceholder>
              Annotated bonsai showing examples of jin (dead branches at apex and mid-trunk) and shari (exposed wood
              strip running down the trunk)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Creating deadwood</S.SubSectionTitle>
            <S.Paragraph>Deadwood can be created from living material through several techniques:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Jinning a branch</S.Bold>: bark is stripped from a branch (often after the branch is killed by
                wire strangulation or simply broken). The exposed wood is then shaped with carving tools and treated to
                preserve it.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Creating shari</S.Bold>: a strip of bark is removed from the trunk, exposing the wood. The strip
                should follow the tree's natural lines and must not encircle the trunk completely (which would kill the
                tree above that point).
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Carving and shaping</S.Bold>: power tools or hand tools are used to shape deadwood into
                naturalistic forms, removing sharp edges and creating the weathered appearance of aged wood.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Deadwood creation is a significant intervention that cannot be undone. It should be planned carefully and
              executed with restraint—overdone deadwood looks artificial and can dominate a design rather than enhance
              it.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Preserving deadwood</S.SubSectionTitle>
            <S.Paragraph>
              Exposed dead wood is vulnerable to decay, especially in humid climates. Preservation techniques include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Lime sulfur</S.Bold>: a traditional treatment that bleaches the wood white and provides some
                protection against rot and insects
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wood hardeners</S.Bold>: penetrating resins that stabilize soft or punky wood
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Keeping it dry</S.Bold>: protecting deadwood from constant moisture is the most effective
                preservation strategy
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Deadwood requires ongoing maintenance. Even treated wood will eventually decay if conditions are
              unfavorable. In very humid climates, maintaining extensive deadwood features may require significant
              effort.
            </S.Paragraph>
            <ImagePlaceholder>
              Before/after comparison: untreated weathered deadwood vs the same piece after lime sulfur treatment
              showing bleached white appearance
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Scar incorporation</S.SubSectionTitle>
            <S.Paragraph>
              Not all scars are flaws to be hidden. Large, well-healed scars can become features that suggest history
              and survival. The key is intention:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Scars that tell a story</S.Bold>: a dramatic trunk chop scar, well healed, can suggest that the
                tree survived a major trauma and recovered
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Scars in context</S.Bold>: scars work better on trees styled to suggest hardship (literati,
                windswept) than on refined, formal designs
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Integration over time</S.Bold>: as callus develops and bark grows over scar edges, what started
                as an obvious wound can become an integrated part of the trunk's character
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Some of the most powerful bonsai incorporate significant scars as central features. The difference between
              a flaw and a feature is often a matter of intention, placement, and integration with the overall design.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The role of time</S.SubSectionTitle>
            <S.Paragraph>Many qualities that communicate age cannot be faked or accelerated significantly:</S.Paragraph>
            <S.List>
              <S.ListItem>Deeply textured bark develops over decades</S.ListItem>
              <S.ListItem>Deadwood weathers and grays naturally over years</S.ListItem>
              <S.ListItem>Large scars close slowly, sometimes over a human lifetime</S.ListItem>
              <S.ListItem>The subtle refinement of trunk taper and line improves with each growing season</S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why mature bonsai from Japan—trees that have been in cultivation for generations—command such
              respect and value. They represent not just skill, but the irreplaceable accumulation of time. For those
              developing trees from young material, this is both humbling and motivating: the work you do now
              establishes the foundation for what the tree can become decades hence.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: trunk cross-section with cambium highlighted, examples of good taper and
            movement, sacrifice branch concept, wound healing stages, and deadwood types (jin and shari)
          </ImagePlaceholder>
          <S.Paragraph>
            The trunk is the structural and visual core of every bonsai. Understanding how trunks grow—through the
            cambium layer adding new wood each season—explains why development requires time and why restriction limits
            thickening. The visual qualities that define excellent trunks—taper, movement, and a clear trunk line—must
            be established early, while the trunk is still flexible enough to shape.
          </S.Paragraph>
          <S.Paragraph>
            Sacrifice branches are among the most powerful tools for accelerating trunk development. By allowing
            temporary branches to grow unrestricted, practitioners can build trunk diameter and taper far faster than
            careful pruning alone would permit. The tradeoff is scar management: every sacrifice branch eventually
            leaves a wound that must heal.
          </S.Paragraph>
          <S.Paragraph>
            Trees heal wounds by compartmentalizing—walling off damage and growing around it rather than repairing it.
            Understanding this process informs pruning technique: proper cuts, wound placement, and patience all
            contribute to successful healing. Large wounds may take years to close, and some never fully heal.
          </S.Paragraph>
          <S.Paragraph>
            Creating the appearance of age involves bark development, deadwood features, scar incorporation, and above
            all, time. While techniques exist to accelerate or simulate age, the most convincing results come from
            actual years of growth and care. The trunk you develop today will continue to improve for decades—or
            longer—making early decisions about taper, movement, and structure among the most consequential in bonsai
            practice.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-4" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter4;
