import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter3: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 3: Roots</S.Title>

        <ImagePlaceholder>
          Full-page image: cross-section of a bonsai pot showing the complete root system with labeled zones—tap root
          remnant at center, lateral roots spreading outward, and fine feeder roots near the soil surface
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Roots are the hidden half of the tree. While leaves and branches capture attention, the root system quietly
            determines what is possible above ground. A tree with a healthy, well-structured root system can recover
            from damage, push vigorous growth, and tolerate stress. A tree with a compromised root system will struggle
            no matter how carefully the top is managed.
          </S.Paragraph>
          <S.Paragraph>
            For bonsai, roots are not just functional—they are also aesthetic. The visible root flare at the soil
            surface, called <S.Bold>nebari</S.Bold>, is one of the defining features of a mature bonsai. Building good
            nebari is a long-term project that begins with understanding how roots actually work.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Root types</S.Bold>: the different kinds of roots and their roles
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Root function</S.Bold>: what roots actually do for the tree
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Root pruning</S.Bold>: why cutting roots can help, and when it fails
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Nebari</S.Bold>: building the visible root base that defines bonsai character
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Mycorrhizae</S.Bold>: the fungal partners that extend root function
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Root Types</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: three-panel illustration showing (1) a seedling with a dominant tap root, (2) a mature tree with
            extensive lateral roots, and (3) a close-up of fine feeder roots with root hairs
          </ImagePlaceholder>
          <S.Paragraph>
            Not all roots are the same. Trees produce different types of roots for different purposes, and understanding
            these types helps explain why certain bonsai techniques work.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Tap roots</S.SubSectionTitle>
            <S.Paragraph>
              Many tree species begin life with a <S.Bold>tap root</S.Bold>—a single, dominant root that grows straight
              down from the seed. The tap root serves two main purposes in nature:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Anchoring</S.Bold>: it stabilizes the young seedling against wind and disturbance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Deep water access</S.Bold>: it can reach moisture below the surface during dry periods
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              In bonsai, tap roots are typically removed or reduced early in development. A strong tap root growing
              straight down serves no purpose in a shallow pot and prevents the radial root spread that creates good
              nebari. However, removing a tap root too aggressively on a young seedling can cause significant stress.
            </S.Paragraph>
            <ImagePlaceholder>
              Before/after illustration: seedling with long tap root vs same seedling after tap root reduction with
              lateral roots beginning to spread
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Lateral roots</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Lateral roots</S.Bold> grow outward from the main root mass, spreading horizontally through the
              soil. These are the roots that eventually form the visible nebari in bonsai.
            </S.Paragraph>
            <S.Paragraph>Lateral roots serve several functions:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Structural support</S.Bold>: they create a stable base that anchors the tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Transport</S.Bold>: they carry water and nutrients from feeder roots to the trunk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Storage</S.Bold>: larger lateral roots store carbohydrates for later use
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              In nature, lateral roots can extend far beyond the canopy of the tree. In bonsai, they are constrained by
              the pot, which is why root pruning and careful management become necessary.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Feeder roots</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Feeder roots</S.Bold> are the fine, often hair-thin roots that do most of the actual work of
              absorption. They are typically found near the tips of the root system, in the zone where roots are
              actively growing.
            </S.Paragraph>
            <S.Paragraph>Feeder roots are characterized by:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>High surface area</S.Bold>: their fine structure maximizes contact with soil
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Active absorption</S.Bold>: they take up water and dissolved minerals
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Short lifespan</S.Bold>: individual feeder roots are replaced regularly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sensitivity</S.Bold>: they are the first to suffer from drought, waterlogging, or toxicity
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Microscopic view: feeder root with visible root hairs extending into soil particles, with labels showing
              water and mineral uptake
            </ImagePlaceholder>
            <S.Paragraph>
              A healthy bonsai has a dense network of feeder roots. Root pruning, when done correctly, stimulates the
              production of new feeder roots, which is one reason repotting can rejuvenate a stagnant tree.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Root hairs</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Root hairs</S.Bold> are microscopic extensions of individual root cells, found on young feeder
              roots. They are not separate roots but rather outgrowths that dramatically increase absorption surface
              area. Root hairs:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Are extremely delicate and easily damaged by drying or rough handling</S.ListItem>
              <S.ListItem>Live only days to weeks before being replaced</S.ListItem>
              <S.ListItem>Do not form on older, woodier root sections</S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why bare-rooting a tree and letting roots dry out can be so damaging—root hairs are destroyed and
              must regrow before the tree can absorb water efficiently again.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Root Function</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: stylized tree showing the flow of water and minerals up through roots into the trunk, and
            carbohydrates flowing down from leaves into root storage
          </ImagePlaceholder>
          <S.Paragraph>
            Roots do more than simply anchor the tree in place. They are active organs that perform several essential
            functions.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Water uptake</S.SubSectionTitle>
            <S.Paragraph>
              The most obvious function of roots is absorbing water. This process is driven by{' '}
              <S.Bold>transpiration</S.Bold>—as water evaporates from leaves, it creates a pulling force that draws
              water up through the tree.
            </S.Paragraph>
            <S.Paragraph>Key points about water uptake:</S.Paragraph>
            <S.List>
              <S.ListItem>
                Absorption happens primarily through feeder roots and root hairs, not through thick woody roots
              </S.ListItem>
              <S.ListItem>
                Roots can only absorb water when the soil contains both moisture <S.Bold>and</S.Bold> oxygen
              </S.ListItem>
              <S.ListItem>
                Waterlogged soil, despite having plenty of water, can prevent uptake because roots cannot function
                without oxygen
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This explains why bonsai soil must drain well. It is not about keeping roots dry—it is about ensuring
              oxygen reaches the roots so they can function.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Mineral uptake</S.SubSectionTitle>
            <S.Paragraph>
              Roots absorb dissolved minerals from the soil, including the essential nutrients that trees need to build
              new tissue. The major nutrients include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Nitrogen (N)</S.Bold>: critical for leaf growth and green color
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Phosphorus (P)</S.Bold>: important for root development and energy transfer
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Potassium (K)</S.Bold>: involved in water regulation and overall plant health
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Mineral uptake is an active process that requires energy. Stressed roots, or roots in poor conditions,
              absorb minerals less efficiently even when nutrients are present in the soil.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Hormone production</S.SubSectionTitle>
            <S.Paragraph>
              Roots are not passive plumbing. They produce <S.Bold>cytokinins</S.Bold> and other hormones that travel
              upward and influence how the tree grows. Cytokinins from roots:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Promote cell division in shoots</S.ListItem>
              <S.ListItem>Help regulate the balance between root and shoot growth</S.ListItem>
              <S.ListItem>Signal to the top of the tree about root health and resource availability</S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why a tree with a vigorous root system tends to produce strong top growth. The roots are not just
              supplying water and nutrients—they are sending chemical signals that stimulate growth above ground.
            </S.Paragraph>
            <ImagePlaceholder>
              Simplified diagram: root tip producing cytokinins that travel upward, shoot tip producing auxins that
              travel downward, with arrows showing bidirectional hormone flow
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Carbohydrate storage</S.SubSectionTitle>
            <S.Paragraph>
              Larger roots serve as storage organs. During periods of active photosynthesis, excess carbohydrates
              produced by leaves are transported down and stored in roots. These reserves are critical for:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Spring growth before leaves are fully functional</S.ListItem>
              <S.ListItem>Recovery after stress, damage, or heavy pruning</S.ListItem>
              <S.ListItem>Winter survival in deciduous species</S.ListItem>
            </S.List>
            <S.Paragraph>
              This storage function explains why timing matters for root work. Pruning roots when reserves are low
              (early spring before leaf-out, or after heavy top pruning) can leave the tree without the resources it
              needs to recover.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Anchoring</S.SubSectionTitle>
            <S.Paragraph>
              In nature, roots anchor trees against wind, gravity, and soil movement. In bonsai, this function is partly
              replaced by wiring the tree into the pot, but root structure still affects stability. A tree with a
              well-distributed radial root system sits more securely than one with roots concentrated on one side.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Root Pruning: Why It Works and When It Fails</S.SectionTitle>
          <ImagePlaceholder>
            Step-by-step illustration: (1) root-bound tree removed from pot, (2) outer roots being combed out, (3) roots
            pruned back, (4) tree repotted with fresh soil and new root growth beginning
          </ImagePlaceholder>
          <S.Paragraph>
            Root pruning is one of the defining techniques of bonsai. It allows trees to live indefinitely in small
            containers—something that would be impossible without periodic root management. But root pruning is not
            magic, and understanding the biology helps explain both its benefits and its risks.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Why root pruning works</S.SubSectionTitle>
            <S.Paragraph>When roots are pruned correctly, several beneficial processes occur:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>New feeder root production</S.Bold>: cutting roots stimulates branching, creating more fine
                roots closer to the trunk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Renewed soil</S.Bold>: repotting replaces exhausted substrate with fresh, well-structured medium
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Improved oxygen access</S.Bold>: removing circling roots and compacted soil restores airflow
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Controlled size</S.Bold>: preventing root mass from exceeding pot volume keeps the system in
                balance
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The tree responds to root pruning much like it responds to branch pruning—by producing new growth to
              replace what was lost. This is why a properly repotted tree often shows increased vigor in the following
              growing season.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When root pruning fails</S.SubSectionTitle>
            <S.Paragraph>
              Root pruning can weaken or kill a tree when it violates basic principles. Common failure modes include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Wrong timing</S.Bold>: pruning roots when the tree cannot recover (mid-summer heat, deep
                dormancy, or when already stressed)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Too aggressive</S.Bold>: removing more than the tree can compensate for—generally, removing more
                than one-third of the root mass at once is risky for most species
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dry roots</S.Bold>: allowing roots to dry out during the repotting process destroys feeder roots
                and root hairs
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Poor aftercare</S.Bold>: returning a freshly root-pruned tree to harsh conditions (full sun,
                wind, inconsistent watering)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Combining with heavy top pruning</S.Bold>: reducing both roots and foliage simultaneously leaves
                the tree with no way to generate or access energy
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Warning diagram: common root pruning mistakes including over-pruning, dry roots during work, and immediate
              full sun exposure
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Optimal timing</S.SubSectionTitle>
            <S.Paragraph>
              The best time to prune roots depends on species, but there are general principles:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Deciduous trees</S.Bold>: late winter to early spring, just as buds begin to swell but before
                leaves emerge—this gives roots the entire growing season to recover
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Conifers</S.Bold>: timing varies more by species, but many do well in early spring or early
                autumn when temperatures are moderate
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tropical species</S.Bold>: often more flexible, but generally when actively growing and
                temperatures are warm
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The common thread is that root pruning works best when the tree has the conditions and reserves to respond
              with new root growth.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The root-to-shoot balance</S.SubSectionTitle>
            <S.Paragraph>
              Trees maintain a rough equilibrium between their root mass and their foliage. This balance is not
              rigid—trees can adjust—but significant disruptions to one side affect the other.
            </S.Paragraph>
            <S.List>
              <S.ListItem>Heavy root pruning often leads to reduced top growth until roots recover</S.ListItem>
              <S.ListItem>
                Heavy top pruning can cause root dieback if leaves cannot support the existing root mass
              </S.ListItem>
              <S.ListItem>
                Combining both at once is high-risk because neither system can compensate for the other
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Experienced bonsai practitioners manage this balance deliberately—sometimes allowing unrestricted root and
              top growth to build strength, and other times restricting both to refine the tree.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Nebari: Building the Surface Root Base</S.SectionTitle>
          <ImagePlaceholder>
            Photo grid: examples of excellent nebari on mature bonsai—radial roots spreading evenly from trunk base,
            visible buttressing, surface roots that complement the tree's character
          </ImagePlaceholder>
          <S.Paragraph>
            <S.Bold>Nebari</S.Bold> is the Japanese term for the visible surface roots of a bonsai. It is one of the
            features that most strongly communicates age, stability, and quality. A tree with powerful nebari appears
            anchored and permanent. A tree with poor nebari—roots hidden, one-sided, or crossing—looks less resolved no
            matter how well the top is styled.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What makes good nebari</S.SubSectionTitle>
            <S.Paragraph>The characteristics of strong nebari include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Radial distribution</S.Bold>: roots spreading in all directions from the trunk, like spokes of a
                wheel
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Taper</S.Bold>: roots thickest near the trunk, gradually thinning as they extend outward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Surface visibility</S.Bold>: roots that sit at or just above soil level, not buried
              </S.ListItem>
              <S.ListItem>
                <S.Bold>No crossing</S.Bold>: roots that do not grow over each other or back toward the trunk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Proportional to the trunk</S.Bold>: root flare that matches the tree's overall scale
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Diagram: top-down view of ideal nebari showing radial root spread, with annotations marking good features
              and common problems to avoid
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>How nebari develops</S.SubSectionTitle>
            <S.Paragraph>
              Nebari is not created—it is cultivated over years. The process begins with root structure decisions made
              early in the tree's life:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Seedling stage</S.Bold>: reducing or eliminating the tap root encourages lateral root
                development
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Early training</S.Bold>: positioning roots during repotting to spread outward rather than
                downward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Selective development</S.Bold>: removing roots that cross, grow at bad angles, or are
                disproportionately strong
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Gradual exposure</S.Bold>: over successive repottings, raising the root base slightly to bring
                it to the surface
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Techniques for building nebari</S.SubSectionTitle>
            <S.Paragraph>Several techniques are used to develop or improve nebari:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Tile or board method</S.Bold>: placing a flat surface beneath the trunk during early development
                forces roots to grow horizontally rather than downward
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ground growing</S.Bold>: planting trees in the ground (or large containers) with root
                restriction plates allows rapid thickening while controlling root direction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tourniquet method</S.Bold>: wrapping wire around the trunk base causes tissue to swell above the
                wire, sometimes stimulating new root production at that point
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Air layering</S.Bold>: creating an entirely new root system at a chosen point on the trunk—often
                used when the original nebari is beyond correction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root grafting</S.Bold>: grafting new roots into gaps where the existing nebari is incomplete
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration series: tile method showing root plate placement, tourniquet method showing wire placement
              and swelling, air layer showing root development at wrap point
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common nebari problems and corrections</S.SubSectionTitle>
            <S.Paragraph>Many trees, especially nursery stock, have nebari issues that require attention:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>One-sided roots</S.Bold>: may require ground-growing on the weak side, or grafting
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Crossing roots</S.Bold>: should be removed when small—waiting allows them to fuse and become
                permanent
              </S.ListItem>
              <S.ListItem>
                <S.Bold>J-roots or circling roots</S.Bold>: caused by growing too long in nursery containers—must be
                straightened or removed at repotting
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Buried nebari</S.Bold>: the root flare may exist but be hidden under soil—careful excavation can
                reveal what is already there
              </S.ListItem>
              <S.ListItem>
                <S.Bold>High graft union</S.Bold>: on grafted trees, an ugly graft line above the roots may be
                unfixable—in severe cases, air layering above the graft creates a new base
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Nebari correction is slow work. Major improvements take years to decades. This is why addressing root
              structure early—before the tree enters refinement—is one of the most important long-term decisions in
              bonsai development.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Mycorrhizae: The Hidden Partnership</S.SectionTitle>
          <ImagePlaceholder>
            Microscopic illustration: tree root cross-section showing mycorrhizal fungi extending from root cells into
            surrounding soil, with labels showing nutrient and water exchange
          </ImagePlaceholder>
          <S.Paragraph>
            Most trees do not absorb nutrients alone. They form partnerships with fungi called{' '}
            <S.Bold>mycorrhizae</S.Bold> (from Greek: &quot;fungus-root&quot;). These fungi colonize root tissue and
            extend into the soil, dramatically expanding the tree's effective root system.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What mycorrhizae do</S.SubSectionTitle>
            <S.Paragraph>The relationship between tree and fungus is mutually beneficial:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>The tree provides carbohydrates</S.Bold>: sugars produced by photosynthesis feed the fungus
              </S.ListItem>
              <S.ListItem>
                <S.Bold>The fungus provides expanded absorption</S.Bold>: fungal threads (hyphae) reach far beyond where
                roots alone could grow
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Improved nutrient uptake</S.Bold>: mycorrhizae are particularly effective at accessing
                phosphorus and other nutrients that do not move easily through soil
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Drought resistance</S.Bold>: the expanded network helps trees access water from a larger soil
                volume
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Disease resistance</S.Bold>: some mycorrhizae protect roots from pathogenic fungi
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Types of mycorrhizae</S.SubSectionTitle>
            <S.Paragraph>Two main types are relevant to bonsai:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Ectomycorrhizae</S.Bold>: form a sheath around root tips and are common in pines, oaks, and many
                temperate forest trees—often visible as a fuzzy white coating on healthy roots
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Arbuscular mycorrhizae</S.Bold>: penetrate root cells and are common in maples, elms, and most
                other trees—not visible without a microscope
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Side-by-side comparison: ectomycorrhizal root tips (visible fungal sheath) vs arbuscular mycorrhizal roots
              (appear normal externally, microscopic view shows internal structures)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Mycorrhizae in bonsai practice</S.SubSectionTitle>
            <S.Paragraph>
              Bonsai growers benefit from mycorrhizal relationships, but the intensive management of bonsai can also
              disrupt them:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Frequent repotting</S.Bold>: disturbs established fungal networks—new colonies must reestablish
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inorganic substrates</S.Bold>: pure akadama or pumice may support mycorrhizae less readily than
                soil with organic content, though colonies do establish over time
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heavy fertilization</S.Bold>: very high nutrient levels, especially phosphorus, can reduce
                mycorrhizal colonization because the tree has less need for the fungal partnership
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fungicides</S.Bold>: some treatments that target harmful fungi may also affect beneficial
                mycorrhizae
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Should you add mycorrhizal inoculants?</S.SubSectionTitle>
            <S.Paragraph>
              Commercial mycorrhizal products are available and sometimes recommended at repotting. The evidence for
              their benefit in bonsai is mixed:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>For collected trees</S.Bold>: inoculants may help re-establish fungal relationships that were
                disrupted during collection
              </S.ListItem>
              <S.ListItem>
                <S.Bold>For established bonsai</S.Bold>: trees that have been in cultivation typically have existing
                mycorrhizal colonies that recolonize after repotting
              </S.ListItem>
              <S.ListItem>
                <S.Bold>For specific species</S.Bold>: pines and other trees that are heavily dependent on
                ectomycorrhizae may benefit more than species with less obligate relationships
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The most important factor for mycorrhizae is maintaining conditions where they can thrive: appropriate
              moisture, good soil structure, and avoiding excessive chemical inputs that disrupt the fungal community.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Recognizing healthy mycorrhizal roots</S.SubSectionTitle>
            <S.Paragraph>
              On species with ectomycorrhizae (especially pines), healthy fungal colonization appears as:
            </S.Paragraph>
            <S.List>
              <S.ListItem>White, fuzzy coating on root tips</S.ListItem>
              <S.ListItem>Compact, club-shaped root tips rather than long, thin white roots</S.ListItem>
              <S.ListItem>An earthy, mushroom-like smell when examining the root ball</S.ListItem>
            </S.List>
            <S.Paragraph>
              The absence of visible mycorrhizae does not necessarily indicate a problem—arbuscular types are not
              visible, and even ectomycorrhizal species can be healthy without obvious fungal coating. However, a pine
              with no fungal activity on its roots after years in cultivation may indicate soil or management issues
              worth investigating.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: root system diagram showing all root types, arrows indicating functions (water
            uptake, mineral absorption, hormone production, storage), and a small nebari example with the mycorrhizal
            partnership illustrated
          </ImagePlaceholder>
          <S.Paragraph>
            Roots are the foundation of every bonsai, both functionally and aesthetically. Understanding the different
            root types—tap, lateral, feeder, and the microscopic root hairs—explains why certain techniques work and
            others fail. Roots do far more than anchor the tree: they absorb water and nutrients, produce hormones that
            drive top growth, and store the carbohydrates that fuel recovery and spring push.
          </S.Paragraph>
          <S.Paragraph>
            Root pruning is the technique that makes bonsai possible in small containers, but it succeeds only when
            timing, technique, and aftercare respect the tree's biology. Nebari—the visible surface root base—is
            cultivated over years through careful root selection and positioning, and it becomes one of the defining
            features of a mature bonsai. Finally, the mycorrhizal partnership extends root function far beyond what the
            roots themselves can achieve, a hidden collaboration that benefits from thoughtful management rather than
            neglect.
          </S.Paragraph>
          <S.Paragraph>In bonsai, what happens below the soil line determines what is possible above it.</S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-3" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter3;
