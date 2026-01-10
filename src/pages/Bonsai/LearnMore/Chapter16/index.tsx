import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter16: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 16: Wiring and Bending</S.Title>

        <ImagePlaceholder>
          Illustration: hands applying wire to a bonsai branch, showing the spiral pattern and proper angle of
          application, with the branch being gently bent into position
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Wiring is what separates bonsai from simple container gardening. Where pruning removes growth, wiring
            repositions it. This technique allows us to move branches to ideal positions, create movement in trunks, and
            transform ordinary nursery stock into compositions with flow and grace. Combined with careful bending,
            wiring gives us near-complete control over the three-dimensional form of the tree.
          </S.Paragraph>
          <S.Paragraph>
            The skill lies in understanding both the material properties of wire and wood and the biological limits of
            living tissue. Wire that is too tight damages bark. Bends that are too sharp crack wood. Timing that is
            wrong allows wire to scar permanently. Mastery requires practice, patience, and attention to how trees
            respond.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>How wood bends and where it breaks</S.Bold>: the biomechanics that determine what is possible
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Wiring mechanics and anchor strategy</S.Bold>: proper technique for effective, safe wiring
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Timing, bite, and removal</S.Bold>: when to wire, how tight, and when to remove
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Guy wires, raffia, and advanced bends</S.Bold>: techniques for difficult situations
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Safety rules for conifers vs deciduous</S.Bold>: species-specific considerations
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>How Wood Bends and Where It Breaks</S.SectionTitle>
          <ImagePlaceholder>
            Cross-section diagram: branch anatomy during bending—showing compression on the inside of the curve, tension
            on the outside, and the neutral axis in the center where stress is minimal
          </ImagePlaceholder>
          <S.Paragraph>
            Before wiring, understand what happens when wood bends. This knowledge prevents breakage and predicts where
            problems occur.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The mechanics of bending</S.SubSectionTitle>
            <S.Paragraph>When a branch bends, two forces act on it simultaneously:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Compression</S.Bold> on the inside of the curve—wood is squeezed together
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tension</S.Bold> on the outside of the curve—wood is stretched apart
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Wood generally handles compression better than tension. Most failures occur on the outside of bends where
              tension causes fibers to separate. You will see cracks, splits, or complete breaks on the outer curve
              before you see crushing on the inner curve.
            </S.Paragraph>
            <S.Paragraph>
              The <S.Bold>neutral axis</S.Bold> runs through the center of the branch. Material along this axis
              experiences minimal stress during bending. Understanding this explains why branches bend more easily
              around their narrow dimension—less material is far from the neutral axis.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What determines bendability</S.SubSectionTitle>
            <S.Paragraph>Several factors affect how far a branch can bend:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wood density</S.Bold>: softer woods bend further before breaking; harder, denser woods resist
                bending
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branch diameter</S.Bold>: thicker branches require more force and bend less before breaking;
                thin branches are more flexible
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moisture content</S.Bold>: higher moisture increases flexibility; dry wood is brittle
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Growth rate</S.Bold>: fast-grown wood with wide rings is often weaker; tight-ringed slow growth
                is stronger
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species</S.Bold>: some species (juniper, willow) are naturally flexible; others (beech, pine)
                are stiff
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Comparison diagram: bendability factors—showing the same bend attempted on thin vs thick branches, wet vs
              dry wood, and fast-grown vs slow-grown wood, with indicators of success or failure
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Where breaks occur</S.SubSectionTitle>
            <S.Paragraph>Breaks typically happen at stress concentrators:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Sharp bends</S.Bold>: concentrated stress over a short distance; gradual curves distribute force
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branch junctions</S.Bold>: grain changes direction, creating weakness; avoid bending at forks
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Old wounds</S.Bold>: scar tissue is weaker than normal wood
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wire crossings</S.Bold>: wire-on-wire creates pressure points
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Abrupt diameter changes</S.Bold>: stress concentrates where thick meets thin
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Learn to see these weak points before bending. When you must bend at a vulnerable location, use extra
              support (raffia, tape) and proceed slowly.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The role of bark</S.SubSectionTitle>
            <S.Paragraph>Bark matters more than you might expect:</S.Paragraph>
            <S.List>
              <S.ListItem>Bark is less flexible than wood—it cracks before wood breaks</S.ListItem>
              <S.ListItem>Cracked bark exposes cambium to damage, disease, and desiccation</S.ListItem>
              <S.ListItem>Thick, mature bark is more prone to cracking than thin, young bark</S.ListItem>
              <S.ListItem>Some species (pine, maple) have bark that separates from wood under stress</S.ListItem>
            </S.List>
            <S.Paragraph>
              Often the limiting factor in bending is bark integrity rather than wood strength. Protect bark during
              aggressive bends with raffia or tape wrapping.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Wiring Mechanics and Anchor Strategy</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: wiring fundamentals—showing wire angle at 45 degrees to the branch, proper spacing between
            coils, and the direction of initial wrap relative to bend direction
          </ImagePlaceholder>
          <S.Paragraph>
            Wire works by creating an external skeleton that holds the branch in position. Proper technique ensures the
            wire is effective without damaging the tree.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Wire types</S.SubSectionTitle>
            <S.Paragraph>Two wire types dominate bonsai:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Aluminum wire</S.Bold>: softer, easier to apply and remove, requires thicker gauge for equivalent
              holding power. Preferred for deciduous trees and by beginners.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Easy to work with and reusable if removed carefully</S.ListItem>
              <S.ListItem>Less likely to damage soft bark</S.ListItem>
              <S.ListItem>Available anodized in brown or black for less visibility</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Copper wire</S.Bold>: harder, holds position better, thinner gauges are effective. Traditional
              choice for conifers and refined work.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Must be annealed (heat-treated) before use to soften</S.ListItem>
              <S.ListItem>Work-hardens during application, becoming stiffer</S.ListItem>
              <S.ListItem>Greater holding power per diameter</S.ListItem>
              <S.ListItem>Can damage bark if applied roughly</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Selecting wire gauge</S.SubSectionTitle>
            <S.Paragraph>
              Choose wire approximately one-third the diameter of the branch being wired. This is a starting point—
              actual selection depends on:
            </S.Paragraph>
            <S.List>
              <S.ListItem>How far the bend must go</S.ListItem>
              <S.ListItem>Wood stiffness of the species</S.ListItem>
              <S.ListItem>Whether you are using aluminum or copper</S.ListItem>
            </S.List>
            <S.Paragraph>
              When in doubt, test on a similar branch. If the wire cannot hold the bend, go up a size. If wire is
              dramatically oversized, it is hard to apply neatly and may damage bark.
            </S.Paragraph>
            <ImagePlaceholder>
              Gauge selection chart: branch diameters matched to appropriate wire gauges for both aluminum and copper,
              with adjustment notes for flexible vs stiff species
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The anchor principle</S.SubSectionTitle>
            <S.Paragraph>
              Wire holds a bend only if properly anchored. Without an anchor point, the wire simply slides along the
              branch when stressed and the bend relaxes.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Anchor options</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk</S.Bold>: wrap around the trunk, then continue to the branch; provides the strongest
                anchor
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Adjacent branch</S.Bold>: wire two branches with a single piece of wire; each branch anchors the
                other
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Same branch</S.Bold>: for small bends at branch tips, continue wire to the next section of the
                same branch
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The most efficient wiring uses one piece of wire for two branches. This creates mutual anchoring without
              excess wire wrapped around the trunk.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: anchor strategies—showing trunk anchor, two-branch mutual anchor, and continuation along a single
              branch, with arrows indicating how force is distributed in each case
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Application technique</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Angle</S.Bold>: Apply wire at approximately 45 degrees to the branch. Too shallow an angle
              provides little holding power. Too steep an angle wastes wire and creates pressure points.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Spacing</S.Bold>: Maintain consistent spacing between coils. Tight spacing uses more wire and adds
              weight but provides maximum support. Wide spacing is efficient but may allow slippage.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Contact</S.Bold>: Wire should rest against the bark without digging in. A slight gap indicates the
              wire may be too loose. Bark deformation indicates too tight.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Direction</S.Bold>: For a bend, the wire on the outside of the curve should act to support the
              branch—preventing it from opening. If you bend the branch to the left, wire coils should wrap from lower
              right to upper left so the wire pushes against the direction of the bend.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Wiring multiple branches</S.SubSectionTitle>
            <S.Paragraph>Efficiency comes from planning your wiring sequence:</S.Paragraph>
            <S.List>
              <S.ListItem>Identify pairs of similar-sized branches that can share a single wire</S.ListItem>
              <S.ListItem>Start at the trunk and work outward to branch tips</S.ListItem>
              <S.ListItem>Wire larger branches first, then add secondary wires for smaller sub-branches</S.ListItem>
              <S.ListItem>
                Avoid crossing wires where possible; when unavoidable, ensure the cross is flat and secure
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              When primary wire does not extend to branch tips, add secondary wire that anchors on the primary wire and
              continues to the tips. This allows fine positioning of small branches.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Timing, Bite, and Removal</S.SectionTitle>
          <ImagePlaceholder>
            Timeline diagram: wire bite progression—showing branch cross-section at wiring time, partial bite at optimal
            removal time, and excessive scarring when wire is left too long
          </ImagePlaceholder>
          <S.Paragraph>
            When you wire, how tight, and when you remove the wire all affect both effectiveness and potential damage.
            Understanding timing is as important as understanding technique.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Best timing for wiring</S.SubSectionTitle>
            <S.Paragraph>Optimal wiring time varies by species and goal:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Deciduous trees</S.Bold>: Most practitioners prefer late autumn through early spring when the tree
              is dormant and leaves are absent. Without leaves, branches are visible and accessible. Dormant wood is
              also often more flexible than wood in active growth.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conifers</S.Bold>: Can be wired year-round, but late autumn through winter is traditional for
              heavy work. Sap flow is reduced, decreasing the risk of resin bleeding. Spring and summer wiring requires
              careful attention because rapid growth leads to faster wire bite.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Avoid wiring</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>During bud break and rapid spring extension—branches are turgid and brittle</S.ListItem>
              <S.ListItem>Immediately after heavy pruning—tree is already stressed</S.ListItem>
              <S.ListItem>During extreme heat—increases stress and damage risk</S.ListItem>
              <S.ListItem>On dehydrated trees—bark separates more easily</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Wire bite and its management</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Wire bite</S.Bold> occurs when the branch grows and expands against the wire, causing the wire to
              cut into the bark. Some bite is inevitable; excessive bite leaves permanent scars.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>How bite develops</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Branch diameter increases as the tree grows</S.ListItem>
              <S.ListItem>Wire does not expand with the branch</S.ListItem>
              <S.ListItem>Bark begins to swell around the wire</S.ListItem>
              <S.ListItem>Continued growth presses bark and cambium against wire</S.ListItem>
              <S.ListItem>Eventually wire becomes embedded, damaging conducting tissue</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Monitoring for bite</S.Bold>: Check wired trees regularly—weekly during active growth, monthly
              during dormancy. Look for bark beginning to swell on either side of wire coils. When this swelling
              appears, removal is approaching.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to remove wire</S.SubSectionTitle>
            <S.Paragraph>Remove wire when either condition is met:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Branch holds position</S.Bold>: the bend has set and the branch remains where placed without
                wire support
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wire begins to bite</S.Bold>: bark is swelling around wire coils regardless of whether the bend
                has set
              </S.ListItem>
            </S.List>
            <S.Paragraph>Setting time varies dramatically:</S.Paragraph>
            <S.List>
              <S.ListItem>Young, thin branches may set in weeks</S.ListItem>
              <S.ListItem>Thick branches may require a full growing season or more</S.ListItem>
              <S.ListItem>Very thick branches may never fully set—they require periodic rewiring</S.ListItem>
            </S.List>
            <S.Paragraph>
              If wire must be removed before the bend sets, rewire after a rest period (usually several weeks to
              months). This allows bark to recover from the pressure of the first wiring.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: wire removal technique—showing wire cutter positioned to cut each coil individually,
              avoiding leverage that could damage the branch
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Proper removal technique</S.SubSectionTitle>
            <S.Paragraph>
              Never unwind wire from a bent branch—this risks cracking wood and tearing bark. Instead:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Use wire cutters designed for bonsai—they cut flush against the branch</S.ListItem>
              <S.ListItem>Cut each coil individually, working from branch tip toward the trunk</S.ListItem>
              <S.ListItem>Let cut pieces fall away; do not pull or twist</S.ListItem>
              <S.ListItem>For embedded wire, cut and gently lift sections; do not dig under the bark</S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Guy Wires, Raffia, and Advanced Bends</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: advanced bending techniques—showing guy wire setup with turnbuckle, raffia-wrapped branch
            prepared for severe bend, and a branch with multiple wire support for a complex curve
          </ImagePlaceholder>
          <S.Paragraph>
            Some branches require more than standard wiring. These techniques extend what is possible while managing the
            risks of aggressive bending.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Guy wires</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What they are</S.Bold>: Guy wires are lengths of wire that pull branches into position rather than
              wrapping around them. One end attaches to the branch; the other anchors to the pot, a root, or another
              stable point.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>When to use them</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Moving large branches that would require impractically heavy spiral wire</S.ListItem>
              <S.ListItem>Pulling branches downward where wrapping is difficult</S.ListItem>
              <S.ListItem>Situations where you want to avoid wire marks on visible bark</S.ListItem>
              <S.ListItem>Long-term positioning that exceeds normal wire duration</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Technique</S.Bold>: Attach the guy wire to the branch using a loop of heavy wire, rubber tubing,
              or a purpose-made hook. Protect bark at the attachment point. Anchor the other end securely. A turnbuckle
              or adjustable loop allows gradual tightening over time.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Raffia wrapping</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: Raffia is natural palm fiber that is soaked in water and wrapped around
              branches before severe bending. It provides support that prevents bark from cracking and holds fibers
              together if minor cracks do occur.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>When to use it</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Bending thick, stiff branches significantly</S.ListItem>
              <S.ListItem>Working with species prone to bark cracking</S.ListItem>
              <S.ListItem>Any bend that approaches the material's limits</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Technique</S.Bold>: Soak raffia until pliable. Wrap tightly around the branch, overlapping
              slightly, covering the entire area that will be bent. Apply wire over the raffia. The raffia compresses
              during bending, distributing force and protecting bark. Raffia can remain on the tree until it
              deteriorates naturally.
            </S.Paragraph>
            <ImagePlaceholder>
              Step-by-step illustration: raffia application—showing dry raffia being soaked, wrapping technique with
              overlap, wire application over raffia, and the completed wrapped branch ready for bending
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Aggressive bending techniques</S.SubSectionTitle>
            <S.Paragraph>For bends beyond normal limits, additional techniques help manage risk:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Kerfing</S.Bold>: Making small cuts partway through the branch on the inside of the bend allows
              the wood to compress without cracking on the outside. The cuts close as the branch bends. This technique
              is used on thick trunks that would otherwise be impossible to bend.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Splitting</S.Bold>: Intentionally splitting the branch and bending each half independently. The
              halves are wrapped together after positioning. This technique is risky and typically reserved for
              collected material with no other option.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Gradual bending</S.Bold>: Rather than making the full bend at once, bend partway and allow the
              tree to acclimate. After the partial bend sets, bend further. This process may take multiple seasons but
              succeeds where single attempts would fail.
            </S.Paragraph>
            <S.Paragraph>
              These techniques require experience. Practice on expendable material before attempting them on valued
              trees.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Clamps and mechanical aids</S.SubSectionTitle>
            <S.Paragraph>
              Specialized bonsai clamps and bending tools provide mechanical advantage for difficult bends:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Branch benders</S.Bold>: lever-action tools that apply controlled force to specific points
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Screw-adjustable clamps</S.Bold>: allow gradual tightening over days or weeks
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Bending jacks</S.Bold>: push rather than pull, useful for straightening or opening bends
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These tools are most useful for trunks and primary branches where wire alone cannot achieve the desired
              movement.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Safety Rules for Conifers vs Deciduous</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: conifer branch structure vs deciduous branch structure, highlighting differences in bark
            thickness, wood density, and resin channels that affect wiring approach
          </ImagePlaceholder>
          <S.Paragraph>
            Conifers and deciduous trees differ in ways that affect wiring strategy. Understanding these differences
            prevents damage and improves results.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Deciduous wiring considerations</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Timing</S.Bold>: Wire when dormant (late autumn through early spring) for best access and
              visibility. Avoid wiring during spring leaf emergence when branches are most turgid and prone to snapping.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Bark sensitivity</S.Bold>: Many deciduous species have thin, easily damaged bark. Japanese maples,
              in particular, mark easily. Use aluminum wire, avoid excessive tightness, and consider protective wrapping
              on sensitive species.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Rapid growth</S.Bold>: Deciduous trees often add diameter quickly during the growing season. Wire
              bite can develop within weeks. Check frequently and remove wire promptly.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Branch flexibility</S.Bold>: Deciduous wood is often more flexible than conifer wood of similar
              diameter. Dramatic bends are possible but branches may spring back strongly—secure wire anchoring is
              essential.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Birch, willow, some maples: highly flexible, aggressive bends possible</S.ListItem>
              <S.ListItem>Oak, beech, hornbeam: stiffer, more conservative bends required</S.ListItem>
              <S.ListItem>Fruit trees: often brittle, bend carefully</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Conifer wiring considerations</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Timing</S.Bold>: Most conifer work is done in late autumn through winter. Sap flow is reduced,
              minimizing resin bleeding. Avoid wiring during spring candle extension on pines.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Resin response</S.Bold>: Conifers respond to wounds by producing resin. Excessive bark damage from
              wiring triggers resin flow that is messy and indicates stress. Gentle handling prevents this.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Deadwood risk</S.Bold>: Conifer branches with damaged or girdled bark die back more readily than
              deciduous branches. Severe wire scarring can kill branches.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Setting requirements</S.Bold>: Conifer wood is often dense and holds memory strongly. Bends may
              require multiple wiring cycles over years to fully set. Patience is essential.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species-specific notes</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Juniper</S.Bold>: very flexible, dramatic bends possible, tolerates aggressive work
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pine</S.Bold>: stiff wood, branches may crack rather than bend; wire in autumn when sap is low
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Spruce</S.Bold>: brittle branches, bend conservatively; deadwood develops easily from damage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fir</S.Bold>: soft wood but bark separates easily; protect bark during bending
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: species flexibility comparison—showing the same bend attempted on juniper (succeeding), pine
              (moderate success with protection), and spruce (cracking), demonstrating relative flexibility
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Universal safety principles</S.SubSectionTitle>
            <S.Paragraph>Regardless of species:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Start conservative</S.Bold>: you can always bend more later; you cannot unbend a broken branch
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Listen to the wood</S.Bold>: cracking sounds mean stop immediately
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Protect vulnerable areas</S.Bold>: branch junctions, old wounds, and thin bark deserve extra
                attention
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Check regularly</S.Bold>: wire bite develops faster than most practitioners expect
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Know when to stop</S.Bold>: some bends are not possible without techniques you may not be ready
                for
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Common Wiring Mistakes</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: wiring mistakes gallery—showing incorrect angle (too shallow), inconsistent spacing, crossed
            wires creating pressure points, and no anchor allowing wire to slip
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Technical errors</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Wrong wire size</S.Bold>: too thin cannot hold the bend; too thick is hard to apply and may
                damage bark
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inadequate anchoring</S.Bold>: wire slides along the branch rather than holding position
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inconsistent angle</S.Bold>: varying angles create uneven support and poor appearance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crossed wires</S.Bold>: create pressure points that damage bark and weaken holding power
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Gaps in wiring</S.Bold>: unsupported sections allow kinking at stress points
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Timing errors</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Wiring during vulnerable periods</S.Bold>: spring flush, extreme temperatures, or after recent
                stress
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaving wire too long</S.Bold>: permanent scarring from embedded wire
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Removing too early</S.Bold>: branch springs back; effort wasted
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Not checking regularly</S.Bold>: bite develops unnoticed until damage is severe
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Conceptual errors</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Wiring without a plan</S.Bold>: random bends that do not serve the design
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Over-wiring</S.Bold>: more wire than necessary, covering the tree in metal
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Forcing impossible bends</S.Bold>: breaking branches through impatience
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ignoring aftercare</S.Bold>: stressed, recently wired trees need attention
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: wiring process flowchart from planning through execution to monitoring and removal, with
            key decision points highlighted
          </ImagePlaceholder>
          <S.Paragraph>
            Wiring transforms bonsai from pruned plants into sculpted compositions. Through careful application of wire
            and thoughtful bending, we position branches exactly where design demands them, creating movement, depth,
            and grace that pruning alone cannot achieve.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Understand the mechanics</S.Bold>. Wood bends through compression and tension. Failures occur where
            tension exceeds material limits—typically the outside of sharp bends and at stress concentrators. Know where
            breaks happen so you can prevent them.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Apply wire properly</S.Bold>. Anchor securely, maintain consistent angle and spacing, and select
            appropriate gauge. Good technique is efficient, effective, and minimizes bark damage. Poor technique wastes
            wire and risks the branch.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Time your work carefully</S.Bold>. Wire when species and conditions favor success. Monitor for bite
            and remove wire before permanent scarring occurs. Patience often requires multiple wiring cycles to achieve
            dramatic changes.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Know your species</S.Bold>. Deciduous and conifer trees require different approaches. Understand the
            characteristics of each species you work with—their flexibility, bark sensitivity, and setting requirements.
          </S.Paragraph>
          <S.Paragraph>
            Wiring skill develops through practice. Start with expendable material, learn from mistakes, and gradually
            take on more challenging work. Over time, the relationship between wire, wood, and design becomes intuitive.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-16" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter16;
