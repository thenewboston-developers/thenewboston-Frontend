import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter6: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 6: Leaves and Needles</S.Title>

        <ImagePlaceholder>
          Full-page image: side-by-side comparison of a broadleaf bonsai with small, refined leaves and a conifer bonsai
          with compact needle growth, both showing ideal foliage for their type
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Leaves are the engines of a tree. Through <S.Bold>photosynthesis</S.Bold>, they capture light energy and
            convert carbon dioxide and water into sugars that fuel all growth and maintenance. Through{' '}
            <S.Bold>transpiration</S.Bold>, they drive the movement of water from roots to canopy, carrying dissolved
            nutrients upward. Every aspect of bonsai cultivation—from watering to fertilizing to styling—ultimately
            serves or is constrained by leaf function.
          </S.Paragraph>
          <S.Paragraph>
            In bonsai, leaves present a particular challenge: we want trees that appear full-sized in miniature, but
            leaves do not automatically scale down to match a reduced trunk and branch structure. A tree with
            proportionally oversized leaves looks awkward and unrefined. Much of bonsai technique centers on reducing
            leaf size while maintaining tree health.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Leaf size drivers</S.Bold>: the factors that determine how large leaves grow
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Defoliation and partial defoliation</S.Bold>: techniques for reducing leaf size and increasing
              ramification
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Needle management for conifers</S.Bold>: specialized techniques for pines, junipers, and other
              needle-bearing species
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Cuticle, transpiration, and leaf scorch</S.Bold>: the physiology of water loss and why leaves burn
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Seasonal leaf behavior</S.Bold>: what leaf changes throughout the year tell you about tree health
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Leaf Size Drivers</S.SectionTitle>
          <ImagePlaceholder>
            Comparison image: same species showing large leaves from vigorous spring growth vs small leaves from
            controlled summer growth, with size measurements
          </ImagePlaceholder>
          <S.Paragraph>
            Leaf size is not fixed by genetics alone. While species sets the baseline—an oak will never have leaves as
            small as a boxwood—environmental conditions and cultivation practices significantly influence how large
            individual leaves grow. Understanding these factors allows you to manipulate leaf size toward bonsai-
            appropriate proportions.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Vigor and leaf size</S.SubSectionTitle>
            <S.Paragraph>
              The single most important factor in leaf size is <S.Bold>vigor</S.Bold>—how strongly the tree is growing.
              Vigorous growth produces large leaves; restrained growth produces smaller leaves.
            </S.Paragraph>
            <S.Paragraph>The relationship works through simple resource allocation:</S.Paragraph>
            <S.List>
              <S.ListItem>
                A vigorously growing shoot has abundant resources (water, nutrients, sugars) available
              </S.ListItem>
              <S.ListItem>These resources are invested in larger leaves with more cells and larger cells</S.ListItem>
              <S.ListItem>
                A weakly growing shoot has limited resources and produces correspondingly smaller leaves
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This explains why spring growth—when the tree is drawing on winter reserves and conditions favor rapid
              growth—typically produces the largest leaves of the year. Later flushes, with less available energy,
              produce progressively smaller leaves.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Light and leaf size</S.SubSectionTitle>
            <S.Paragraph>
              Light intensity strongly influences leaf size. Leaves grown in shade tend to be larger and thinner than
              leaves grown in full sun. This is an adaptive response:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Shade leaves</S.Bold>: larger surface area captures more of the limited available light; thinner
                tissue reduces the metabolic cost of maintenance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sun leaves</S.Bold>: smaller, thicker leaves reduce water loss and can handle intense light
                without overheating
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              For bonsai, this means full sun exposure (within species tolerance) generally promotes smaller leaves.
              Trees grown in excessive shade develop large, thin leaves that look out of scale.
            </S.Paragraph>
            <ImagePlaceholder>
              Side-by-side leaf comparison: large, thin shade leaf vs small, thick sun leaf from the same tree,
              cross-section views showing tissue thickness difference
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Water and nitrogen</S.SubSectionTitle>
            <S.Paragraph>
              Abundant water and nitrogen are the primary drivers of vegetative growth. Both directly affect leaf size:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Water</S.Bold>: cell expansion during leaf development requires turgor pressure, which depends
                on adequate water. Well-watered trees produce larger leaves; water-stressed trees produce smaller ones.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Nitrogen</S.Bold>: as the main component of chlorophyll and proteins, nitrogen is essential for
                leaf tissue construction. High nitrogen promotes large, dark green leaves; limited nitrogen produces
                smaller, lighter leaves.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This creates a tension in bonsai cultivation. Trees need adequate water and nutrients for health, but
              excess promotes oversized leaves. The solution is not starvation—which weakens the tree—but calibrated
              restraint, providing enough for health but not enough to fuel excessive growth.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Root restriction and container size</S.SubSectionTitle>
            <S.Paragraph>
              Trees in small containers tend to produce smaller leaves than the same species grown in the ground. This
              is partly because root restriction limits water and nutrient uptake, and partly because confined roots
              signal the tree to moderate its growth.
            </S.Paragraph>
            <S.Paragraph>
              This is one reason why the transition from a growing container to a bonsai pot often results in smaller
              leaves—the tree naturally adjusts its growth to match its reduced root capacity.
            </S.Paragraph>
            <S.Paragraph>
              However, root restriction alone is not enough to produce properly scaled leaves. A tree jammed into too
              small a pot will be stressed and unhealthy, producing leaves that are small but also yellowed and sparse.
              The goal is an appropriate pot size that moderates vigor without compromising health.
            </S.Paragraph>
            <ImagePlaceholder>
              Three pots showing same species: ground-grown with large leaves, large training pot with medium leaves,
              bonsai pot with small leaves
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Branch structure and leaf size</S.SubSectionTitle>
            <S.Paragraph>
              Fine ramification contributes to smaller leaves through a related mechanism. When a tree has many small
              branches, each branch receives a small share of the tree's total resources. With less energy available per
              growing point, each point produces weaker growth—and smaller leaves.
            </S.Paragraph>
            <S.Paragraph>
              This creates a virtuous cycle in refined bonsai: ramification leads to smaller leaves, which look better
              on fine branches, which encourages further ramification work. Conversely, a tree with coarse branching
              concentrates resources in fewer growing points, producing vigorous extension and large leaves.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Defoliation and Partial Defoliation</S.SectionTitle>
          <ImagePlaceholder>
            Before/after sequence: tree before defoliation with large spring leaves, immediately after defoliation
            showing bare branches, and six weeks later with new smaller leaves
          </ImagePlaceholder>
          <S.Paragraph>
            <S.Bold>Defoliation</S.Bold>—the deliberate removal of some or all leaves—is one of the most powerful
            techniques in deciduous bonsai cultivation. Done correctly, it can reduce leaf size, increase ramification,
            and improve light penetration to interior branches. Done incorrectly, it can severely weaken or kill a tree.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>How defoliation works</S.SubSectionTitle>
            <S.Paragraph>
              When leaves are removed, the tree loses its photosynthetic capacity and must rebuild it. This triggers
              dormant buds to activate and push new leaves. The key insight is that these replacement leaves are
              typically smaller than the originals:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                The tree has less stored energy available (some was used to grow the first set of leaves)
              </S.ListItem>
              <S.ListItem>The season is more advanced, with shorter days and different hormonal signals</S.ListItem>
              <S.ListItem>
                The tree is essentially producing its "second flush" leaves, which are naturally smaller
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Additionally, defoliation often stimulates more buds to activate than would have otherwise, increasing the
              number of leaves (and potential branch points) while decreasing individual leaf size.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to defoliate</S.SubSectionTitle>
            <S.Paragraph>
              Timing is critical. Defoliation should only be performed when the tree has enough energy and remaining
              growing season to recover:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>After spring growth hardens</S.Bold>: wait until the first flush of growth has matured and
                hardened off, typically late spring to early summer in most climates
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Before midsummer</S.Bold>: the tree needs time to regrow leaves and photosynthesize before fall
                dormancy; defoliating too late doesn't leave enough growing season
              </S.ListItem>
              <S.ListItem>
                <S.Bold>On healthy, vigorous trees only</S.Bold>: weak or stressed trees should never be defoliated;
                they may not have the reserves to recover
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              In most temperate climates, the window for defoliation is roughly a four to six week period in late spring
              to early summer. The exact timing depends on species and local conditions.
            </S.Paragraph>
            <ImagePlaceholder>
              Calendar diagram showing safe defoliation window relative to spring bud break, summer growth, and fall
              dormancy
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Full vs partial defoliation</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Full defoliation</S.Bold> removes all leaves from the tree. This is the most dramatic intervention
              and produces the strongest response—but also places the greatest stress on the tree.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Partial defoliation</S.Bold> removes only some leaves. This can be done in several ways:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Removing large leaves only</S.Bold>: targets the most out-of-scale leaves while leaving smaller
                ones to support the tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Removing leaves from strong areas only</S.Bold>: weakens dominant branches to balance energy
                with weaker areas
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaf cutting</S.Bold>: cutting leaves in half rather than removing them entirely; reduces
                transpiration and shading while leaving some photosynthetic capacity
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Removing leaves from interior only</S.Bold>: allows light to penetrate and stimulates interior
                budding
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Partial defoliation is generally safer than full defoliation and may be repeated more frequently. Many
              experienced practitioners prefer multiple light defoliations to a single heavy one.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Technique</S.SubSectionTitle>
            <S.Paragraph>When defoliating, proper technique minimizes damage and promotes clean regrowth:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Leave the petiole</S.Bold>: cut the leaf blade but leave the leaf stalk (petiole) attached. The
                petiole will naturally abscise (fall off) as the new bud pushes, protecting the bud from damage.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Use sharp scissors</S.Bold>: clean cuts heal faster and reduce disease entry points
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Work systematically</S.Bold>: move through the tree methodically to ensure you address all
                target leaves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Provide aftercare</S.Bold>: protect the defoliated tree from intense sun and wind until new
                leaves emerge; reduce watering since there's no transpiration
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Close-up showing proper defoliation cut: leaf blade removed, petiole left attached, with new bud visible
              at the petiole base
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Species considerations</S.SubSectionTitle>
            <S.Paragraph>Not all species respond equally well to defoliation:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Excellent candidates</S.Bold>: Japanese maple, trident maple, Chinese elm, ficus, zelkova—these
                species tolerate defoliation well and respond with strong regrowth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Moderate candidates</S.Bold>: some oaks, hornbeam, beech—these can be defoliated but respond
                less vigorously and require more caution
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Poor candidates</S.Bold>: most conifers (they don't defoliate in the same way), weak deciduous
                species, and any tree not in robust health
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Research your specific species before defoliating. Some species that are commonly defoliated in Japan may
              not tolerate the practice as well in different climates.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Risks and limitations</S.SubSectionTitle>
            <S.Paragraph>
              Defoliation is stressful. Even when done correctly, it temporarily weakens the tree. The risks include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Tree death</S.Bold>: on weak trees or in extreme conditions, defoliation can be fatal
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduced vigor</S.Bold>: repeated heavy defoliation over years can progressively weaken a tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Branch dieback</S.Bold>: weak interior branches may die back if they cannot regrow leaves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaf scorch</S.Bold>: new tender leaves emerging in summer can burn in intense sun
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The general rule is to defoliate only trees that are healthy, vigorous, and well-established—never
              recently repotted trees, recently collected trees, or trees showing any signs of stress.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Needle Management for Conifers</S.SectionTitle>
          <ImagePlaceholder>
            Comparison of conifer foliage types: pine needles in bundles, juniper scale-like foliage, spruce individual
            needles, with labels
          </ImagePlaceholder>
          <S.Paragraph>
            Conifers—pines, junipers, spruces, and their relatives—do not have broad leaves that can be defoliated in
            the same way as deciduous trees. Instead, they bear needles or scale-like foliage with different growth
            patterns and management requirements. Understanding these differences is essential for conifer bonsai.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Pine needle management</S.SubSectionTitle>
            <S.Paragraph>
              Pines grow in a distinctive pattern. Needles emerge from the terminal buds of each shoot (called "candles"
              for their shape before the needles extend). Each year's growth produces a whorl of new needles, while
              older needles eventually yellow and drop.
            </S.Paragraph>
            <S.Paragraph>Key pine techniques include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Candle pinching</S.Bold>: removing or shortening candles before needles extend controls the
                length of the new shoots. This must be done at the right stage—when candles are elongated but before
                needles separate.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Candle cutting</S.Bold>: on strong two-flush pines (like Japanese black pine), completely
                removing first-flush candles forces a second set of shorter candles with shorter needles
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Needle pulling</S.Bold>: reducing the number of needles per bundle reduces the visual density
                and allows light into the interior. Old needles can also be removed to reduce shading.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Needle cutting</S.Bold>: in some traditions, needles are cut shorter with scissors to create a
                more compact appearance, though this is cosmetic rather than developmental
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Pine candle development sequence: (1) dormant bud, (2) elongating candle, (3) candle at pinching stage,
              (4) needles fully extended
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Juniper foliage management</S.SubSectionTitle>
            <S.Paragraph>
              Junipers present different challenges. Most bonsai junipers have scale-like foliage (though some have
              needle-like juvenile foliage). They do not push distinct candles but rather grow continuously through the
              growing season.
            </S.Paragraph>
            <S.Paragraph>Juniper techniques include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Pinching</S.Bold>: regularly pinching the tips of extending shoots maintains compact growth and
                encourages back-budding
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Thinning</S.Bold>: removing excess foliage allows light and air to reach the interior, promoting
                healthy growth throughout the tree rather than just at the periphery
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoiding over-pruning</S.Bold>: unlike pines, junipers do not reliably backbud on bare wood.
                Always leave some foliage on any branch you want to keep alive.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Junipers are sensitive to having too much foliage removed at once. Work gradually, removing no more than a
              third of the foliage in any single session, and allow recovery time between major work.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Other conifers</S.SubSectionTitle>
            <S.Paragraph>
              Other conifers have their own patterns. Spruce, hemlock, and fir bear individual needles along the shoots
              rather than in bundles. Cypress and cedar have scale-like foliage similar to juniper. Larch is deciduous,
              dropping its needles each winter—an unusual conifer that can be treated somewhat like deciduous trees for
              defoliation.
            </S.Paragraph>
            <S.Paragraph>
              The common thread across all conifers is that they do not regenerate foliage as readily as broadleaf
              trees. Removing too much growth, or removing growth from the wrong locations, can result in permanent loss
              of branches. Conifer work requires patience and restraint.
            </S.Paragraph>
            <ImagePlaceholder>
              Grid showing needle/foliage arrangement for different conifers: pine (bundled), spruce (individual),
              juniper (scale), larch (clusters on spurs), cypress (scale)
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Cuticle, Transpiration, and Leaf Scorch</S.SectionTitle>
          <ImagePlaceholder>
            Cross-section diagram of leaf structure showing cuticle layer, epidermis, mesophyll, stomata on underside,
            with arrows indicating water vapor loss
          </ImagePlaceholder>
          <S.Paragraph>
            Leaves are constantly losing water to the atmosphere through <S.Bold>transpiration</S.Bold>. This water loss
            is an unavoidable consequence of gas exchange—leaves must open their pores (stomata) to take in carbon
            dioxide for photosynthesis, and when they do, water vapor escapes. Understanding transpiration explains many
            aspects of leaf health and why leaves sometimes burn.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The cuticle and stomata</S.SubSectionTitle>
            <S.Paragraph>
              Leaves are covered by a waxy layer called the <S.Bold>cuticle</S.Bold> that prevents water loss through
              the leaf surface. Water can only escape through tiny pores called <S.Bold>stomata</S.Bold>, which are
              concentrated on the leaf underside in most species.
            </S.Paragraph>
            <S.Paragraph>
              Stomata are surrounded by guard cells that can open or close the pore. When water is abundant, stomata
              open to allow carbon dioxide in. When water is scarce, stomata close to conserve moisture—but this also
              stops photosynthesis.
            </S.Paragraph>
            <S.Paragraph>
              New leaves have thin, immature cuticles and are more vulnerable to water loss than mature leaves. This is
              why newly emerged leaves are more susceptible to scorch.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What causes leaf scorch</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Leaf scorch</S.Bold> occurs when water loss through transpiration exceeds water uptake by roots.
              The leaf edges and tips—farthest from the water supply—dry out first, turning brown and crispy.
            </S.Paragraph>
            <S.Paragraph>Scorch can be caused by:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Insufficient watering</S.Bold>: the most obvious cause—not enough water in the soil
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root problems</S.Bold>: damaged, diseased, or restricted roots cannot take up water fast enough
                even if soil is moist
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Hot, dry, windy conditions</S.Bold>: these accelerate transpiration beyond what roots can supply
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sudden exposure</S.Bold>: moving a tree from shade to full sun can cause scorch because leaves
                developed for shade conditions cannot handle intense light and heat
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Immature cuticle</S.Bold>: new leaves (including those emerging after defoliation) are more
                vulnerable than mature leaves
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Photo series showing progression of leaf scorch: (1) healthy leaf, (2) early scorch at margins, (3)
              advanced scorch with brown crispy edges, (4) severely scorched leaf mostly brown
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Preventing scorch</S.SubSectionTitle>
            <S.Paragraph>Prevention strategies address the underlying water balance:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Water adequately</S.Bold>: ensure the root ball is thoroughly hydrated, not just the surface
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Protect from wind</S.Bold>: wind dramatically increases transpiration; position sensitive trees
                in sheltered locations or use windbreaks
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Provide afternoon shade</S.Bold>: for sensitive species, shade during the hottest part of the
                day reduces heat stress
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Acclimate gradually</S.Bold>: when moving trees to higher light conditions, do so gradually over
                days or weeks
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Maintain root health</S.Bold>: a healthy root system can supply water faster than a damaged one
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoid defoliating before extreme heat</S.Bold>: new leaves need time to develop protective
                cuticles
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Humidity and transpiration</S.SubSectionTitle>
            <S.Paragraph>
              Transpiration rate depends partly on the humidity difference between inside the leaf (nearly 100%
              humidity) and the surrounding air. In humid conditions, water escapes more slowly. In dry conditions,
              water escapes rapidly.
            </S.Paragraph>
            <S.Paragraph>
              This is why humidity trays and misting are sometimes recommended for bonsai. However, their effect is
              modest—they raise humidity only slightly in the immediate vicinity and only temporarily. The real
              solutions to transpiration stress are adequate watering and appropriate placement, not humidity
              modification.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Seasonal Leaf Behavior</S.SectionTitle>
          <ImagePlaceholder>
            Four-panel seasonal progression: spring bud break with emerging leaves, summer with full mature canopy, fall
            color change, winter bare branches (for deciduous) or winter needle appearance (for evergreen)
          </ImagePlaceholder>
          <S.Paragraph>
            Leaves change throughout the year in response to seasonal conditions. Observing these changes provides
            valuable information about tree health and growth patterns. Learning to read your tree's leaves is an
            essential diagnostic skill.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Spring emergence</S.SubSectionTitle>
            <S.Paragraph>
              Spring leaf emergence reveals the tree's vigor and the success of winter dormancy. Healthy trees push
              leaves promptly as temperatures warm. Signs to watch for:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Timing</S.Bold>: delayed bud break compared to others of the same species may indicate root
                problems or weakened reserves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Color</S.Bold>: new leaves are often lighter green or even reddish (due to protective
                anthocyanins); they should green up as they mature
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Size and vigor</S.Bold>: the first flush typically produces the largest leaves of the year; very
                small spring leaves may indicate weakness
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Uniformity</S.Bold>: all branches should push growth at roughly the same time; areas that fail
                to bud may have died back
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Summer maturation</S.SubSectionTitle>
            <S.Paragraph>
              Through summer, leaves mature and harden. The cuticle thickens, leaves deepen to their mature color, and
              growth slows as resources shift from extension to storage. Observations during summer:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Color changes</S.Bold>: yellowing leaves (chlorosis) often indicate nutrient deficiencies,
                particularly iron or nitrogen; browning edges indicate scorch or salt buildup
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Second flush</S.Bold>: many species produce a second (or subsequent) flush of growth in summer;
                these leaves are typically smaller than spring leaves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Interior leaf drop</S.Bold>: some shedding of shaded interior leaves is normal; excessive drop
                indicates light penetration problems or stress
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Leaf color diagnostic guide: healthy green, nitrogen-deficient pale green/yellow, iron chlorosis with
              green veins, potassium deficiency with brown margins, normal fall color
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Fall color and leaf drop</S.SubSectionTitle>
            <S.Paragraph>
              In deciduous trees, fall triggers the breakdown of chlorophyll and reveals underlying pigments (yellows,
              oranges) or stimulates production of new pigments (reds, purples). The intensity and timing of fall color
              depends on:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Temperature</S.Bold>: cool nights with warm days intensify color development
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Light</S.Bold>: good light exposure promotes pigment production
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree health</S.Bold>: stressed trees often show poor fall color or drop leaves early
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Water</S.Bold>: adequate moisture supports the slow transition; drought can cause premature
                browning
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Leaf drop creates an <S.Bold>abscission layer</S.Bold> at the base of each petiole, a zone of cells that
              weakens and eventually separates, allowing the leaf to fall cleanly. This process protects the tree from
              winter desiccation and damage.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Evergreen and semi-evergreen behavior</S.SubSectionTitle>
            <S.Paragraph>
              Evergreen broadleaves (like many ficus, olive, and boxwood) and conifers retain leaves year-round but
              still show seasonal patterns:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Old needle/leaf drop</S.Bold>: pines drop their oldest needles each fall (interior yellowing is
                normal); other evergreens shed oldest leaves gradually
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Winter color</S.Bold>: some evergreens develop bronze or purple winter color (this is normal and
                reverses in spring)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduced growth</S.Bold>: even evergreens slow or stop growing during cold months, though
                photosynthesis may continue on mild days
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Semi-evergreen species (some elms, privet, some azaleas) may hold leaves in mild winters but drop them in
              cold winters. Their behavior depends on local conditions.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: leaf size factors (vigor, light, nitrogen, roots), defoliation timeline and
            technique, conifer needle management approaches, transpiration and scorch prevention, seasonal leaf
            observation guide
          </ImagePlaceholder>
          <S.Paragraph>
            Leaves are the tree's energy source, and their size, health, and behavior directly reflect cultivation
            conditions. <S.Bold>Leaf size</S.Bold> is driven by vigor, light exposure, water and nitrogen availability,
            root restriction, and branch structure. Understanding these factors allows practitioners to influence leaf
            size toward bonsai-appropriate proportions.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Defoliation</S.Bold>—removing leaves to stimulate regrowth—is a powerful technique for reducing leaf
            size and increasing ramification in deciduous trees. It must be performed on healthy trees during the
            appropriate seasonal window, with proper technique and aftercare. Partial defoliation offers a less
            stressful alternative to full defoliation.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Conifers</S.Bold> require different approaches. Pine needle management involves candle work and
            needle reduction. Juniper and other scale-foliage conifers require careful pinching and thinning without
            removing so much growth that branches are lost. All conifers are less forgiving than broadleaf trees and
            require conservative technique.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Transpiration</S.Bold>—water loss through leaves—must be balanced with root water uptake. When
            transpiration exceeds uptake, leaf scorch results. Prevention involves adequate watering, wind protection,
            appropriate light exposure, gradual acclimation, and maintaining healthy roots.
          </S.Paragraph>
          <S.Paragraph>
            Finally, <S.Bold>seasonal leaf behavior</S.Bold> provides a window into tree health. Spring emergence
            reveals vigor and winter survival. Summer leaves show nutrient status and stress tolerance. Fall color
            reflects health and environmental conditions. Learning to read these signals improves diagnostic ability and
            allows problems to be addressed before they become severe.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-6" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter6;
