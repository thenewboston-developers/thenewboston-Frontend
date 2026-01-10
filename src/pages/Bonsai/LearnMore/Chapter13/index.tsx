import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter13: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 13: Winter, Dormancy, and Protection</S.Title>

        <ImagePlaceholder>
          Illustration: bonsai in winter setting—deciduous tree without leaves showing branch structure, snow-dusted
          pot, dormant buds visible on branches
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Winter presents both opportunity and hazard for temperate bonsai. Dormancy is a natural and necessary phase
            for most trees—a period of rest that prepares them for the next growing season. But the same conditions that
            trigger dormancy can also damage or kill trees if protection is inadequate.
          </S.Paragraph>
          <S.Paragraph>
            Understanding dormancy and providing appropriate winter protection allows temperate bonsai to survive winter
            safely while receiving the cold exposure they require.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>What dormancy is and is not</S.Bold>: the biology of winter rest
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Cold requirements</S.Bold>: why trees need winter cold and what happens without it
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Winter hazards</S.Bold>: freeze-thaw cycles, root freezing, and desiccation
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Protection strategies</S.Bold>: methods from minimal to intensive depending on climate and species
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Winter care</S.Bold>: watering, monitoring, and preparing for spring
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>What Dormancy Is</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: annual cycle of a temperate tree showing active growth, slowing, dormancy induction, deep dormancy,
            chilling accumulation, and dormancy release leading back to growth
          </ImagePlaceholder>
          <S.Paragraph>
            Dormancy is not simply "sleeping" or shutting down—it is an active biological state with specific
            characteristics and requirements.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The dormancy process</S.SubSectionTitle>
            <S.Paragraph>As day length shortens and temperatures drop in fall, temperate trees:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Cease active growth</S.Bold>: new shoot extension stops, leaves mature and harden
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Prepare for cold</S.Bold>: cells adjust their chemistry to tolerate freezing—increasing sugars
                and proteins that act as antifreeze
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Move resources</S.Bold>: nutrients are pulled from leaves into woody tissue for storage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Drop leaves</S.Bold>: deciduous trees form abscission layers and shed foliage
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Enter dormancy</S.Bold>: metabolic activity slows dramatically; buds set and will not open
                regardless of temperature
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This preparation takes time. A sudden hard freeze before trees have acclimated can cause damage even to
              cold-hardy species.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Types of dormancy</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Endodormancy</S.Bold>
              <br />
              True dormancy is internal—the tree will not grow even if conditions become favorable. Buds contain
              inhibitors that prevent growth until a sufficient period of cold has passed.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Ecodormancy</S.Bold>
              <br />
              After the chilling requirement is met, trees remain dormant only because external conditions (temperature)
              are unfavorable. Once temperatures rise sufficiently, growth resumes.
            </S.Paragraph>
            <S.Paragraph>
              This distinction matters: a tree in endodormancy cannot be forced into growth by warming; a tree in
              ecodormancy will respond to warmth.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: endodormancy vs ecodormancy—showing internal inhibition in endodormancy versus external
              limitation in ecodormancy, with transition point after chilling requirement is met
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What dormancy is not</S.SubSectionTitle>
            <S.Paragraph>Common misconceptions about dormancy:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Not death</S.Bold>: dormant trees are alive, with slow but ongoing metabolic activity
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Not optional</S.Bold>: temperate species require dormancy; they cannot grow continuously
                year-round without harm
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Not just about cold tolerance</S.Bold>: dormancy also resets growth hormones and allows repair
                processes that only occur during rest
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Not instant</S.Bold>: both entering and exiting dormancy are gradual processes
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Chilling Requirements</S.SectionTitle>
          <ImagePlaceholder>
            Graph: chilling hour accumulation over winter months, with threshold line showing when requirement is met
            and tree transitions from endodormancy to ecodormancy
          </ImagePlaceholder>
          <S.Paragraph>
            Most temperate trees require a period of cold—measured in "chilling hours"—before dormancy breaks and spring
            growth can proceed normally.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What chilling hours are</S.SubSectionTitle>
            <S.Paragraph>
              Chilling hours are typically counted as hours spent at temperatures between approximately 32°F and 45°F
              (0°C and 7°C). The exact effective range varies by species and research methodology, but this range
              captures the temperatures that break dormancy.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Temperatures above this range do not contribute to chilling</S.ListItem>
              <S.ListItem>Very cold temperatures (below freezing) contribute less efficiently</S.ListItem>
              <S.ListItem>Warm spells can partially reverse chilling accumulation</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Species variation</S.SubSectionTitle>
            <S.Paragraph>
              Chilling requirements vary enormously by species and even by variety within species:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>High-chill species</S.Bold>: many maples, beeches, and northern conifers may need 1,000-1,500+
                chilling hours
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moderate-chill species</S.Bold>: most common temperate bonsai species need 400-1,000 hours
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Low-chill species</S.Bold>: some southern varieties and species adapted to mild climates need
                only 200-400 hours
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tropical species</S.Bold>: no chilling requirement; dormancy is not part of their biology
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Chart: approximate chilling requirements for common bonsai species—from high-chill (beech, sugar maple) to
              moderate (Japanese maple, most pines) to low-chill (Chinese elm, some junipers)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Consequences of insufficient chilling</S.SubSectionTitle>
            <S.Paragraph>
              Trees that do not receive adequate chilling may exhibit problems the following spring:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Delayed or irregular bud break</S.Bold>: some buds open while others remain dormant
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Weak growth</S.Bold>: shoots may be stunted or lack vigor
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduced flowering and fruiting</S.Bold>: flower buds may fail to develop properly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Long-term decline</S.Bold>: repeated insufficient chilling weakens trees over seasons
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why keeping temperate bonsai indoors year-round fails—they cannot complete their natural cycle
              without winter cold.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Winter Hazards</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: three winter hazards—frozen pot with cracked ceramic, desiccated conifer foliage with brown
            tips, root ball showing freeze damage
          </ImagePlaceholder>
          <S.Paragraph>
            While dormancy itself is natural and necessary, winter conditions can damage bonsai in several ways. The
            hazards are different from what trees face in the ground.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Root freezing</S.SubSectionTitle>
            <S.Paragraph>
              This is the primary winter danger for bonsai. In the ground, tree roots are insulated by surrounding soil
              that rarely freezes deeply. In a pot:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Roots are exposed on all sides</S.Bold>: the pot does not provide meaningful insulation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Small soil volume freezes quickly</S.Bold>: a bonsai pot can freeze solid overnight
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Roots are less cold-hardy than branches</S.Bold>: root tissue may be damaged by temperatures
                that above-ground parts tolerate easily
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Root hardiness varies by species but is typically 10-20°F (-5 to -10°C) warmer than branch hardiness. A
              species rated hardy to -20°F (-29°C) may have roots that are damaged below 0°F (-18°C).
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: comparison of root exposure in ground vs pot—ground showing insulating soil mass, pot showing
              roots exposed to air temperature on all sides
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Freeze-thaw cycles</S.SubSectionTitle>
            <S.Paragraph>Repeated freezing and thawing causes damage in several ways:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Ice crystal damage</S.Bold>: rapid freezing forms large ice crystals that rupture cells; slow
                freezing allows water to move out of cells first
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heaving</S.Bold>: repeated expansion and contraction can push trees in their pots, damaging
                roots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Premature awakening</S.Bold>: warm spells can trigger deacclimation, making trees vulnerable to
                subsequent cold
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Stable cold is less damaging than fluctuating temperatures. Protection aims to moderate these swings, not
              necessarily to keep trees warm.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Winter desiccation</S.SubSectionTitle>
            <S.Paragraph>
              Evergreen trees continue to lose water through foliage in winter. If roots are frozen, they cannot replace
              this water, leading to desiccation damage:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wind accelerates water loss</S.Bold>: exposed evergreens in windy locations are most vulnerable
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sun on frozen plants</S.Bold>: solar heating increases transpiration while roots remain frozen
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Symptoms</S.Bold>: brown or bronze foliage, especially on exposed sides; damage may not appear
                until spring
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Wind protection is especially important for evergreen bonsai—junipers, pines, and broadleaf evergreens.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Pot damage</S.SubSectionTitle>
            <S.Paragraph>Freezing can crack ceramic pots, especially:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Water in drainage holes</S.Bold>: ice expansion cracks pots from the inside
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wet soil against pot walls</S.Bold>: expansion pressures the sides
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Low-fired ceramics</S.Bold>: some decorative pots are not frost-proof
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Quality bonsai pots are typically high-fired and frost-resistant, but not frost-proof. Elevating pots so
              drainage holes do not sit in frozen water helps prevent cracking.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Protection Strategies</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: range of winter protection methods from minimal (mulched beds) to moderate (cold frames) to
            intensive (unheated greenhouse or garage)
          </ImagePlaceholder>
          <S.Paragraph>
            The level of protection needed depends on your climate, the species you grow, and your willingness to accept
            risk. Protection is about moderating temperature extremes and preventing the specific hazards discussed
            above.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Minimal protection</S.SubSectionTitle>
            <S.Paragraph>In mild climates or for very hardy species, minimal protection may suffice:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Ground placement</S.Bold>: setting pots on the ground provides more stable temperatures than
                elevated benches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Grouping trees</S.Bold>: clustered trees shelter each other from wind
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Mulch around pots</S.Bold>: mulch up to the rim insulates root zones
              </S.ListItem>
              <S.ListItem>
                <S.Bold>North side placement</S.Bold>: areas with minimal sun fluctuation stay more consistently cold
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This approach works where temperatures rarely drop below 20°F (-7°C) or for species native to your
              climate.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Burying pots</S.SubSectionTitle>
            <S.Paragraph>
              One effective method is burying pots up to the rim in the ground or in raised beds:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Roots receive the same insulation as trees growing in the ground</S.ListItem>
              <S.ListItem>Works for severe climates where temperatures drop well below 0°F (-18°C)</S.ListItem>
              <S.ListItem>Requires available ground space and effort to dig up in spring</S.ListItem>
              <S.ListItem>
                Cover exposed branches with mulch or leaves for additional protection in extreme cold
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Diagram: pot buried in ground with mulch mounded over the root zone, showing insulation protection
              equivalent to ground-planted trees
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Cold frames and hoop houses</S.SubSectionTitle>
            <S.Paragraph>
              Structures that provide wind protection and moderate temperature swings without heating:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Cold frames</S.Bold>: low structures with transparent or translucent covers; good for small
                collections
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hoop houses</S.Bold>: plastic-covered arches over benches or beds; can protect larger
                collections
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temperature moderation</S.Bold>: these structures typically stay 10-15°F (5-8°C) warmer than
                outside minimums
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ventilation required</S.Bold>: on sunny days, temperatures can spike dangerously high; venting
                prevents premature warming
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Cold frames and hoop houses do not prevent freezing but they eliminate wind, reduce freeze-thaw cycling,
              and prevent extreme lows.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Unheated structures</S.SubSectionTitle>
            <S.Paragraph>Garages, sheds, and unheated greenhouses provide substantial protection:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Temperature buffering</S.Bold>: typically stay above freezing or only lightly freeze even in
                cold climates
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Complete wind and weather protection</S.Bold>: eliminates desiccation risk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Light consideration</S.Bold>: deciduous trees do not need light while dormant; evergreens need
                some light, so garages work better for deciduous collections
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Monitoring needed</S.Bold>: check occasionally that temperatures remain appropriate and trees do
                not dry out
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The risk with enclosed structures is that trees may not receive sufficient chilling if temperatures stay
              too warm. An unheated garage typically works; a heated garage does not.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: unheated garage setup for bonsai winter storage—trees on bench near window, thermometer for
              monitoring, with notation about checking watering needs
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Heating for protection</S.SubSectionTitle>
            <S.Paragraph>
              In extreme climates, some heating may be necessary, but it must be applied carefully:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Goal is preventing damage, not warmth</S.Bold>: keep temperatures just above the danger
                threshold for roots—typically above 20°F (-7°C)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Thermostat control essential</S.Bold>: heating only when needed preserves dormancy
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Risk of insufficient chilling</S.Bold>: overheating prevents the cold accumulation trees need
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Humidity management</S.Bold>: heated spaces dry out; monitor and water as needed
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              A small heater with a thermostat set to 25-30°F (-4 to -1°C) in a greenhouse or shed can prevent the worst
              cold while still allowing chilling accumulation.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Protection by species hardiness</S.SubSectionTitle>
            <S.Paragraph>Match protection level to species needs:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Fully hardy species</S.Bold> (native to your zone or colder): minimal protection needed—ground
                placement and wind shelter
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Marginally hardy species</S.Bold> (one zone warmer than yours): cold frame or similar protection
                for extreme cold
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tender species</S.Bold> (two or more zones warmer): unheated structure or minimal heating
                required
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tropical species</S.Bold>: must be brought indoors; they need warm conditions, not dormancy
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Chart: protection recommendations by hardiness zone difference—from no protection needed for native
              species to indoor requirements for tropicals
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Winter Care Tasks</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: winter care activities—checking soil moisture in dormant tree, inspecting for pests under
            bark, monitoring temperature in cold frame
          </ImagePlaceholder>
          <S.Paragraph>
            Dormant trees need less attention than actively growing ones, but they should not be forgotten entirely.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Winter watering</S.SubSectionTitle>
            <S.Paragraph>
              Dormant trees use little water, but they still need some. Roots die if they dry out completely:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Check periodically</S.Bold>: every week or two in mild periods, less often in deep cold
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Water when thawed</S.Bold>: water only when soil is not frozen; trying to water frozen soil is
                futile
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Light watering</S.Bold>: soil should be slightly moist, not wet. Cold, wet soil promotes rot.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid warm water</S.Bold>: use cool to cold water to avoid triggering premature activity
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Overwintering in enclosed structures requires more attention to watering since rain does not reach the
              trees.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Pest and disease monitoring</S.SubSectionTitle>
            <S.Paragraph>
              Winter is a good time to inspect trees for problems that are harder to see during the growing season:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Scale insects</S.Bold>: visible as bumps on bark; can be scraped off or treated with dormant oil
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Egg masses</S.Bold>: some pests overwinter as eggs on branches; remove any you find
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fungal issues</S.Bold>: look for cankers, dead spots, or unusual growths that may need treatment
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Structural issues</S.Bold>: with leaves off deciduous trees, branch structure is visible for
                evaluation
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Dormant oil sprays applied in late winter can address many pest problems before spring activity begins.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Protecting against pests</S.SubSectionTitle>
            <S.Paragraph>Winter storage areas can attract unwanted visitors:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Rodents</S.Bold>: mice can chew bark and roots; use traps or barriers in enclosed structures
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Deer and rabbits</S.Bold>: can browse bark and branches; fencing or placement out of reach
                provides protection
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Slugs and snails</S.Bold>: may shelter in cold frames; remove and apply barriers if problematic
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Transitioning In and Out of Winter</S.SectionTitle>
          <ImagePlaceholder>
            Timeline diagram: fall preparation through winter protection through spring transition—showing key tasks and
            timing at each stage
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Fall preparation</S.SubSectionTitle>
            <S.Paragraph>Preparing for winter begins before cold arrives:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Stop fertilizing</S.Bold>: cease nitrogen fertilization by late summer to allow trees to harden
                off naturally
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduce watering gradually</S.Bold>: as growth slows, water needs decrease
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Allow natural hardening</S.Bold>: exposure to cool fall temperatures triggers cold acclimation;
                do not protect too early
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Prepare protection structures</S.Bold>: have cold frames, mulch, and other materials ready
                before they are needed
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Final pest check</S.Bold>: treat any issues before trees go into dormancy
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Timing of protection</S.SubSectionTitle>
            <S.Paragraph>
              Move trees into winter protection after they have hardened but before damaging cold arrives:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Deciduous trees</S.Bold>: after leaf drop and several hard frosts
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Evergreens</S.Bold>: after consistent cold but before extreme lows
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Watch forecasts</S.Bold>: protect before predicted hard freezes, not after
              </S.ListItem>
            </S.List>
            <S.Paragraph>Protecting too early prevents proper hardening; protecting too late risks damage.</S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Spring transition</S.SubSectionTitle>
            <S.Paragraph>Emerging from winter protection is as important as entering it:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Gradual exposure</S.Bold>: move trees out of protection gradually as weather moderates; sudden
                exposure to sun and wind stresses deacclimated tissue
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Watch for late freezes</S.Bold>: be prepared to protect emerging growth from late cold snaps
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Resume normal watering</S.Bold>: as buds swell and growth begins, water needs increase
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Delay fertilizing</S.Bold>: wait until active growth is clearly underway before resuming
                fertilization
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Assess winter damage</S.Bold>: inspect for cold damage, broken branches, or pest issues before
                the growing season begins
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: spring transition showing gradual movement from protected location to partial exposure to
              full bench display over several weeks
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap infographic: dormancy cycle graphic, chilling requirements overview, winter hazard icons with
            prevention methods, protection strategy decision tree by climate zone
          </ImagePlaceholder>
          <S.Paragraph>
            Winter dormancy is a necessary part of the annual cycle for temperate bonsai. Trees require cold exposure to
            complete their dormancy cycle and prepare for healthy spring growth. The challenge is providing the cold
            they need while protecting them from the cold that can cause damage.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Dormancy is active, not passive</S.Bold>. Trees prepare for winter through a gradual process of
            hardening, and they require accumulated chilling hours before dormancy releases. Insufficient chilling leads
            to weak, irregular growth.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Root freezing is the primary danger</S.Bold>. Roots are less hardy than branches and lack the
            insulation that ground planting provides. Protection focuses on keeping roots from extreme cold.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Protection matches climate and species</S.Bold>. Hardy species in mild climates need minimal
            protection. Tender species or severe climates require more intensive measures. The goal is moderating
            extremes while allowing chilling accumulation—trees should stay cold, just not dangerously cold.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Transitions matter</S.Bold>. Both entering winter protection and emerging in spring should be
            gradual. Allow natural hardening in fall, and acclimate trees slowly to spring conditions. Sudden changes
            cause more damage than steady cold.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-13" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter13;
