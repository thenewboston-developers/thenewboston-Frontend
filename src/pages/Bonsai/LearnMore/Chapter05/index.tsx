import * as S from 'components/LearnMore';
import {Divider, ImagePlaceholder} from 'components/LearnMore';
import {SFC} from 'types';

import ChapterNavigation from '../ChapterNavigation';

const BonsaiLearnMoreChapter5: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Chapter 5: Branching and Ramification</S.Title>

        <ImagePlaceholder>
          Full-page image: mature bonsai branch structure showing primary, secondary, and tertiary branching with fine
          ramification at the tips, demonstrating the progression from thick to fine
        </ImagePlaceholder>

        <S.Section>
          <S.SectionTitle>Overview</S.SectionTitle>
          <S.Paragraph>
            Branches are the scaffolding of a bonsai's canopy. They carry leaves to capture light, conduct water and
            sugars between trunk and foliage, and create the silhouette that defines the tree's character. But branches
            in bonsai are not simply allowed to grow—they are cultivated through deliberate technique to achieve{' '}
            <S.Bold>ramification</S.Bold>: the progressive subdivision of branches into ever-finer networks.
          </S.Paragraph>
          <S.Paragraph>
            Understanding how branches grow, where buds form, and how trees allocate energy among competing growth
            points is essential for developing refined bonsai. Without this knowledge, pruning becomes guesswork and
            branch structure develops haphazardly.
          </S.Paragraph>
          <S.Paragraph>This chapter covers:</S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Bud formation and apical dominance</S.Bold>: how trees prioritize growth and what this means for
              branch development
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Internodes, node selection, and branch placement</S.Bold>: the structural units that determine
              branch architecture
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Ramification explained biologically</S.Bold>: what ramification actually is and how to encourage
              it
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Backbudding, dieback, and energy balance</S.Bold>: how trees respond to pruning and stress
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Refinement vs development stages</S.Bold>: why branch strategy must match the tree's current goals
            </S.ListItem>
          </S.List>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Bud Formation and Apical Dominance</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: branch tip showing terminal bud at apex with smaller lateral buds along the stem, arrows indicating
            auxin flow downward from the terminal bud
          </ImagePlaceholder>
          <S.Paragraph>
            Every branch begins as a bud. Understanding where buds form, which buds activate, and why some grow
            vigorously while others remain dormant is fundamental to controlling branch development in bonsai.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Types of buds</S.SubSectionTitle>
            <S.Paragraph>Trees produce several types of buds, each with different roles:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Terminal buds</S.Bold> (also called apical buds) form at the tips of shoots and drive extension
                growth. They contain the apical meristem—the actively dividing tissue that produces new stem length.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Lateral buds</S.Bold> (also called axillary buds) form in the leaf axils—the angle between a
                leaf stem and the branch. These can develop into side branches.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Adventitious buds</S.Bold> form in unexpected locations, often in response to damage or stress.
                They can emerge from old wood, wound margins, or trunk tissue.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Dormant buds</S.Bold> are buds that have formed but remain inactive, sometimes for years. They
                serve as a reserve that can activate if the tree loses foliage or branches.
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Annotated branch showing terminal bud at tip, lateral buds at leaf axils, and dormant buds on older wood
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Apical dominance</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Apical dominance</S.Bold> is the phenomenon where the terminal bud suppresses the growth of
              lateral buds below it. This is one of the most important concepts in bonsai branch development.
            </S.Paragraph>
            <S.Paragraph>The mechanism works through hormones:</S.Paragraph>
            <S.List>
              <S.ListItem>
                The terminal bud produces <S.Bold>auxin</S.Bold>, which flows downward through the stem
              </S.ListItem>
              <S.ListItem>High auxin concentrations inhibit lateral bud activation and growth</S.ListItem>
              <S.ListItem>
                Buds closest to the terminal bud experience the strongest inhibition; buds farther away experience less
              </S.ListItem>
              <S.ListItem>If the terminal bud is removed, auxin supply drops and lateral buds can activate</S.ListItem>
            </S.List>
            <S.Paragraph>
              The strength of apical dominance varies by species. Pines have very strong apical dominance—remove the
              terminal bud and often only the nearest lateral buds will respond. Maples have weaker apical
              dominance—multiple buds throughout the branch readily activate when the terminal is removed.
            </S.Paragraph>
            <ImagePlaceholder>
              Two-panel comparison: (1) intact terminal bud with suppressed lateral buds below, (2) terminal bud removed
              showing lateral buds activating into new shoots
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Implications for bonsai</S.SubSectionTitle>
            <S.Paragraph>
              Apical dominance explains why unpruned branches become long and leggy with few side branches. The terminal
              bud keeps extending while suppressing everything behind it. It also explains the primary technique for
              building ramification:{' '}
              <S.Bold>pinching or pruning the terminal bud forces lateral buds to activate</S.Bold>.
            </S.Paragraph>
            <S.Paragraph>Understanding apical dominance allows you to:</S.Paragraph>
            <S.List>
              <S.ListItem>Control where new branches form by selectively removing terminals</S.ListItem>
              <S.ListItem>
                Balance growth between strong and weak branches by managing how much you prune each
              </S.ListItem>
              <S.ListItem>Encourage backbudding by reducing the dominance of terminal growth</S.ListItem>
              <S.ListItem>Direct energy to specific areas of the tree</S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Internodes, Node Selection, and Branch Placement</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: section of branch showing nodes (where leaves attach) and internodes (spaces between nodes), with
            measurements indicating internode length variation
          </ImagePlaceholder>
          <S.Paragraph>
            The basic structural unit of a branch is the <S.Bold>internode</S.Bold>—the stem segment between two
            consecutive nodes. Nodes are the points where leaves attach and where lateral buds form. The length and
            arrangement of internodes fundamentally shapes branch architecture.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What determines internode length</S.SubSectionTitle>
            <S.Paragraph>
              Internode length is influenced by growing conditions at the time that segment developed:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Vigor</S.Bold>: strongly growing shoots produce longer internodes; weak growth produces shorter
                internodes
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Light</S.Bold>: shoots growing in shade elongate more (etiolation) searching for light; shoots
                in full sun tend to be more compact
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Water and nitrogen</S.Bold>: abundant water and nitrogen promote rapid, extended growth;
                restricted resources produce tighter growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Season</S.Bold>: spring growth is typically more vigorous (longer internodes) than summer growth
                (shorter internodes)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species genetics</S.Bold>: some species naturally produce long internodes; others are naturally
                compact
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Once an internode has extended, its length is fixed. You cannot shorten an existing internode—you can only
              prune above or below it. This is why controlling internode length during growth is so important for
              bonsai.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Why short internodes matter</S.SubSectionTitle>
            <S.Paragraph>Short internodes are generally desirable in bonsai for several reasons:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Compact silhouette</S.Bold>: shorter internodes mean more nodes (and potential branch points) in
                less space, allowing denser, more refined branching
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Scale</S.Bold>: long internodes make a tree look young and leggy; short internodes contribute to
                the appearance of an old, weathered tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>More pruning options</S.Bold>: more nodes mean more choices about where to cut and which buds to
                develop
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Techniques for producing shorter internodes include: pruning to reduce vigor, restricting water and
              nitrogen during growth, ensuring adequate light, and timing pruning to coincide with weaker growth
              periods.
            </S.Paragraph>
            <ImagePlaceholder>
              Side-by-side comparison: branch with long internodes (sparse, leggy appearance) vs branch with short
              internodes (compact, refined appearance)
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Node selection and branch direction</S.SubSectionTitle>
            <S.Paragraph>
              When you prune a branch, you are selecting which node—and which bud at that node—will become the new
              growing point. This decision determines the future direction of the branch.
            </S.Paragraph>
            <S.Paragraph>Key considerations for node selection:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Bud direction</S.Bold>: the bud that develops after pruning will grow in the direction it faces.
                Choose a bud pointing in the direction you want the branch to continue.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Bud strength</S.Bold>: larger, more developed buds will produce stronger growth; smaller buds
                produce weaker growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Position in the design</S.Bold>: select nodes that will produce branches filling desired spaces
                in the canopy
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Avoiding inverse taper</S.Bold>: branches that bend back toward the trunk or cross other
                branches create visual confusion; select buds that maintain outward and slightly upward movement
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Diagram showing pruning cut above a node, with arrows indicating the direction the new growth will take
              based on which bud activates
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Branch placement principles</S.SubSectionTitle>
            <S.Paragraph>
              Where branches emerge from the trunk—and where sub-branches emerge from primary branches—follows patterns
              developed through repeated node selection over time:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Alternating sides</S.Bold>: branches typically look best emerging from alternate sides of the
                trunk, not directly opposite each other (bar branches) or in the same spot (wheel branches)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>No crossing</S.Bold>: branches should not cross over the trunk or over each other when viewed
                from the front
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Decreasing size upward</S.Bold>: lower branches are typically longer and heavier; branches
                shorten toward the apex
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Horizontal to slightly drooping</S.Bold>: primary branches often look most natural growing
                horizontally or slightly downward, suggesting age and the weight of foliage
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              These principles are established through careful selection at each pruning event, building the branch
              structure node by node over years.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Ramification Explained Biologically</S.SectionTitle>
          <ImagePlaceholder>
            Progression diagram: single shoot branching into two, then four, then eight, then sixteen terminal twigs
            over successive growing seasons
          </ImagePlaceholder>
          <S.Paragraph>
            <S.Bold>Ramification</S.Bold> is the progressive division of branches into increasingly fine networks. It is
            one of the most sought-after qualities in bonsai—a tree with good ramification has a dense, detailed canopy
            that reads as aged and refined. But ramification is not merely an aesthetic goal; it is a biological process
            that must be understood to be cultivated.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>What ramification actually is</S.SubSectionTitle>
            <S.Paragraph>
              Ramification is the result of repeated branching events. Each time a growing tip is pinched or pruned,
              apical dominance is broken and lateral buds activate. Where there was one shoot, now there are two (or
              more). Repeat this process over many growing seasons, and the number of terminal twigs multiplies
              exponentially.
            </S.Paragraph>
            <S.Paragraph>The progression typically looks like this:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Year 1</S.Bold>: a primary branch extends as a single shoot
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Year 2</S.Bold>: the shoot is pruned, two lateral buds activate, creating two secondary branches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Year 3</S.Bold>: each secondary branch is pruned, each produces two tertiary branches—now there
                are four
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Year 4+</S.Bold>: the pattern continues; the branch structure becomes increasingly fine
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              This exponential branching is what creates the dense, cloud-like foliage pads seen in refined bonsai. But
              it requires patience—each branching event requires a full growing cycle, so significant ramification takes
              years to develop.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Conditions that promote ramification</S.SubSectionTitle>
            <S.Paragraph>Not all pruning leads to successful ramification. Several conditions must be met:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Tree health</S.Bold>: a stressed or weak tree may not have the energy to push multiple new
                shoots after pruning. The tree must be healthy enough to respond vigorously.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Adequate light</S.Bold>: buds in heavy shade often fail to activate or produce weak growth.
                Interior ramification requires light penetration.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Proper timing</S.Bold>: pruning at the wrong time can lead to no response, dieback, or excessive
                vigor. Timing depends on species and growth patterns.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Balanced energy</S.Bold>: if some branches are much stronger than others, the strong branches
                will ramify while weak branches die back. Energy must be distributed evenly.
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Split image: healthy ramification on a well-lit branch vs sparse, weak response on a shaded interior
              branch
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Techniques for building ramification</S.SubSectionTitle>
            <S.Paragraph>
              Different species and stages of development call for different ramification techniques:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Pinching</S.Bold>: removing soft growing tips before they harden. This is a gentle technique
                that produces compact growth and is often used on refined trees.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Pruning to a node</S.Bold>: cutting hardened growth back to a specific node to direct new
                growth. This is the primary ramification technique for most species.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Defoliation</S.Bold>: removing leaves (discussed in Chapter 6) to stimulate a second flush of
                growth with smaller leaves and additional branching points.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Thinning</S.Bold>: removing excess shoots to direct energy to remaining branches, improving
                their development.
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The key insight is that ramification is <S.Bold>cumulative</S.Bold>. Each pruning event builds on previous
              ones. A single year's work produces modest results; a decade of consistent technique produces remarkable
              refinement.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Backbudding, Dieback, and Energy Balance</S.SectionTitle>
          <ImagePlaceholder>
            Diagram: branch showing dormant buds on old wood activating after pruning (backbudding), with arrows showing
            energy redirected from removed foliage to dormant buds
          </ImagePlaceholder>
          <S.Paragraph>
            Trees are dynamic systems, constantly reallocating resources based on need and opportunity. Pruning alters
            this balance dramatically. Understanding how trees respond—through backbudding, dieback, and energy
            redistribution—is essential for effective branch development.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Backbudding</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Backbudding</S.Bold> is the activation of dormant buds on older wood—portions of a branch that
              have not produced new growth for some time. Backbudding is extremely valuable in bonsai because it allows
              you to:
            </S.Paragraph>
            <S.List>
              <S.ListItem>Shorten a branch that has become too long</S.ListItem>
              <S.ListItem>Replace a branch that has developed in an undesirable direction</S.ListItem>
              <S.ListItem>Rebuild ramification closer to the trunk</S.ListItem>
              <S.ListItem>Rejuvenate an old, leggy branch structure</S.ListItem>
            </S.List>
            <S.Paragraph>Backbudding is encouraged by:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Reducing foliage mass</S.Bold>: when you remove leaves or branches, the tree has energy that was
                supplying those structures. This energy can redirect to dormant buds.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Increasing light</S.Bold>: dormant buds in darkness rarely activate. Opening up the canopy
                allows light to reach interior buds.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Strong tree health</S.Bold>: a weak tree prioritizes survival over new growth. A vigorous tree
                has energy to spare for activating dormant buds.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Species characteristics</S.Bold>: some species backbud readily (trident maple, boxwood); others
                rarely backbud on old wood (many pines, juniper)
              </S.ListItem>
            </S.List>
            <ImagePlaceholder>
              Before/after comparison: branch pruned hard, then same branch months later with new shoots emerging from
              previously bare old wood
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Dieback</S.SubSectionTitle>
            <S.Paragraph>
              <S.Bold>Dieback</S.Bold> is the death of branch tissue, typically moving from the tips inward. Some
              dieback is normal—branches that are shaded out or no longer needed are abandoned by the tree. But
              excessive or unexpected dieback indicates a problem.
            </S.Paragraph>
            <S.Paragraph>Common causes of dieback:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Insufficient energy</S.Bold>: a branch that cannot sustain itself through photosynthesis (too
                few leaves, too little light) will be abandoned by the tree
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Root problems</S.Bold>: if roots cannot supply adequate water, peripheral branches die first
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Over-pruning</S.Bold>: removing too much foliage at once can leave the tree unable to support
                all remaining branches
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Disease or pest damage</S.Bold>: pathogens can kill branch tissue directly
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Frost damage</S.Bold>: cold can kill branch tips, especially on less hardy species
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Dieback tends to happen at the extremities first—the farthest tips of the farthest branches. This is
              because these areas are the hardest to supply with water and nutrients. When a tree is stressed, it
              sacrifices the periphery to protect the core.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Energy balance and branch vigor</S.SubSectionTitle>
            <S.Paragraph>
              Trees distribute energy unequally among branches. Vigorous branches capture more light, produce more
              sugar, and receive more resources in a self-reinforcing cycle. Weak branches fall further behind. This
              natural tendency creates problems for bonsai development because we typically want{' '}
              <S.Bold>balanced growth</S.Bold>—all branches developing at similar rates.
            </S.Paragraph>
            <S.Paragraph>Techniques for balancing energy:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Prune strong areas harder</S.Bold>: removing more foliage from strong branches reduces their
                photosynthetic capacity and redirects energy elsewhere
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Leave weak areas alone</S.Bold>: allowing weak branches to grow freely lets them build strength
                before pruning
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Position branches for equal light</S.Bold>: rotate the tree or thin the canopy so no branch is
                consistently shaded
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Prune strong areas first</S.Bold>: in multi-flush species, pruning strong growth early in the
                season redirects energy to weaker areas
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              The goal is to work against the tree's natural tendency to concentrate resources in dominant branches,
              creating a more even distribution that allows all parts of the design to develop together.
            </S.Paragraph>
            <ImagePlaceholder>
              Diagram showing energy flow in a tree: thick arrows to strong apical branches, thin arrows to weak lower
              branches, with annotation showing how pruning the apex redirects energy downward
            </ImagePlaceholder>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Refinement vs Development Stages</S.SectionTitle>
          <ImagePlaceholder>
            Two trees side by side: (1) development-stage tree with freely growing sacrifice branches and coarse
            structure, (2) refinement-stage tree with dense ramification and controlled growth
          </ImagePlaceholder>
          <S.Paragraph>
            One of the most common mistakes in bonsai is applying refinement techniques to a tree that is still in
            development—or allowing a refined tree to grow coarsely and lose years of careful work. Understanding which
            stage your tree is in, and what techniques are appropriate for each, is critical.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>The development stage</S.SubSectionTitle>
            <S.Paragraph>
              In the <S.Bold>development stage</S.Bold>, the primary goals are building trunk thickness, establishing
              primary branch structure, and creating taper and movement. The tree is not yet a finished bonsai—it is raw
              material being shaped.
            </S.Paragraph>
            <S.Paragraph>Development-stage techniques include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Allowing extended growth</S.Bold>: letting branches run to thicken the trunk and branches below
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Using sacrifice branches</S.Bold>: temporary branches allowed to grow freely to accelerate
                development (see Chapter 4)
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Minimal pruning</S.Bold>: pruning only to establish basic structure, not for ramification
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Growing in large containers or the ground</S.Bold>: unrestricted root growth supports vigorous
                top growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Heavy feeding and watering</S.Bold>: maximizing resources to maximize growth
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              During development, fine ramification is not the goal. Any ramification you build will likely be
              sacrificed later when coarse branches are removed. The priority is structural—getting the trunk and
              primary branches right.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>The refinement stage</S.SubSectionTitle>
            <S.Paragraph>
              In the <S.Bold>refinement stage</S.Bold>, the trunk and primary branches are established. The goal shifts
              to building ramification, reducing leaf size, and developing the fine detail that makes a bonsai appear
              mature.
            </S.Paragraph>
            <S.Paragraph>Refinement-stage techniques include:</S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Frequent pinching and pruning</S.Bold>: controlling growth before internodes extend, maintaining
                compact structure
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Reduced feeding</S.Bold>: limiting nitrogen to reduce vigor and leaf size
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Growing in appropriately sized containers</S.Bold>: root restriction moderates top growth
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Defoliation</S.Bold> (where appropriate): reducing leaf size and stimulating back-budding
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Careful energy balancing</S.Bold>: ensuring all branches develop evenly
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              In refinement, every cut matters. Internode length, branch direction, and bud selection all contribute to
              the cumulative effect of years of careful work.
            </S.Paragraph>
            <ImagePlaceholder>
              Close-up of refined branch pad showing multiple generations of branching: primary branch, secondary
              divisions, tertiary divisions, with foliage only at the tips
            </ImagePlaceholder>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Transitioning between stages</S.SubSectionTitle>
            <S.Paragraph>
              Trees do not remain in one stage forever. A development tree eventually transitions to refinement. And
              sometimes a refined tree must return to development—after collecting from the wild, after a major
              restyling, or after damage or neglect.
            </S.Paragraph>
            <S.Paragraph>Signs that a tree is ready for refinement:</S.Paragraph>
            <S.List>
              <S.ListItem>Trunk has adequate thickness and taper for the final design</S.ListItem>
              <S.ListItem>Primary branches are in position and appropriately sized</S.ListItem>
              <S.ListItem>The basic silhouette of the final tree is established</S.ListItem>
              <S.ListItem>The tree is healthy and vigorous enough to respond to detailed work</S.ListItem>
            </S.List>
            <S.Paragraph>Signs that a refined tree needs to return to development:</S.Paragraph>
            <S.List>
              <S.ListItem>Branches have become weak or leggy</S.ListItem>
              <S.ListItem>The tree needs significant structural changes</S.ListItem>
              <S.ListItem>Recovery from damage or disease requires rebuilding</S.ListItem>
              <S.ListItem>The tree was over-refined and has lost vigor</S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Why this distinction matters</S.SubSectionTitle>
            <S.Paragraph>
              Applying the wrong techniques at the wrong stage wastes time and can harm the tree:
            </S.Paragraph>
            <S.List>
              <S.ListItem>
                <S.Bold>Refining too early</S.Bold>: pinching and detailed pruning on a development tree keeps the trunk
                thin, branches weak, and delays structural maturity by years
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Letting a refined tree run</S.Bold>: allowing extended growth on a refined tree quickly destroys
                ramification and creates coarse branches that must be cut back, losing years of work
              </S.ListItem>
            </S.List>
            <S.Paragraph>
              Successful bonsai cultivation requires honestly assessing what stage each tree is in and applying
              appropriate techniques consistently. Many practitioners underestimate how long the development stage
              should last, rushing into refinement before the structure is truly ready.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <Divider />

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <ImagePlaceholder>
            One-page recap infographic: bud types and apical dominance concept, internode length factors, ramification
            progression over years, backbudding mechanism, and development vs refinement comparison
          </ImagePlaceholder>
          <S.Paragraph>
            Branches develop through the activation and growth of buds. <S.Bold>Apical dominance</S.Bold>—the
            suppression of lateral buds by terminal buds—explains why unpruned branches become long and sparse, and why
            pinching and pruning the tips stimulates branching below. Understanding this mechanism is the foundation of
            all branch development technique.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Internode length</S.Bold> determines the spacing of nodes and potential branch points. Short
            internodes, produced by moderate vigor and good light, create compact structure essential for refined
            bonsai. <S.Bold>Node selection</S.Bold>—choosing which bud will develop after pruning—determines branch
            direction and is the fundamental unit of design decision-making.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Ramification</S.Bold> is the progressive subdivision of branches through repeated pruning events.
            Each season's work builds on previous seasons; the cumulative effect over years creates the dense, fine
            branching that distinguishes mature bonsai. Ramification requires tree health, adequate light, proper
            timing, and balanced energy distribution.
          </S.Paragraph>
          <S.Paragraph>
            <S.Bold>Backbudding</S.Bold>—the activation of dormant buds on old wood—allows branches to be shortened and
            rejuvenated. <S.Bold>Dieback</S.Bold> occurs when branches cannot sustain themselves, typically starting at
            the periphery. Managing <S.Bold>energy balance</S.Bold> between strong and weak branches is essential for
            even development.
          </S.Paragraph>
          <S.Paragraph>
            Finally, branch strategy must match the tree's <S.Bold>stage of development</S.Bold>. Development
            techniques—extended growth, sacrifice branches, heavy feeding—build structure but destroy ramification.
            Refinement techniques—pinching, reduced feeding, detailed pruning—build ramification but limit structural
            development. Applying the right techniques at the right time is essential for efficient progress toward a
            finished bonsai.
          </S.Paragraph>
        </S.Section>

        <ChapterNavigation currentPath="chapter-5" />
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMoreChapter5;
