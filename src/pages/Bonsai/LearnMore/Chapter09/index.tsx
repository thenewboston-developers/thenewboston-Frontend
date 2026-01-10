import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter9: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 9: Water</S.Title>

        <ImagePlaceholder>
          Full-page image: water being poured from a watering can onto a bonsai, showing droplets and the moment of
          saturation as water flows through the substrate and out drainage holes
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Watering is the most frequent interaction between you and your bonsai. It is also where most beginners go
            wrong. Not because watering is complicated, but because the guidance they receive—"water when the soil is
            dry" or "water once a day"—does not explain what is actually happening.
          </S.Paragraph>
          <S.Paragraph>
            Trees do not want "water." They want a cycling environment where moisture is available when roots need it,
            and oxygen is available between waterings. The goal is not to keep the soil wet or to follow a schedule. The
            goal is to maintain <S.Bold>oxygenated moisture cycles</S.Bold> that support active root function.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>The real goal</S.Bold>: why cycles matter more than schedules
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Watering technique</S.Bold>: how to water properly, not just how often
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Reading your trees</S.Bold>: signs of overwatering vs underwatering
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Water quality</S.Bold>: hardness, chlorine, pH, and what actually matters
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Humidity trays</S.Bold>: what they do and what they do not do
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>The Real Goal: Oxygenated Moisture Cycles</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: cross-section of root zone showing the wet-dry cycle with three phases: saturated (oxygen low),
            moist (ideal), approaching dry (oxygen high, moisture decreasing)
          </ImagePlaceholder>
          <S.Paragraph>
            Roots are not just straws that suck up water. They are living organs that respire, grow, and interact with
            the substrate. To function, roots need both water and oxygen. The challenge is that water and air occupy the
            same pore spaces—when one increases, the other decreases.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Why cycles matter</S.SubSectionTitle>
            <S.Paragraph>A healthy watering cycle looks like this:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Saturation</S.Bold>: you water thoroughly, filling pore spaces with moisture. Excess water
                drains out.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Active uptake</S.Bold>: roots absorb water and the tree transpires moisture through its leaves.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Drying phase</S.Bold>: as water is consumed or evaporates, air enters the pore spaces, providing
                oxygen to roots.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Approaching dry</S.Bold>: the substrate is no longer saturated but still holds moisture in
                smaller pores and within particles.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Next watering</S.Bold>: before the substrate becomes bone dry, you water again, restarting the
                cycle.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The cycle ensures that roots get water when they need it and oxygen when they need that. Neither element
              is neglected.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The problem with constant wetness</S.SubSectionTitle>
            <S.Paragraph>
              If you water before the substrate has a chance to dry, pore spaces stay filled with water. Roots cannot
              access oxygen. Over time, this leads to:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Reduced root respiration</S.Bold>: roots cannot function without oxygen
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Slowed root growth</S.Bold>: new root development stalls
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root rot</S.Bold>: anaerobic conditions allow pathogens to attack weakened roots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Poor water uptake</S.Bold>: paradoxically, waterlogged trees often cannot absorb water because
                their roots are compromised
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The tree looks thirsty, so you water more, but the problem is too much water—not too little.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison photos: healthy root system with white root tips vs waterlogged root system with dark, mushy
              roots
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The problem with chronic dryness</S.SubSectionTitle>
            <S.Paragraph>
              If you let the substrate dry out completely between waterings, roots in the dry zones die. This leads to:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Root tip death</S.Bold>: the fine, absorptive roots are the first to go
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduced uptake capacity</S.Bold>: each drying event kills roots, shrinking the root system
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stress cycles</S.Bold>: the tree is constantly recovering from drought rather than growing
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hydrophobic substrate</S.Bold>: very dry organic components can repel water
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The goal is not to keep soil constantly moist or to let it go bone dry. It is to maintain a cycle where
              moisture is always available in some portion of the root zone, while air is also present.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Why schedules do not work</S.SubSectionTitle>
            <S.Paragraph>
              "Water once a day" or "water every other day" ignores the reality that water use varies constantly:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Weather</S.Bold>: a hot, windy day can dry a pot in hours; a cool, humid day may take days
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Season</S.Bold>: summer water demand is many times higher than winter
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree activity</S.Bold>: an actively growing tree uses more water than a dormant one
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pot size</S.Bold>: a small pot dries faster than a large one
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Substrate</S.Bold>: different mixes hold different amounts of water
              </S.ListItem>
            </S.List>
            <S.Paragraph>A schedule cannot account for these variables. You must observe and respond.</S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Watering Technique, Not Schedules</S.SectionTitle>
          <ImagePlaceholder>
            Step-by-step photo series: checking soil moisture, beginning to water, thorough saturation with water
            flowing from drainage holes, final check
          </ImagePlaceholder>
          <S.Paragraph>
            Good watering is a technique, not a calendar. The method matters as much as the timing.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Check before watering</S.SubSectionTitle>
            <S.Paragraph>Before you water, assess whether the tree needs it. Several methods work:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Visual inspection</S.Bold>: the substrate surface usually looks lighter or drier when moisture
                is decreasing. Akadama changes from dark brown (wet) to tan (approaching dry).
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Touch test</S.Bold>: press a finger into the substrate about half an inch. If it feels moist,
                wait. If it feels dry or barely damp, water.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Weight test</S.Bold>: lift the pot. With practice, you can feel the difference between a heavy,
                saturated pot and a light, drier one.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chopstick method</S.Bold>: insert a wooden chopstick into the substrate and leave it. Pull it
                out before watering—if it is damp, wait; if dry, water. The chopstick reflects moisture at depth, not
                just the surface.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The key is to water <S.Bold>before</S.Bold> the substrate goes completely dry, but <S.Bold>after</S.Bold>{' '}
              it has had a chance to cycle through a drying phase.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Water thoroughly</S.SubSectionTitle>
            <S.Paragraph>
              When you water, do not just wet the surface. The goal is to saturate the entire root zone and flush fresh
              water through the pot:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Water until it flows from drainage holes</S.Bold>: this ensures the entire pot is saturated, not
                just the top inch
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Wait a moment and water again</S.Bold>: the first pass wets the substrate; the second pass
                ensures full saturation and flushes out stale water and accumulated salts
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid leaving the pot sitting in water</S.Bold>: unless you are correcting hydrophobic
                substrate, do not let pots sit in saucers of water
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Thorough watering means every watering is a complete cycle. Partial watering creates dry pockets where
              roots cannot reach moisture.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: cross-section showing partial watering (water only in top layer) vs thorough watering (water
              distributed throughout pot)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Watering tools and techniques</S.SubSectionTitle>
            <S.Paragraph>The tool you use affects the quality of watering:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Watering can with fine rose</S.Bold>: a gentle spray simulates rain and waters evenly without
                disturbing substrate or surface moss. This is the traditional bonsai watering tool.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hose with adjustable nozzle</S.Bold>: efficient for many trees, but use a gentle spray setting
                to avoid blasting substrate or roots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Submersion</S.Bold>: placing the entire pot in water until bubbling stops ensures complete
                saturation. Useful for hydrophobic substrate or severely dried-out trees.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Avoid watering with a hard stream that erodes substrate or displaces surface treatments.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Timing during the day</S.SubSectionTitle>
            <S.Paragraph>
              When during the day you water matters less than doing it right, but some considerations:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Morning watering</S.Bold>: often preferred because it gives the tree water for the day ahead and
                allows foliage to dry before nightfall (reducing fungal risk)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Evening watering</S.Bold>: can be necessary in hot weather when morning watering was not enough,
                but consistently wet foliage overnight can encourage disease
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Midday watering</S.Bold>: contrary to myth, watering in sun does not burn leaves; water droplets
                do not focus light dangerously. However, cool water on hot roots can stress some species.
              </S.ListItem>
            </S.List>
            <S.Paragraph>In practice, water when the tree needs it. If that is midday, water at midday.</S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Multiple waterings per day</S.SubSectionTitle>
            <S.Paragraph>
              In hot summer conditions, especially with small pots or high-transpiring species, you may need to water
              more than once a day. This is normal and necessary:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Small pots have less water reserve and dry faster</S.ListItem>
              <S.ListItem>High temperatures increase evaporation</S.ListItem>
              <S.ListItem>Wind accelerates drying</S.ListItem>
              <S.ListItem>Trees in full leaf transpire heavily</S.ListItem>
            </S.List>
            <S.Paragraph>
              If your trees need water twice a day and you cannot provide it, consider shade cloth, larger pots during
              development, or adjusting placement to reduce heat stress.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Signs of Overwatering vs Underwatering</S.SectionTitle>
          <ImagePlaceholder>
            Side-by-side comparison: tree showing overwatering symptoms (yellowing, wilting despite wet soil) vs tree
            showing underwatering symptoms (crispy leaf edges, drooping, dry soil)
          </ImagePlaceholder>
          <S.Paragraph>
            Overwatering and underwatering can produce surprisingly similar symptoms—both can cause wilting, yellowing,
            and leaf drop. Learning to distinguish them is essential.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Overwatering symptoms</S.SubSectionTitle>
            <S.Paragraph>Overwatering means the root zone stays saturated too long. Symptoms include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wilting despite wet substrate</S.Bold>: the tree droops, but the pot is heavy and the soil is
                wet. Roots are too compromised to uptake water.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Yellowing leaves, especially lower leaves</S.Bold>: leaves turn yellow and drop, often starting
                at the bottom of branches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Soft, brown leaf tips</S.Bold>: rather than crispy, the dead tissue is soft or mushy
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Algae or moss growth on surface</S.Bold>: persistent moisture encourages surface growth that is
                not decorative moss
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Foul smell from the pot</S.Bold>: rotting roots produce a sour or rotten odor
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fungus gnats</S.Bold>: these small flies indicate persistently wet, organic conditions
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The fix is to allow the substrate to dry more between waterings, improve drainage if substrate has broken
              down, and assess root health. Severe cases may require emergency repotting.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Underwatering symptoms</S.SubSectionTitle>
            <S.Paragraph>Underwatering means roots cannot access enough moisture. Symptoms include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wilting with dry substrate</S.Bold>: leaves droop and the pot is light; substrate feels dry
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crispy leaf edges and tips</S.Bold>: dead tissue is dry and brittle, not soft
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaves curling inward</S.Bold>: the tree is reducing surface area to conserve water
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Premature leaf drop</S.Bold>: the tree sheds leaves to reduce water demand
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Shriveled or wrinkled trunk (on some species)</S.Bold>: the trunk itself shows dehydration
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Substrate pulling away from pot edges</S.Bold>: severely dried substrate shrinks
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The fix is immediate thorough watering, potentially by submersion. Protect from hot sun until recovered.
              Chronic underwatering kills fine roots, so repeated episodes progressively weaken the tree.
            </S.Paragraph>
            <ImagePlaceholder>
              Close-up photos: crispy brown leaf edges from underwatering vs soft yellow leaves from overwatering
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The diagnostic process</S.SubSectionTitle>
            <S.Paragraph>When a tree shows stress, check the basics before jumping to conclusions:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Check substrate moisture</S.Bold>: use the touch test or chopstick method to assess moisture at
                depth, not just the surface
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Lift the pot</S.Bold>: is it heavy (wet) or light (dry)?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Consider recent history</S.Bold>: have you been watering more or less than usual? Has weather
                changed?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Check drainage</S.Bold>: is water draining freely when you water, or pooling?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Smell the pot</S.Bold>: a foul odor indicates rot
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Many tree problems are watering problems. Before looking for exotic diseases or pests, assess water
              management first.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Water Quality: Hardness, Chlorine, pH</S.SectionTitle>
          <ImagePlaceholder>
            Infographic: water quality factors showing test strips, pH scale, and common municipal water treatment
            additives
          </ImagePlaceholder>
          <S.Paragraph>
            Not all water is equal. While most trees tolerate a wide range of water quality, some issues can cause
            problems over time.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Hardness and mineral content</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Hard water</S.Bold> contains high levels of dissolved calcium and magnesium. These minerals are
              not immediately harmful to most trees, but:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Mineral buildup</S.Bold>: over time, minerals accumulate in substrate and on pot surfaces,
                visible as white crust
              </S.ListItem>
              <S.ListItem>
                <S.Bold>pH effects</S.Bold>: hard water tends to be alkaline, which can shift substrate pH over time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Nutrient availability</S.Bold>: very alkaline conditions can make iron and other micronutrients
                less available, causing deficiencies
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              For most species, moderately hard water is fine. Acid-loving plants (azaleas, gardenias) may need
              rainwater collection or other soft water sources in hard water areas.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Chlorine and chloramine</S.SubSectionTitle>
            <S.Paragraph>
              Municipal water is treated with chlorine or chloramine to kill pathogens. These chemicals can affect soil
              biology:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Chlorine</S.Bold>: dissipates relatively quickly when water is left standing. Leaving water in
                an open container overnight allows most chlorine to gas off.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chloramine</S.Bold>: a combination of chlorine and ammonia that is more stable and does not gas
                off. Removing it requires filtration or chemical treatment.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              In practice, most bonsai do fine with municipal water straight from the tap. If you are concerned about
              soil biology (particularly for organic fertilization approaches), letting water stand or using filtered
              water can help.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>pH</S.SubSectionTitle>
            <S.Paragraph>
              Water pH affects what happens in the substrate over time. Most trees prefer slightly acidic to neutral
              conditions (pH 5.5-7.0). Considerations:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Alkaline water (high pH)</S.Bold>: gradually shifts substrate toward alkaline, which can limit
                nutrient uptake for acid-loving species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Acidic water</S.Bold>: rare in municipal supplies but common in some well water; usually not a
                problem unless extreme
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inorganic substrates</S.Bold>: have less buffering capacity than organic soils, so water pH has
                more direct effect
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              For most species and water sources, pH is not a significant concern. Azaleas and other ericaceous plants
              are the main exception—they require acidic conditions and may struggle with alkaline water.
            </S.Paragraph>
            <ImagePlaceholder>
              Photo: white mineral deposits on pot edge and substrate surface from hard water over time
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When water quality matters most</S.SubSectionTitle>
            <S.Paragraph>Water quality becomes more important in specific situations:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Acid-loving species</S.Bold>: azaleas, camellias, gardenias need soft, acidic water if your
                supply is hard and alkaline
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Long periods without repotting</S.Bold>: minerals and salts accumulate over years; more frequent
                repotting resets conditions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Very hard water</S.Bold>: if your water is extremely hard, consider rainwater collection for
                sensitive species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Visible problems</S.Bold>: if you see yellowing between veins (chlorosis) that suggests iron
                deficiency, water pH may be limiting nutrient availability
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Most bonsai practitioners use tap water without problems. Address water quality only if you see issues or
              grow sensitive species.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Humidity Trays and What They Do and Do Not Do</S.SectionTitle>
          <ImagePlaceholder>
            Photo: bonsai on humidity tray with pebbles and water, with arrows showing the actual humidity effect
            (minimal) and the real benefits (drainage catchment, visual presentation)
          </ImagePlaceholder>
          <S.Paragraph>
            Humidity trays are shallow trays filled with pebbles and water, with the bonsai pot sitting on top. They are
            widely recommended for indoor bonsai. But their actual effects are often misunderstood.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What humidity trays actually do</S.SubSectionTitle>
            <S.Paragraph>The honest assessment:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Minimal humidity increase</S.Bold>: studies show humidity trays raise humidity around the plant
                by only 1-3%, which is not significant for most purposes
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Catch drainage</S.Bold>: they prevent water from running onto furniture or floors, which is
                genuinely useful indoors
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Visual presentation</S.Bold>: they create a finished, tidy appearance for indoor display
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Prevent pot sitting in water</S.Bold>: if pebbles keep the pot above the water level, drainage
                can occur normally
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What humidity trays do not do</S.SubSectionTitle>
            <S.Paragraph>Common misconceptions:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Significantly raise humidity</S.Bold>: a small tray of water cannot meaningfully change the
                humidity in a room with air conditioning or heating
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Replicate outdoor humidity</S.Bold>: indoor environments in most climates are far drier than
                trees prefer; a tray does not fix this
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Replace proper watering</S.Bold>: the tree still needs to be watered normally; the tray does not
                provide moisture to roots
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>If you want higher humidity indoors</S.SubSectionTitle>
            <S.Paragraph>
              If low humidity is genuinely a problem—and for many tropical species indoors, it is—more effective
              solutions include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Room humidifier</S.Bold>: the only way to meaningfully raise ambient humidity in a room
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Grouping plants</S.Bold>: multiple plants together create a slightly more humid microclimate
                through combined transpiration
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Enclosures or terrariums</S.Bold>: for very humidity-sensitive species, partially enclosed
                setups can maintain higher moisture
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moving trees outdoors when possible</S.Bold>: the most effective solution for species that need
                humidity is to provide outdoor time when weather permits
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Photo comparison: room with humidifier showing humidity reading vs room with just humidity tray showing
              minimal difference
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Using humidity trays correctly</S.SubSectionTitle>
            <S.Paragraph>If you use a humidity tray, a few practical points:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Keep water below pebble level</S.Bold>: the pot should never sit in water; pebbles must support
                it above the waterline
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clean regularly</S.Bold>: standing water can grow algae and attract fungus gnats; change water
                weekly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Do not rely on it for humidity</S.Bold>: treat it as drainage management and presentation, not
                as a humidity solution
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: the oxygenated moisture cycle diagram, proper watering technique steps,
            over/underwatering symptom comparison chart, water quality quick reference
          </ImagePlaceholder>
          <S.Paragraph>
            Watering is the most frequent task in bonsai care and the most common source of problems. The goal is not to
            keep soil wet or to follow a schedule—it is to maintain <S.Bold>oxygenated moisture cycles</S.Bold> where
            roots have access to both water and air.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Technique matters more than timing</S.Bold>. Check moisture before watering—use the touch test,
            weight test, or chopstick method. When you water, water thoroughly until water flows from drainage holes,
            then let the substrate cycle through a drying phase before watering again. Partial watering creates dry
            pockets; constant wetness suffocates roots.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Learn to read your trees</S.Bold>. Overwatering and underwatering can produce similar symptoms, but
            the substrate tells the story. Wilting with wet, heavy soil suggests overwatering and root problems. Wilting
            with dry, light soil suggests underwatering. Check substrate moisture first whenever a tree shows stress.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Water quality usually matters less than people think</S.Bold>. Most trees tolerate typical municipal
            water. Concerns about chlorine, hardness, and pH are valid for sensitive species or extreme water
            conditions, but most bonsai do fine with tap water.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Humidity trays are not humidity solutions</S.Bold>. They catch drainage and look nice, but they do
            not meaningfully raise humidity. If low humidity is a genuine problem for your trees, consider a room
            humidifier or outdoor time rather than relying on a water tray.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-9" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter9;
