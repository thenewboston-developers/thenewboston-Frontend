import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter18: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 18: Deadwood and Carving</S.Title>

        <ImagePlaceholder>
          Illustration: bonsai tree with dramatic deadwood features—a bleached jin reaching skyward and natural shari
          flowing down the trunk, showing the contrast between weathered deadwood and living bark
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Deadwood tells stories. A bleached branch stripped of bark speaks of lightning strikes, harsh winters, or
            centuries of survival. In nature, deadwood features develop over decades or centuries as trees endure damage
            and partial death while continuing to grow. In bonsai, we create and enhance these features to evoke age,
            struggle, and the drama of survival.
          </S.Paragraph>
          <S.Paragraph>
            This is perhaps the most artistic of bonsai techniques—there are no formulas, only principles. Good deadwood
            looks inevitable, as if nature created it exactly that way. Poor deadwood looks carved, artificial, and
            forced. The difference lies in understanding how deadwood forms naturally and using that knowledge to guide
            your tools.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Jin and shari basics</S.Bold>: the fundamental deadwood features and how to create them
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Species suitability and rot risk</S.Bold>: which trees accept deadwood and which do not
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Tools, preservation, and stability</S.Bold>: the practical work of creating and maintaining
              deadwood
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Naturalism vs effect</S.Bold>: developing the eye for deadwood that enhances rather than detracts
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Jin and Shari Basics</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: labeled bonsai showing different deadwood features—jin on branch tips, shari flowing down trunk,
            uro (hollow), and sabamiki (split trunk), with arrows indicating each feature
          </ImagePlaceholder>
          <S.Paragraph>
            Japanese terminology describes the various forms of deadwood. Understanding these distinctions helps
            communicate about deadwood and guides decisions about what to create.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Jin</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: Jin refers to a dead branch or the dead remains of a branch—stripped of bark
              to expose the bare wood beneath. A jin may be the entire branch or just the tip where a branch was broken
              or died back.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>How it forms naturally</S.Bold>: In nature, jin forms when a branch dies but remains attached to
              the tree. Wind, rain, and sun strip away the bark and soft outer wood over time, leaving only the hardest
              heartwood. The result is often twisted, weathered, and bleached white by sun exposure.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Creating jin</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                Select a branch for conversion—one that would otherwise be removed or that naturally died
              </S.ListItem>
              <S.ListItem>Strip the bark using jin pliers, working from trunk toward tip</S.ListItem>
              <S.ListItem>Shape the exposed wood by removing soft material and creating texture</S.ListItem>
              <S.ListItem>Apply preservative to protect against rot</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Step-by-step illustration: creating a jin—showing initial branch, bark stripping with jin pliers, shaping
              and texturing, and final preserved result
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Shari</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>What it is</S.Bold>: Shari is a deadwood strip or area on the trunk. Unlike jin, which is a branch
              feature, shari occurs on the main body of the tree. It may be a narrow strip or may cover much of the
              trunk, leaving only a thin strip of living bark.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>How it forms naturally</S.Bold>: Shari develops when part of the trunk dies while the rest
              continues living. Lightning strikes, physical damage, disease, or extreme cold can kill sections of
              cambium. Over time, the dead section weathers while living tissue continues transporting water and
              nutrients.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Creating shari</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                Plan the shari path carefully—it must connect logically from dead branches or wounds to the base
              </S.ListItem>
              <S.ListItem>Ensure adequate live vein remains to support the crown</S.ListItem>
              <S.ListItem>Remove bark along the planned path using a sharp knife</S.ListItem>
              <S.ListItem>Carve and texture the exposed wood to match natural weathering patterns</S.ListItem>
              <S.ListItem>Apply preservative</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>The live vein principle</S.Bold>: Every living branch must have a continuous strip of bark
              connecting it to the roots. Shari must be planned around these live veins. Cutting through a live vein
              kills everything above it.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: live vein pathways on a trunk—showing how bark connects branches to roots, where shari can safely
              be created, and danger zones where cutting would kill branches
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Other deadwood features</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Uro</S.Bold>: A hollow or cavity in the trunk. In nature, uro forms when rot enters a wound and
              decomposes the heartwood. The living sapwood and bark continue functioning around the hollow. In bonsai,
              uro can be carved to suggest great age.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Sabamiki</S.Bold>: A trunk split by lightning or other catastrophic damage. The trunk is literally
              torn open, yet the tree survives. Sabamiki is the most dramatic form of deadwood and requires careful
              execution to avoid killing the tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Tanuki</S.Bold>: Not true deadwood technique, but related—tanuki involves attaching a living tree
              to a piece of deadwood (often natural driftwood or a dead tree section) to create instant age. The living
              tree is planted through or alongside the deadwood, eventually incorporating it. This is controversial—some
              consider it deceptive; others accept it as a valid technique when disclosed.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Species Suitability and Rot Risk</S.SectionTitle>
          <ImagePlaceholder>
            Comparison illustration: deadwood on different species—showing excellent preservation on juniper, moderate
            durability on pine, and rapid decay on maple, with indicators of wood structure differences
          </ImagePlaceholder>
          <S.Paragraph>
            Not all trees make good candidates for deadwood. The ability to create and maintain deadwood depends on wood
            density, natural preservatives, and the species' response to damage.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Excellent candidates</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Junipers</S.Bold>: The premier deadwood species. Dense, resinous wood resists rot naturally.
              Juniper deadwood can last for centuries, even in harsh outdoor conditions. The wood bleaches to a
              beautiful silver-white. Almost all dramatic deadwood bonsai are junipers.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Yew</S.Bold>: Similar properties to juniper—dense, durable wood with natural resistance to decay.
              Takes deadwood beautifully and holds up well over time.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Cedar, Cypress</S.Bold>: Aromatic oils in the wood provide natural rot resistance. These conifers
              develop excellent deadwood features that persist for years.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Acceptable candidates</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Pines</S.Bold>: Resinous wood provides some protection, but less dense than juniper. Deadwood
              features work well on pines but require more diligent preservation. The contrast between red bark and
              white deadwood can be striking.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Larch</S.Bold>: Dense wood that accepts deadwood better than most deciduous conifers. Preservation
              is important but results can be effective.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Olive</S.Bold>: An exception among broadleaf trees—olive wood is extremely dense and
              rot-resistant. Ancient olives naturally develop dramatic deadwood. Works well for bonsai deadwood
              features.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Some oaks</S.Bold>: Cork oak and similar species with dense heartwood can sustain limited deadwood
              features.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Poor candidates</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Maples, elms, and most deciduous trees</S.Bold>: Soft, porous wood that rots quickly when exposed.
              Deadwood on these species deteriorates rapidly, often within one or two seasons. The tree may seal over
              small jin naturally, but extensive deadwood becomes a maintenance problem.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Tropical species</S.Bold>: Most tropicals have soft wood adapted to high-moisture environments.
              Deadwood rots quickly and attracts insects. Generally avoid deadwood techniques on these trees.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Fruit trees</S.Bold>: Soft wood and high moisture content make deadwood impractical. These trees
              heal wounds rapidly anyway—better to prune cleanly and let the tree close the wound.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Understanding rot risk</S.SubSectionTitle>
            <S.Paragraph>
              Rot develops when fungal organisms colonize dead wood in the presence of moisture. Risk factors include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wood porosity</S.Bold>: porous wood absorbs water and provides fungal habitat
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moisture exposure</S.Bold>: deadwood that stays wet invites decay
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Climate</S.Bold>: humid climates accelerate rot; dry climates preserve wood naturally
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wood orientation</S.Bold>: horizontal surfaces collect water; vertical features drain better
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Even on suitable species, deadwood requires attention. Preservation treatments slow decay but do not stop
              it entirely. Plan for maintenance as part of your deadwood strategy.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Tools, Preservation, and Long-Term Stability</S.SectionTitle>
          <ImagePlaceholder>
            Tool identification illustration: deadwood tools—jin pliers, carving knives, rotary tools with various bits,
            wire brushes, and preservation supplies—with use descriptions for each
          </ImagePlaceholder>
          <S.Paragraph>
            Creating and maintaining deadwood requires specialized tools and materials. Understanding these implements
            and their applications allows efficient work with good results.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Essential tools</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Jin pliers</S.Bold>: The fundamental deadwood tool. These heavy pliers grip and strip bark, crush
              and peel wood fibers, and create the torn, natural texture characteristic of weathered wood. The crushing
              action separates fibers along natural grain lines rather than cutting across them.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Carving knives</S.Bold>: Sharp knives remove bark cleanly and define the boundary between live
              bark and deadwood. Use where precise control is needed, especially at the transition line between live and
              dead tissue.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Rotary tools</S.Bold>: Die grinders and Dremel-type tools with various bits allow rapid wood
              removal and detailed texturing. Useful for hollowing, shaping shari, and creating fine detail. Requires
              practice to avoid obviously mechanical results.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Carbide bits</S.Bold>: aggressive wood removal
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wire wheel attachments</S.Bold>: texture soft wood, remove loose fibers
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Flame tips</S.Bold>: fine detail work and smoothing
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Wire brushes</S.Bold>: Remove soft grain while leaving hard grain prominent, mimicking natural
              weathering. Available in brass (gentler) and steel (more aggressive) varieties.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Propane torch</S.Bold>: Fire adds realistic charring, removes loose fibers, and slightly hardens
              the wood surface. Use carefully and have water ready.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Preservation treatments</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Lime sulfur (jin seal)</S.Bold>: The traditional bonsai deadwood preservative. Lime sulfur is a
              fungicide that also bleaches wood to a silver-white color. Applied as a liquid, it penetrates the wood and
              provides ongoing protection.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Apply with a brush to all deadwood surfaces</S.ListItem>
              <S.ListItem>Allow to dry completely (strong sulfur smell during drying)</S.ListItem>
              <S.ListItem>Reapply annually or as color fades</S.ListItem>
              <S.ListItem>Avoid getting on live bark—it can damage tissue</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Before/after illustration: deadwood treatment showing raw carved wood, after first lime sulfur application
              with wet appearance, and fully cured white finish
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Alternative preservatives</S.Bold>: Where lime sulfur is unavailable or undesirable, other options
              exist:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wood hardeners</S.Bold>: penetrate and strengthen soft or punky wood
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Exterior wood preservatives</S.Bold>: provide rot protection without the bleaching effect
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Linseed oil</S.Bold>: traditional finish that feeds wood; requires frequent reapplication
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Each alternative has trade-offs. Lime sulfur remains the standard for its combination of preservation,
              bleaching, and long use in bonsai tradition.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Long-term maintenance</S.SubSectionTitle>
            <S.Paragraph>Deadwood requires ongoing attention:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Annual inspection</S.Bold>: check for soft spots, rot entry points, insect damage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reapplication of preservative</S.Bold>: typically yearly; more often in humid climates
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cleaning</S.Bold>: algae and dirt accumulate; gentle brushing restores appearance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Repair</S.Bold>: address deterioration before it spreads into live wood
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Position trees so deadwood drains freely and dries quickly after rain. Prolonged moisture accelerates
              decay even on treated wood.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Working safely</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Lime sulfur</S.Bold>: work outdoors or in well-ventilated areas; avoid skin contact; wear eye
                protection
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Rotary tools</S.Bold>: wear eye protection and dust mask; secure the tree firmly; be aware of
                spinning bit direction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fire</S.Bold>: work in safe location away from flammables; have water immediately available;
                never leave flame unattended
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sharp tools</S.Bold>: cut away from your body; keep hands behind cutting edges
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Naturalism vs Effect</S.SectionTitle>
          <ImagePlaceholder>
            Comparison illustration: natural deadwood from ancient tree photograph versus artificial-looking carved
            deadwood, highlighting specific features that reveal artificiality—uniform texture, mechanical curves,
            logical patterns
          </ImagePlaceholder>
          <S.Paragraph>
            The most important deadwood skill cannot be taught directly—the ability to see what looks natural and what
            looks contrived. This develops through observation, study, and practice.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How natural deadwood forms</S.SubSectionTitle>
            <S.Paragraph>Understanding natural processes helps create convincing artificial deadwood:</S.Paragraph>
            <S.Paragraph>
              <S.Bold>Lightning</S.Bold>: Creates explosive, torn damage. Wood is shattered along grain lines, often
              spiraling down the trunk. The damage is violent and irregular.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Wind breakage</S.Bold>: Produces torn, fibrous breaks. Wood separates along the grain in ragged
              patterns. Branches snap where leverage is greatest—often at narrow points or old wounds.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Gradual die-back</S.Bold>: Branches die from the tip inward as resources become insufficient. The
              transition from dead to live wood is often gradual with areas of partial death.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Weathering</S.Bold>: Decades of exposure remove soft wood faster than hard wood, creating textured
              surfaces. Wind-driven sand polishes exposed surfaces. Sun bleaches and cracks the wood.
            </S.Paragraph>
            <ImagePlaceholder>
              Texture comparison diagram: natural weathering patterns—soft grain eroded leaving hard grain prominent,
              checking from sun exposure, polish from wind abrasion—versus mechanical carving marks
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes that reveal artificiality</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Too uniform</S.Bold>: natural deadwood varies in texture, depth, and weathering; artificial
                deadwood often looks the same throughout
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Too smooth</S.Bold>: rotary tools can leave polished surfaces that look mechanical; nature
                produces rough, varied texture
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Illogical patterns</S.Bold>: deadwood should follow from some plausible cause; random shari
                placement looks arbitrary
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clean edges</S.Bold>: natural transitions between live bark and deadwood are ragged and gradual;
                knife-sharp edges look cut
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wrong direction</S.Bold>: natural damage follows wood grain and mechanical stress patterns;
                carved damage often ignores these
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Excessive drama</S.Bold>: more deadwood is not always better; subtle features can be more
                effective than dramatic ones
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Developing your eye</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Study natural examples</S.Bold>: Observe deadwood on old trees in nature—in mountains, forests,
              and wild places. Photograph features that catch your eye. Notice how they formed.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Study great bonsai</S.Bold>: Look at exhibition-quality trees with deadwood. Analyze what makes
              the deadwood convincing. Notice the transitions, textures, and proportions.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Practice on expendable material</S.Bold>: Before working on valuable trees, practice techniques on
              branches, driftwood, or nursery stock. Make mistakes where they do not matter.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Work slowly</S.Bold>: You can always remove more wood; you cannot put it back. Stop frequently to
              evaluate your work from different angles. Step away and return with fresh eyes.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The story must make sense</S.SubSectionTitle>
            <S.Paragraph>
              Every piece of deadwood implies a history. The viewer should be able to imagine what happened:
            </S.Paragraph>
            <S.List>
              <S.ListItem>A jin at a branch tip suggests the branch died back or broke</S.ListItem>
              <S.ListItem>Shari implies trunk damage from a specific direction</S.ListItem>
              <S.ListItem>A hollow suggests rot that entered through a wound</S.ListItem>
            </S.List>
            <S.Paragraph>
              If the story does not make sense—if you cannot explain how this deadwood might have formed—the feature
              will likely look artificial. Before creating deadwood, imagine the event that caused it. Then create
              features consistent with that imagined history.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When less is more</S.SubSectionTitle>
            <S.Paragraph>
              Not every tree needs deadwood. Not every deadwood feature needs to be dramatic. Consider:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Does this deadwood serve the overall design?</S.ListItem>
              <S.ListItem>Does it tell a coherent story?</S.ListItem>
              <S.ListItem>Does it complement the living portions of the tree?</S.ListItem>
              <S.ListItem>Would a simpler treatment be more effective?</S.ListItem>
            </S.List>
            <S.Paragraph>
              A small, well-executed jin may be more powerful than extensive shari. A subtle hollow may suggest more age
              than obvious carving. Restraint is often the mark of sophistication.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Creating Deadwood Step by Step</S.SectionTitle>
          <ImagePlaceholder>
            Process illustration: complete deadwood creation sequence—planning the design, initial bark removal, rough
            shaping, detail texturing, preservation application, and aging over seasons
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Planning</S.SubSectionTitle>
            <S.List>
              <S.ListItem>Evaluate the tree's structure and identify where deadwood could logically exist</S.ListItem>
              <S.ListItem>Consider the story: what damage or event would create this deadwood?</S.ListItem>
              <S.ListItem>Map live veins to ensure adequate living tissue remains to support the crown</S.ListItem>
              <S.ListItem>Mark proposed deadwood areas with chalk or marker before committing</S.ListItem>
              <S.ListItem>Consider the front view and how deadwood will appear from viewing angles</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Execution</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Creating jin</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Score around the bark at the transition point with a sharp knife</S.ListItem>
              <S.ListItem>Use jin pliers to grip and strip bark, working from trunk to tip</S.ListItem>
              <S.ListItem>Crush and peel wood fibers to create natural torn texture</S.ListItem>
              <S.ListItem>Remove soft wood; leave hard heartwood</S.ListItem>
              <S.ListItem>Taper toward the tip—jin should not end bluntly</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Creating shari</S.Bold>:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Define the shari boundary with careful knife cuts</S.ListItem>
              <S.ListItem>Peel bark working from the interior toward the boundary</S.ListItem>
              <S.ListItem>Create irregular, natural-looking edges—avoid straight lines</S.ListItem>
              <S.ListItem>Vary depth and texture across the shari surface</S.ListItem>
              <S.ListItem>Ensure logical connection to any jin above</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Refining</S.SubSectionTitle>
            <S.List>
              <S.ListItem>Allow fresh deadwood to dry for several days before detailed work</S.ListItem>
              <S.ListItem>Use wire brushes to remove soft grain and enhance texture</S.ListItem>
              <S.ListItem>Apply fire carefully to add character and remove loose fibers</S.ListItem>
              <S.ListItem>Smooth any obviously mechanical marks</S.ListItem>
              <S.ListItem>Step back frequently to evaluate the overall effect</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Finishing</S.SubSectionTitle>
            <S.List>
              <S.ListItem>Allow deadwood to fully dry before preservation</S.ListItem>
              <S.ListItem>Apply lime sulfur to all exposed wood surfaces</S.ListItem>
              <S.ListItem>Protect live bark from preservative</S.ListItem>
              <S.ListItem>Allow to cure completely before handling</S.ListItem>
              <S.ListItem>Reapply as needed to maintain appearance and protection</S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Advanced Considerations</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: advanced deadwood concepts—showing aging progression over years, integration with design
            elements, and the relationship between deadwood scale and tree size
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Aging new deadwood</S.SubSectionTitle>
            <S.Paragraph>
              Fresh deadwood lacks the patina of age. Several approaches accelerate the aging appearance:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Time</S.Bold>: the simplest approach—new deadwood improves naturally over seasons as it weathers
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Multiple preservative applications</S.Bold>: each coat adds depth to the white color
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Controlled weathering</S.Bold>: expose treated deadwood to sun and rain; natural processes add
                character
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Artificial aging</S.Bold>: some practitioners use thinned ink or other tints to add depth,
                though results vary
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Accept that new deadwood will look new. The best approach is often patience—good deadwood develops
              character over years.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Integrating deadwood with the design</S.SubSectionTitle>
            <S.Paragraph>Deadwood should not exist in isolation—it must work with the tree:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Visual balance</S.Bold>: deadwood has visual weight; position it to enhance rather than
                unbalance the composition
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Movement and line</S.Bold>: shari and jin can reinforce or contrast with trunk movement
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Scale</S.Bold>: deadwood features should match the scale of the tree; oversized deadwood
                overwhelms small trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Style appropriateness</S.Bold>: dramatic deadwood suits rugged, ancient styles; refined literati
                may benefit from subtle features or none at all
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to avoid deadwood</S.SubSectionTitle>
            <S.Paragraph>Some trees are better without deadwood:</S.Paragraph>
            <S.List>
              <S.ListItem>
                Species with poor deadwood durability—maintaining the feature becomes constant work
              </S.ListItem>
              <S.ListItem>Trees representing youth and vigor—deadwood suggests age and struggle</S.ListItem>
              <S.ListItem>Elegant feminine styles where deadwood would add inappropriate harshness</S.ListItem>
              <S.ListItem>When you lack a convincing story for why deadwood exists</S.ListItem>
            </S.List>
            <S.Paragraph>
              Not every opportunity should be taken. Sometimes a clean pruning cut that heals smoothly serves the tree
              better than attempting to convert it to deadwood.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap illustration: deadwood decision framework showing species selection, feature planning, execution tools
            and techniques, and long-term maintenance considerations
          </ImagePlaceholder>
          <S.Paragraph>
            Deadwood transforms trees from merely old into survivors of drama and struggle. When well executed, jin and
            shari add dimension—both visual and narrative—that no other technique can provide. The art lies in
            understanding what looks natural and having the restraint to stop before crossing into artificiality.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Choose appropriate species</S.Bold>. Junipers and other dense, resinous conifers make excellent
            deadwood subjects. Most deciduous trees do not. Know your species before committing to extensive deadwood
            features.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Understand natural processes</S.Bold>. Deadwood in nature results from specific events—lightning,
            wind, die-back, weathering. Good artificial deadwood mimics these processes convincingly. The viewer should
            be able to imagine what happened.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Master the tools</S.Bold>. Jin pliers for stripping and tearing, knives for clean edges, rotary
            tools for shaping, wire brushes for texturing, fire for finishing—each has its place. Practice on expendable
            material until technique becomes natural.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Preserve and maintain</S.Bold>. Deadwood requires ongoing care. Lime sulfur or other preservatives
            slow decay and maintain appearance. Annual attention keeps deadwood features stable and attractive.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Develop your eye</S.Bold>. Study natural deadwood. Study great bonsai. Learn to see what works and
            what fails. This aesthetic judgment, more than any technical skill, determines whether deadwood elevates or
            diminishes your trees.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-18" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter18;
