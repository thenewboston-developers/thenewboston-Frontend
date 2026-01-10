import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter11: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 11: Nutrition and Fertilizer</S.Title>

        <ImagePlaceholder>
          Illustration: healthy bonsai showing robust foliage and strong growth alongside nutrient molecules (N, P, K)
          flowing through soil to roots
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Trees, like all living organisms, require nutrients to grow, repair tissue, and carry out metabolic
            processes. In nature, trees access a vast soil volume and benefit from continuous nutrient cycling through
            decomposing organic matter. In a bonsai pot, that nutrient supply is limited by the small soil volume and is
            rapidly depleted by watering and root uptake.
          </S.Paragraph>
          <S.Paragraph>
            Fertilization replaces what the confined environment cannot provide. But fertilizing bonsai is not simply
            about adding more—it is about providing the right nutrients at the right times to support specific growth
            goals.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Essential nutrients</S.Bold>: what trees need and what each element does
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Nitrogen and growth control</S.Bold>: how nitrogen affects leaf size, vigor, and refinement
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Organic vs synthetic fertilizers</S.Bold>: how different approaches work and when to use each
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Deficiency diagnosis</S.Bold>: recognizing nutrient problems through leaf symptoms
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Feeding strategies</S.Bold>: adjusting fertilization for development versus refinement
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Essential Nutrients: What Trees Need</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: periodic table style graphic highlighting the essential plant nutrients, divided into
            macronutrients and micronutrients with their chemical symbols
          </ImagePlaceholder>
          <S.Paragraph>
            Plants require a range of elements for healthy growth. These are divided into macronutrients (needed in
            larger quantities) and micronutrients (needed in trace amounts).
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Primary macronutrients (N-P-K)</S.SubSectionTitle>
            <S.Paragraph>
              The three numbers on fertilizer labels represent nitrogen (N), phosphorus (P), and potassium (K). These
              are the nutrients plants consume in the largest quantities.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Nitrogen (N)</S.Bold>: drives vegetative growth—leaf production, stem elongation, and overall
                vigor. Nitrogen is a component of chlorophyll, amino acids, and proteins. It is the nutrient most
                rapidly depleted and most visibly affects growth rate.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Phosphorus (P)</S.Bold>: supports root development, energy transfer, and flower/fruit
                production. Phosphorus is critical for ATP (the energy currency of cells) and nucleic acids.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Potassium (K)</S.Bold>: regulates water uptake, enzyme activation, and overall plant health.
                Potassium strengthens cell walls, improves disease resistance, and helps trees tolerate environmental
                stress.
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: three-part graphic showing nitrogen affecting leaves, phosphorus affecting roots, and
              potassium affecting overall tree health and stress tolerance
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Secondary macronutrients</S.SubSectionTitle>
            <S.Paragraph>
              Plants also require significant amounts of calcium, magnesium, and sulfur, though in smaller quantities
              than N-P-K.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Calcium (Ca)</S.Bold>: essential for cell wall structure and cell division. Calcium deficiency
                causes distorted new growth.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Magnesium (Mg)</S.Bold>: the central atom in chlorophyll molecules. Without sufficient
                magnesium, photosynthesis is impaired.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sulfur (S)</S.Bold>: a component of certain amino acids and vitamins. Sulfur deficiency
                resembles nitrogen deficiency but affects new leaves first.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Micronutrients</S.SubSectionTitle>
            <S.Paragraph>
              Micronutrients are needed in trace amounts but are equally essential. Deficiencies cause specific symptoms
              and can limit growth even when macronutrients are abundant.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Iron (Fe)</S.Bold>: required for chlorophyll synthesis; deficiency causes interveinal chlorosis
                (yellowing between veins) on new leaves
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Manganese (Mn)</S.Bold>: involved in photosynthesis and enzyme activation
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Zinc (Zn)</S.Bold>: necessary for hormone production and enzyme function
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Copper (Cu)</S.Bold>: component of enzymes involved in lignin synthesis
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Boron (B)</S.Bold>: important for cell wall formation and sugar transport
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Molybdenum (Mo)</S.Bold>: required for nitrogen metabolism
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chlorine (Cl)</S.Bold>: involved in photosynthesis and osmotic regulation
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Most quality fertilizers include micronutrients. Deficiencies are more common with very pure water sources
              or heavily leached substrates.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Nitrogen and Growth Control</S.SectionTitle>
          <ImagePlaceholder>
            Comparison illustration: same species with high nitrogen feeding (large leaves, long internodes, vigorous
            growth) versus controlled nitrogen feeding (smaller leaves, compact growth, refined appearance)
          </ImagePlaceholder>
          <S.Paragraph>
            Of all nutrients, nitrogen has the most dramatic effect on visible growth. Understanding nitrogen's role is
            central to bonsai fertilization strategy.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Nitrogen promotes vegetative growth</S.SubSectionTitle>
            <S.Paragraph>
              High nitrogen availability pushes trees toward rapid leaf and shoot production. This manifests as:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Larger leaves</S.Bold>: cells expand more when nitrogen is abundant
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Longer internodes</S.Bold>: the distance between leaves increases
              </S.ListItem>
              <S.ListItem>
                <S.Bold>More vigorous extension growth</S.Bold>: shoots grow longer and faster
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Darker green foliage</S.Bold>: more chlorophyll production
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This response is beneficial when you want a tree to grow—during development, recovery, or when building
              trunk thickness. But it works against refinement goals.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Controlling nitrogen for refinement</S.SubSectionTitle>
            <S.Paragraph>
              For refined bonsai with small leaves and compact internodes, nitrogen must be managed carefully:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Reduce nitrogen in spring</S.Bold>: limiting nitrogen during the first flush of growth helps
                control leaf size and internode length
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Use lower-nitrogen fertilizers</S.Bold>: formulas with N-P-K ratios like 4-6-6 or 6-6-6 provide
                balanced nutrition without pushing excessive growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Time applications</S.Bold>: feeding after the first flush hardens off, rather than before,
                avoids promoting excessive extension
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Timeline diagram: showing fertilization timing for refined trees—withholding heavy nitrogen in early
              spring, feeding after first flush hardens, and reducing again before dormancy
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Nitrogen for development</S.SubSectionTitle>
            <S.Paragraph>Trees in development benefit from higher nitrogen to build mass quickly:</S.Paragraph>
            <S.List>
              <S.ListItem>Begin feeding as soon as growth starts in spring</S.ListItem>
              <S.ListItem>Use higher-nitrogen formulas (10-6-6 or similar)</S.ListItem>
              <S.ListItem>Feed consistently through the growing season</S.ListItem>
              <S.ListItem>Allow trees to grow freely rather than restricting for refinement</S.ListItem>
            </S.List>
            <S.Paragraph>
              Development trees can tolerate—and benefit from—the larger leaves and longer internodes that heavy feeding
              produces. Refinement comes later.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Organic vs Synthetic Fertilizers</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: organic fertilizer (showing slow breakdown by soil organisms, gradual nutrient release)
            versus synthetic fertilizer (showing immediate availability, rapid uptake)
          </ImagePlaceholder>
          <S.Paragraph>
            Bonsai practitioners use both organic and synthetic fertilizers, often in combination. Each approach has
            distinct characteristics.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Organic fertilizers</S.SubSectionTitle>
            <S.Paragraph>
              Organic fertilizers derive from plant or animal sources—cottonseed meal, fish emulsion, seaweed, bone
              meal, composted materials. Their characteristics include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Slow release</S.Bold>: nutrients become available gradually as soil organisms break down organic
                matter. This provides steady feeding over weeks.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Temperature dependent</S.Bold>: breakdown requires microbial activity, which slows in cold
                weather and accelerates in warmth. Fertilizer effectiveness varies with conditions.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Soil health benefits</S.Bold>: organic matter feeds soil life and improves substrate structure
                over time.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Lower burn risk</S.Bold>: the gradual release makes it harder to over-fertilize and damage
                roots.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Variable analysis</S.Bold>: nutrient content varies between batches and sources.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Common organic options include solid cakes or pellets placed on the soil surface, liquid fish emulsion,
              and seaweed extracts. Solid organic fertilizers are traditional in Japanese bonsai practice.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: organic fertilizer cakes placed on soil surface with arrows showing slow breakdown and
              nutrient diffusion into substrate
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Synthetic (chemical) fertilizers</S.SubSectionTitle>
            <S.Paragraph>
              Synthetic fertilizers provide nutrients in immediately plant-available forms. Their characteristics
              include:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Immediate availability</S.Bold>: nutrients are in ionic form that roots can absorb directly. No
                breakdown required.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Precise dosing</S.Bold>: nutrient content is consistent and known. You can control exactly how
                much of each element you apply.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Quick response</S.Bold>: trees respond rapidly to applications—useful when addressing
                deficiencies.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leaches quickly</S.Bold>: water-soluble nutrients wash out with watering. Frequent application
                is necessary.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Burn risk</S.Bold>: concentrated salts can damage roots if over-applied.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Liquid synthetic fertilizers are typically diluted in water and applied at regular intervals—weekly or
              biweekly during the growing season. Slow-release synthetic granules provide extended feeding similar to
              organics.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Combining approaches</S.SubSectionTitle>
            <S.Paragraph>Many practitioners use both:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Organic base</S.Bold>: solid organic cakes provide steady background nutrition
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Liquid supplements</S.Bold>: synthetic liquids address specific needs or boost feeding during
                peak growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Seasonal adjustment</S.Bold>: heavier organic in spring, liquid supplements in summer, reduced
                feeding in fall
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Neither approach is inherently superior. What matters is understanding how each works and applying them
              appropriately for your trees and goals.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Recognizing Nutrient Deficiencies</S.SectionTitle>
          <ImagePlaceholder>
            Diagnostic chart: leaf symptoms for common deficiencies—nitrogen (overall yellowing starting with old
            leaves), iron (interveinal chlorosis on new leaves), potassium (brown leaf margins), magnesium (interveinal
            chlorosis on old leaves)
          </ImagePlaceholder>
          <S.Paragraph>
            Nutrient deficiencies produce visible symptoms. Learning to read these signs helps diagnose problems before
            they become severe.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Mobile vs immobile nutrients</S.SubSectionTitle>
            <S.Paragraph>
              The location of symptoms—old leaves versus new leaves—indicates which nutrient is lacking:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Mobile nutrients</S.Bold> (N, P, K, Mg): can be relocated within the plant. Deficiency symptoms
                appear first on older leaves, as the plant moves nutrients to support new growth.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Immobile nutrients</S.Bold> (Ca, Fe, Mn, B, Cu, Zn): cannot be redistributed. Deficiency
                symptoms appear on new growth, which cannot obtain what it needs.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common deficiency symptoms</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Nitrogen deficiency</S.Bold>
              <br />
              Overall yellowing (chlorosis) starting with older leaves. Growth slows, leaves become pale green to
              yellow. Severe deficiency causes leaf drop.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Phosphorus deficiency</S.Bold>
              <br />
              Dark green to purple coloration on older leaves, particularly undersides. Stunted growth. Often appears in
              cold conditions when phosphorus uptake is limited.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Potassium deficiency</S.Bold>
              <br />
              Brown scorching and curling of leaf edges, starting on older leaves. Weak stems, poor stress tolerance.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Iron deficiency</S.Bold>
              <br />
              Interveinal chlorosis on new leaves—yellowing between veins while veins remain green. Common in alkaline
              substrates where iron becomes unavailable.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Magnesium deficiency</S.Bold>
              <br />
              Interveinal chlorosis on older leaves. Similar appearance to iron deficiency but occurs on mature foliage.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Calcium deficiency</S.Bold>
              <br />
              Distorted, curled, or cupped new leaves. Growing tips may die back. Brown spots on young foliage.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration grid: six leaves showing visual symptoms of nitrogen, phosphorus, potassium, iron, magnesium,
              and calcium deficiency with labeled indicators
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Diagnosis considerations</S.SubSectionTitle>
            <S.Paragraph>Before assuming nutrient deficiency, consider:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Watering problems</S.Bold>: root damage from over- or under-watering can produce symptoms that
                mimic deficiency
              </S.ListItem>
              <S.ListItem>
                <S.Bold>pH issues</S.Bold>: nutrients may be present but unavailable at incorrect pH levels
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root health</S.Bold>: damaged roots cannot absorb nutrients regardless of availability
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Timing</S.Bold>: some yellowing is normal in fall; new spring growth is often lighter colored
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species characteristics</S.Bold>: some trees naturally have lighter foliage than others
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              True deficiency typically develops gradually and affects multiple leaves in predictable patterns. Sudden
              changes usually indicate other problems.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Feeding Strategies: Development vs Refinement</S.SectionTitle>
          <ImagePlaceholder>
            Side-by-side illustration: development tree (in grow box, being pushed for growth) with aggressive feeding
            schedule versus refined show tree (in bonsai pot) with controlled feeding schedule
          </ImagePlaceholder>
          <S.Paragraph>
            Fertilization strategy depends on where a tree is in its bonsai journey. Development trees and refined trees
            have different goals and different needs.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Feeding for development</S.SubSectionTitle>
            <S.Paragraph>
              Trees being developed need to build mass—trunk thickness, branch structure, root spread. The goal is
              maximum healthy growth.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Begin early</S.Bold>: start fertilizing as soon as buds begin to swell in spring
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Feed heavily</S.Bold>: use full-strength fertilizer at recommended intervals, or slightly more
                frequently with diluted applications
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Continue through the season</S.Bold>: maintain feeding until fall, tapering as growth slows
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Accept larger leaves</S.Bold>: leaf size reduction comes during refinement, not development
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Monitor for excess</S.Bold>: even development trees can be over-fertilized; watch for salt
                buildup or burned leaf edges
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Feeding for refinement</S.SubSectionTitle>
            <S.Paragraph>
              Refined trees need to maintain health while controlling leaf size and internode length. The goal is
              compact, proportional growth.
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Delay spring feeding</S.Bold>: wait until after the first flush hardens to avoid pushing
                excessive growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduce nitrogen</S.Bold>: use balanced or lower-nitrogen formulas
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Feed lightly but consistently</S.Bold>: small, regular applications maintain health without
                pushing growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Increase feeding after defoliation</S.Bold>: if you defoliate to reduce leaf size, feed more
                heavily to support the new flush
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Taper in fall</S.Bold>: reduce feeding as growth slows to prepare for dormancy
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Calendar diagram: monthly feeding intensity for refined deciduous bonsai, showing reduced early spring
              feeding, moderate summer feeding, and tapering in fall
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Species-specific considerations</S.SubSectionTitle>
            <S.Paragraph>Different species respond differently to fertilization:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Pines</S.Bold>: generally fed less than deciduous trees; heavy feeding produces coarse growth.
                Many practitioners fertilize pines only in fall.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Junipers</S.Bold>: moderate feeders; too much nitrogen produces loose, stringy foliage rather
                than tight pads
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Maples</S.Bold>: respond strongly to nitrogen; careful control is needed for refined specimens
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tropicals</S.Bold>: growing year-round in warm conditions, they benefit from consistent feeding
                without a strong seasonal pattern
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Flowering trees</S.Bold>: may benefit from higher phosphorus before bloom period; reduce
                nitrogen to promote flowering over vegetative growth
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When not to fertilize</S.SubSectionTitle>
            <S.Paragraph>Fertilizer should be withheld in certain situations:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Immediately after repotting</S.Bold>: wait 3-4 weeks until new roots establish; damaged roots
                cannot handle fertilizer salts
              </S.ListItem>
              <S.ListItem>
                <S.Bold>During dormancy</S.Bold>: deciduous trees are not actively growing and cannot use nutrients
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sick or stressed trees</S.Bold>: fertilizer does not fix underlying problems and can add stress.
                Address the cause first.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Extreme heat</S.Bold>: very high temperatures stress trees; fertilizer salts add to the burden
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dry substrate</S.Bold>: never fertilize dry soil. Water first, then apply fertilizer to
                moistened substrate.
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Practical Fertilization</S.SectionTitle>
          <ImagePlaceholder>
            Illustration: proper fertilizer application—organic cakes placed on soil surface, liquid fertilizer being
            poured over moistened substrate, fertilizer basket placement
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>Application methods</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Solid organic fertilizers</S.Bold>
              <br />
              Place cakes or pellets on the soil surface, typically 2-4 per pot depending on pot size. Use fertilizer
              baskets or mesh covers to prevent birds and pests from disturbing them. Replace every 4-6 weeks as they
              break down.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Liquid fertilizers</S.Bold>
              <br />
              Dilute according to label directions—or more diluted for frequent application. Apply to pre-moistened
              soil. Water thoroughly after application to distribute nutrients.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Slow-release granules</S.Bold>
              <br />
              Top-dress on soil surface or mix into substrate at repotting. Follow label rates; these fertilizers
              continue releasing for months.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Foliar feeding</S.Bold>
              <br />
              Spraying dilute fertilizer on leaves provides quick nutrient uptake but supplements rather than replaces
              root feeding. Useful for addressing specific deficiencies.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Common mistakes</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Over-fertilizing</S.Bold>: more is not better. Excess fertilizer causes salt buildup, root burn,
                and coarse growth. Follow directions and observe tree response.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Fertilizing dry soil</S.Bold>: concentrated fertilizer on dry roots causes damage. Always water
                first.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Inconsistent application</S.Bold>: sporadic heavy feeding followed by neglect stresses trees.
                Regular, moderate feeding is better than occasional heavy doses.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ignoring substrate condition</S.Bold>: old, compacted substrate holds fertilizer salts
                differently than fresh, well-draining mix. Adjust accordingly.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>One-size-fits-all</S.Bold>: different trees at different stages need different feeding. A
                development tree and a show tree in the same collection need different approaches.
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap infographic: essential nutrients chart, nitrogen effects comparison, organic vs synthetic comparison,
            deficiency symptom guide, feeding schedule by tree stage
          </ImagePlaceholder>
          <S.Paragraph>
            Fertilization provides what the limited soil volume of a bonsai pot cannot—the nutrients trees need for
            healthy growth. Understanding what nutrients do, how different fertilizers work, and how to adjust feeding
            for different goals gives you control over your trees' development.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Nitrogen is the key variable</S.Bold>. High nitrogen pushes vegetative growth—larger leaves, longer
            internodes, more vigor. Controlling nitrogen is central to managing leaf size and achieving refinement.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Organic and synthetic fertilizers each have roles</S.Bold>. Organic fertilizers release slowly and
            support soil health; synthetic fertilizers provide immediate, precise nutrition. Many practitioners use
            both.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Deficiency symptoms indicate problems</S.Bold>. Learn to read what leaves tell you—where symptoms
            appear and what they look like points to which nutrient is lacking.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Match feeding to goals</S.Bold>. Development trees benefit from heavy, consistent feeding.
            Refinement trees need controlled feeding with attention to nitrogen levels and timing. Know what each tree
            needs and feed accordingly.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-11" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter11;
