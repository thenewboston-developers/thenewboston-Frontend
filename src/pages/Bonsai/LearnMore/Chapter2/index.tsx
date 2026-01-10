import * as S from 'components/LearnMore';
import {SFC} from 'types';

import {Divider, ImagePlaceholder} from '../Styles';

const BonsaiLearnMoreChapter2: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 2: Germination and the First Year</S.Title>

        <ImagePlaceholder>
          Full-page image: a timeline montage of a tree seed becoming a one-year seedling (seed to radicle to cotyledons
          to first true leaves to a small sapling in a training pot)
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            The first year of a tree's life is a conversion. A seed begins as a sealed survival capsule that lives on
            stored reserves. By the end of year one, if all goes well, it becomes a self-sustaining plant with
            functional roots, active leaves, and the beginnings of a woody framework.
          </S.Paragraph>
          <S.Paragraph>
            For bonsai, the first year is not about styling. It is about <S.Bold>establishment</S.Bold>. Your job is to
            help the seedling accomplish a sequence of biological milestones in the right order:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Germinate</S.Bold> successfully without exhausting reserves.
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Build a working root system</S.Bold> that can supply water and oxygen.
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Develop true leaves</S.Bold> that can photosynthesize reliably.
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Transition</S.Bold> from stored seed energy to a net-positive energy budget.
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Survive</S.Bold> the first heat, first drought risk, first pests, and first seasonal shifts.
            </S.ListItem>
          </S.List>
          <S.Paragraph>
            This chapter describes what success looks like, what cotyledons are and what they are not, how the seedling
            becomes independent, how to avoid the most common early failure mode (damping-off), and when to pot up.
          </S.Paragraph>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>What &quot;Success&quot; Looks Like in Year One</S.SectionTitle>
          <ImagePlaceholder>
            Reference photo grid: successful first-year seedlings showing thick stem base, healthy leaf color, no
            stretch, and dense fine roots visible at pot edges
          </ImagePlaceholder>
          <S.Paragraph>
            Success in year one is not measured by height. Many seedlings can grow tall and still be weak. Bonsai
            success is measured by <S.Bold>function</S.Bold> and <S.Bold>structure</S.Bold>.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Biological markers of success</S.SubSectionTitle>
            <S.Paragraph>A strong first-year seedling typically shows:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Consistent new growth</S.Bold> after the first true leaves appear
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Healthy color</S.Bold> (species-appropriate green, not pale or grayish)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaves that hold posture</S.Bold> (not permanently drooping except during brief heat stress)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>A stem that thickens</S.Bold> at the base over time, rather than remaining threadlike
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root growth that keeps pace with the top</S.Bold>, indicated by steady water uptake and
                resistance to wilting
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Bonsai-relevant markers of success</S.SubSectionTitle>
            <S.Paragraph>For bonsai, the first year can also quietly set up future quality:</S.Paragraph>
            <S.List>
              <S.ListItem>
                A <S.Bold>stable, radial root start</S.Bold> rather than a single long, dominating root
              </S.ListItem>
              <S.ListItem>
                A <S.Bold>straight, undamaged trunk base</S.Bold>, free of constrictions or rot scars
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Internodes that are not excessively long</S.Bold>, which often indicates insufficient light and
                soft growth
              </S.ListItem>
              <S.ListItem>
                Early signs of <S.Bold>vigor without excess</S.Bold>, meaning the plant is strong but not forced into
                weak, stretched growth
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What &quot;failure&quot; commonly looks like</S.SubSectionTitle>
            <ImagePlaceholder>
              Side-by-side comparison: healthy seedling vs etiolated (stretched) seedling vs damping-off collapsed
              seedling
            </ImagePlaceholder>
            <S.Paragraph>Common early failure patterns include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Etiolation (stretching)</S.Bold>: long, thin stems reaching for light, often top-heavy and
                fragile
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chronic over-moisture</S.Bold>: seedlings that remain soft and stalled, with yellowing or algae
                growth on the surface
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Damping-off</S.Bold>: sudden collapse at the soil line, usually fatal
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root stagnation</S.Bold>: top growth pauses, leaves remain small, and watering becomes
                unpredictable because roots are not expanding
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Cotyledons vs True Leaves</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: seedling labeled with cotyledons and first true leaves, with arrows and brief descriptors
          </ImagePlaceholder>
          <S.Paragraph>
            Seedlings begin life with two distinct categories of leaves, and confusing them leads to bad decisions.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Cotyledons</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Cotyledons</S.Bold> are the seed leaves. Their role is primarily to support establishment.
              Depending on species, they may:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Store and deliver nutrition to the seedling</S.ListItem>
              <S.ListItem>Sometimes photosynthesize after emergence</S.ListItem>
              <S.ListItem>Act as a short-term bridge while the seedling builds true leaves</S.ListItem>
            </S.List>
            <S.Paragraph>
              Cotyledons are usually simpler in shape than later foliage. In many tree species, they look like smooth,
              paired paddles.
            </S.Paragraph>
            <S.Paragraph>Key points about cotyledons:</S.Paragraph>
            <S.List>
              <S.ListItem>They are temporary.</S.ListItem>
              <S.ListItem>They are often more fragile than true leaves.</S.ListItem>
              <S.ListItem>
                Losing them early can be a major setback because they are part of the seedling's initial energy plan.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>True leaves</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>True leaves</S.Bold> arise from the plumule and represent the seedling's real, ongoing
              photosynthetic machinery. They:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Develop the full species-specific leaf shape</S.ListItem>
              <S.ListItem>Become the main energy source once photosynthesis dominates</S.ListItem>
              <S.ListItem>Signal that the plant has moved into a more stable growth phase</S.ListItem>
            </S.List>
            <S.Paragraph>A practical rule:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Cotyledons</S.Bold> are the seed's &quot;startup battery.&quot;
              </S.ListItem>
              <S.ListItem>
                <S.Bold>True leaves</S.Bold> are the tree's &quot;power system.&quot;
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What to do when cotyledons yellow and drop</S.SubSectionTitle>
            <S.Paragraph>Cotyledon loss is normal once true leaves are functional. What matters is timing:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Normal</S.Bold>: cotyledons yellow gradually after multiple true leaves form
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Concerning</S.Bold>: cotyledons shrivel or drop before true leaves are established
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              If cotyledons fail early, the seedling is often forced to run on empty before it has a working energy
              system.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>The Critical Transition: From Reserves to Photosynthesis</S.SectionTitle>
          <ImagePlaceholder>
            Flow diagram: seed reserves to enzymatic conversion to growth to true leaves expand to photosynthesis net
            gain
          </ImagePlaceholder>
          <S.Paragraph>
            The most important concept of early seedling life is that it must cross an energy threshold.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Phase 1: Reserve-dependent growth</S.SubSectionTitle>
            <S.Paragraph>
              At germination, the seedling is fueled by stored reserves. These reserves are finite. The seedling is
              spending energy to:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Extend roots into the substrate</S.ListItem>
              <S.ListItem>Build stem tissue</S.ListItem>
              <S.ListItem>Push up and expand early leaf structures</S.ListItem>
            </S.List>
            <S.Paragraph>
              During this phase, the seedling is vulnerable because it cannot earn new energy yet.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Phase 2: Mixed economy</S.SubSectionTitle>
            <S.Paragraph>
              As cotyledons and early leaves begin to photosynthesize, the plant enters a transitional phase:
            </S.Paragraph>
            <S.List>
              <S.ListItem>It is still consuming reserves.</S.ListItem>
              <S.ListItem>It is beginning to produce energy from light.</S.ListItem>
            </S.List>
            <S.Paragraph>
              The objective here is not maximum growth. The objective is <S.Bold>stability</S.Bold>.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Phase 3: Net-positive photosynthesis</S.SubSectionTitle>
            <S.Paragraph>
              When true leaves are functional and the root system can support water delivery reliably, photosynthesis
              becomes the primary engine.
            </S.Paragraph>
            <S.Paragraph>
              This is the point at which the seedling becomes less like a seed and more like a small tree.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Why bonsai growers should care</S.SubSectionTitle>
            <S.Paragraph>
              This transition explains why seedlings fail under kind conditions that are actually too weak:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Too little light slows photosynthesis, so reserves deplete before independence.</S.ListItem>
              <S.ListItem>
                Too much wetness reduces oxygen in the root zone, limiting root function and slowing the transition.
              </S.ListItem>
              <S.ListItem>Poor airflow increases disease pressure precisely when tissues are softest.</S.ListItem>
            </S.List>
            <S.Paragraph>
              A seedling is most fragile when it is living on inherited fuel and trying to build the machinery to make
              its own.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Light, Moisture, Airflow, and Damping-Off</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: the seedling survival triangle with corners labeled Light, Moisture, Airflow, and a warning
            icon near &quot;Stagnant wet air&quot;
          </ImagePlaceholder>
          <S.Paragraph>
            Most first-year failures are not caused by a lack of care. They are caused by an imbalance of the three
            environmental fundamentals: light, water, and air movement.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Light</S.SubSectionTitle>
            <S.Paragraph>Light drives photosynthesis. Insufficient light commonly causes:</S.Paragraph>
            <S.List>
              <S.ListItem>Stretching and weak stems</S.ListItem>
              <S.ListItem>Large gaps between leaves (long internodes)</S.ListItem>
              <S.ListItem>Thin, soft tissue that is vulnerable to disease</S.ListItem>
              <S.ListItem>Slow transition to net-positive energy</S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Image: etiolated seedlings reaching toward a window vs compact seedlings under strong light
            </ImagePlaceholder>
            <S.Paragraph>
              In general, seedlings should receive enough light to grow compactly, not enough to scorch. For bonsai
              growers, compact growth early is valuable, but vigor remains the priority.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Moisture and oxygen in the root zone</S.SubSectionTitle>
            <S.Paragraph>Seedlings need water, but roots also require oxygen. Overly wet conditions can:</S.Paragraph>
            <S.List>
              <S.ListItem>Reduce oxygen availability</S.ListItem>
              <S.ListItem>Slow root growth</S.ListItem>
              <S.ListItem>Encourage pathogens</S.ListItem>
              <S.ListItem>Promote algae and fungus gnat problems</S.ListItem>
            </S.List>
            <S.Paragraph>A helpful mental model is that bonsai soil is a controlled cycling system:</S.Paragraph>
            <S.List>
              <S.ListItem>Wet phase delivers water</S.ListItem>
              <S.ListItem>Drying phase pulls in oxygen</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Airflow</S.SubSectionTitle>
            <S.Paragraph>
              Air movement reduces disease pressure and strengthens tissue. Stagnant air combined with wet substrate is
              a classic setup for fungal problems.
            </S.Paragraph>
            <S.Paragraph>Airflow matters most when:</S.Paragraph>
            <S.List>
              <S.ListItem>Seedlings are densely packed</S.ListItem>
              <S.ListItem>Humidity is high</S.ListItem>
              <S.ListItem>The surface stays continuously wet</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Damping-off</S.SubSectionTitle>
            <ImagePlaceholder>
              Close-up image: damping-off seedlings with a pinched, darkened soil line and collapsed tops
            </ImagePlaceholder>
            <S.Paragraph>
              <S.Bold>Damping-off</S.Bold> is a term for seedling diseases (often caused by fungi or fungus-like
              organisms) that attack the stem near the soil line or the roots.
            </S.Paragraph>
            <S.Paragraph>It often appears as:</S.Paragraph>
            <S.List>
              <S.ListItem>A healthy seedling that suddenly collapses</S.ListItem>
              <S.ListItem>A dark, thin, constricted neck at the soil surface</S.ListItem>
              <S.ListItem>Rapid failure over hours to a day</S.ListItem>
            </S.List>
            <S.Paragraph>Damping-off thrives under:</S.Paragraph>
            <S.List>
              <S.ListItem>High moisture</S.ListItem>
              <S.ListItem>Low airflow</S.ListItem>
              <S.ListItem>Crowded trays</S.ListItem>
              <S.ListItem>Cool, stagnant conditions</S.ListItem>
              <S.ListItem>Overly organic, waterlogged media</S.ListItem>
            </S.List>
            <S.Paragraph>Prevention is the main strategy:</S.Paragraph>
            <S.List>
              <S.ListItem>Use a well-aerated substrate appropriate for seedlings</S.ListItem>
              <S.ListItem>Avoid keeping the surface constantly saturated</S.ListItem>
              <S.ListItem>Provide airflow, not sealed stagnant humidity</S.ListItem>
              <S.ListItem>Give seedlings enough light to keep tissues robust</S.ListItem>
              <S.ListItem>Avoid overcrowding so stems dry quickly after watering</S.ListItem>
            </S.List>
            <S.Paragraph>
              Once a seedling collapses from true damping-off, it is usually not recoverable. That is why bonsai growers
              treat prevention as part of basic technique.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Potting Up: When and Why</S.SectionTitle>
          <ImagePlaceholder>
            Photo series: seedling in a small cell, then a slightly larger pot, then a training pot with more volume
          </ImagePlaceholder>
          <S.Paragraph>
            Potting up means moving a seedling into a larger container. In bonsai, container choice is a tool that
            controls growth rate, root development, and stability.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Why pot up at all</S.SubSectionTitle>
            <S.Paragraph>A container limits two things:</S.Paragraph>
            <S.List>
              <S.ListItem>Root exploration</S.ListItem>
              <S.ListItem>Water and oxygen dynamics</S.ListItem>
            </S.List>
            <S.Paragraph>
              As roots fill a small container, the seedling can become unstable, alternating between drying too quickly
              and staying too wet. A larger container can:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Give roots room to expand</S.ListItem>
              <S.ListItem>Stabilize moisture cycling</S.ListItem>
              <S.ListItem>Support stronger top growth</S.ListItem>
              <S.ListItem>Reduce stress during heat or missed waterings</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to pot up</S.SubSectionTitle>
            <S.Paragraph>
              There is no universal calendar because species and conditions differ, but there are reliable readiness
              signals. Pot up when the seedling has:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Several true leaves, not just cotyledons</S.ListItem>
              <S.ListItem>Noticeable ongoing growth, not a stalled state</S.ListItem>
              <S.ListItem>A root system that holds the soil together lightly when removed</S.ListItem>
              <S.ListItem>Roots beginning to reach the container edges or drainage area</S.ListItem>
            </S.List>
            <ImagePlaceholder>Root system examples labeled: too early, ready, overdue</ImagePlaceholder>
            <S.Paragraph>
              Avoid potting up too early. A seedling with minimal roots placed into a large, wet volume can sit in
              excess moisture and stagnate.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The bonsai-specific decision: grow fast vs build structure</S.SubSectionTitle>
            <S.Paragraph>Bonsai growers often have two competing goals:</S.Paragraph>
            <S.List>
              <S.ListItem>Maximize vigor to get thickening and strength</S.ListItem>
              <S.ListItem>Guide root development early to avoid long-term problems</S.ListItem>
            </S.List>
            <S.Paragraph>A common approach is staged:</S.Paragraph>
            <S.List>
              <S.ListItem>Early containers that encourage fine roots and radial spread</S.ListItem>
              <S.ListItem>Later training containers for vigor and trunk development</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Early root guidance (without overdoing it)</S.SubSectionTitle>
            <S.Paragraph>
              In the first year, aggressive root work is usually unnecessary and can be risky. However, early habits
              matter. Bonsai-relevant principles include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Encourage lateral root development rather than a single dominant root</S.ListItem>
              <S.ListItem>Avoid severe constrictions or tight bends at the base</S.ListItem>
              <S.ListItem>Prevent the seedling from developing a permanently one-sided root system</S.ListItem>
            </S.List>
            <S.Paragraph>
              These goals are often met by container choice and gentle positioning, not by heavy pruning.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Aftercare following potting up</S.SubSectionTitle>
            <S.Paragraph>After transplanting:</S.Paragraph>
            <S.List>
              <S.ListItem>Protect from harsh mid-day conditions briefly if the plant is stressed</S.ListItem>
              <S.ListItem>Keep moisture steady but not stagnant</S.ListItem>
              <S.ListItem>Prioritize airflow and stable light</S.ListItem>
              <S.ListItem>Watch for resumption of growth as the confirmation of success</S.ListItem>
            </S.List>
            <S.Paragraph>
              Potting up is not a cosmetic step. It is a functional upgrade to keep the plant's root system in pace with
              its ambitions.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: milestones of the first year with small icons for cotyledons, true leaves,
            roots, airflow, and pot-up timing
          </ImagePlaceholder>
          <S.Paragraph>
            The first year of a tree seedling is a transition from inherited energy to independence. Cotyledons provide
            a temporary bridge, while true leaves and expanding roots build the seedling's long-term engine. Success is
            measured by functional stability rather than height, and the most common failures come from imbalances in
            light, moisture, and airflow, especially in conditions that favor damping-off. Potting up is performed when
            the seedling's root system is ready to take advantage of more volume, supporting healthier growth and better
            long-term bonsai outcomes.
          </S.Paragraph>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter2;
