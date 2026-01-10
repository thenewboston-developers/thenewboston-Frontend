import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter20: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 20: Styles</S.Title>

        <ImagePlaceholder>
          Illustration: gallery of bonsai styles arranged in a visual grid—showing silhouettes of formal upright,
          informal upright, slant, cascade, semi-cascade, literati, broom, forest planting, and root-over-rock, each
          with its distinctive trunk line and form
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Bonsai styles are not arbitrary categories imposed by tradition—they are observations of how trees grow in
            nature. Each style represents a common growth pattern shaped by specific environmental conditions. A formal
            upright reflects ideal growing conditions. A cascade represents a tree clinging to a cliff face. A windswept
            form tells of constant prevailing winds.
          </S.Paragraph>
          <S.Paragraph>
            Understanding styles helps you recognize what a tree wants to become. When you look at raw material, you
            ask: what story does this trunk tell? What environment would produce this shape? The answer guides your
            styling decisions. Fighting the material's natural inclination produces unconvincing results; working with
            it creates believable trees.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Single-trunk styles</S.Bold>: formal upright, informal upright, slant, cascade, semi-cascade,
              literati, and broom
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Multi-trunk and group styles</S.Bold>: clump, forest, and raft
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Specialty styles</S.Bold>: root-over-rock and other compositions
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Biological requirements</S.Bold>: what each style demands from the tree
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Common mistakes and corrections</S.Bold>: diagnosing and fixing style errors
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Formal Upright (Chokkan)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: formal upright style showing perfectly straight vertical trunk with symmetrical branch
            arrangement, classic triangular silhouette, visible taper from base to apex, and branches reducing in length
            as they ascend
          </ImagePlaceholder>
          <S.Paragraph>
            Formal upright represents a tree growing in ideal conditions—abundant light from above, no competition, no
            wind stress. The trunk grows perfectly straight and vertical, tapering smoothly from a broad base to a fine
            apex.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk</S.Bold>: straight, vertical, centered over the root base, with continuous taper
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Apex</S.Bold>: directly above the trunk base, completing the vertical line
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branches</S.Bold>: emerge at regular intervals, alternating left and right with back branches
                for depth; lowest branch is thickest, subsequent branches progressively thinner and shorter
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Silhouette</S.Bold>: roughly triangular, widest at the bottom, narrowing to the apex
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Formal upright is demanding because nothing is hidden. Every flaw in trunk straightness, taper, or branch
              placement is visible. This style suits species with naturally straight growth: pines, junipers, spruces,
              and other conifers that grow toward light with minimal movement.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species considerations</S.Bold>: Most deciduous trees look unnatural in formal upright because
              their growth is responsive to light competition—they lean, twist, and bend. Maples, elms, and similar
              species rarely produce convincing formal uprights.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Slight lean</S.Bold>: even a few degrees off vertical ruins the style; check with a plumb line
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Apex drift</S.Bold>: the apex must be directly above the base, not shifted to one side
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reverse taper</S.Bold>: any thickening above the base destroys the illusion of height
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Monotonous spacing</S.Bold>: perfectly equal spacing looks artificial; slight variation feels
                natural
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Informal Upright (Moyogi)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: informal upright style showing trunk with graceful curves that move back toward center,
            branches emerging from outside of curves, apex positioned over or near the root base despite trunk movement
          </ImagePlaceholder>
          <S.Paragraph>
            Informal upright is the most common bonsai style and the most forgiving. The trunk moves—curving, leaning,
            responding to imagined forces—but ultimately the apex returns to a position over or near the base. This
            suggests a tree that has experienced some adversity but has grown strong despite it.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk</S.Bold>: curved with visible movement, but overall vertical tendency; taper continuous
                through curves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Apex</S.Bold>: positioned over or near the trunk base; may tilt slightly toward the viewer
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branches</S.Bold>: emerge from the outside of curves (where strength concentrates), creating
                natural flow
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Movement</S.Bold>: curves should vary in radius and direction; avoid uniform S-curves
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Informal upright works with almost any species. The style accommodates natural trunk movement and allows
              for asymmetric branch placement. This flexibility makes it ideal for nursery stock and collected material
              that does not fit stricter styles.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>The key principle</S.Bold>: branches emerge from the outside of curves. In nature, the outside of
              a curve receives more light and less mechanical stress, so branches there grow stronger. Branches on the
              inside of curves look wrong and usually should be removed.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: branch placement on curves—showing correct placement on outside of curves where tissue is
              stronger and light is better, versus incorrect inside placement that appears unnatural
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Apex too far off center</S.Bold>: if the apex is not roughly above the base, the tree becomes a
                slant style
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Uniform curves</S.Bold>: identical S-bends look mechanical; vary the radius and spacing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inside branches</S.Bold>: branches on the inside of curves disrupt visual flow
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Flat curves</S.Bold>: all movement in one plane looks artificial; curves should move in three
                dimensions
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Slant (Shakan)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: slant style showing trunk leaning at significant angle (30-45 degrees) from vertical, with
            branches and roots providing counterbalance, apex extending in direction of lean rather than returning to
            center
          </ImagePlaceholder>
          <S.Paragraph>
            Slant style represents a tree grown under persistent directional force—wind from one direction, light from
            the side, or slope influence. The trunk leans significantly (typically 30-80 degrees from vertical) with the
            apex extending in the direction of lean rather than returning to center.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk</S.Bold>: leans at a consistent angle; may be straight or curved but maintains directional
                lean throughout
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Apex</S.Bold>: extends in the direction of lean, not above the base
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Roots</S.Bold>: strong surface roots on the side opposite the lean, creating visual anchor
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branch distribution</S.Bold>: often more branching on the side opposite the lean, creating
                counterbalance
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              The critical element in slant style is the root structure. A leaning tree without visible anchoring roots
              looks unstable—like it might fall over. Strong nebari on the opposite side of the lean creates the visual
              foundation that makes the angle believable.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Branch balance</S.Bold>: branches typically extend more toward the side opposite the lean,
              counterbalancing the trunk weight. A first branch on the lean side should be shorter and lighter than
              branches on the opposite side.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Weak root structure</S.Bold>: without visible anchoring roots, the tree looks precarious rather
                than intentional
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inconsistent angle</S.Bold>: the lean should be consistent; curves that change the angle confuse
                the style
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Poor pot positioning</S.Bold>: the tree should be placed with more pot visible on the lean side,
                using negative space to balance the mass
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Cascade (Kengai) and Semi-Cascade (Han-Kengai)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: side-by-side comparison of cascade and semi-cascade styles—cascade showing main growth
            descending well below the pot bottom, semi-cascade showing growth extending below the rim but not below the
            base, both in appropriate tall pots
          </ImagePlaceholder>
          <S.Paragraph>
            Cascade styles represent trees growing on cliffs, overhangs, or steep slopes where gravity pulls growth
            downward. The trunk descends below the pot rim (semi-cascade) or below the pot bottom (full cascade),
            creating dramatic vertical compositions.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Cascade (Kengai)</S.SubSectionTitle>
            <S.Paragraph>
              In full cascade, the trunk and foliage descend below the bottom of the pot. This extreme form represents a
              tree clinging to a cliff face, reaching down toward water or light below.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk movement</S.Bold>: typically emerges upward briefly, then curves dramatically downward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Terminal growth</S.Bold>: the lowest point is the visual terminus, often with a strong foliage
                pad
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Counter-apex</S.Bold>: a smaller upward-growing section near the base provides visual balance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pot selection</S.Bold>: tall, often round or hexagonal pots elevate the tree, allowing the
                cascade to fall freely
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Semi-Cascade (Han-Kengai)</S.SubSectionTitle>
            <S.Paragraph>
              Semi-cascade is the moderate form—the trunk extends below the rim but not below the base of the pot. This
              represents less extreme conditions: a tree on a slope or modest overhang.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Extension</S.Bold>: growth extends horizontally or slightly downward, below rim but above base
              </S.ListItem>
              <S.ListItem>
                <S.Bold>More natural for many species</S.Bold>: semi-cascade accommodates species that do not naturally
                cascade dramatically
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pot selection</S.Bold>: medium-depth pots work well; very tall pots are not necessary
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Cascade is biologically challenging because trees naturally grow toward light—upward, not downward.
              Maintaining a cascade requires constant correction as the tree tries to redirect growth upward.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species selection</S.Bold>: flexible species with pendulous growth habit work best—junipers,
              certain pines, willows, and flowering species like wisteria. Stiff, strongly upward-growing species fight
              the style constantly.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Energy management</S.Bold>: the tree wants to send energy to the highest point. In cascade, this
              means the counter-apex tends to dominate while the cascade weakens. Regular pruning of the upper growth
              redirects energy downward.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: energy distribution in cascade—showing natural tendency for strength to concentrate in upper
              growth, and pruning strategy to maintain balance between counter-apex and cascade
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Weak cascade terminus</S.Bold>: the lowest point should be strong and well-developed, not thin
                and weak
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dominant counter-apex</S.Bold>: if the upward growth overpowers the cascade, the composition
                fails
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wrong pot</S.Bold>: a shallow pot with a full cascade looks cramped and unstable
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Unbelievable angle</S.Bold>: the transition from upward to downward growth must look natural,
                not forced
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Broom (Hokidachi)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: broom style showing straight trunk that divides into multiple branches radiating upward and
            outward at roughly equal angles, creating fine ramification and a rounded dome silhouette like an upturned
            broom
          </ImagePlaceholder>
          <S.Paragraph>
            Broom style represents deciduous trees growing in open spaces without competition—the classic park tree
            silhouette. A straight trunk divides at a point into multiple branches that radiate outward and upward,
            creating a rounded or dome-shaped crown.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk</S.Bold>: straight, often relatively short compared to total height, dividing at one point
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branch structure</S.Bold>: multiple primary branches emerge from approximately the same point,
                radiating outward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ramification</S.Bold>: extensive fine branching creating the "broom" effect, especially visible
                in winter silhouette
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crown shape</S.Bold>: rounded or dome-like, wider than tall
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Broom style demands extensive ramification—the intricate network of fine twigs that creates the
              characteristic silhouette. This takes years to develop through careful pruning and is the style's primary
              refinement marker.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species selection</S.Bold>: deciduous trees with fine branching work best—zelkova is the classic
              broom species, but elms, maples, and similar trees can be effective. Conifers are inappropriate; their
              needle growth patterns do not create the required effect.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Seasonal display</S.Bold>: broom style trees are often displayed in winter when the bare branches
              reveal the ramification pattern. The summer silhouette shows full foliage; the winter silhouette shows
              structure.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Visible division point</S.Bold>: where branches divide from the trunk should be smooth, not a
                knobby junction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Insufficient ramification</S.Bold>: without fine branching, the style has no impact
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Unbalanced crown</S.Bold>: branches should radiate evenly; gaps or heavy sides destroy the form
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wrong species</S.Bold>: attempting broom style with conifers or coarse-branching species
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Literati (Bunjin)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: literati style showing tall, thin, dramatically curved trunk with minimal branching
            concentrated near the apex, sparse elegant appearance suggesting age and struggle, unconventional form that
            breaks standard rules
          </ImagePlaceholder>
          <S.Paragraph>
            Literati is the rebel among bonsai styles—deliberately breaking conventional rules to achieve artistic
            effect. Named after the Chinese scholar-painters who favored spare, elegant brushwork, literati bonsai
            feature tall thin trunks with dramatic movement and minimal foliage.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk</S.Bold>: tall, thin, with dramatic curves and movement; intentionally violates normal
                taper ratios
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branches</S.Bold>: minimal, concentrated near the apex; lower trunk bare or nearly so
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Foliage</S.Bold>: sparse, not masking the trunk line
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Overall impression</S.Bold>: elegant struggle, survival against odds, artistic rather than
                naturalistic
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Literati represents trees competing for light in dense forest conditions—all energy sent upward toward
              light, lower branches shaded out and lost. The style depicts a survivor, not a thriving specimen.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species selection</S.Bold>: pines and junipers are traditional choices; their sparse foliage and
              ability to survive with minimal growth suit the style. Species with dense foliage or strong growth
              patterns fight the aesthetic.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>The trunk is everything</S.Bold>: literati success depends almost entirely on trunk quality. A
              dramatic, compelling trunk line with interesting movement carries the design. Without it, the tree looks
              merely sparse rather than elegantly minimal.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison diagram: literati trunk lines—showing effective dramatic movement with varying curves and
              interesting line versus weak straight or uniformly curved trunks that fail to engage the eye
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Boring trunk</S.Bold>: without compelling trunk movement, literati fails entirely
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Too much foliage</S.Bold>: literati should feel spare; heavy foliage obscures the line
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stiff curves</S.Bold>: wire-imposed curves look mechanical; literati movement should feel
                organic
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heavy pot</S.Bold>: literati typically uses shallow, often round or unglazed pots that do not
                compete with the delicate form
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Clump (Kabudachi) and Multi-Trunk Styles</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: clump style showing multiple trunks emerging from a single root base, with varying trunk sizes
            creating visual hierarchy, unified but asymmetric arrangement, shared root system visible at base
          </ImagePlaceholder>
          <S.Paragraph>
            Clump style features multiple trunks arising from a single root system. This occurs naturally when a tree
            sends up shoots from its base, or when seeds germinate close together and merge. The trunks share resources
            and create a unified composition.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Root connection</S.Bold>: all trunks emerge from a single base or connected root system
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trunk variation</S.Bold>: trunks vary in size, with one dominant; odd numbers traditional
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Unity</S.Bold>: despite multiple trunks, the composition reads as one tree, not a crowd
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Spacing</S.Bold>: trunks should not cross or compete; clear space between each
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Twin trunk (Sokan)</S.SubSectionTitle>
            <S.Paragraph>
              The simplest multi-trunk form—two trunks from one base. One trunk dominates; the other is subordinate.
              They should not be equal in size or mirror images of each other. The trunks typically lean slightly away
              from each other while maintaining visual connection.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Multi-trunk compositions require careful balance. The dominant trunk receives most energy; subordinate
              trunks need protection from being overwhelmed. Pruning maintains hierarchy while keeping all trunks
              healthy.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species selection</S.Bold>: species that naturally produce basal shoots work well—maples, elms,
              and many deciduous trees. Creating clumps from multiple seedlings planted together is also possible but
              requires careful root work to achieve connection.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Equal trunks</S.Bold>: one must dominate; equal trunks create visual competition
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crossing trunks</S.Bold>: trunks that cross look tangled and confusing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Even spacing</S.Bold>: trunks at regular intervals look planted rather than natural
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Disconnected appearance</S.Bold>: trunks should clearly relate to each other, not appear
                randomly grouped
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Forest (Yose-ue)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: forest planting showing multiple individual trees arranged to create perspective and depth,
            with larger trees in foreground and smaller trees toward back, open spaces suggesting paths or clearings,
            unified canopy creating forest impression
          </ImagePlaceholder>
          <S.Paragraph>
            Forest planting creates a miniature woodland from multiple individual trees. Unlike clump style, each tree
            is separate, planted together to create an impression of forest. This style emphasizes composition and
            spacing over individual tree development.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Multiple trees</S.Bold>: typically odd numbers—5, 7, 9, or more—planted in a shallow container
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Size variation</S.Bold>: trees vary in size to create perspective; larger trees forward, smaller
                toward the back
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Spacing</S.Bold>: irregular groupings suggesting natural forest growth patterns
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Unified canopy</S.Bold>: individual crowns blend into a cohesive overall form
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Creating perspective</S.SubSectionTitle>
            <S.Paragraph>
              Forest plantings use perspective tricks to suggest depth greater than the container allows:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Size graduation</S.Bold>: larger trees in front, progressively smaller toward the back
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Spacing</S.Bold>: wider spacing in foreground, tighter toward the back
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Position</S.Bold>: primary tree (largest) typically off-center; secondary group creates balance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clear paths</S.Bold>: open spaces between groups suggest trails through the forest
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Diagram: forest composition showing primary tree, secondary grouping, perspective depth with size
              graduation, and open spaces creating visual paths through the composition
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Forest plantings require managing competition. Trees fight for resources; without intervention, dominant
              trees suppress weak ones. Regular maintenance keeps all trees healthy and maintains the intended size
              relationships.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species selection</S.Bold>: use the same species throughout (or closely related species that
              match). A forest of different species looks like a nursery row rather than a natural woodland.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Grid planting</S.Bold>: regular spacing looks artificial; natural forests have irregular
                groupings
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Same size trees</S.Bold>: without size variation, the forest looks flat and lacks depth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trunk alignment</S.Bold>: trunks in a row look planted; stagger positions front to back
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Mixed species</S.Bold>: different species confuse the composition and look unnatural
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Raft (Ikadabuki)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: raft style showing a tree originally growing sideways, with original branches now growing as
            individual trunks and original trunk becoming root base, creating effect of trees growing along a fallen log
          </ImagePlaceholder>
          <S.Paragraph>
            Raft style creates multiple trees from a single specimen laid on its side. The original branches become new
            trunks; the original trunk becomes the connecting root system. This mimics nature when a tree falls but
            survives, sending branches upward as new growth.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Defining characteristics</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Base connection</S.Bold>: all "trees" connect along a single horizontal trunk/root
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Progression</S.Bold>: trunks typically graduate in size, larger on one end
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root development</S.Bold>: the buried trunk develops roots along its length
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Natural appearance</S.Bold>: should look like forest growing along fallen log, not planted row
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Biological demands</S.SubSectionTitle>
            <S.Paragraph>
              Creating a raft requires a tree with strong branches arranged suitably for conversion. The tree is buried
              on its side with branches exposed; over time, the buried trunk develops roots and branches strengthen into
              independent-looking trunks.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species selection</S.Bold>: species that root readily from buried wood work best—junipers, many
              deciduous trees, some pines. The process takes years; patience is essential.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Row appearance</S.Bold>: branches-turned-trunks need to look natural, not lined up
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Equal spacing</S.Bold>: as with forest, irregular grouping creates natural effect
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Impatience</S.Bold>: rafts need time to develop; rushing produces unconvincing results
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Root-Over-Rock (Sekijoju) and Root-in-Rock (Ishizuki)</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: root-over-rock style showing tree with exposed roots gripping and flowing over rock surface
            before entering soil in pot, alongside root-in-rock showing tree planted directly in rock crevice with roots
            contained within the rock
          </ImagePlaceholder>
          <S.Paragraph>
            These styles incorporate rock as a fundamental design element, representing trees growing in mountain
            conditions where soil is thin and roots must adapt to stone.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Root-over-rock (Sekijoju)</S.SubSectionTitle>
            <S.Paragraph>
              The tree's roots flow over and around a rock, gripping it before entering the soil in the pot. The rock
              remains partially or fully above soil level, with dramatic exposed roots creating visual connection
              between tree and stone.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Rock selection</S.Bold>: hard, interesting stone that complements the tree; weathered surfaces
                preferred
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root development</S.Bold>: roots must be trained to follow rock contours; takes years to develop
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Visual unity</S.Bold>: tree and rock should appear as one composition, not two objects together
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Root-in-rock (Ishizuki)</S.SubSectionTitle>
            <S.Paragraph>
              The tree grows directly from a rock crevice or pocket, with all roots contained within the rock. No pot is
              needed—the rock itself is the container. This represents the most extreme growing conditions.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Rock requirements</S.Bold>: must have suitable pockets or crevices to hold soil and roots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Watering demands</S.Bold>: limited soil volume requires more frequent attention
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree size</S.Bold>: typically smaller trees suit limited root space
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Poor rock choice</S.Bold>: rock must have visual weight and character appropriate to the tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Weak root grip</S.Bold>: roots should look like they have gripped the rock for decades, not been
                placed yesterday
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Competing elements</S.Bold>: tree and rock should complement each other; neither should
                overpower the composition
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>What Each Style Demands Biologically</S.SectionTitle>
          <ImagePlaceholder>
            Chart: biological requirements by style—showing species suitability, maintenance intensity, key challenges,
            and development timeline for each major style
          </ImagePlaceholder>
          <S.Paragraph>
            Each style has specific biological requirements that affect species selection and maintenance demands.
            Choosing inappropriate styles for your material or conditions leads to constant struggle.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Style-species matching</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Formal upright</S.Bold>: species with naturally straight growth—pines, spruces, larches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Informal upright</S.Bold>: almost any species; the most versatile style
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Slant</S.Bold>: species with flexible trunks or material with natural lean
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cascade</S.Bold>: flexible, pendulous species—junipers, some pines, wisteria
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Broom</S.Bold>: fine-branching deciduous trees—zelkova, elms, maples
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Literati</S.Bold>: species tolerating sparse growth—pines, junipers
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Forest</S.Bold>: same species throughout; trees that tolerate close planting
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Maintenance intensity</S.SubSectionTitle>
            <S.Paragraph>Some styles require more ongoing work than others:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>High maintenance</S.Bold>: cascade (constant energy redirection), forest (competition
                management), broom (ramification development)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moderate maintenance</S.Bold>: informal upright, slant, root-over-rock
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Lower maintenance</S.Bold>: formal upright (once established), literati (minimal growth to
                manage)
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Common Style Mistakes and Quick Fixes</S.SectionTitle>
          <ImagePlaceholder>
            Before/after illustration series: common style problems and corrections—showing apex drift and correction,
            weak nebari remediation, crossing branch removal, and proportion adjustment through pruning
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Universal mistakes</S.SubSectionTitle>
            <S.Paragraph>Certain errors appear across all styles:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Bar branches</S.Bold>: two branches emerging at exactly the same height on opposite sides of
                trunk; remove one or stagger through wiring
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crossing branches</S.Bold>: branches that cross each other in the same plane; remove the less
                important one
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Straight branches</S.Bold>: branches without movement look unnatural; add curve through wiring
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reverse taper</S.Bold>: thickening above the base; requires carving, air-layering, or acceptance
                as flaw
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Style-specific corrections</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Formal upright with lean</S.Bold>: repot at corrected angle or wire trunk toward vertical
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Informal upright with off-center apex</S.Bold>: wire apex toward center or accept as slant style
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cascade losing lower strength</S.Bold>: prune counter-apex aggressively to redirect energy
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Broom with gaps</S.Bold>: encourage growth into gaps through selective pruning of surrounding
                areas
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Forest trees competing</S.Bold>: thin canopy of dominant trees to allow light to subordinates
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to change styles</S.SubSectionTitle>
            <S.Paragraph>Sometimes the best fix is accepting that a tree wants to be a different style:</S.Paragraph>
            <S.List>
              <S.ListItem>Informal upright with persistent lean may become better slant</S.ListItem>
              <S.ListItem>Failed cascade may work as semi-cascade or windswept</S.ListItem>
              <S.ListItem>Tree with boring trunk may succeed as forest component rather than solo display</S.ListItem>
            </S.List>
            <S.Paragraph>
              Fighting material's natural inclination rarely succeeds. Listen to what the tree wants and guide it there,
              even if that means abandoning your original vision.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: style selection flowchart—showing decision tree from trunk characteristics to
            appropriate style options, with key factors at each decision point
          </ImagePlaceholder>
          <S.Paragraph>
            Styles are not constraints but tools for understanding. Each represents a set of solutions to environmental
            pressures—how trees grow in various conditions. Knowing styles helps you see possibilities in raw material
            and guides development decisions.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Match style to material</S.Bold>. The trunk tells you what the tree wants to be. Straight trunks
            suit formal or informal upright. Dramatic lean suggests slant. Flexible, pendulous growth enables cascade.
            Listen to the material before imposing a vision.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Understand biological demands</S.Bold>. Cascade fights the tree's natural tendency to grow upward.
            Broom requires years of ramification development. Forest needs constant competition management. Know what
            you are committing to before choosing a style.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Species selection matters</S.Bold>. Not every species suits every style. Conifers rarely make good
            brooms. Stiff species fight cascade. Dense foliage obscures literati trunk lines. Match species to style for
            best results.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Rules guide but do not dictate</S.Bold>. The best bonsai sometimes break style conventions—but they
            do so knowingly, for effect. Understand rules before breaking them. Know what the rule would provide and why
            departing from it serves the specific tree.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Be willing to adapt</S.Bold>. Material that fights your intended style may excel at another. A
            failed formal upright might be a successful slant. A weak cascade could be a strong semi-cascade.
            Flexibility serves the tree better than stubbornness.
          </S.Paragraph>
          <S.Paragraph>
            Style gives you vocabulary—a way to think about form and communicate about trees. But the goal is not style
            adherence; it is creating trees that move viewers. Style serves art, not the reverse.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-20" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter20;
