import * as S from 'components/LearnMore';
import {SFC} from 'types';

const BonsaiLearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Explore the Bonsai Collection</S.Title>

        <S.Introduction>
          Each bonsai in our nursery is photographed, documented, and paired with practical care notes so you can
          appreciate every branch without visiting the greenhouse. Here is how we curate and share every specimen.
        </S.Introduction>

        <S.Image
          alt="Bonsai caretaker preparing a specimen for display"
          src="https://placehold.co/640x360/png?text=Bonsai+Showcase+1"
        />

        <S.Section>
          <S.SectionTitle>What We Provide</S.SectionTitle>
          <S.Paragraph>
            The Bonsai section mirrors the currencies experience: consistent layout, high-resolution media, and tidy
            metadata blocks. When you browse each card, you can expect:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Story-driven captions</S.Bold> describing provenance, styling choices, and seasonal highlights
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Responsive galleries</S.Bold> with thumbnails and full-screen previews for every angle
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Care facts</S.Bold> that summarize watering cadence, styling, and vessel information
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How It Works</S.SectionTitle>
          <S.Paragraph>We follow the same simple cadence for each bonsai we publish:</S.Paragraph>

          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>Document the Bonsai</S.StepTitle>
            <S.StepParagraph>
              We capture large hero images, macro shots of bark and foliage, and note the overall style, species, and
              age so the card mirrors an in-person inspection.
            </S.StepParagraph>
          </S.Step>

          <S.Image
            alt="Photographing bonsai under studio lights"
            src="https://placehold.co/640x360/png?text=Bonsai+Showcase+2"
          />

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Share Care Details</S.StepTitle>
            <S.StepParagraph>
              Each listing includes easy-to-read bullet points covering watering cadence, soil mix, preferred light, and
              any seasonal styling milestones to watch.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Publish & Highlight</S.StepTitle>
            <S.StepParagraph>Once images are ready we:</S.StepParagraph>
            <S.StepList>
              <S.ListItem>Publish the bonsai in the gallery with consistent card styling</S.ListItem>
              <S.ListItem>Showcase the carousel on desktop with the familiar thumbnail rail</S.ListItem>
              <S.ListItem>Enable the same full-screen lightbox interaction used throughout the app</S.ListItem>
            </S.StepList>
          </S.Step>

          <S.Image
            alt="Bonsai being showcased in a digital gallery"
            src="https://placehold.co/640x360/png?text=Bonsai+Showcase+3"
          />
        </S.Section>

        <S.Section>
          <S.SectionTitle>Frequently Asked Questions</S.SectionTitle>
          <S.SubSection>
            <S.SubSectionTitle>Can I request more photos?</S.SubSectionTitle>
            <S.Paragraph>
              Absolutely. Each bonsai entry has a fixed set of placeholder images today, but we plan to add multi-angle
              uploads plus short videos. For now, reach out through the support form with any specific angles you would
              like to see.
            </S.Paragraph>
          </S.SubSection>
          <S.SubSection>
            <S.SubSectionTitle>Will these bonsai be for sale?</S.SubSectionTitle>
            <S.Paragraph>
              The first release focuses on layout polish and storytelling. Pricing, reservation CTAs, and shipping
              details will arrive in the next milestone once we wire it into the marketplace flow.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMore;
