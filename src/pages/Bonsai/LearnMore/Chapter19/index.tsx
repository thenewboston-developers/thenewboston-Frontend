import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter19: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 19: Bonsai Design Principles</S.Title>

        <ImagePlaceholder>
          Illustration: elegant bonsai composition showing key design elements—graceful trunk line with taper, balanced
          branch placement creating negative space, and visual weight distribution that draws the eye naturally through
          the design
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Design separates bonsai from potted trees. A healthy tree in a pot is horticulture; a tree shaped to evoke
            emotion, tell a story, or capture nature's essence is art. The principles governing bonsai design are not
            arbitrary rules imposed by tradition—they are observations about what creates visual harmony, what holds
            attention, and what communicates the character of trees in nature.
          </S.Paragraph>
          <S.Paragraph>
            Understanding these principles does not mean following them slavishly. The greatest bonsai often break
            rules—but they break them knowingly, for effect, with full understanding of what the rule would have
            provided. Before you can successfully violate a principle, you must understand why it exists.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Line, proportion, and taper</S.Bold>: the fundamental visual elements that create flow and
              believability
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Negative space</S.Bold>: the power of what is not there
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Visual weight and balance</S.Bold>: creating stability and interest through asymmetry
            </S.ListItem>
            <S.ListItem>
              <S.Bold>The role of imperfections</S.Bold>: character through irregularity
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Refinement markers vs character markers</S.Bold>: understanding what makes a tree look developed
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Line</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: multiple trunk line examples—showing dynamic movement with curves that vary in radius, S-curves,
            straight lines with subtle deviation, and how each conveys different character and energy
          </ImagePlaceholder>
          <S.Paragraph>
            Line is the most fundamental design element. The eye follows lines—trunk lines, branch lines, root lines.
            How you guide the viewer's eye through your composition determines much of its emotional impact.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Trunk line</S.SubSectionTitle>
            <S.Paragraph>
              The trunk line is the primary visual element in most bonsai. It establishes movement, energy, and
              character. A strongly curved trunk suggests struggle and age. A gentle curve implies steady growth. A
              straight trunk conveys power and formality.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Dynamic curves</S.Bold>: Effective trunk curves change radius as they progress. A curve that
              maintains constant radius looks mechanical, like a bent pipe. Natural curves tighten and loosen, speed up
              and slow down. The best trunk lines have moments of dramatic movement alternating with moments of relative
              calm.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Direction changes</S.Bold>: Where the trunk changes direction, something should happen—a branch
              emerges, the trunk thickens, or deadwood appears. Direction changes without reason look arbitrary.
              Direction changes at significant points look intentional and natural.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison illustration: effective trunk line with branches emerging at direction changes versus poor
              trunk line where curves seem random and branches appear in illogical positions
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Branch lines</S.SubSectionTitle>
            <S.Paragraph>
              Branch lines extend and echo the trunk line. They create secondary movements that elaborate on the primary
              theme. Branches should not simply stick out from the trunk—they should flow, creating their own smaller
              compositions that contribute to the whole.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Progressive refinement</S.Bold>: As branches extend outward and divide, the line becomes finer and
              more delicate. Thick, heavy line gives way to medium line, which yields to fine ramification at the edge.
              This progression from coarse to fine mimics natural growth patterns and creates visual depth.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Avoiding parallel lines</S.Bold>: Parallel lines—branches that run at identical angles—look
              artificial and draw excessive attention. Vary branch angles so the eye moves naturally from element to
              element rather than bouncing between parallels.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Root line (nebari)</S.SubSectionTitle>
            <S.Paragraph>
              Where visible, roots create the foundation line. Strong nebari radiates outward like buttresses,
              suggesting the tree grips the earth firmly. The root line should complement the trunk line—if the trunk
              moves right, a strong root extending left creates visual balance.
            </S.Paragraph>
            <S.Paragraph>
              Roots that cross, circle, or climb upward disturb the visual foundation. Even if healthy, poorly arranged
              surface roots make a tree look unstable or recently potted.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Proportion</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: proportion relationships in bonsai—showing trunk height to width ratios, branch thickness relative
            to trunk, foliage mass proportional to visual weight of trunk, and how these ratios create the impression of
            age and scale
          </ImagePlaceholder>
          <S.Paragraph>
            Proportion creates the illusion of scale. A well-proportioned bonsai looks like a large tree seen from a
            distance, not a small tree seen close up. Disproportionate elements break this illusion and remind the
            viewer they are looking at a plant in a pot.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Trunk to height ratio</S.SubSectionTitle>
            <S.Paragraph>
              Traditional guidelines suggest trunk diameter should be roughly one-sixth to one-tenth of total height,
              depending on style. Thick-trunked stocky trees (sumo style) may exceed this; tall elegant literati may be
              much thinner. The ratio should feel intentional for the character being expressed.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Why proportion matters</S.Bold>: In nature, the ratio of trunk thickness to height correlates with
              age and growing conditions. A very tall tree with a thin trunk looks young or etiolated. A short tree with
              a massive trunk suggests extreme age, harsh conditions, or both. Your proportions tell a story about the
              tree's imagined life.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Branch thickness and placement</S.SubSectionTitle>
            <S.Paragraph>
              Branches should be proportional to the trunk section from which they emerge. A branch at the bottom of the
              trunk can be fairly thick; one near the apex must be much finer. Branches that violate this relationship
              look grafted on rather than grown in place.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>First branch</S.Bold>: typically the thickest, positioned roughly one-third to one-half up the
                trunk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Secondary branches</S.Bold>: progressively thinner as they ascend
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Apex branches</S.Bold>: finest of all, creating a delicate crown
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Branch thickness should also diminish along the branch length. A branch that maintains constant thickness
              or thickens at the tip looks wrong. The eye expects taper in branches as in trunks.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: branch proportion diagram showing thickness relationships—trunk to first branch to secondary
              branches to ramification, demonstrating proper diminution from base to periphery
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Foliage mass</S.SubSectionTitle>
            <S.Paragraph>
              The total volume of foliage should feel appropriate for the trunk's visual weight. An enormous crown on a
              thin trunk looks top-heavy. Sparse foliage on a massive trunk looks diseased or dying (unless
              intentionally styled to show decline).
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Foliage pads</S.Bold>: Individual foliage masses (pads) should also be proportional. Pads that are
              too large relative to the tree obscure branch structure and look blobby. Pads that are too small look busy
              and fail to create visual rest areas.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Pot proportion</S.SubSectionTitle>
            <S.Paragraph>
              The pot is part of the composition. Traditional guidelines suggest pot length roughly equal to two-thirds
              of tree height for most styles. Pot depth typically matches trunk caliper at the soil line. These are
              starting points, not laws—the pot should complement the tree's character.
            </S.Paragraph>
            <S.Paragraph>
              An oversized pot makes the tree look small and unestablished. An undersized pot makes it look cramped and
              recently transplanted. The right pot feels invisible—you notice the tree, not the container.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Taper</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: trunk taper examples—showing excellent taper with gradual continuous reduction, reverse
            taper problems, sudden jumps in thickness, and how taper creates the illusion of height and age
          </ImagePlaceholder>
          <S.Paragraph>
            Taper refers to the gradual reduction in thickness from base to apex. Good taper is perhaps the single most
            important indicator of a quality bonsai. It creates the illusion of height and suggests natural growth
            patterns.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Trunk taper</S.SubSectionTitle>
            <S.Paragraph>
              In nature, trunks taper because lower sections support more weight and have accumulated more years of
              growth. A tree without taper looks unnatural—like a telephone pole rather than a living organism.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Continuous vs sudden</S.Bold>: Ideal taper is continuous and gradual. The trunk narrows steadily
              from base to apex. Sudden changes in thickness—especially where a large branch was removed and a smaller
              leader took over—look jarring and reveal the tree's development history too obviously.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Developing taper</S.Bold>: Taper is built through grow-and-chop techniques, sacrifice branches,
              and time. You cannot wire taper into a tree. It must be grown, which means taper development is a
              long-term project requiring years or decades.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Reverse taper</S.SubSectionTitle>
            <S.Paragraph>
              Reverse taper—where the trunk is thicker above than below—is a serious flaw. It most commonly occurs when:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Wire left too long bites into the trunk unevenly</S.ListItem>
              <S.ListItem>Multiple branches emerge at the same point, creating a knuckle</S.ListItem>
              <S.ListItem>The tree was air-layered and the new root base never properly thickened</S.ListItem>
              <S.ListItem>Poor pruning choices caused swelling at specific points</S.ListItem>
            </S.List>
            <S.Paragraph>
              Reverse taper is difficult to correct. Prevention through careful development is far easier than
              remediation. Once significant reverse taper exists, options include carving, air-layering below the
              problem, or accepting it as a permanent flaw.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Branch taper</S.SubSectionTitle>
            <S.Paragraph>
              Branches should also taper from thick near the trunk to fine at the tips. This is developed through
              similar techniques—allowing branches to grow long to thicken at the base, then cutting back and
              redirecting growth.
            </S.Paragraph>
            <S.Paragraph>
              Branch taper is often overlooked in favor of trunk work, but branches without taper look like sticks with
              foliage glued on. The entire tree should show consistent attention to this principle.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Negative Space</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: negative space in bonsai design—showing how empty areas between branches create depth, reveal
            structure, and allow the eye to rest, with comparison between well-spaced design and overcrowded design
          </ImagePlaceholder>
          <S.Paragraph>
            Negative space—the empty areas within and around the composition—is as important as the tree itself. Space
            reveals structure, creates depth, and allows the eye to rest. A bonsai without adequate negative space looks
            cluttered and fails to communicate form clearly.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Space between branches</S.SubSectionTitle>
            <S.Paragraph>
              Branches should not overlap or stack directly on top of each other when viewed from the front. Space
              between branches allows the viewer to see through the tree to the trunk and back branches, creating
              three-dimensional depth.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Revealing the trunk</S.Bold>: One primary purpose of negative space is showing the trunk line. If
              foliage completely obscures the trunk, you lose the most important design element. Strategic gaps let the
              eye follow the trunk from base to apex.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Space within the silhouette</S.SubSectionTitle>
            <S.Paragraph>
              The overall outline of the tree should contain "windows"—areas where you see through to the background. A
              solid wall of foliage lacks interest. Windows create visual rhythm, alternating solid areas with openings.
            </S.Paragraph>
            <S.Paragraph>
              The largest window is typically between the first branch and the trunk, revealing the important lower
              trunk area. Smaller windows occur throughout the canopy, varying in size and shape to maintain visual
              interest.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: silhouette analysis showing effective window placement—primary window at trunk base, secondary
              windows creating rhythm throughout canopy, versus monotonous solid silhouette
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Space around the tree</S.SubSectionTitle>
            <S.Paragraph>
              A bonsai needs breathing room. The tree should not crowd the edges of the pot, and when displayed, it
              needs appropriate surrounding space. Crowded presentations diminish impact.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>The empty side</S.Bold>: Most bonsai designs have a "heavy" side with more visual weight and an
              "empty" side with more space. This asymmetry creates tension and interest. A perfectly symmetric tree
              lacks dynamism—the eye has nowhere to go after finding the center.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Creating depth through space</S.SubSectionTitle>
            <S.Paragraph>
              Space between front branches and back branches creates visual depth. If all branches exist in the same
              plane, the tree looks flat. Branches at different depths—with visible space between them—suggest the
              three-dimensional reality of a full-sized tree.
            </S.Paragraph>
            <S.Paragraph>
              This is why branch arrangement matters so much. A branch emerging directly toward the viewer (a "front
              branch") blocks depth perception. Branches arranged to create layers with visible separation allow the eye
              to understand the tree's volume.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Visual Weight and Balance</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: visual weight and balance concepts—showing how different elements (foliage mass, trunk
            thickness, branch position, pot placement) create visual weight, and how asymmetric balance creates dynamic
            stability
          </ImagePlaceholder>
          <S.Paragraph>
            Visual weight refers to how "heavy" an element appears. Dark colors, dense textures, large masses, and lower
            positions all increase visual weight. Balance is the arrangement of visual weight to create stability
            without monotony.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What creates visual weight</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Mass</S.Bold>: larger elements appear heavier; a big foliage pad has more visual weight than a
                small one
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Density</S.Bold>: compact, tight foliage appears heavier than loose, airy growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Color</S.Bold>: darker colors appear heavier; deep green weighs more than yellow-green
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Position</S.Bold>: lower elements feel more grounded; higher elements seem lighter
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Distance from center</S.Bold>: elements farther from the visual center create more leverage,
                like weights on a balance beam
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Asymmetric balance</S.SubSectionTitle>
            <S.Paragraph>
              Bonsai rarely uses symmetric balance—it is too static, too predictable. Instead, asymmetric balance
              creates stability through the careful arrangement of unequal elements. A heavy element close to center can
              balance a lighter element farther away.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>The rule of thirds</S.Bold>: A classic approach places the trunk approximately one-third from one
              side of the pot, with more space on the other side. This creates asymmetry while maintaining balance. The
              larger empty space has visual weight through its very emptiness, balancing the mass of the tree.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: asymmetric balance examples—showing tree positioned off-center with foliage extending toward the
              longer side, heavy lower branch balanced by lighter upper mass, and the visual "fulcrum" concept
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Dynamic tension</S.SubSectionTitle>
            <S.Paragraph>
              The best designs create a sense of movement arrested—the tree appears caught in a moment, leaning or
              reaching, yet stable. This dynamic tension engages the viewer. Static, perfectly balanced compositions may
              be technically correct but emotionally flat.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Movement and countermovement</S.Bold>: A trunk leaning right might have a first branch extending
              left, creating visual counterbalance. An apex reaching in one direction is balanced by roots or lower
              branches extending the opposite way. These opposing movements create energy within stability.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The pot as counterweight</S.SubSectionTitle>
            <S.Paragraph>
              Pot position affects balance. A tree that leans strongly in one direction might be positioned with more
              pot visible on the opposite side, using the pot as visual counterweight. Pot color and visual weight also
              matter—a heavy dark pot anchors a composition differently than a light, delicate pot.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>The Role of Imperfections</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: wabi-sabi in bonsai—showing how imperfect features (asymmetric branching, deadwood, weathered
            bark, irregular silhouette) create character and emotional resonance compared to technically perfect but
            lifeless design
          </ImagePlaceholder>
          <S.Paragraph>
            Perfect symmetry, uniform spacing, and flawless execution can produce technically correct but soulless
            trees. The Japanese aesthetic concept of wabi-sabi celebrates imperfection, transience, and the beauty of
            age. In bonsai, this translates to deliberate irregularity that suggests a tree's history and character.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Asymmetry as interest</S.SubSectionTitle>
            <S.Paragraph>
              A missing branch where one "should" be creates intrigue—what happened there? Uneven growth patterns
              suggest the tree struggled with wind, shade, or damage. These irregularities tell stories that perfect
              trees cannot.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Intentional imperfection</S.Bold>: This does not mean haphazard styling. The goal is controlled
              irregularity—imperfections that enhance the design rather than detract from it. A missing branch in the
              right place creates elegant negative space. A missing branch in the wrong place just looks like a missing
              branch.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Signs of age and struggle</S.SubSectionTitle>
            <S.Paragraph>Features that would be flaws in a young tree become virtues in an old one:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Deadwood</S.Bold>: jin and shari speak of survival through damage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Bark texture</S.Bold>: deep furrows, peeling plates, and rough surfaces suggest decades of
                growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trunk movement</S.Bold>: dramatic curves indicate response to environmental forces over time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hollows</S.Bold>: cavities where branches once grew tell of a long history
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Young trees trying to display these features look contrived. Old trees wearing their history look
              magnificent. Part of design skill is matching styling decisions to the tree's actual character.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The line between character and flaw</S.SubSectionTitle>
            <S.Paragraph>Not all imperfections are virtues. The distinction:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Character</S.Bold>: imperfections that could plausibly result from natural forces—wind damage,
                lightning strikes, drought stress, competition for light
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Flaw</S.Bold>: imperfections that reveal human intervention or poor care—wire scars, pruning
                stubs, crossing roots, disease damage from neglect
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Character tells a believable story about a tree's life in nature. Flaws tell a story about a tree's life
              in cultivation—usually a story of mistakes or impatience.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Refinement Markers vs Character Markers</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: refinement markers (fine ramification, tight foliage pads, smooth transitions, developed
            nebari) versus character markers (trunk movement, bark texture, deadwood features, age indicators)—showing
            how both contribute differently to tree quality
          </ImagePlaceholder>
          <S.Paragraph>
            Quality in bonsai comes from two distinct sources: refinement (the degree of detailed development) and
            character (the inherent qualities of the raw material). Understanding the difference helps you develop trees
            appropriately and evaluate them honestly.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Refinement markers</S.SubSectionTitle>
            <S.Paragraph>
              Refinement shows how thoroughly a tree has been developed. It indicates skill and time investment:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Ramification</S.Bold>: the degree of branch division, from coarse first divisions to fine twiggy
                growth at the periphery
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Taper</S.Bold>: continuous reduction in thickness from base to periphery in trunk and branches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pad development</S.Bold>: dense, flat-topped or rounded foliage masses with clear definition
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Nebari development</S.Bold>: visible surface roots radiating from the trunk base
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Smooth transitions</S.Bold>: no abrupt changes in thickness, no obvious graft unions or cut
                scars
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaf/needle reduction</S.Bold>: foliage scaled down to match tree size
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Refinement takes time—years to decades—and cannot be rushed. A tree may have excellent character but poor
              refinement (raw material not yet developed) or excellent refinement but poor character (a well-developed
              but uninteresting trunk).
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Character markers</S.SubSectionTitle>
            <S.Paragraph>
              Character comes from the tree's inherent qualities and history. It cannot be created through technique:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Trunk movement</S.Bold>: dramatic, interesting line that captures attention
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Bark quality</S.Bold>: texture, color, and pattern that suggest age
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Natural deadwood</S.Bold>: features developed over time in nature or through skillful creation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Scale</S.Bold>: sufficient size and trunk girth to convey presence
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Age</S.Bold>: the simple accumulation of years, visible in overall appearance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Unique features</S.Bold>: hollows, burls, dramatic root formations, unusual growth patterns
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Great trees have both character and refinement. Beginners often focus on refinement because it responds to
              technique. But no amount of refinement makes a boring trunk interesting. Selecting material with strong
              character is the foundation—refinement follows.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Evaluating potential</S.SubSectionTitle>
            <S.Paragraph>When selecting or evaluating material, consider both dimensions:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>High character, low refinement</S.Bold>: excellent raw material that needs development—the best
                starting point for creating quality bonsai
              </S.ListItem>
              <S.ListItem>
                <S.Bold>High character, high refinement</S.Bold>: a developed masterpiece—rare and valuable
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Low character, high refinement</S.Bold>: a well-developed but uninteresting tree—technically
                good but lacks emotional impact
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Low character, low refinement</S.Bold>: an undeveloped ordinary tree—suitable for learning
                techniques but unlikely to become significant
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Chart: character versus refinement matrix showing example trees in each quadrant—raw collected yamadori
              with dramatic trunk, exhibition-quality masterpiece, well-refined but boring nursery stock, and beginner
              practice material
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Applying Design Principles</S.SectionTitle>
          <ImagePlaceholder>
            Step-by-step illustration: design analysis process—showing evaluation of trunk line, identification of
            primary branches, planning of negative space, assessment of balance, and final composition visualization
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Design as a process</S.SubSectionTitle>
            <S.Paragraph>
              Applying design principles is not a checklist but a dialogue with the material. Each tree suggests
              possibilities based on its inherent features. The designer's job is to listen to what the tree wants to be
              and guide it there.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Study first</S.Bold>: before making any cuts, observe the tree from multiple angles, identify
                its best features, and consider options
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Identify the trunk line</S.Bold>: determine the best viewing angle that showcases trunk movement
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Locate key branches</S.Bold>: find branches that will become primary structural elements
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Plan negative space</S.Bold>: decide what to remove to reveal structure
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Consider balance</S.Bold>: evaluate visual weight distribution and adjust
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Execute gradually</S.Bold>: remove less than you think necessary; you can always take more later
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Learning to see</S.SubSectionTitle>
            <S.Paragraph>
              Design skill develops through observation. Study great bonsai—in person when possible, in photographs when
              not. Analyze why certain trees compel attention. Identify the elements that create their power.
            </S.Paragraph>
            <S.Paragraph>
              Also study trees in nature. Notice how wind shapes growth, how light affects form, how old trees differ
              from young ones. This vocabulary of natural forms informs design decisions.
            </S.Paragraph>
            <S.Paragraph>
              Sketch your trees and others. Drawing forces careful observation and reveals relationships you might
              otherwise miss. Even rough sketches improve your ability to see and plan.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: design principles overview showing all key concepts—line and movement, proportion and
            taper, negative space, visual balance, imperfection as character, and the refinement/character distinction
          </ImagePlaceholder>
          <S.Paragraph>
            Design transforms raw material into art. Understanding principles gives you tools for analysis and
            decision-making—a framework for the thousand choices that styling requires.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Line guides the eye</S.Bold>. Trunk line is primary; branch and root lines support it. Effective
            lines have dynamic variation, purposeful direction changes, and progressive refinement toward the periphery.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Proportion creates scale</S.Bold>. Relationships between trunk, branches, foliage, and pot determine
            whether your bonsai reads as a miniature tree or a plant in a pot. Taper—continuous reduction from base to
            periphery—is the single most important proportion.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Negative space reveals form</S.Bold>. What you remove matters as much as what remains. Space between
            branches creates depth, reveals structure, and provides visual rest. The empty areas are not absence—they
            are design elements.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Balance creates stability through asymmetry</S.Bold>. Visual weight distributed unequally but
            balanced creates interest and dynamism. Static symmetry bores the eye; dynamic asymmetry engages it.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Imperfections carry character</S.Bold>. Perfect execution can produce lifeless results. Controlled
            irregularity—asymmetry, missing elements, signs of age and struggle—tells stories and creates emotional
            connection.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Refinement and character are both necessary</S.Bold>. Refinement shows development; character shows
            inherent quality. Great trees have both. When selecting material, character is primary—you can add
            refinement but not character.
          </S.Paragraph>
          <S.Paragraph>
            These principles guide but do not constrain. Rules exist to be understood, internalized, and eventually
            transcended. The goal is not rule-following but creating trees that move viewers—and that requires knowing
            the rules well enough to know when breaking them serves the art.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-19" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter19;
