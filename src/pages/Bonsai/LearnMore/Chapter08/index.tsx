import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter8: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 8: Soil and Substrates</S.Title>

        <ImagePlaceholder>
          Full-page image: close-up of bonsai soil components (akadama, pumice, lava rock) arranged together, showing
          the granular, porous nature of bonsai substrate
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Bonsai soil is not soil in the typical sense. It is an engineered substrate designed to solve a specific
            problem: keeping roots alive in a small, confined container where the usual forgiveness of garden soil does
            not exist.
          </S.Paragraph>
          <S.Paragraph>
            In a shallow pot with limited volume, the margin for error shrinks dramatically. A substrate that holds too
            much water suffocates roots. A substrate that drains too fast dries out before roots can drink. The goal of
            bonsai soil is to balance two competing needs—<S.Bold>water retention</S.Bold> and{' '}
            <S.Bold>oxygen availability</S.Bold>—while providing a stable environment for root growth.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>The fundamental physics</S.Bold>: how drainage and retention actually work in a container
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Particle size and oxygen</S.Bold>: why structure matters more than nutrition
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Common components</S.Bold>: akadama, pumice, lava rock, and organic materials
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Soil recipes</S.Bold>: how to adjust mixtures for climate and species
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Failure modes</S.Bold>: recognizing when soil has broken down and what to do about it
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Drainage vs Water Retention: How Bonsai Soil Actually Works</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: cross-section of a bonsai pot showing water perching, air gaps between particles, and root zones
            after watering
          </ImagePlaceholder>
          <S.Paragraph>
            Most people think of drainage as water falling through soil and out the bottom. This is only part of the
            story. What matters for roots is what happens <S.Bold>after</S.Bold> the water drains—specifically, how much
            water stays behind and how much air can get in.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The perched water table</S.SubSectionTitle>
            <S.Paragraph>
              In any container, water does not simply fall through and leave. After watering, a layer of saturated
              substrate remains at the bottom of the pot. This is called the <S.Bold>perched water table</S.Bold>. It
              exists because surface tension and capillary forces hold water in the smallest spaces between particles,
              resisting gravity.
            </S.Paragraph>
            <S.Paragraph>The height of this perched water table depends on:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Particle size</S.Bold>: smaller particles create smaller pores, holding water higher
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Particle uniformity</S.Bold>: uniform particles create consistent drainage; mixed sizes can trap
                water in unpredictable ways
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pot depth</S.Bold>: in a shallow pot, the perched water table may occupy a significant
                percentage of the total depth
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Comparative diagram: same substrate in a tall pot vs shallow pot, showing how the perched water table
              occupies more relative space in the shallow container
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Why shallow pots are unforgiving</S.SubSectionTitle>
            <S.Paragraph>
              Bonsai pots are shallow by design—they create the aesthetic proportions that define bonsai. But this
              creates a functional challenge. A shallow pot with fine soil can become almost entirely saturated, leaving
              roots with no air.
            </S.Paragraph>
            <S.Paragraph>
              This is why bonsai practitioners shifted away from garden soil and toward coarse, granular substrates.
              Larger particles create larger pore spaces, lowering the perched water table and ensuring that air reaches
              roots even immediately after watering.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The wet-dry cycle</S.SubSectionTitle>
            <S.Paragraph>
              Healthy roots need both water and oxygen. Bonsai soil is designed to cycle through two phases:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wet phase</S.Bold>: immediately after watering, water fills pore spaces and roots absorb
                moisture
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Drying phase</S.Bold>: as water is consumed by roots or evaporates, air enters the pore spaces,
                providing oxygen
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              A good substrate allows this cycle to happen relatively quickly—often within a day or two in growing
              season—so roots never sit in stagnant, oxygen-depleted water for too long.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Particle Size, Oxygen, and Root Health</S.SectionTitle>
          <ImagePlaceholder>
            Side-by-side comparison: fine organic soil with dense packing vs coarse bonsai substrate with visible air
            gaps between particles
          </ImagePlaceholder>
          <S.Paragraph>
            Particle size is the most important variable in bonsai substrate. It determines pore size, drainage rate,
            water retention, and oxygen availability. Getting particle size right matters more than which specific
            material you use.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How particle size affects drainage</S.SubSectionTitle>
            <S.Paragraph>Larger particles create larger gaps between themselves. These larger pores:</S.Paragraph>
            <S.List>
              <S.ListItem>Drain faster because gravity overcomes capillary forces more easily</S.ListItem>
              <S.ListItem>Hold less water because there is less surface area relative to volume</S.ListItem>
              <S.ListItem>Fill with air more quickly after drainage</S.ListItem>
            </S.List>
            <S.Paragraph>
              Smaller particles create the opposite effect—more water held, slower drainage, less air. This is not
              inherently bad, but in a shallow container it can easily become too much water and too little air.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The importance of uniformity</S.SubSectionTitle>
            <S.Paragraph>
              When particles are uniform in size, they create a consistent structure. When particles are mixed—large,
              medium, and small together—the small particles fill the gaps between the large ones. This can actually
              reduce drainage and oxygen, not improve it.
            </S.Paragraph>
            <S.Paragraph>
              This is why experienced bonsai practitioners sift their substrate. They remove both the dust (too fine)
              and the oversized pieces (too coarse), keeping only particles within a specific size range.
            </S.Paragraph>
            <ImagePlaceholder>
              Photo series: sifting bonsai substrate through different mesh sizes, showing removal of fines and
              collection of uniform particles
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Typical particle sizes</S.SubSectionTitle>
            <S.Paragraph>
              Most bonsai practitioners work with particles in the 2-6mm range, though this varies by tree size and
              climate:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Small trees and seedlings</S.Bold>: 1-3mm particles provide adequate drainage while retaining
                enough moisture for small root systems
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Medium trees</S.Bold>: 3-5mm particles balance drainage and retention for most species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Large trees</S.Bold>: 4-6mm or larger particles ensure excellent drainage in bigger containers
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These are guidelines, not rules. Climate, species, pot depth, and watering frequency all affect what works
              best.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Oxygen and root function</S.SubSectionTitle>
            <S.Paragraph>
              Roots need oxygen to respire. When pore spaces are filled with water, oxygen cannot reach the roots. Roots
              in low-oxygen conditions slow their growth, become susceptible to rot, and eventually die.
            </S.Paragraph>
            <S.Paragraph>
              The classic symptom of oxygen-starved roots is a tree that looks overwatered even when you have not
              watered recently. The roots are so compromised they cannot function, so the tree wilts despite sitting in
              moisture.
            </S.Paragraph>
            <S.Paragraph>
              Coarse, well-draining substrate prevents this by ensuring that air can always reach at least some portion
              of the root zone, even when other portions are still moist.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Common Components</S.SectionTitle>
          <ImagePlaceholder>
            Photo grid: individual samples of akadama, pumice, lava rock, pine bark, and other common bonsai soil
            components, labeled with key characteristics
          </ImagePlaceholder>
          <S.Paragraph>
            Bonsai substrates are typically made from a mix of inorganic and sometimes organic components. Each material
            has distinct properties that affect drainage, retention, and root interaction.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Akadama</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Akadama</S.Bold> is a granular clay mined in Japan. It is the traditional bonsai substrate and
              remains widely used.
            </S.Paragraph>
            <S.Paragraph>Properties:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>High water retention</S.Bold>: akadama absorbs water into its structure, releasing it gradually
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Good cation exchange capacity</S.Bold>: holds and releases nutrients effectively
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Visual feedback</S.Bold>: changes color from brown when dry to dark brown when wet, helping
                gauge moisture levels
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Breaks down over time</S.Bold>: gradually crumbles into finer particles, eventually compacting
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The breakdown of akadama is its main limitation. Over several years, particles crumble, drainage slows,
              and the substrate must be replaced. This is a normal part of the repotting cycle for trees grown in
              akadama.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison: fresh akadama particles vs aged, broken-down akadama showing particle degradation
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Pumice</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Pumice</S.Bold> is a volcanic rock formed when lava cools rapidly with gas bubbles trapped inside.
              It is lightweight, porous, and extremely durable.
            </S.Paragraph>
            <S.Paragraph>Properties:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Excellent drainage</S.Bold>: the porous structure allows water to pass through quickly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Good water retention within pores</S.Bold>: the internal structure holds moisture even as the
                surface drains
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Does not break down</S.Bold>: pumice is chemically and physically stable for many years
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Lightweight</S.Bold>: reduces pot weight, which matters for display and handling
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Pumice is often mixed with akadama to provide structural stability. The pumice maintains drainage even as
              the akadama breaks down.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Lava rock</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Lava rock</S.Bold> (scoria) is another volcanic material. It is heavier than pumice but similarly
              porous and stable.
            </S.Paragraph>
            <S.Paragraph>Properties:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Excellent drainage</S.Bold>: very fast draining, sometimes too fast for water-loving species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moderate water retention</S.Bold>: holds less water than pumice or akadama
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stable structure</S.Bold>: does not break down over time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Good aeration</S.Bold>: the rough surface and angular shape create air pockets
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Lava rock is commonly used in mixes for species that prefer drier conditions or in climates with high
              rainfall.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Organic components</S.SubSectionTitle>
            <S.Paragraph>
              Some bonsai mixes include organic material, usually composted bark or peat. Organic components:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Increase water retention</S.Bold>: organic material absorbs and holds significant moisture
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Provide some nutrients</S.Bold>: as they decompose, they release nitrogen and other elements
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Break down over time</S.Bold>: decomposition reduces particle size and drainage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Can become hydrophobic when dry</S.Bold>: very dry peat or bark can repel water
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Organic components are more common in temperate climates with lower humidity, for species that prefer
              consistent moisture, or in very large pots where water retention helps. Many practitioners avoid organics
              entirely in humid climates where drainage is already challenged.
            </S.Paragraph>
            <ImagePlaceholder>
              Photo: pine bark fines used as organic component in bonsai soil, showing the fibrous, water-holding
              structure
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Regional alternatives</S.SubSectionTitle>
            <S.Paragraph>
              Not everyone has access to akadama or high-quality pumice. Effective alternatives include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Turface / calcined clay</S.Bold>: fired clay products that provide similar properties to
                akadama, widely available in some regions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Diatomaceous earth (granular)</S.Bold>: provides water retention and aeration; look for
                horticultural grades
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crusite granite</S.Bold>: decomposed granite provides drainage and structure in some mixes
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Expanded shale</S.Bold>: a lightweight aggregate with reasonable drainage properties
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The key is to evaluate any component by its particle size, drainage characteristics, water retention, and
              long-term stability—not by tradition or marketing claims.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Soil Recipes by Climate and Species</S.SectionTitle>
          <ImagePlaceholder>
            Chart: soil mix recommendations organized by climate (humid, temperate, arid) and tree type (conifer,
            deciduous, tropical), showing proportions of akadama, pumice, lava, and organic
          </ImagePlaceholder>
          <S.Paragraph>
            There is no universal bonsai soil recipe. The right mix depends on your climate, the species you are
            growing, and your watering habits. However, some general principles help guide mix design.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Climate considerations</S.SubSectionTitle>
            <S.Paragraph>
              Climate determines how quickly water evaporates and how often you need to water. This fundamentally
              affects substrate choice:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Humid climates</S.Bold>: prioritize drainage. Use higher proportions of pumice and lava, less
                akadama, and minimal or no organic material. The challenge is keeping roots from staying too wet.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Arid climates</S.Bold>: prioritize water retention. Use higher proportions of akadama or add
                organic components. The challenge is preventing roots from drying out between waterings.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temperate climates</S.Bold>: balanced mixes work well. Adjust seasonally if needed—some
                practitioners use different mixes for trees that will be outdoors in wet winters versus those that will
                be protected.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Species considerations</S.SubSectionTitle>
            <S.Paragraph>
              Different species have different root zone preferences, shaped by their native habitats:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Conifers (pines, junipers)</S.Bold>: generally prefer excellent drainage and tolerate drier
                conditions between waterings. Higher proportions of pumice and lava work well. Some practitioners use
                100% inorganic mixes.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Deciduous trees (maples, elms)</S.Bold>: often prefer slightly more moisture retention than
                conifers. A mix with more akadama and less lava provides this.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tropical and subtropical species</S.Bold>: many prefer consistent moisture and good drainage
                simultaneously. Balanced mixes with akadama, pumice, and sometimes organic work well. Some species like
                ficus are quite adaptable.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Azaleas and acid-loving species</S.Bold>: traditionally grown in kanuma (a different Japanese
                clay) or mixes with higher organic content to maintain acidity. These are exceptions to the inorganic
                rule.
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Photo comparison: pine in well-draining mix vs maple in moisture-retentive mix vs azalea in kanuma-based
              acidic mix
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common starting recipes</S.SubSectionTitle>
            <S.Paragraph>
              These are not prescriptions, but starting points. Observe your trees and adjust based on what you see:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>General-purpose temperate mix</S.Bold>: 1 part akadama : 1 part pumice : 1 part lava rock
              </S.ListItem>
              <S.ListItem>
                <S.Bold>High-drainage conifer mix</S.Bold>: 1 part akadama : 2 parts pumice or lava
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moisture-retentive deciduous mix</S.Bold>: 2 parts akadama : 1 part pumice
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Humid climate mix</S.Bold>: 1 part akadama : 1 part pumice : 2 parts lava rock (or omit akadama
                entirely)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Arid climate mix</S.Bold>: 2 parts akadama : 1 part pumice, with optional 10-20% composted bark
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The best recipe is the one that works for your conditions and your watering discipline. If your trees are
              healthy and roots look good at repotting, your mix is working.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Adjusting for pot depth and tree stage</S.SubSectionTitle>
            <S.Paragraph>Beyond climate and species, consider:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Shallow pots</S.Bold>: need coarser mixes because the perched water table occupies more of the
                pot
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Deep training containers</S.Bold>: can tolerate finer mixes or more organic content because
                there is more depth above the saturated zone
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trees in development</S.Bold>: often grown in larger containers with more volume;
                faster-draining mixes support vigorous root growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Refined trees in small pots</S.Bold>: need careful attention to moisture retention in small
                volumes while still maintaining drainage
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Soil Failure Modes and How to Spot Them</S.SectionTitle>
          <ImagePlaceholder>
            Photo series: healthy root system in good substrate vs root problems in compacted substrate vs root rot in
            waterlogged substrate
          </ImagePlaceholder>
          <S.Paragraph>
            Even good substrate eventually fails. Recognizing the signs of substrate breakdown allows you to address
            problems before they damage the tree.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Particle breakdown and compaction</S.SubSectionTitle>
            <S.Paragraph>
              Over time, akadama and some other components break down into smaller particles. These fines fill the
              spaces between larger particles, reducing drainage and oxygen. Signs include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Slow drainage</S.Bold>: water that once drained in seconds now pools on the surface
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Surface crusting</S.Bold>: fines accumulate at the top, forming a crust that repels water
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Muddy consistency</S.Bold>: when you disturb the surface, it feels dense and muddy rather than
                granular
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Prolonged wetness</S.Bold>: the pot stays heavy and wet for days longer than it used to
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The solution is repotting with fresh substrate. This is a normal maintenance task, typically done every
              two to five years depending on species and substrate composition.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Root rot from poor drainage</S.SubSectionTitle>
            <S.Paragraph>
              When substrate fails, roots suffer. Roots in oxygen-depleted, waterlogged soil begin to rot. Signs
              include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wilting despite wet soil</S.Bold>: the tree looks thirsty but the pot is heavy with water
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Yellow or brown leaves</S.Bold>: not from drought, but from root dysfunction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Foul smell</S.Bold>: rotting roots produce a sour or putrid odor
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Black, mushy roots at repotting</S.Bold>: healthy roots are white or tan; rotted roots are dark
                and soft
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              If caught early, the tree can often recover with fresh substrate, root pruning to remove dead tissue, and
              careful aftercare. Severe root rot can be fatal.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison: healthy white root tips vs brown rotting roots vs completely decomposed root system
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Hydrophobic substrate</S.SubSectionTitle>
            <S.Paragraph>
              Organic components and sometimes even akadama can become hydrophobic when they dry out completely. Water
              runs over the surface without penetrating. Signs include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Water running off the surface</S.Bold>: water flows to the sides and out drainage holes without
                wetting the root ball
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dry pockets in the root ball</S.Bold>: some areas stay bone dry despite watering
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Uneven moisture</S.Bold>: the pot feels light even after watering
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The immediate solution is submersion watering—placing the pot in water and letting it soak until bubbling
              stops. Long term, the substrate may need replacement.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Salt and mineral accumulation</S.SubSectionTitle>
            <S.Paragraph>
              Fertilizers and hard water leave behind salts and minerals. Over time, these accumulate in the substrate
              and can reach toxic levels. Signs include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>White crust on the surface</S.Bold>: mineral deposits visible on substrate and pot edges
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaf tip burn</S.Bold>: brown tips on leaves, especially on sensitive species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduced vigor</S.Bold>: general decline not explained by other factors
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Prevention includes using quality water, avoiding over-fertilization, and periodic deep watering to flush
              salts. Repotting replaces the contaminated substrate.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to repot based on substrate condition</S.SubSectionTitle>
            <S.Paragraph>
              The traditional rule is to repot based on root density, but substrate condition matters too. Consider
              repotting when:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Drainage has slowed noticeably</S.ListItem>
              <S.ListItem>The substrate feels compacted or muddy</S.ListItem>
              <S.ListItem>There are signs of root stress despite proper watering</S.ListItem>
              <S.ListItem>
                It has been several years since the last repot, especially for akadama-based mixes
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Substrate health is one of several factors in repotting timing. Root condition, tree health, and seasonal
              timing all matter too.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: the drainage-retention balance diagram, particle size chart, component
            comparison table, climate-based recipe guide, and failure mode recognition checklist
          </ImagePlaceholder>
          <S.Paragraph>
            Bonsai soil is an engineered substrate designed to solve the unique challenges of container culture. In a
            shallow pot, the margin for error is small, and the substrate must balance water retention with oxygen
            availability.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Particle size is the most important variable</S.Bold>. Larger, uniform particles drain faster and
            provide more oxygen, while smaller particles retain more water. The perched water table—the saturated zone
            at the bottom of any pot—means that shallow containers need coarser substrate than deeper ones.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Common components</S.Bold> include akadama (water-retentive clay that breaks down over time), pumice
            (stable volcanic rock with good drainage and retention), lava rock (fast-draining volcanic material), and
            organic components (water-retentive but decomposing). Each has tradeoffs, and most mixes combine several
            materials.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Recipes vary by climate and species</S.Bold>. Humid climates need faster drainage; arid climates
            need more retention. Conifers generally prefer drier conditions; deciduous trees often prefer slightly more
            moisture. The best recipe is one that works for your conditions and produces healthy roots.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Substrate eventually fails</S.Bold>. Particle breakdown, compaction, root rot, hydrophobic
            conditions, and salt accumulation all signal that repotting is needed. Recognizing these signs early
            prevents tree decline. Good substrate management is one of the most important—and often underrated—aspects
            of bonsai cultivation.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-8" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter8;
