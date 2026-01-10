import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter10: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 10: Light and Placement</S.Title>

        <ImagePlaceholder>
          Full-page image: bonsai display area showing trees positioned at different heights and orientations to capture
          optimal light, with visible sunlight streaming across the scene
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Light is the energy source for all plant life. Without adequate light, a tree cannot photosynthesize
            effectively, cannot build carbohydrates, and cannot grow. In the wild, trees compete fiercely for light,
            growing toward gaps in the canopy and adjusting their structure to capture whatever is available.
          </S.Paragraph>
          <S.Paragraph>
            In bonsai, you control placement. This is both an opportunity and a responsibility. Put a tree in the wrong
            spot and it will struggle silently—stretching, weakening, declining. Put it in the right spot and growth is
            compact, vigorous, and healthy.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Light intensity, duration, and seasonal changes</S.Bold>: what trees actually need
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Indoor realities and grow lights</S.Bold>: why indoor bonsai is difficult and what helps
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Outdoor placement</S.Bold>: wind, sun angles, heat islands, and microclimates
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Shade cloth, heat management, and acclimation</S.Bold>: protecting trees while maintaining light
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Light Intensity, Duration, and Seasonal Changes</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: the light spectrum with photosynthetically active radiation (PAR) highlighted, and comparison bars
            showing light intensity outdoors vs near a window vs deep indoors
          </ImagePlaceholder>
          <S.Paragraph>
            Understanding what light means for plants requires looking beyond "bright" and "dim." Light has measurable
            properties that affect how trees grow.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Light intensity</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Intensity</S.Bold> is how much light energy reaches the leaves. Outdoors on a clear day, light
              intensity is extremely high—typically 10,000 to 100,000 lux depending on sun angle and cloud cover.
              Indoors, even near a bright window, intensity drops dramatically:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Right at a south-facing window</S.Bold>: 5,000-10,000 lux on a bright day
              </S.ListItem>
              <S.ListItem>
                <S.Bold>A few feet back from a window</S.Bold>: 1,000-3,000 lux
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Center of a room</S.Bold>: 100-500 lux
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Most trees need sustained exposure to high light intensity for robust photosynthesis. What looks "bright"
              to human eyes is often insufficient for trees.
            </S.Paragraph>
            <ImagePlaceholder>
              Infographic: light intensity comparison showing outdoor full sun, outdoor shade, window sill, and room
              interior with corresponding lux values
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Duration (photoperiod)</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Duration</S.Bold> is how long light exposure continues each day. This affects both total energy
              and seasonal cues:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Total daily light integral</S.Bold>: a tree receiving moderate light for many hours may
                accumulate similar total energy to one receiving intense light for fewer hours
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Seasonal signals</S.Bold>: changing day length triggers dormancy preparation, bud development,
                and other seasonal responses in temperate species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Minimum thresholds</S.Bold>: very low light for very short periods may not reach the threshold
                for meaningful photosynthesis
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              For most temperate bonsai, experiencing natural seasonal changes in day length is important for long-term
              health. Tropical species are less dependent on photoperiod cues.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Light quality (spectrum)</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Quality</S.Bold> refers to the wavelengths present in light. Plants primarily use blue and red
              wavelengths for photosynthesis (photosynthetically active radiation, or PAR):
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Blue light (400-500nm)</S.Bold>: promotes compact growth and strong leaf development
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Red light (600-700nm)</S.Bold>: drives photosynthesis efficiently and influences flowering
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Green light (500-600nm)</S.Bold>: mostly reflected (which is why leaves appear green), but some
                is used
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Sunlight contains a full spectrum. Indoor lighting varies—some bulbs are heavy in certain wavelengths and
              weak in others. For grow lights, full-spectrum or balanced blue/red output supports healthy growth.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Seasonal changes</S.SubSectionTitle>
            <S.Paragraph>Outdoor light changes dramatically through the year in most climates:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Summer</S.Bold>: long days, high sun angle, intense light. Trees can photosynthesize heavily and
                build reserves.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Winter</S.Bold>: short days, low sun angle, weaker light even when clear. Deciduous trees are
                dormant; evergreens photosynthesize minimally.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Transitions</S.Bold>: spring and fall bring moderate light and changing day length, triggering
                growth flushes or dormancy preparation
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These changes are normal and necessary for temperate species. Trying to provide constant conditions
              year-round disrupts natural rhythms.
            </S.Paragraph>
            <ImagePlaceholder>
              Seasonal diagram: sun angle and day length changes through the year, showing how the same placement
              receives different light in summer vs winter
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Indoor Realities and Grow Lights</S.SectionTitle>
          <ImagePlaceholder>
            Photo: indoor bonsai setup with grow lights, showing light placement, distance from trees, and the overall
            environment
          </ImagePlaceholder>
          <S.Paragraph>
            Indoor bonsai is challenging. Most trees—even so-called "indoor" species—evolved to grow outdoors. Moving
            them inside means confronting significant light deficits and environmental differences.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Why indoors is hard</S.SubSectionTitle>
            <S.Paragraph>Indoor environments present multiple challenges:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Light intensity is dramatically lower</S.Bold>: even bright windows provide a fraction of
                outdoor light
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Light direction is limited</S.Bold>: outdoors, light comes from the entire sky dome; indoors, it
                comes from one direction, creating uneven growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Humidity is often low</S.Bold>: heating and air conditioning dry the air far below what most
                trees prefer
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Airflow is minimal</S.Bold>: still air encourages fungal problems and weak tissue development
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temperature is constant</S.Bold>: lack of day/night and seasonal temperature variation affects
                dormancy and seasonal cues
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why experienced bonsai practitioners generally keep trees outdoors except for brief display
              periods. "Indoor bonsai" as a permanent condition works only for a limited set of tropical species, and
              even then requires attention to these challenges.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Species that tolerate indoor conditions</S.SubSectionTitle>
            <S.Paragraph>
              Some species handle indoor life better than others. These are typically tropical or subtropical plants
              that do not require dormancy:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Ficus species</S.Bold>: particularly Ficus microcarpa and Ficus benjamina—adaptable to lower
                light and forgiving of care variations
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Schefflera (dwarf umbrella tree)</S.Bold>: tolerates low light reasonably well
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chinese elm (Ulmus parvifolia)</S.Bold>: semi-evergreen, can be kept indoors in mild climates
                but prefers outdoor time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Jade (Crassula)</S.Bold>: a succulent, not a tree, but commonly sold as "bonsai" and tolerates
                indoor conditions
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Some tropical species</S.Bold>: Fukien tea, Serissa, Carmona—but these are often more finicky
                than ficus
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Even tolerant species grow better with more light. "Tolerates indoor conditions" means "survives," not
              "thrives."
            </S.Paragraph>
            <ImagePlaceholder>
              Photo grid: common indoor-tolerant species (ficus, schefflera, Chinese elm, jade) with notes on their
              light preferences
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Grow lights: what works</S.SubSectionTitle>
            <S.Paragraph>
              If you must grow trees indoors or want to supplement natural light, grow lights can help. Key
              considerations:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>LED grow lights</S.Bold>: the current standard—efficient, adjustable, available in full
                spectrum. Look for lights that provide adequate PAR (photosynthetically active radiation) output.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fluorescent lights</S.Bold>: older technology but still functional. T5 high-output fluorescents
                can support plant growth; standard household fluorescents are usually insufficient.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Placement and distance</S.Bold>: light intensity falls off rapidly with distance. Lights must be
                close to foliage—often 6-12 inches for LEDs, depending on output. Follow manufacturer recommendations.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Duration</S.Bold>: supplement with 10-14 hours of light for actively growing tropicals. Use
                timers for consistency.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heat management</S.Bold>: some lights produce significant heat; ensure adequate ventilation and
                monitor foliage for burn
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Grow light limitations</S.SubSectionTitle>
            <S.Paragraph>Even with grow lights, indoor growing has limits:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Intensity still lags behind sun</S.Bold>: affordable grow lights do not match full outdoor sun;
                they provide "enough," not "optimal"
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Coverage is limited</S.Bold>: a single light covers a small area; larger collections require
                multiple fixtures
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Other factors remain</S.Bold>: grow lights solve the light problem but not humidity, airflow, or
                temperature variation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Energy costs</S.Bold>: running high-output lights for 12+ hours daily adds up
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Grow lights are a valuable supplement, especially in winter or in low-light spaces. They are not a
              complete substitute for outdoor conditions.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison diagram: PAR output and coverage area for different grow light types (LED panel, LED bar,
              fluorescent tube)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Window placement</S.SubSectionTitle>
            <S.Paragraph>If grow lights are not practical, window placement is critical:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>South-facing windows</S.Bold> (in the northern hemisphere): receive the most light year-round;
                first choice for indoor bonsai
              </S.ListItem>
              <S.ListItem>
                <S.Bold>East-facing windows</S.Bold>: receive morning sun, which is less intense but still valuable
              </S.ListItem>
              <S.ListItem>
                <S.Bold>West-facing windows</S.Bold>: afternoon sun can be intense and hot; monitor for heat stress
              </S.ListItem>
              <S.ListItem>
                <S.Bold>North-facing windows</S.Bold>: minimal direct light; only the most shade-tolerant species
                survive here
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Place trees as close to the glass as possible. Even a few feet back from a window dramatically reduces
              light intensity. Rotate trees periodically to prevent lopsided growth toward the light.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Outdoor Placement: Wind, Sun Angles, Heat Islands</S.SectionTitle>
          <ImagePlaceholder>
            Overhead diagram: sample outdoor bonsai area showing placement relative to structures, trees, and prevailing
            winds, with annotations about microclimates
          </ImagePlaceholder>
          <S.Paragraph>
            Outdoors is where most bonsai belong. But "outdoors" is not a single environment—it is a collection of
            microclimates. Where you place your trees within your outdoor space affects their health, watering needs,
            and stress levels.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Sun exposure and orientation</S.SubSectionTitle>
            <S.Paragraph>
              Most bonsai prefer substantial sun exposure, but the optimal amount depends on species, climate, and
              season:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Full sun species</S.Bold>: pines, junipers, and many deciduous trees want maximum light
                exposure. In temperate climates, this typically means unobstructed morning and midday sun.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Partial shade species</S.Bold>: some maples, azaleas, and other understory trees prefer
                protection from intense afternoon sun, especially in hot climates
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Climate adjustments</S.Bold>: in very hot regions, even sun-loving species may need afternoon
                shade; in cooler regions, maximum sun is usually welcome
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Observe your space throughout the day. Sun angles change with seasons—a spot that gets full sun in summer
              may be shaded by structures or trees in winter, and vice versa.
            </S.Paragraph>
            <ImagePlaceholder>
              Seasonal sun path diagram: showing how the sun's arc changes between summer and winter, affecting which
              areas receive direct light
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Wind exposure</S.SubSectionTitle>
            <S.Paragraph>Wind affects trees in multiple ways:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Desiccation</S.Bold>: wind increases evaporation from leaves and substrate, accelerating water
                loss. A windy spot may need twice the watering of a sheltered one.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Physical stress</S.Bold>: constant strong wind can damage foliage, dry out edges of leaves, and
                stress delicate new growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tissue strengthening</S.Bold>: moderate air movement actually strengthens tissue and reduces
                fungal problems. Complete shelter is not ideal either.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Winter wind</S.Bold>: cold, dry winter winds are particularly damaging, especially to
                evergreens; winter placement may need to differ from summer placement
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The goal is gentle air movement, not constant battering. If your space is very windy, consider windbreaks,
              strategic placement near structures, or moving sensitive trees to sheltered spots during storms.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Heat islands and reflected heat</S.SubSectionTitle>
            <S.Paragraph>
              Surfaces absorb and reflect heat, creating microclimates that may be much hotter than ambient temperature:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Concrete and stone surfaces</S.Bold>: absorb heat during the day and radiate it back, creating
                hot zones above them
              </S.ListItem>
              <S.ListItem>
                <S.Bold>South and west-facing walls</S.Bold>: reflect heat and light, intensifying exposure for trees
                placed nearby
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dark surfaces</S.Bold>: absorb more heat than light-colored surfaces
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Metal benches</S.Bold>: can become extremely hot and transfer heat to pots; consider wood or
                elevated stands
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              A tree sitting on a hot concrete patio next to a brick wall may experience temperatures 10-20°F higher
              than one on a wooden bench in an open area. This matters for root health, water demand, and heat stress.
            </S.Paragraph>
            <ImagePlaceholder>
              Thermal image or diagram: showing temperature differences between a tree on concrete near a wall vs one on
              a bench in an open area
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Elevating trees</S.SubSectionTitle>
            <S.Paragraph>
              Most bonsai practitioners keep trees on benches or stands, elevated above ground level:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Drainage</S.Bold>: pots drain freely when elevated; on the ground, drainage holes can become
                blocked
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pest reduction</S.Bold>: elevation reduces access for slugs, snails, and some ground-dwelling
                insects
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Air circulation</S.Bold>: trees elevated above ground get better airflow around foliage and pots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Viewing angle</S.Bold>: bonsai are designed to be viewed at approximately eye level; benches
                place them at an appropriate height
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temperature moderation</S.Bold>: ground-level air is often colder on freezing nights and hotter
                on sunny days than air a few feet up
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Standard bonsai benches are typically 2-4 feet high. Height can be adjusted based on viewing preference
              and practical needs.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Rotation and even growth</S.SubSectionTitle>
            <S.Paragraph>
              Trees grow toward light. In a fixed position, the side facing the strongest light develops more densely
              while the shaded side becomes sparse. To maintain even development:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Rotate trees periodically—every few weeks to monthly during the growing season</S.ListItem>
              <S.ListItem>
                Do not rotate during critical development if you want to encourage growth on a weak side—instead,
                position that side toward the light
              </S.ListItem>
              <S.ListItem>
                For show trees, designate a "front" and periodically rotate the tree 180° so both sides receive similar
                light exposure over time
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Shade Cloth, Heat Management, and Acclimation</S.SectionTitle>
          <ImagePlaceholder>
            Photo: bonsai growing area with shade cloth structure, showing the filtered light effect and how it reduces
            heat stress during summer
          </ImagePlaceholder>
          <S.Paragraph>
            Sometimes you need to moderate light exposure—whether to protect trees from extreme heat, to acclimate new
            acquisitions, or to support recovery from stress. Shade cloth and other techniques help manage light while
            keeping trees healthy.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Shade cloth basics</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Shade cloth</S.Bold> is woven fabric that reduces light intensity by a specified percentage:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>30% shade</S.Bold>: blocks 30% of light, letting 70% through. Mild reduction for moderate heat
                protection.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>50% shade</S.Bold>: blocks half the light. Common for protecting deciduous trees in hot climates
                or during heat waves.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>70% shade</S.Bold>: blocks most light. Used for recovering trees, high-heat protection, or
                shade-loving species.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Shade cloth also reduces heat by blocking infrared radiation. A tree under 50% shade cloth experiences
              significantly lower leaf temperature than one in full sun, even beyond what the light reduction alone
              would suggest.
            </S.Paragraph>
            <ImagePlaceholder>
              Comparison photos: same species in full sun vs under 30% shade cloth vs under 50% shade cloth, showing
              foliage condition during summer heat
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to use shade</S.SubSectionTitle>
            <S.Paragraph>Shade protection is appropriate in several situations:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Heat waves</S.Bold>: during extreme heat, even sun-loving species benefit from temporary shade.
                Temperatures above 95°F (35°C) stress many trees.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>After repotting</S.Bold>: a tree with reduced root mass is less able to supply water to leaves.
                Temporary shade reduces water demand during recovery.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sick or recovering trees</S.Bold>: stressed trees cannot handle full sun; moderate light
                supports recovery without adding stress.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Newly collected or purchased trees</S.Bold>: trees acclimated to different conditions need
                gradual adjustment.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Shade-preferring species</S.Bold>: some maples, azaleas, and understory species genuinely prefer
                partial shade, especially afternoon shade in hot climates.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Heat management beyond shade</S.SubSectionTitle>
            <S.Paragraph>Several strategies help manage heat stress:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Multiple waterings</S.Bold>: during extreme heat, water in the morning and check again in the
                afternoon. Evaporating water cools the pot and roots.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Misting foliage</S.Bold>: briefly misting leaves (not the same as watering roots) can cool
                foliage. This provides temporary relief but does not substitute for proper watering.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pot insulation</S.Bold>: wrap pots in insulating material or place smaller pots inside larger
                ones to moderate temperature swings.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ground contact for large pots</S.Bold>: during extreme heat, placing pots on the ground (rather
                than elevated benches) can help roots stay cooler.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temporary relocation</S.Bold>: move trees to shadier spots during the hottest days, then return
                them when temperatures moderate.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Acclimation</S.SubSectionTitle>
            <S.Paragraph>
              Trees adapt to their light conditions. A tree grown in shade has leaves optimized for low light. A tree
              grown in full sun has leaves optimized for high light. Moving suddenly between these conditions causes
              stress:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Shade to sun</S.Bold>: sudden exposure to intense light can burn leaves that are not adapted;
                sunburn appears as bleached or brown patches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sun to shade</S.Bold>: less immediately damaging, but the tree will produce new leaves suited to
                the new conditions; sun leaves may be inefficient in shade
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              When acquiring a new tree or moving one to different conditions, acclimate gradually over 1-2 weeks. Start
              in a shadier position and move incrementally toward the final location, or use shade cloth and gradually
              reduce coverage.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram: acclimation timeline showing gradual movement from shade to full sun over two weeks, with daily
              positions marked
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Reading tree responses to light</S.SubSectionTitle>
            <S.Paragraph>Trees communicate their light status through their growth patterns:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Elongated internodes (stretching)</S.Bold>: insufficient light; the tree is reaching toward a
                light source. Move to brighter conditions.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pale or yellowish leaves</S.Bold>: may indicate insufficient light (or other issues like
                chlorosis). Compare to species norms.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Compact, dense growth</S.Bold>: adequate light; internodes are short and leaves are close
                together.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaf scorch (brown edges or patches)</S.Bold>: too much light or heat, or too rapid an increase
                in exposure. Provide shade or acclimate more slowly.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>One-sided density</S.Bold>: growth concentrated on one side indicates uneven light; rotate the
                tree or reposition.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These signs are feedback. Adjust placement based on what the tree tells you, not just on general
              guidelines.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: light intensity comparison chart, indoor vs outdoor requirements, outdoor
            placement considerations diagram, shade cloth decision guide, acclimation timeline
          </ImagePlaceholder>
          <S.Paragraph>
            Light is the energy source that drives all plant growth. Understanding light—its intensity, duration, and
            quality—allows you to position trees for success.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Indoor growing is inherently challenging</S.Bold>. Even bright windows provide a fraction of outdoor
            light intensity. Indoor bonsai works best with tropical species tolerant of lower light, positioned at
            south-facing windows, potentially supplemented with grow lights. But indoor conditions cannot fully
            replicate the outdoors.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Outdoor placement involves microclimates</S.Bold>. Sun exposure, wind, reflected heat from surfaces,
            and elevation all affect tree health. Most bonsai want substantial sun, but placement must account for
            species preferences, climate extremes, and seasonal changes in sun angle.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Shade cloth and heat management</S.Bold> help protect trees during extremes. Temporary shade during
            heat waves, after repotting, or during recovery reduces stress. Acclimation—gradual adjustment to new light
            conditions—prevents the shock of sudden changes.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Trees tell you what they need</S.Bold>. Stretching indicates insufficient light. Compact growth
            indicates adequate light. Leaf scorch indicates too much light or heat. Read these signals and adjust
            placement accordingly. Light management is not about following rules—it is about responding to what each
            tree shows you.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-10" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter10;
