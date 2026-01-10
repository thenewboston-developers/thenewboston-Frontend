import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter17: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 17: Grafting and Advanced Propagation</S.Title>

        <ImagePlaceholder>
          Illustration: hands performing a thread graft on a bonsai trunk, showing the small hole drilled through the
          trunk with a young shoot being threaded through to create a new branch
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Sometimes the branch you need does not exist. No amount of pruning will create foliage where there is none,
            and some defects cannot be corrected by waiting for natural growth. Grafting and advanced propagation
            techniques solve these problems by adding tissue where you need it—branches in bare zones, roots for better
            nebari, or entirely new trees from existing material.
          </S.Paragraph>
          <S.Paragraph>
            These techniques operate at the boundary between horticulture and surgery. Success requires understanding
            how plant tissues unite, when conditions favor healing, and how to maintain the graft until it establishes.
            The investment of time and skill is repaid by trees that would otherwise remain flawed or by new trees
            created without the wait of growing from seed.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Cuttings, air layers, and ground layers</S.Bold>: creating new trees from existing ones
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Approach grafting and thread grafting</S.Bold>: adding branches where none exist
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Root grafts for nebari</S.Bold>: improving the base of the tree
            </S.ListItem>
            <S.ListItem>
              <S.Bold>When propagation is faster than correction</S.Bold>: strategic decisions about which path to take
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Cuttings, Air Layers, and Ground Layers</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: three propagation methods side by side—cutting in rooting medium, air layer wrapped on
            branch, ground layer bent into soil—showing the rooting zone and expected results
          </ImagePlaceholder>
          <S.Paragraph>
            Before discussing grafting, understand the simpler propagation methods that create new trees from existing
            plant material. These techniques are fundamental skills that also support grafting work.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Cuttings</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What they are</S.Bold>: Cuttings are pieces of stem severed from the parent plant and induced to
              grow roots. The resulting plant is genetically identical to the parent—a clone.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Types of cuttings</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Softwood cuttings</S.Bold>: taken from current season growth while still green and flexible;
                root quickly but require careful moisture management
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Semi-hardwood cuttings</S.Bold>: taken in mid to late summer when growth has begun to mature;
                balance ease of rooting with durability
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hardwood cuttings</S.Bold>: taken from dormant wood in autumn or winter; slower to root but more
                resilient; used for many deciduous species
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Basic technique</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Select healthy, disease-free material from vigorous growth</S.ListItem>
              <S.ListItem>Cut to appropriate length (typically 3-6 inches depending on species)</S.ListItem>
              <S.ListItem>Remove lower leaves; reduce remaining leaf area to limit water loss</S.ListItem>
              <S.ListItem>Dip cut end in rooting hormone (optional but improves success rates)</S.ListItem>
              <S.ListItem>Insert into rooting medium—perlite, coarse sand, or purpose-made cutting mix</S.ListItem>
              <S.ListItem>Maintain high humidity until roots develop</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Step-by-step illustration: taking and preparing a cutting—showing the cut from parent plant, leaf
              reduction, hormone application, insertion into medium, and humidity dome setup
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Species variation</S.Bold>: Some species root easily from cuttings (willow, ficus, privet,
              juniper). Others are difficult or impossible (pine, oak, beech). Know your species before attempting.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Air layering</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: Air layering induces root formation on a branch while it is still attached to
              the parent plant. Once roots develop, the branch is severed and becomes an independent tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Advantages over cuttings</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Works on species that do not root well from cuttings</S.ListItem>
              <S.ListItem>Produces larger, more developed plants immediately</S.ListItem>
              <S.ListItem>Parent plant continues to support the material while rooting occurs</S.ListItem>
              <S.ListItem>Can capture mature character—bark texture, taper, even deadwood</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Basic technique</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Select the location where you want roots to form (this becomes the new root base)</S.ListItem>
              <S.ListItem>Remove a ring of bark completely around the circumference (girdling)</S.ListItem>
              <S.ListItem>Scrape away the cambium layer to prevent the wound from healing over</S.ListItem>
              <S.ListItem>Apply rooting hormone to the upper edge of the wound</S.ListItem>
              <S.ListItem>Pack moist sphagnum moss around the wound site</S.ListItem>
              <S.ListItem>Wrap with plastic to retain moisture; cover with foil to exclude light</S.ListItem>
              <S.ListItem>Monitor moisture levels and wait for roots to fill the moss ball</S.ListItem>
              <S.ListItem>Sever below the new roots and pot the new tree</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Sequential illustration: air layer process—showing girdling cut, cambium removal, moss application,
              wrapping technique, root development visible through wrap, and final separation
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Timing</S.Bold>: Start air layers in spring when growth is active. Roots typically develop over
              one growing season. Some species root within weeks; others take a full year or more.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Bonsai applications</S.Bold>: Air layering is especially valuable for:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Separating an interesting top from a poor trunk base</S.ListItem>
              <S.ListItem>Creating multiple trees from one overgrown specimen</S.ListItem>
              <S.ListItem>Capturing a well-ramified branch as a new shohin-sized tree</S.ListItem>
              <S.ListItem>Shortening an excessively tall trunk</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Ground layering</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: Ground layering induces rooting by burying a portion of a low branch or
              flexible stem in soil while it remains attached to the parent.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Technique</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Select a low, flexible branch that can reach the ground</S.ListItem>
              <S.ListItem>
                Wound the underside where it will contact soil (scrape bark or make a shallow cut)
              </S.ListItem>
              <S.ListItem>Bury the wounded section several inches deep; pin in place if needed</S.ListItem>
              <S.ListItem>Keep the buried section moist</S.ListItem>
              <S.ListItem>Once roots are established (usually one growing season), sever from parent</S.ListItem>
            </S.List>
            <S.Paragraph>
              Ground layers are simpler than air layers but require the parent plant to be growing in the ground or a
              large container where adjacent soil is accessible.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Approach Grafting and Thread Grafting</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: approach graft vs thread graft comparison—showing the structural difference between bringing a
            separate plant alongside the trunk versus threading a shoot through the trunk
          </ImagePlaceholder>
          <S.Paragraph>
            Grafting creates a permanent union between two plant parts, allowing tissue from one plant to grow as part
            of another. In bonsai, grafting primarily adds branches where natural growth is absent or inadequate.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How grafts work</S.SubSectionTitle>
            <S.Paragraph>
              For a graft to succeed, the cambium layers of both pieces must contact each other and grow together. The{' '}
              <S.Bold>cambium</S.Bold> is the thin layer of actively dividing cells just beneath the bark. When cambium
              from two compatible pieces is held in contact, new cells from both sides intermingle and eventually form
              continuous vascular connections.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Requirements for success</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Compatibility</S.Bold>: both pieces must be from the same or closely related species; grafting
                an oak onto a maple will not work
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cambium contact</S.Bold>: the growing layers must touch; this is the most critical factor
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Secure attachment</S.Bold>: movement disrupts the forming union; the graft must be held firmly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moisture retention</S.Bold>: exposed tissue must not dry out during healing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Time</S.Bold>: grafts take weeks to months to establish strong connections
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Approach grafting</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: In approach grafting, a rooted plant (the scion) is brought alongside the
              target tree (the stock). Both plants remain connected to their roots throughout the process. The scion is
              attached to the stock; after the graft union forms, the scion is severed from its original roots.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Why use it</S.Bold>: Approach grafts have the highest success rate because both pieces remain
              alive on their own roots during union formation. If the graft fails, neither plant is lost.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Technique</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Position the scion plant where you want the new branch to emerge</S.ListItem>
              <S.ListItem>
                Make matching wounds on both stock and scion—remove bark and expose cambium over a flat area
              </S.ListItem>
              <S.ListItem>Press the wounds together, aligning cambium layers as precisely as possible</S.ListItem>
              <S.ListItem>Bind tightly with grafting tape, parafilm, or raffia; the union must not move</S.ListItem>
              <S.ListItem>Wait for union to form (typically one full growing season)</S.ListItem>
              <S.ListItem>Gradually sever the scion from its original roots over several weeks</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Step-by-step illustration: approach graft procedure—showing wound preparation on both stock and scion,
              alignment and binding, the mature union, and gradual severance process
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Applications in bonsai</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Adding branches to bare trunk sections</S.ListItem>
              <S.ListItem>Replacing poorly positioned branches with better alternatives</S.ListItem>
              <S.ListItem>Adding a new apex to a truncated trunk</S.ListItem>
              <S.ListItem>Creating low branches on trees that lack them</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Thread grafting</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: Thread grafting involves drilling a hole through the trunk or branch and
              threading a young shoot through it. The shoot emerges on the opposite side as a new branch. Over time, the
              hole heals around the shoot, incorporating it into the trunk.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Advantages</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Uses existing growth from the tree itself—guaranteed compatibility</S.ListItem>
              <S.ListItem>Creates branches with natural taper from the start</S.ListItem>
              <S.ListItem>Eventually produces seamless junctions</S.ListItem>
              <S.ListItem>No separate scion plant required</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Technique</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                Identify a flexible shoot that can be redirected (often from the back or top of the tree)
              </S.ListItem>
              <S.ListItem>
                Drill a hole through the trunk at the desired branch location; hole diameter should match the shoot base
              </S.ListItem>
              <S.ListItem>Carefully thread the shoot through the hole from inside to outside</S.ListItem>
              <S.ListItem>Position the shoot to emerge at the desired angle</S.ListItem>
              <S.ListItem>
                Allow the tree to grow and heal around the shoot (typically one to two growing seasons)
              </S.ListItem>
              <S.ListItem>Once the junction is solid, sever the shoot from its original attachment point</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: thread graft sequence—showing shoot selection, drilling technique, threading process,
              positioning at correct angle, healing progression, and final severance
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Critical details</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                Drill hole size must match shoot diameter—too large allows movement; too small damages the shoot
              </S.ListItem>
              <S.ListItem>Thread during active growth when shoots are flexible</S.ListItem>
              <S.ListItem>Protect the emerging tip from damage</S.ListItem>
              <S.ListItem>
                Do not sever the shoot from its original position until the thread has clearly fused with the trunk
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Scion grafting techniques</S.SubSectionTitle>
            <S.Paragraph>Traditional grafting methods using detached scions include:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Cleft graft</S.Bold>: Stock is split; scion is cut to a wedge and inserted into the split. Used
              for adding branches or new apexes to cut trunks.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Side veneer graft</S.Bold>: A slanting cut is made into the side of the stock; scion with matching
              cut is inserted under the bark flap. Used for adding branches at specific locations.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Bud grafting</S.Bold>: A single bud with attached bark patch is inserted under a flap of bark on
              the stock. Produces minimal disturbance and small scars.
            </S.Paragraph>
            <S.Paragraph>
              These techniques require faster work and more precise conditions than approach grafts because the scion
              has no independent water supply. Success rates are lower, but the techniques are sometimes necessary when
              approach grafting is not practical.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Root Grafts for Nebari</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: root grafting techniques—showing approach-style root graft with seedling positioned against trunk
            base, and inarch graft with established root being redirected to fill a gap
          </ImagePlaceholder>
          <S.Paragraph>
            A flawed nebari (root flare) detracts from even the finest tree. When roots are one-sided, missing, or
            poorly positioned, grafting can add what nature did not provide.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Why graft roots</S.SubSectionTitle>
            <S.Paragraph>Root grafts address problems that cannot be solved otherwise:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>One-sided nebari</S.Bold>: roots exist on one side but not the other
              </S.ListItem>
              <S.ListItem>
                <S.Bold>High grafts</S.Bold>: grafted cultivars often have unnatural junctions; roots grafted below the
                original graft improve the base
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Collected trees</S.Bold>: yamadori may have lost roots during collection
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crossing or circling roots</S.Bold>: grafted replacements can substitute for roots that must be
                removed
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Approach root grafting</S.SubSectionTitle>
            <S.Paragraph>The most reliable method uses small seedlings of the same species:</S.Paragraph>
            <S.List>
              <S.ListItem>
                Plant seedlings in the bonsai pot, positioned so their stems contact the trunk at the desired root
                locations
              </S.ListItem>
              <S.ListItem>Make matching wounds on both the seedling stem and the trunk</S.ListItem>
              <S.ListItem>Bind the wounds together tightly</S.ListItem>
              <S.ListItem>Allow the seedlings to grow vigorously, which speeds union formation</S.ListItem>
              <S.ListItem>After union is solid (one to two years), sever the seedling stem above the graft</S.ListItem>
              <S.ListItem>
                The seedling's root system is now connected to and supplying the main tree; its stem becomes a surface
                root
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Step-by-step illustration: approach root graft—showing seedling placement, wounding and binding, growth
              during fusion period, severance above graft, and final integrated nebari
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Inarch grafting for roots</S.SubSectionTitle>
            <S.Paragraph>Inarching redirects an existing root to a new position:</S.Paragraph>
            <S.List>
              <S.ListItem>Select a healthy root that can be repositioned</S.ListItem>
              <S.ListItem>Wound the trunk at the desired attachment point</S.ListItem>
              <S.ListItem>Bend the root to contact the wound and bind in place</S.ListItem>
              <S.ListItem>
                After fusion, the root now connects to the trunk at the new location as well as its original point
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This technique can convert a deep, plunging root into a surface root, or redirect a root to fill a gap in
              the nebari.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Timing and aftercare</S.SubSectionTitle>
            <S.Paragraph>
              Root grafts are most successful when started in spring, allowing a full growing season for union
              formation. Keep the soil consistently moist but not waterlogged. Protect grafts from disturbance during
              the critical first year.
            </S.Paragraph>
            <S.Paragraph>
              After severance, the new root may grow slowly at first as it transitions from having its own root system
              to being supplied by the main tree. Patience is required—full integration may take several years.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>When Propagation Is Faster Than Correction</S.SectionTitle>
          <ImagePlaceholder>
            Decision diagram: flowchart for choosing between correction and propagation—showing problem assessment, time
            estimates for each approach, and factors influencing the decision
          </ImagePlaceholder>
          <S.Paragraph>
            Not every flaw should be fixed on the existing tree. Sometimes creating a new tree through propagation is
            faster, more reliable, or produces better results than attempting to correct the problem.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Evaluating your options</S.SubSectionTitle>
            <S.Paragraph>When faced with a significant flaw, consider:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>How long will correction take?</S.Bold> Growing a branch in a bare zone may take many years.
                Improving a poor nebari through root work alone could take a decade.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>What is the probability of success?</S.Bold> Some corrections fail. A graft may not take. A
                branch may not bud where you need it. What is your backup plan?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>What resources are required?</S.Bold> Grafting requires scion material, tools, and skill. Air
                layering requires time and attention. Weigh these against the value of the result.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>What is the alternative?</S.Bold> If you air layer the good top off a tree with a poor base, you
                get a new tree with no nebari problems. Meanwhile, the stump may sprout and become another project.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Cases favoring propagation</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Poor trunk base, good top</S.Bold>: Air layer the upper section. The new tree inherits the
              developed crown but starts with fresh roots. Often faster than trying to fix the existing base.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Reverse taper or poor trunk movement</S.Bold>: These fundamental flaws are nearly impossible to
              correct. Propagating from good material and starting over may be the only path to a quality tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species that do not back-bud</S.Bold>: On pines and other conifers that do not produce new growth
              from old wood, a bare zone cannot be filled by waiting. Grafting is the only option, but consider whether
              the tree is worth the effort.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Overgrown nursery stock</S.Bold>: A large, neglected plant may contain multiple potential bonsai.
              Air layering the best sections creates several small trees faster than trying to reduce and reshape the
              whole plant.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Cases favoring correction</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Minor branch positioning issues</S.Bold>: A graft to add a single missing branch is often
              worthwhile on an otherwise excellent tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Nebari with one or two gaps</S.Bold>: Root grafts to fill specific gaps are more practical than
              starting over, especially on a mature tree with good character.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Collected trees with unique character</S.Bold>: A yamadori's age, deadwood, and trunk movement
              cannot be replicated. Correction is usually worth attempting even if difficult.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Species that respond well to correction techniques</S.Bold>: Ficus, elm, and other vigorous
              species heal grafts quickly and produce adventitious growth readily. Correction is often straightforward.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The strategic mindset</S.SubSectionTitle>
            <S.Paragraph>Experienced practitioners think multiple moves ahead:</S.Paragraph>
            <S.List>
              <S.ListItem>Grow scion material before you need it—young plants take time to develop</S.ListItem>
              <S.ListItem>Start air layers as insurance—if correction fails, you have a backup tree</S.ListItem>
              <S.ListItem>Document your work—photographs help evaluate progress and inform future decisions</S.ListItem>
              <S.ListItem>Be willing to abandon lost causes—not every tree can become excellent bonsai</S.ListItem>
            </S.List>
            <S.Paragraph>
              The goal is not to save every tree but to end up with the best trees possible given your time and
              resources.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Technical Details for Success</S.SectionTitle>
          <ImagePlaceholder>
            Tool and material illustration: grafting supplies including sharp knife, grafting tape, parafilm, rooting
            hormone, sphagnum moss, and plastic wrap—with notes on proper use
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Essential tools and materials</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Sharp blade</S.Bold>: grafting knife, scalpel, or razor blade; must be sharp enough to make
                clean cuts without crushing tissue
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Grafting tape or parafilm</S.Bold>: holds grafts in position while allowing some gas exchange;
                stretches as tissue swells
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Rooting hormone</S.Bold>: auxin-containing powder or gel that stimulates root formation on
                cuttings and air layers
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sphagnum moss</S.Bold>: moisture-retentive medium for air layers; also useful for protecting
                grafts
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Plastic wrap and foil</S.Bold>: for air layer enclosure—plastic retains moisture, foil excludes
                light
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Small drill bits</S.Bold>: for thread grafts; various sizes to match different shoot diameters
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Hygiene and disease prevention</S.SubSectionTitle>
            <S.Paragraph>Open wounds invite infection. Minimize risk by:</S.Paragraph>
            <S.List>
              <S.ListItem>Sterilizing cutting tools with alcohol or flame between cuts</S.ListItem>
              <S.ListItem>Working with healthy plant material only</S.ListItem>
              <S.ListItem>Completing grafts quickly to minimize air exposure</S.ListItem>
              <S.ListItem>Sealing wounds appropriately</S.ListItem>
              <S.ListItem>Avoiding grafting during wet weather when fungal spores are abundant</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Aftercare principles</S.SubSectionTitle>
            <S.Paragraph>Newly grafted or propagated material is vulnerable:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Protect from stress</S.Bold>: shade from intense sun, shelter from wind, maintain consistent
                moisture
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Monitor regularly</S.Bold>: check for drying, pest damage, or disease; catch problems early
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Be patient</S.Bold>: do not disturb grafts or check root development by unwrapping too
                frequently
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Gradually harden off</S.Bold>: transition successful grafts and rooted material to normal
                growing conditions slowly
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: propagation and grafting techniques overview showing cuttings, air layer, approach
            graft, thread graft, and root graft with success factors for each
          </ImagePlaceholder>
          <S.Paragraph>
            Grafting and advanced propagation expand what is possible in bonsai. Through these techniques, we add
            branches where pruning cannot create them, improve root systems beyond what nature provided, and multiply
            our best material into new trees. The skills require practice, but the results justify the investment.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Propagation creates new trees</S.Bold>. Cuttings and layers clone existing material, preserving
            desirable characteristics while producing independent plants. Air layers are particularly valuable for
            capturing mature character in new trees.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Grafting adds tissue where needed</S.Bold>. Approach grafts and thread grafts place branches exactly
            where design demands them. Root grafts correct nebari problems that would otherwise persist for the life of
            the tree. Success requires cambium alignment, secure attachment, and patience.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Strategy matters</S.Bold>. Not every problem should be fixed on the existing tree. Evaluate whether
            correction or propagation offers the better path to a quality result. Sometimes starting fresh is faster and
            more certain than attempting difficult repairs.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Technical skill develops with practice</S.Bold>. Start with easy species and simple techniques.
            Build confidence through successful propagation before attempting complex grafts on valued trees. Each
            success teaches lessons that apply to the next project.
          </S.Paragraph>
          <S.Paragraph>
            These techniques represent bonsai at its most horticultural—working with the biology of plants to achieve
            artistic goals that would otherwise be impossible. Master them and you gain capabilities that transform
            flawed material into refined trees.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-17" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter17;
