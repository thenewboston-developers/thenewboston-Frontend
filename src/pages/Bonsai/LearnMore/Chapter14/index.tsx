import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter14: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 14: Pests, Disease, and Diagnosis</S.Title>

        <ImagePlaceholder>
          Illustration: bonsai being examined with a hand lens, showing inspection of leaves for pest damage and disease
          symptoms
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Bonsai, like all plants, face threats from pests and diseases. The close attention bonsai receive often
            means problems are noticed early—but that same care environment can sometimes create conditions where
            problems thrive. Successful management requires accurate diagnosis followed by appropriate response.
          </S.Paragraph>
          <S.Paragraph>
            Not every problem requires intervention. Some issues resolve on their own; others require immediate action.
            Learning to distinguish between them is part of developing bonsai skill.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>The diagnostic process</S.Bold>: how to systematically identify what is affecting a tree
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Common pests</S.Bold>: identification, damage patterns, and treatment options
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Fungal and bacterial diseases</S.Bold>: recognition and management
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Environmental problems</S.Bold>: conditions that mimic disease but have cultural causes
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Treatment principles</S.Bold>: when to treat, when to wait, and how to prevent recurrence
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>The Diagnostic Process</S.SectionTitle>
          <ImagePlaceholder>
            Flowchart diagram: diagnostic decision tree starting with symptom observation, branching through pest check,
            disease check, and environmental factors to reach diagnosis
          </ImagePlaceholder>
          <S.Paragraph>
            When something appears wrong with a tree, resist the urge to treat immediately. First, understand what you
            are dealing with. Incorrect diagnosis leads to ineffective treatment or treatments that cause additional
            harm.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Step 1: Observe the symptoms</S.SubSectionTitle>
            <S.Paragraph>Document what you see:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>What is affected?</S.Bold> Leaves, stems, bark, roots? One branch or the whole tree?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>What does the damage look like?</S.Bold> Discoloration, spots, holes, wilting, distortion,
                deposits?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Where on the plant?</S.Bold> New growth, old growth, specific location, random distribution?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>When did it start?</S.Bold> Sudden onset or gradual development?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Is it spreading?</S.Bold> Contained or moving to new areas?
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Illustration: symptom documentation guide showing different types of leaf damage patterns—spots, margins,
              interveinal, entire leaf—with labeled examples
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Step 2: Look for the cause</S.SubSectionTitle>
            <S.Paragraph>Search for direct evidence:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Check for insects</S.Bold>: look on leaf undersides, in bark crevices, at branch junctions. Use
                a magnifying glass for small pests.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Look for fungal structures</S.Bold>: powdery coatings, fuzzy growth, dark spots with fruiting
                bodies, oozing sap
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Examine the roots</S.Bold>: if above-ground symptoms are severe, unpot and check root health
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Check the substrate</S.Bold>: is it overly wet, compacted, or degraded?
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Step 3: Consider recent history</S.SubSectionTitle>
            <S.Paragraph>Context often points to the cause:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Recent changes</S.Bold>: repotting, moving, pruning, or other interventions?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Weather events</S.Bold>: heat wave, cold snap, heavy rain, drought?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Care changes</S.Bold>: new fertilizer, different watering pattern, new location?
              </S.ListItem>
              <S.ListItem>
                <S.Bold>New additions</S.Bold>: recently acquired trees that may have introduced pests or disease?
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Step 4: Eliminate possibilities</S.SubSectionTitle>
            <S.Paragraph>Many problems look similar. Work through possibilities systematically:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>If no pests are visible</S.Bold>, the problem is likely disease, environmental, or nutritional
              </S.ListItem>
              <S.ListItem>
                <S.Bold>If symptoms match a recent event</S.Bold>, environmental stress is likely the cause
              </S.ListItem>
              <S.ListItem>
                <S.Bold>If only one tree is affected</S.Bold>, individual tree issues are more likely than widespread
                pests
              </S.ListItem>
              <S.ListItem>
                <S.Bold>If multiple trees are affected</S.Bold>, look for common factors: shared location, recent group
                treatment, contagious pest
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Common Pests</S.SectionTitle>
          <ImagePlaceholder>
            Identification chart: common bonsai pests at actual size and magnified—aphids, scale, spider mites,
            mealybugs, caterpillars—with their typical damage patterns
          </ImagePlaceholder>
          <S.Paragraph>
            Most pest problems in bonsai come from a relatively small number of common insects and mites. Learning to
            recognize these covers the majority of pest issues you will encounter.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Aphids</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Small, soft-bodied insects (1-3mm), typically green but also black,
              brown, or pink. Found in clusters on new growth, shoot tips, and leaf undersides.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Damage</S.Bold>: Aphids suck plant sap. Heavy infestations cause:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Distorted, curled new growth</S.ListItem>
              <S.ListItem>Sticky honeydew deposits on leaves and surfaces below</S.ListItem>
              <S.ListItem>Sooty mold (black fungus) growing on honeydew</S.ListItem>
              <S.ListItem>Weakened shoots and reduced vigor</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Strong water spray dislodges aphids. Insecticidal soap or neem oil controls
              populations. Severe infestations may require systemic insecticides. Natural predators (ladybugs,
              lacewings) help control aphids outdoors.
            </S.Paragraph>
            <ImagePlaceholder>
              Close-up illustration: aphid colony on new growth showing the insects, honeydew droplets, and curled leaf
              damage
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Scale insects</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Scale appear as small bumps on bark and leaves. Armored scale are hard,
              waxy, and do not move once mature. Soft scale are larger, may be slightly mobile, and produce honeydew.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Damage</S.Bold>: Scale suck sap from branches and trunks:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Yellowing leaves, branch dieback</S.ListItem>
              <S.ListItem>Honeydew and sooty mold (soft scale)</S.ListItem>
              <S.ListItem>Weakened branches, reduced vigor</S.ListItem>
              <S.ListItem>Severe infestations can kill branches or entire trees</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Scale are difficult to control because their waxy covering protects them from
              contact sprays. Horticultural oil (dormant or summer oil) smothers scale. Systemic insecticides are
              effective. Physical removal with a brush or toothpick works for light infestations.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Spider mites</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Extremely small (barely visible without magnification). Red, brown, or
              yellow. Look for fine webbing on leaf undersides and between branches. Tap foliage over white paper—tiny
              moving specks indicate mites.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Damage</S.Bold>: Mites pierce leaf cells and extract contents:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Stippled, bronzed, or yellowed leaves</S.ListItem>
              <S.ListItem>Fine webbing in advanced infestations</S.ListItem>
              <S.ListItem>Leaf drop in severe cases</S.ListItem>
              <S.ListItem>Thrive in hot, dry conditions</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Water spray reduces populations. Miticides specifically target mites (regular
              insecticides often do not). Increasing humidity and airflow discourages mites. Repeated treatments are
              usually necessary because eggs are resistant.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: spider mite damage on leaf showing stippling pattern, with magnified view of mites and
              webbing
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Mealybugs</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Soft, oval insects covered in white, waxy, cottony coating. Found in
              protected areas—leaf axils, under bark, at root-stem junction.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Damage</S.Bold>: Similar to other sap feeders:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Yellowing, wilting foliage</S.ListItem>
              <S.ListItem>Honeydew and sooty mold</S.ListItem>
              <S.ListItem>Stunted growth</S.ListItem>
              <S.ListItem>Root mealybugs cause decline without visible above-ground pests</S.ListItem>
            </S.List>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Alcohol on cotton swabs kills individuals. Insecticidal soap or oil for
              populations. Systemic insecticides for root mealybugs or heavy infestations. Check roots if plant declines
              without visible pests.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Caterpillars and leaf-feeding insects</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Various larvae and beetles that chew leaves. Usually visible with careful
              inspection. Look for frass (insect droppings) below damaged areas.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Damage</S.Bold>: Chewed leaves, holes, notched edges, skeletonized foliage, defoliation in severe
              cases.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Hand picking is effective for small numbers. Bt (Bacillus thuringiensis) is a
              biological insecticide effective against caterpillars. General insecticides work but affect beneficial
              insects too.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Fungus gnats</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Small dark flies hovering around soil surface. Larvae are white,
              translucent, in the top layer of substrate.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Damage</S.Bold>: Adults are mainly a nuisance. Larvae feed on organic matter and fungus but can
              damage fine roots in high populations, especially in seedlings.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Allow soil surface to dry between waterings. Yellow sticky traps catch adults.
              Bt-israelensis (biological larvicide) or beneficial nematodes target larvae. Common in organic-heavy
              substrates kept too wet.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Fungal and Bacterial Diseases</S.SectionTitle>
          <ImagePlaceholder>
            Disease identification chart: common fungal diseases—powdery mildew, root rot, leaf spot, rust, canker—with
            visual examples of symptoms on leaves and bark
          </ImagePlaceholder>
          <S.Paragraph>
            Fungal diseases are more common in bonsai than bacterial diseases. Most are encouraged by excess moisture,
            poor airflow, or weakened plant health.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Powdery mildew</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: White or gray powdery coating on leaves, stems, and buds. Often appears
              in late summer. Unlike dust, it does not wipe off cleanly.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conditions</S.Bold>: Thrives in moderate temperatures with high humidity but dry leaf surfaces.
              Often worse in sheltered locations with poor airflow.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Improve airflow. Fungicides (sulfur, neem oil, or synthetic fungicides)
              prevent spread. Remove heavily affected leaves. Water in morning so foliage dries quickly.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: powdery mildew on leaves at different stages—early spots to heavy coating—with healthy leaf
              for comparison
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Root rot (Phytophthora, Pythium)</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Symptoms appear above ground as wilting despite wet soil, yellowing
              leaves, branch dieback. Roots are brown, mushy, and may have a foul odor. Healthy roots are white or tan
              and firm.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conditions</S.Bold>: Caused by waterlogged, poorly draining substrate. More common in broken-down
              soil or when trees are overwatered.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Emergency repotting into fresh, well-draining substrate. Prune away dead
              roots. Reduce watering. Fungicide drenches may help. Prevention is key—good drainage and appropriate
              watering prevent root rot.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Leaf spot diseases</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Various fungi cause spots on leaves—circular or irregular, often with
              defined margins, sometimes with concentric rings or fruiting bodies visible.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conditions</S.Bold>: Spread by splashing water, high humidity, crowded conditions that limit
              airflow.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Remove affected leaves. Improve airflow. Water at soil level, not on foliage.
              Fungicide application prevents spread but does not cure existing spots.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Rust diseases</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Orange, yellow, or brown powdery pustules on leaf undersides. Upper leaf
              surface may show yellow spots corresponding to pustule locations.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conditions</S.Bold>: Moisture on leaves, moderate temperatures. Some rusts require alternate hosts
              to complete their life cycle.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Remove infected leaves. Fungicides prevent spread. Ensure good airflow and dry
              foliage.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Cankers</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Dead, sunken areas on bark, often with cracked or discolored edges. May
              girdle and kill branches.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conditions</S.Bold>: Often enter through wounds. Stress weakens tree defenses.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Prune out affected branches below the canker into healthy tissue. Sterilize
              tools. Improve tree vigor to resist infection.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: canker on branch showing sunken dead bark, proper pruning cut location below the infected
              area
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Damping off</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Identification</S.Bold>: Seedlings collapse at soil level, stems appear pinched or rotted at the
              base. Seeds may rot before germinating.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Conditions</S.Bold>: Wet soil, poor airflow, contaminated soil or containers.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Prevention is essential—use sterile substrate, clean containers, avoid
              overwatering. Fungicide drenches may protect remaining seedlings once damping off appears.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Environmental Problems</S.SectionTitle>
          <ImagePlaceholder>
            Comparison diagram: environmental damage vs disease/pest damage—sunburn vs fungal spots, drought stress vs
            root rot, fertilizer burn vs nutrient deficiency
          </ImagePlaceholder>
          <S.Paragraph>
            Many problems that look like disease or pest damage are actually caused by environmental conditions. These
            require cultural corrections, not treatments.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Water stress</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Underwatering</S.Bold>: Wilting, dry crispy leaf edges, leaf drop. Leaves may turn yellow before
              dropping. Chronic underwatering causes fine root death.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Overwatering</S.Bold>: Wilting despite wet soil (roots cannot function), yellowing leaves, soft
              mushy stems at base, root rot. Often mistaken for underwatering, leading to more water and worsening the
              problem.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Diagnosis</S.Bold>: Check the soil moisture and root health to determine which problem exists.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Heat and sun damage</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Sunburn</S.Bold>: Bleached or brown patches on leaves, typically on sun-facing surfaces. Common
              after moving trees to more sun or during heat waves.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Heat stress</S.Bold>: Wilting during hot periods even with adequate water, brown leaf margins,
              aborted flowers or fruit.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Provide shade during extreme heat. Acclimate trees gradually to increased sun
              exposure.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Cold damage</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Frost damage</S.Bold>: Blackened new growth, water-soaked appearance that later dries brown.
              Affects tender growth in spring or inadequately protected trees in winter.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Winter damage</S.Bold>: Brown or bronze evergreen foliage in spring, dead branch tips, failure to
              leaf out. May not appear until growth resumes.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Wait for new growth to assess extent of damage. Prune dead material once
              living tissue is clearly identifiable.
            </S.Paragraph>
            <ImagePlaceholder>
              Illustration: frost damage on new growth showing blackened shoot tips and water-soaked leaf tissue
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Fertilizer problems</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Fertilizer burn</S.Bold>: Brown leaf edges and tips, especially on recently fertilized trees.
              Caused by salt concentration damaging roots.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Nutrient deficiency</S.Bold>: Various symptoms depending on which nutrient is lacking (see Chapter
              11). Often develops gradually.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Diagnosis</S.Bold>: Burn appears shortly after fertilizing and affects leaf margins. Deficiency
              develops over time and shows characteristic patterns based on nutrient mobility.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Chemical damage</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Herbicide drift</S.Bold>: Distorted, twisted new growth; cupped or curled leaves. Can travel
              considerable distances from application site.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Pesticide damage</S.Bold>: Some trees are sensitive to certain chemicals. Read labels carefully.
              Damage may appear as burn, distortion, or leaf drop.
            </S.Paragraph>
            <S.Paragraph>
              <S.Bold>Treatment</S.Bold>: Remove damaged growth. Trees usually recover if damage is not severe. Prevent
              by avoiding chemical application on hot days and keeping bonsai away from areas being treated.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Quarantine and Prevention</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: quarantine workflow—new tree inspection, isolation period, treatment if needed, integration into
            collection
          </ImagePlaceholder>
          <S.Paragraph>
            Prevention is easier than treatment. Good practices reduce pest and disease problems before they start.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Quarantine new trees</S.SubSectionTitle>
            <S.Paragraph>Every new tree is a potential source of pests or disease:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Inspect carefully</S.Bold>: check leaves, bark, soil surface, and undersides before bringing a
                new tree home
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Isolate for 2-4 weeks</S.Bold>: keep new trees away from your collection until you are confident
                they are clean
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Treat preventively</S.Bold>: a preventive spray with insecticidal soap or neem oil reduces risk
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Repot if concerned</S.Bold>: removing nursery soil eliminates soil-borne problems
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Good cultural practices</S.SubSectionTitle>
            <S.Paragraph>Healthy trees resist problems better than stressed trees:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Appropriate watering</S.Bold>: not too much, not too little
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Good drainage</S.Bold>: well-draining substrate prevents root problems
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Adequate airflow</S.Bold>: spacing trees and avoiding crowding reduces fungal problems
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Appropriate light</S.Bold>: proper light exposure keeps trees vigorous
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Regular inspection</S.Bold>: catching problems early makes treatment easier
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Sanitation</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Clean tools</S.Bold>: sterilize pruning tools between trees to prevent disease spread
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Remove debris</S.Bold>: fallen leaves and dead material can harbor pests and disease
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Clean work surfaces</S.Bold>: especially after working on affected trees
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dispose of infected material</S.Bold>: do not compost heavily diseased plant material
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Treatment Principles</S.SectionTitle>
          <ImagePlaceholder>
            Decision diagram: treatment decision tree—identify problem, assess severity, decide on action (monitor,
            cultural change, targeted treatment, intensive treatment)
          </ImagePlaceholder>

          <S.SubSection>
            <S.SubSectionTitle>When to treat</S.SubSectionTitle>
            <S.Paragraph>Not every problem requires treatment. Consider:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Severity</S.Bold>: a few aphids or a small spot may not warrant chemical treatment; heavy
                infestation does
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Trend</S.Bold>: is the problem getting worse or stable? Worsening problems need intervention
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Tree value and health</S.Bold>: healthy trees often outgrow minor problems; weak trees need help
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Season</S.Bold>: some problems resolve naturally as seasons change
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>When to wait</S.SubSectionTitle>
            <S.Paragraph>Sometimes monitoring is better than immediate treatment:</S.Paragraph>
            <S.List>
              <S.ListItem>Minor damage that does not spread</S.ListItem>
              <S.ListItem>Problems late in the season that will end with dormancy</S.ListItem>
              <S.ListItem>Situations where the diagnosis is uncertain</S.ListItem>
              <S.ListItem>When natural predators are controlling pest populations</S.ListItem>
            </S.List>
            <S.Paragraph>
              Unnecessary treatment stresses trees and can harm beneficial organisms. Treat only when treatment is
              likely to help.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Treatment options hierarchy</S.SubSectionTitle>
            <S.Paragraph>Start with least invasive approaches and escalate if needed:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Physical removal</S.Bold>: picking off pests, removing infected leaves, washing with water
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Cultural changes</S.Bold>: adjusting water, light, airflow to discourage problems
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Targeted biological or low-toxicity treatments</S.Bold>: insecticidal soap, neem oil, Bt,
                beneficial insects
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Chemical treatments</S.Bold>: synthetic pesticides or fungicides when other methods fail
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Treatment best practices</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Follow label directions</S.Bold>: more is not better; incorrect concentration can damage plants
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Time applications</S.Bold>: early morning or evening, not in hot sun
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Ensure coverage</S.Bold>: spray must contact pests; cover undersides of leaves where pests hide
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Repeat as directed</S.Bold>: one application rarely eliminates problems; follow recommended
                schedules
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Rotate products</S.Bold>: using the same chemical repeatedly can lead to resistance
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Test first</S.Bold>: spray a small area and wait 24-48 hours to check for damage before treating
                entire tree
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            Recap infographic: diagnostic flowchart summary, common pest identification quick reference, disease vs
            environmental damage comparison, prevention checklist
          </ImagePlaceholder>
          <S.Paragraph>
            Pest and disease management in bonsai begins with accurate diagnosis. Take time to observe symptoms,
            identify causes, and understand the problem before treating. Many issues that look like pest or disease
            damage are actually environmental problems requiring cultural changes, not chemicals.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Diagnosis before treatment</S.Bold>. Observe systematically: what is affected, what does the damage
            look like, are pests visible, what changed recently? Incorrect diagnosis leads to ineffective treatment.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Prevention is primary</S.Bold>. Quarantine new trees, maintain good cultural practices, keep trees
            healthy, and practice sanitation. Healthy trees in appropriate conditions resist problems better than
            stressed trees.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Treat appropriately</S.Bold>. Not every problem requires intervention. When treatment is necessary,
            start with least invasive methods and escalate only if needed. Follow label directions and time applications
            properly.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Learn from problems</S.Bold>. Each issue is an opportunity to understand your trees better. What
            conditions allowed the problem to develop? What can you change to prevent recurrence? Over time, this
            knowledge reduces problems across your entire collection.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-14" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter14;
