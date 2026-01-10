import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter7: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 7: Flowers, Fruit, and Cones</S.Title>

        <ImagePlaceholder>
          Full-page image: flowering bonsai tree in bloom (cherry or azalea), showing the dramatic visual impact of
          flowers on a refined bonsai structure
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Flowers, fruit, and cones represent the reproductive phase of a tree's life cycle. For the tree, these
            structures are energetically expensive—they divert resources from vegetative growth toward the production of
            seeds and the next generation. For the bonsai practitioner, they present both opportunities and challenges.
          </S.Paragraph>
          <S.Paragraph>
            Flowering bonsai can be spectacular. Cherry blossoms, azalea blooms, wisteria cascades, and crabapple
            displays are among the most celebrated images in bonsai. Fruiting bonsai—laden with miniature apples,
            persimmons, or pomegranates—create remarkable visual effects. But achieving reliable flowering and fruiting
            while maintaining tree health requires understanding what reproduction demands from the tree.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Why flowering changes tree priorities</S.Bold>: the energetic cost of reproduction
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Managing energy around bloom and fruit set</S.Bold>: supporting reproductive effort without
              exhausting the tree
            </S.ListItem>
            <S.ListItem>
              <S.Bold>When to remove flowers and fruit</S.Bold>: strategic decisions about allowing or preventing
              reproduction
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Species-specific considerations</S.Bold>: differences between broadleaf flowering trees, fruiting
              trees, and conifers with cones
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Why Flowering Changes Tree Priorities</S.SectionTitle>
          <ImagePlaceholder>
            Energy allocation diagram: tree silhouette with pie charts showing resource distribution—vegetative growth
            vs reproductive growth—comparing a non-flowering year to a heavy flowering year
          </ImagePlaceholder>
          <S.Paragraph>
            From the tree's perspective, reproduction is the ultimate goal. Vegetative growth—roots, trunk, branches,
            leaves—exists to support eventual reproduction. When a tree flowers, its priorities shift dramatically.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The energetic cost of reproduction</S.SubSectionTitle>
            <S.Paragraph>Producing flowers, fruit, and seeds is expensive. The tree must:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Build flower structures</S.Bold>: petals, sepals, stamens, pistils—all require carbohydrates,
                proteins, and other resources
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Produce nectar and fragrance</S.Bold>: attracting pollinators costs energy
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Develop fruit and seeds</S.Bold>: the most expensive phase—fruit tissue and especially seeds are
                resource-intensive, containing concentrated starches, oils, and proteins
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Maintain fruit until ripening</S.Bold>: fruit must be protected, hydrated, and supplied with
                sugars for weeks or months
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These resources come from somewhere. A heavily flowering or fruiting tree diverts energy from vegetative
              growth—trunk thickening slows, branch extension decreases, and reserve accumulation is reduced. In extreme
              cases, heavy fruiting can exhaust a tree so thoroughly that it dies or requires years to recover.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Reproductive maturity and triggers</S.SubSectionTitle>
            <S.Paragraph>
              Trees must reach <S.Bold>reproductive maturity</S.Bold> before they can flower. This varies widely by
              species—some trees flower within a few years, others require decades. Age alone is not the trigger;
              rather, the tree must accumulate sufficient size and reserves to support reproduction.
            </S.Paragraph>
            <S.Paragraph>Once mature, flowering is triggered by various environmental cues:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Day length (photoperiod)</S.Bold>: many trees initiate flower buds in response to shortening or
                lengthening days
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temperature</S.Bold>: some species require a period of cold (vernalization) to flower; others
                flower in response to warming
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Stress</S.Bold>: moderate stress can trigger flowering as a survival response—the tree
                "attempts" to reproduce before dying
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Carbohydrate levels</S.Bold>: high carbohydrate reserves relative to nitrogen promote flower bud
                formation
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Understanding these triggers helps explain why a tree might flower heavily one year and not the next, and
              allows some manipulation of flowering through cultivation practices.
            </S.Paragraph>
            <ImagePlaceholder>
              Timeline showing flower bud formation: previous summer bud initiation, fall development, winter dormancy,
              spring bloom—emphasizing that many flowers are determined the year before
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Flower bud formation</S.SubSectionTitle>
            <S.Paragraph>
              A critical point often overlooked: <S.Bold>flower buds form the year before they bloom</S.Bold>. When you
              see spring flowers, those buds were initiated during the previous summer and developed through fall. This
              has important implications for pruning:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Pruning after flower buds have formed removes next year's flowers</S.ListItem>
              <S.ListItem>
                To preserve flowering, prune immediately after bloom, before the next cycle of bud formation begins
              </S.ListItem>
              <S.ListItem>
                Stress or heavy pruning in summer can prevent flower bud formation for the following spring
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This is why timing matters so much for flowering bonsai. The wrong pruning schedule can eliminate flowers
              for a year or more.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Managing Energy Around Bloom and Fruit Set</S.SectionTitle>
          <ImagePlaceholder>
            Sequence showing fruiting bonsai through season: flowers in spring, fruit set in early summer, developing
            fruit midsummer, ripe fruit in fall, with energy level indicator showing reserves depleting
          </ImagePlaceholder>
          <S.Paragraph>
            If you want a tree to flower and fruit, you must ensure it has the resources to do so without exhausting
            itself. If you want to suppress flowering to focus on vegetative development, different strategies apply.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Supporting healthy flowering</S.SubSectionTitle>
            <S.Paragraph>To support reliable flowering without depleting the tree:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Build reserves the previous year</S.Bold>: flower quality depends on reserves accumulated before
                winter. A tree stressed or heavily pruned the previous summer may have poor flowering.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fertilize appropriately</S.Bold>: balanced fertilization supports overall health; excessive
                nitrogen can promote leaves at the expense of flowers
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Time pruning carefully</S.Bold>: prune after flowering (for spring bloomers) or before bud set
                (for summer/fall bloomers) to avoid removing flower buds
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid stressing the tree during bud formation</S.Bold>: drought, repotting, or heavy work during
                summer bud formation can reduce next year's flowers
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Managing fruit set and development</S.SubSectionTitle>
            <S.Paragraph>
              Fruit is more demanding than flowers. A tree can produce hundreds of flowers at modest cost, but
              developing even a few fruits to maturity requires substantial resources.
            </S.Paragraph>
            <S.Paragraph>Strategies for managing fruiting:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Thin fruit early</S.Bold>: remove excess fruit shortly after set to direct resources to fewer,
                higher-quality fruits and reduce overall drain
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Match fruit load to tree size</S.Bold>: a small bonsai cannot support the same fruit load as a
                larger tree; be conservative about how many fruits you allow to develop
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Increase fertilization during fruit development</S.Bold>: the tree needs extra resources;
                supplement with balanced or slightly higher potassium fertilizer
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ensure adequate water</S.Bold>: fruit development requires significant water; do not let the
                tree dry out
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Before/after fruit thinning: branch with many small developing fruits vs same branch after thinning with
              fewer, properly spaced fruits
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Post-bloom and post-fruit recovery</S.SubSectionTitle>
            <S.Paragraph>
              After flowering and especially after fruiting, the tree needs time to recover and rebuild reserves:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Allow vegetative growth</S.Bold>: the tree needs to photosynthesize and rebuild; do not heavily
                prune immediately after bloom
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Resume fertilization</S.Bold>: support recovery with regular balanced feeding
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid additional stresses</S.Bold>: do not repot, heavily wire, or defoliate trees that have
                just finished heavy flowering or fruiting
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Consider alternating years</S.Bold>: for heavily fruiting species, some practitioners remove all
                flowers in alternate years to prevent exhaustion
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Suppressing flowering for development</S.SubSectionTitle>
            <S.Paragraph>
              Sometimes flowering is undesirable. A tree in development needs to put energy into trunk and branch
              growth, not reproduction. Strategies to suppress or minimize flowering:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>High nitrogen fertilization</S.Bold>: pushing vegetative growth with high nitrogen discourages
                flower bud formation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hard pruning during bud formation period</S.Bold>: removing growth in summer before flower buds
                set prevents their formation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove flower buds early</S.Bold>: if buds form despite efforts, remove them before they open to
                save the energy that would go into blooming
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Keep the tree slightly stressed</S.Bold>: moderate water stress can reduce flowering (though
                this is a delicate balance and not generally recommended)
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>When to Remove Flowers and Fruit</S.SectionTitle>
          <ImagePlaceholder>
            Decision flowchart: Is the tree in development or refinement? Is it healthy and vigorous? How heavy is the
            flower/fruit load? Leading to recommendations about allowing vs removing reproductive structures
          </ImagePlaceholder>
          <S.Paragraph>
            The decision to allow or remove flowers and fruit depends on your goals for the tree and its current
            condition. There is no universal answer—different situations call for different approaches.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Reasons to remove flowers and fruit</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Tree is in development</S.Bold>: energy should go toward trunk and branch building, not
                reproduction
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree is weak or recovering</S.Bold>: flowering/fruiting would further deplete limited reserves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree was recently repotted</S.Bold>: the stress of root work plus reproduction is too much
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fruit load is excessive</S.Bold>: even healthy trees should have fruit thinned to sustainable
                levels
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Display timing is wrong</S.Bold>: you may want to save the tree's energy for a more important
                display the following year
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Reasons to allow flowers and fruit</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Display purposes</S.Bold>: the tree is being shown or photographed and flowers/fruit are the
                point
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree is healthy and mature</S.Bold>: a well-established tree in refinement can support moderate
                flowering/fruiting without harm
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species is defined by its flowers/fruit</S.Bold>: flowering quince, crabapple, or pomegranate
                bonsai are grown specifically for reproductive display
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Seed collection</S.Bold>: you want to collect seeds for propagation
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Timing of removal</S.SubSectionTitle>
            <S.Paragraph>
              If you decide to remove flowers or fruit, timing affects how much energy is saved:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Remove flower buds before opening</S.Bold>: saves the most energy; the tree hasn't invested in
                bloom yet
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove flowers during/after bloom</S.Bold>: some energy already spent, but fruit development is
                prevented
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove fruit shortly after set</S.Bold>: better than allowing development, but significant
                energy already committed to pollination and early fruit formation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove fruit during development</S.Bold>: reduces ongoing drain but much of the cost has already
                been paid
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Allow fruit to ripen and fall</S.Bold>: full reproductive cost incurred; only appropriate for
                display purposes or seed collection
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The earlier you remove reproductive structures, the more energy the tree retains for other purposes.
            </S.Paragraph>
            <ImagePlaceholder>
              Timeline showing energy cost curve from bud formation through fruit ripening, with markers showing optimal
              removal points for maximum energy conservation
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Species-Specific Considerations</S.SectionTitle>
          <ImagePlaceholder>
            Grid showing different reproductive structures: cherry blossoms, azalea flowers, crabapple fruit, pine
            cones, juniper berries, persimmon fruit—illustrating the variety across species
          </ImagePlaceholder>
          <S.Paragraph>
            Different types of trees have different reproductive strategies and require different management approaches.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Spring-flowering trees</S.SubSectionTitle>
            <S.Paragraph>
              Trees like cherry, plum, apple, and many prunus species flower in early spring before or as leaves emerge.
              Their flower buds form the previous summer.
            </S.Paragraph>
            <S.Paragraph>Management considerations:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Prune immediately after flowering</S.Bold>: this allows time for new growth to set flower buds
                for the following year
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid fall/winter pruning</S.Bold>: this removes already-formed flower buds
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Protect from late frost</S.Bold>: flowers can be damaged by freezing temperatures, eliminating
                the display you've cultivated
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Summer care affects next year's bloom</S.Bold>: stress during bud formation period reduces
                flowering
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Pruning calendar for spring-flowering trees: showing when to prune, when flower buds form, when blooming
              occurs across a 12-month cycle
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Summer and fall flowering trees</S.SubSectionTitle>
            <S.Paragraph>
              Trees like crape myrtle, rose of sharon, and some tropical species flower on current-year growth. Their
              flower buds form in spring/early summer on new shoots.
            </S.Paragraph>
            <S.Paragraph>Management considerations:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Early pruning promotes flowering</S.Bold>: pruning in late winter/early spring stimulates the
                new growth that will bear flowers
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Summer pruning may reduce flowering</S.Bold>: removing developing shoots removes flower buds in
                formation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Flowers appear on shoot tips</S.Bold>: compact growth still produces flowers; you don't need to
                allow long extension to get blooms
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Azaleas and rhododendrons</S.SubSectionTitle>
            <S.Paragraph>These are among the most popular flowering bonsai and have specific requirements:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Flower buds form at shoot tips in early summer</S.Bold>: prune immediately after bloom to allow
                new growth time to set next year's buds
              </S.ListItem>
              <S.ListItem>
                <S.Bold>No pruning after midsummer</S.Bold>: late pruning removes flower buds
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove spent flowers</S.Bold>: prevents seed formation, which drains energy; break off flower
                remains after petals drop
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Acidic conditions needed</S.Bold>: azaleas require specific soil pH; poor conditions reduce
                flowering
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Fruiting trees</S.SubSectionTitle>
            <S.Paragraph>
              Trees grown for fruit display—crabapple, persimmon, pomegranate, citrus, olive—require additional
              consideration of the fruiting phase:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Pollination requirements</S.Bold>: some species need cross-pollination; ensure compatible
                pollinators are present during bloom
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Thin fruit for quality</S.Bold>: reducing fruit load produces larger, better-developed fruits
                and protects tree health
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Support during fruit weight</S.Bold>: heavy fruits can break branches; wire support or reducing
                fruit numbers may be necessary
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Allow adequate ripening time</S.Bold>: fruit color develops best on the tree; premature removal
                sacrifices display quality
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove fruit before seeds fully mature</S.Bold>: seed development is the most expensive phase;
                removing fruit before seeds harden saves some energy while still getting display value
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Fruiting bonsai examples: crabapple with small red fruits, persimmon with orange fruit, pomegranate with
              split fruit showing seeds, citrus with miniature oranges
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Conifers and cones</S.SubSectionTitle>
            <S.Paragraph>
              Conifers reproduce through cones rather than flowers. While less showy than flowering trees, cone
              production still has energetic implications:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Pollen cones</S.Bold> (male): produce pollen in spring; small and short-lived; relatively low
                energy cost
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Seed cones</S.Bold> (female): develop over one to three years depending on species;
                progressively more costly as seeds mature
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cone placement affects branches</S.Bold>: large cones at branch tips add weight and can distort
                growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heavy cone years deplete resources</S.Bold>: some conifers have "mast years" with heavy cone
                production, followed by years of recovery
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              For most conifer bonsai, cones are removed before they develop significantly. The energy cost and physical
              impact on branch structure outweigh any display value for typical specimens. However, some practitioners
              appreciate a few cones as a sign of tree maturity.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Juniper "berries"</S.SubSectionTitle>
            <S.Paragraph>
              Junipers produce berry-like structures that are actually modified cones. These take one to three years to
              mature and turn from green to blue-black when ripe. Like other cones:
            </S.Paragraph>
            <S.List>
              <S.ListItem>They draw energy from vegetative growth</S.ListItem>
              <S.ListItem>They are typically removed on bonsai to maintain tree health</S.ListItem>
              <S.ListItem>A few may be left for naturalistic effect on very healthy, mature trees</S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: energy cost of reproduction diagram, flowering/fruiting management calendar,
            fruit thinning guidance, species-specific pruning timing for flowering (spring-bloom vs summer-bloom vs
            azalea), cone/fruit removal decision guide
          </ImagePlaceholder>
          <S.Paragraph>
            Reproduction is energetically expensive. Flowers, fruits, and cones all divert resources from vegetative
            growth, and heavy reproductive effort can exhaust a tree. Understanding this trade-off is essential for
            managing flowering and fruiting bonsai.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Flower buds typically form the year before bloom</S.Bold>. This means pruning timing is critical—
            cutting after bud formation removes next year's flowers. For spring-flowering trees, prune immediately after
            bloom. For summer-flowering trees that bloom on new growth, prune in late winter or early spring.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Supporting healthy flowering</S.Bold> requires building reserves the previous year, timing pruning
            to preserve flower buds, and avoiding stress during bud formation. <S.Bold>Managing fruit load</S.Bold>
            involves thinning early, matching fruit quantity to tree capacity, and providing extra water and nutrients
            during development.
          </S.Paragraph>
          <S.Paragraph>
            The decision to <S.Bold>allow or remove flowers and fruit</S.Bold> depends on your goals and the tree's
            condition. Trees in development, weak trees, or recently repotted trees should generally have reproductive
            structures removed. Mature, healthy trees being displayed can support moderate flowering and fruiting.
            Earlier removal saves more energy; later removal allows more display value.
          </S.Paragraph>
          <S.Paragraph>
            Finally, <S.Bold>different species require different approaches</S.Bold>. Spring bloomers and summer
            bloomers have opposite pruning schedules. Fruiting trees need pollination, thinning, and support. Conifers
            produce cones that are usually removed but may occasionally be retained on mature specimens. Learning the
            reproductive patterns of your specific trees allows you to balance display beauty with long-term tree
            health.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-7" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter7;
