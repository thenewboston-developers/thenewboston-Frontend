import * as S from 'components/LearnMore';
import {SFC} from 'types';

import dicotVsConiferSeed from '../assets/dicot-vs-conifer-seed.png';
import germinatingTreeSeed from '../assets/germinating-tree-seed.png';
import germinationEnvironmentalCues from '../assets/germination-environmental-cues.png';
import seedDormancyTimeline from '../assets/seed-dormancy-timeline.png';
import seedGerminationRecap from '../assets/seed-germination-recap.png';
import seedGerminationSequence from '../assets/seed-germination-sequence.png';
import seedOrientationRootShoot from '../assets/seed-orientation-root-shoot.png';
import seedScarification from '../assets/seed-scarification.png';
import seedlingCotyledonsFirstLeaves from '../assets/seedling-cotyledons-first-leaves.png';
import soilSeedBank from '../assets/soil-seed-bank.png';
import storedEnergyReserves from '../assets/stored-energy-reserves.png';
import treeSeedAnatomy from '../assets/tree-seed-anatomy.png';
import ChapterNavigation from '../ChapterNavigation';
import {Divider} from '../Styles';

const BonsaiLearnMoreChapter1: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 1: The Seed</S.Title>

        <S.Image
          alt="Cutaway illustration of a tree seed labeled with seed coat, embryo, and food reserve"
          src={treeSeedAnatomy}
        />

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            A <S.Bold>seed</S.Bold> is a living, dormant stage in the life cycle of a plant. In trees, seeds serve as
            the primary unit of dispersal and the starting point for a new individual. A seed contains (1) a{' '}
            <S.Bold>plant embryo</S.Bold>, (2) <S.Bold>stored energy</S.Bold> to power early development, and (3){' '}
            <S.Bold>protective tissues</S.Bold> that regulate survival and the timing of germination.
          </S.Paragraph>
          <S.Paragraph>The central function of a tree seed can be summarized in two priorities:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Survive</S.Bold> through unfavorable conditions.
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Germinate and grow</S.Bold> only when environmental conditions make survival as a seedling more
              likely than survival as a dormant seed.
            </S.ListItem>
          </S.List>
          <S.Paragraph>
            This survival-first strategy explains the structure of seeds, the phenomenon of dormancy, and the common
            horticultural practices used to trigger germination.
          </S.Paragraph>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Seed Structure</S.SectionTitle>
          <S.Paragraph>
            Tree seeds vary widely in size and shape, but most share a common architecture: a protective outer coat
            surrounding a dormant embryo and one or more food reserves.
          </S.Paragraph>
          <S.Image
            alt="Diagram comparing a dicot seed and a conifer seed with embryo and food storage labels"
            src={dicotVsConiferSeed}
          />

          <S.SubSection>
            <S.SubSectionTitle>Seed Coat (Testa)</S.SubSectionTitle>
            <S.Paragraph>
              The <S.Bold>seed coat</S.Bold> is the outer protective covering. Its functions include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Physical protection</S.Bold> from mechanical damage during dispersal.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Defense</S.Bold> against pathogens and predators.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Regulation of water and gas exchange</S.Bold>, controlling how quickly water and oxygen enter
                the seed.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Maintenance of dormancy</S.Bold> in many species by forming a barrier to imbibition (water
                uptake) or oxygen diffusion.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              In species with hard seed coats, the testa can prevent germination until it is weakened by environmental
              processes such as abrasion, freeze–thaw cycles, fire, or passage through an animal digestive system.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Embryo</S.SubSectionTitle>
            <S.Paragraph>
              The <S.Bold>embryo</S.Bold> is the developing plant in miniature. It includes:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Radicle</S.Bold>: the embryonic root, typically the first structure to emerge.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hypocotyl</S.Bold>: embryonic stem tissue below the cotyledons.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Epicotyl</S.Bold>: embryonic stem tissue above the cotyledons.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Plumule</S.Bold>: the embryonic shoot and first true leaves.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Although dormant, the embryo is alive. Its cells are hydrated only minimally in dry seeds and its
              metabolism is reduced to extremely low levels.
            </S.Paragraph>
            <S.Image alt="Germinating tree seed with the radicle emerging" src={germinatingTreeSeed} />
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Food Reserves: Endosperm and Cotyledons</S.SubSectionTitle>
            <S.Paragraph>
              A seed's early growth is powered by internal reserves. These reserves appear primarily as:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Endosperm</S.Bold>, a nutrient-rich tissue surrounding the embryo (common in many flowering
                plants).
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cotyledons</S.Bold>, often called "seed leaves," which can serve as storage organs and sometimes
                become photosynthetic after emergence.
              </S.ListItem>
            </S.List>
            <S.Paragraph>Stored reserves typically include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Starches</S.Bold> (long-term carbohydrate storage),
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Lipids</S.Bold> (high-energy fats),
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Proteins</S.Bold> (amino acid supply for growth).
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These reserves provide the fuel required for germination and seedling establishment before the plant can
              photosynthesize.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Dormancy: Delaying Germination to Survive</S.SectionTitle>
          <S.Paragraph>
            Many tree seeds do not germinate immediately even when water is available. This delay is called{' '}
            <S.Bold>dormancy</S.Bold>, a set of traits that prevents germination until conditions are favorable.
          </S.Paragraph>
          <S.Paragraph>
            Dormancy serves as a survival mechanism by preventing a seed from initiating irreversible growth at a time
            when a seedling would be likely to die.
          </S.Paragraph>
          <S.Image
            alt="Timeline graphic showing seed dispersal, winter dormancy, and spring germination"
            src={seedDormancyTimeline}
          />

          <S.SubSection>
            <S.SubSectionTitle>Types of Dormancy</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Physical dormancy</S.Bold>
              <br />
              Occurs when the seed coat is impermeable to water and/or oxygen. Germination requires a disruption of the
              coat.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Physiological dormancy</S.Bold>
              <br />
              Occurs when internal chemical conditions inhibit growth. Many temperate tree species contain germination
              inhibitors or require specific hormonal changes that occur after cold exposure.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Morphological dormancy</S.Bold>
              <br />
              Occurs when the embryo is underdeveloped at the time of dispersal and must continue development before
              germination can proceed.
            </S.Paragraph>
            <S.Paragraph>Many species exhibit more than one dormancy type.</S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Germination: The Transition From Seed to Seedling</S.SectionTitle>
          <S.Paragraph>
            <S.Bold>Germination</S.Bold> begins when a dormant seed resumes metabolic activity and ends when the
            embryonic root (radicle) emerges and begins growth.
          </S.Paragraph>
          <S.Paragraph>
            Germination is an irreversible commitment. Once it begins, the seed's stored reserves are consumed, and the
            seed becomes far more vulnerable to drying, freezing, disease, and predation.
          </S.Paragraph>
          <S.Image alt="Sequence from dry seed to radicle and shoot emergence" src={seedGerminationSequence} />

          <S.SubSection>
            <S.SubSectionTitle>Imbibition: Water Uptake and Activation</S.SubSectionTitle>
            <S.Paragraph>
              The first physical step in germination is <S.Bold>imbibition</S.Bold>, the absorption of water by the
              seed.
            </S.Paragraph>
            <S.Paragraph>Water uptake triggers several changes:</S.Paragraph>
            <S.List>
              <S.ListItem>
                The seed swells, increasing internal pressure that can crack or weaken the seed coat.
              </S.ListItem>
              <S.ListItem>Cellular membranes rehydrate and regain function.</S.ListItem>
              <S.ListItem>Enzymes become active.</S.ListItem>
              <S.ListItem>Respiration increases, requiring oxygen.</S.ListItem>
              <S.ListItem>Stored reserves begin to be mobilized into usable energy and building blocks.</S.ListItem>
            </S.List>
            <S.Paragraph>
              Water does not function as "food" for the seed. Instead, it reactivates the chemical and cellular
              machinery required for growth.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Mobilization of Stored Energy</S.SubSectionTitle>
            <S.Paragraph>
              Before the seedling develops photosynthetic leaves, all energy comes from seed reserves.
            </S.Paragraph>
            <S.Paragraph>Key processes include:</S.Paragraph>
            <S.List>
              <S.ListItem>Starch is converted into sugars.</S.ListItem>
              <S.ListItem>Fats are broken down and converted into energy-rich compounds.</S.ListItem>
              <S.ListItem>Proteins are broken into amino acids for new tissue formation.</S.ListItem>
            </S.List>
            <S.Paragraph>
              These resources fuel cell division and elongation that drive the emergence of roots and shoots.
            </S.Paragraph>
            <S.Image
              alt="Diagram showing stored starch, fats, and proteins converted into sugars and energy for growth"
              src={storedEnergyReserves}
            />
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Orientation: How Seeds Grow Roots Down and Shoots Up</S.SectionTitle>
          <S.Paragraph>
            Seeds do not require correct planting orientation to establish the correct direction of growth. The
            developing seedling uses environmental signals to align itself.
          </S.Paragraph>
          <S.Image
            alt="Sideways germinating seed showing root bending downward and shoot bending upward"
            src={seedOrientationRootShoot}
          />

          <S.SubSection>
            <S.SubSectionTitle>Gravitropism (Response to Gravity)</S.SubSectionTitle>
            <S.Paragraph>The root and shoot respond differently to gravity:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Roots</S.Bold> exhibit <S.Bold>positive gravitropism</S.Bold> (growth toward gravity).
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Shoots</S.Bold> exhibit <S.Bold>negative gravitropism</S.Bold> (growth away from gravity).
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Gravity sensing occurs in specialized cells that contain dense starch-filled structures known as{' '}
              <S.Bold>statoliths</S.Bold>. These settle in the direction of gravity, triggering signaling pathways that
              redistribute growth hormones.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Auxin and Differential Growth</S.SubSectionTitle>
            <S.Paragraph>
              A key hormone in directional growth is <S.Bold>auxin</S.Bold>. The same hormone can produce opposite
              effects depending on tissue type:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                In <S.Bold>roots</S.Bold>, higher auxin concentrations tend to inhibit cell elongation on one side,
                causing the root to curve downward.
              </S.ListItem>
              <S.ListItem>
                In <S.Bold>shoots</S.Bold>, higher auxin concentrations promote elongation on one side, causing the
                shoot to curve upward and later toward light.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This differential growth is how a seedling corrects its orientation and navigates through soil.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Phototropism (Response to Light)</S.SubSectionTitle>
            <S.Paragraph>
              After emergence, seedlings also exhibit <S.Bold>phototropism</S.Bold>: shoots bend toward light.
              Light-sensing proteins respond particularly to blue light, shifting auxin distribution and causing
              directional growth.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Establishment: From Reserves to Photosynthesis</S.SectionTitle>
          <S.Paragraph>
            Early seedling growth relies on stored reserves until the plant can capture energy independently.
          </S.Paragraph>
          <S.Image alt="Seedling showing cotyledons and first true leaves" src={seedlingCotyledonsFirstLeaves} />

          <S.SubSection>
            <S.SubSectionTitle>Cotyledons and First Leaves</S.SubSectionTitle>
            <S.Paragraph>Cotyledons may:</S.Paragraph>
            <S.List>
              <S.ListItem>Remain below ground and serve only as storage structures, or</S.ListItem>
              <S.ListItem>Emerge above ground and contribute to photosynthesis.</S.ListItem>
            </S.List>
            <S.Paragraph>
              The <S.Bold>first true leaves</S.Bold> develop from the plumule. Once these leaves expand and chloroplasts
              become fully active, the seedling transitions from dependence on stored reserves to dependence on
              photosynthesis.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The Critical Transition</S.SubSectionTitle>
            <S.Paragraph>A seedling is most vulnerable during the period when:</S.Paragraph>
            <S.List>
              <S.ListItem>Reserves are being depleted,</S.ListItem>
              <S.ListItem>Photosynthesis is not yet sufficient to meet energy demands, and</S.ListItem>
              <S.ListItem>Roots are still establishing stable access to water.</S.ListItem>
            </S.List>
            <S.Paragraph>
              This vulnerable phase is a major factor shaping seed dormancy strategies and germination timing.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Scarification: Breaking Physical Dormancy</S.SectionTitle>
          <S.Paragraph>
            Some tree seeds require damage or weakening of the seed coat before water can enter. The deliberate
            weakening of the seed coat is called <S.Bold>scarification</S.Bold>.
          </S.Paragraph>
          <S.Image
            alt="Before-and-after scarification showing water entry through a lightly nicked seed coat"
            src={seedScarification}
          />

          <S.SubSection>
            <S.SubSectionTitle>Ecological Basis</S.SubSectionTitle>
            <S.Paragraph>Scarification mimics natural processes such as:</S.Paragraph>
            <S.List>
              <S.ListItem>Abrasion in soil or sand,</S.ListItem>
              <S.ListItem>Freeze–thaw cycles,</S.ListItem>
              <S.ListItem>Fire exposure (in some ecosystems),</S.ListItem>
              <S.ListItem>Passage through animals.</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common Methods</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Mechanical scarification</S.Bold>: sanding or nicking the seed coat.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hot-water treatment</S.Bold>: soaking seeds in hot water to soften the coat.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chemical scarification</S.Bold>: using acids (typically specialized use).
              </S.ListItem>
            </S.List>
            <S.Paragraph>The goal is to allow water and oxygen entry without damaging the embryo.</S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Stratification: Breaking Physiological Dormancy</S.SectionTitle>
          <S.Paragraph>
            Many temperate tree seeds require exposure to cold, moist conditions before they will germinate. This
            treatment is called <S.Bold>stratification</S.Bold>.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Ecological Basis</S.SubSectionTitle>
            <S.Paragraph>
              Cold requirements prevent seeds from germinating in autumn and being killed by winter conditions.
              Stratification ensures germination occurs in spring when seedling survival is more likely.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Physiological Mechanisms</S.SubSectionTitle>
            <S.Paragraph>Cold stratification shifts internal hormone balances, commonly involving:</S.Paragraph>
            <S.List>
              <S.ListItem>Reduction of germination inhibitors,</S.ListItem>
              <S.ListItem>Increase in growth-promoting hormones,</S.ListItem>
              <S.ListItem>Changes in gene expression that permit embryo growth.</S.ListItem>
            </S.List>
            <S.Paragraph>
              Stratification requirements vary widely by species, ranging from a few weeks to several months.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Environmental Cues and Germination "Decisions"</S.SectionTitle>
          <S.Paragraph>A seed's germination is regulated by an integration of environmental signals:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Water availability</S.Bold>
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Temperature patterns</S.Bold>
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Oxygen availability</S.Bold>
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Light exposure</S.Bold> (species-dependent)
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Mechanical resistance</S.Bold> of surrounding soil
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Internal dormancy state</S.Bold>
            </S.ListItem>
          </S.List>
          <S.Paragraph>
            Germination occurs only when a seed's internal state and external conditions align to make seedling survival
            probable.
          </S.Paragraph>
          <S.Image
            alt="Environmental cues influencing germination versus continued dormancy"
            src={germinationEnvironmentalCues}
          />
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Seed Longevity and Persistence</S.SectionTitle>
          <S.Paragraph>
            Seeds can persist in soil for extended periods, forming a <S.Bold>seed bank</S.Bold>. Longevity depends on
            species traits and environmental conditions. Dry, cool storage conditions slow metabolic damage, while warm,
            humid conditions accelerate deterioration.
          </S.Paragraph>
          <S.Paragraph>Seeds maintain viability through:</S.Paragraph>
          <S.List>
            <S.ListItem>Low metabolic activity,</S.ListItem>
            <S.ListItem>Protective proteins stabilizing DNA and membranes,</S.ListItem>
            <S.ListItem>Chemical defenses against oxidative damage.</S.ListItem>
          </S.List>
          <S.Paragraph>
            This persistence increases the likelihood that at least some seeds germinate during favorable periods.
          </S.Paragraph>
          <S.Image alt="Soil seed bank layers showing seeds persisting over multiple years" src={soilSeedBank} />
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <S.Paragraph>
            Tree seeds are dormant, living organisms designed to maximize the probability of producing a successful new
            tree. Their primary strategy is survival through dormancy, followed by germination only under conditions
            that support establishment. Seed structure, stored reserves, hormone-guided orientation, and environmental
            cue integration work together to control the transition from seed to seedling. Scarification and
            stratification are horticultural methods that replicate natural processes used to break dormancy and trigger
            germination.
          </S.Paragraph>
          <S.Image
            alt="Recap infographic covering seed anatomy, dormancy types, energy sources, and germination"
            src={seedGerminationRecap}
          />
        </S.Section>

        <ChapterNavigation currentPath="chapter-1" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter1;
