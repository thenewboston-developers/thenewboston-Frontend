import {MAX_MINT_AMOUNT} from 'constants/general';
import {SFC} from 'types';
import {formatNumber} from 'utils/numbers';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Create Your Own Currency</S.Title>

        <S.Introduction>
          Here you can create your own currency, mint coins, and distribute them. You can also trade your coins for
          other currencies or send them to your friends.
        </S.Introduction>

        <S.PlaceholderGraphic $height="300px">
          Graphic: Illustrated overview showing currency creation, minting coins, sending to friends, and trading on
          exchange
          <br />
          Dimensions: 800x300px
        </S.PlaceholderGraphic>

        <S.Section>
          <S.SectionTitle>What Can You Do With Your Currency?</S.SectionTitle>
          <S.Paragraph>
            Creating your own currency opens up endless possibilities. Here's what you can do once you've created your
            currency:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Mint coins</S.Bold> in any quantity you choose
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Trade your coins</S.Bold> for other currencies on the exchange
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Send coins</S.Bold> instantly to anyone on the platform
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How It Works</S.SectionTitle>
          <S.Paragraph>
            Creating and using your own currency is as easy as 1-2-3. Follow these simple steps to get started:
          </S.Paragraph>

          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>Create Your Currency</S.StepTitle>
            <S.StepParagraph>
              Choose a unique ticker symbol, upload a logo, and add a description. Your ticker is how people will
              identify your currency across the platform.
            </S.StepParagraph>
          </S.Step>

          <S.PlaceholderGraphic $height="200px">
            Graphic: Screenshot mockup of currency creation form with ticker, logo upload, and description fields
            <br />
            Dimensions: 600x200px
          </S.PlaceholderGraphic>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Mint Your Coins</S.StepTitle>
            <S.StepParagraph>
              Decide how many coins you want to create. You can mint more later. All minted coins go directly to your
              wallet.
            </S.StepParagraph>
          </S.Step>

          <S.PlaceholderGraphic $height="200px">
            Graphic: Illustration of minting process with coins flowing into a wallet
            <br />
            Dimensions: 600x200px
          </S.PlaceholderGraphic>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Distribute & Trade</S.StepTitle>
            <S.StepParagraph>Now the fun begins! You can:</S.StepParagraph>
            <S.StepList>
              <S.ListItem>Send coins to friends and community members</S.ListItem>
              <S.ListItem>Trade your coins for other currencies on the exchange</S.ListItem>
              <S.ListItem>Watch as others buy and sell your coins</S.ListItem>
            </S.StepList>
          </S.Step>

          <S.PlaceholderGraphic $height="250px">
            Graphic: Split illustration showing coins being sent to friends on one side and trading on exchange on the
            other
            <br />
            Dimensions: 700x250px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Frequently Asked Questions</S.SectionTitle>

          <S.SubSection>
            <S.SubSectionTitle>Can I change my currency details later?</S.SubSectionTitle>
            <S.Paragraph>
              You can update your currency's description and logo anytime. However, the ticker symbol is permanent and
              cannot be changed once created.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Is there a limit to how many coins I can mint?</S.SubSectionTitle>
            <S.Paragraph>
              The maximum total supply for any currency is {formatNumber(MAX_MINT_AMOUNT)} coins. Once you've minted
              this amount, you cannot mint any more coins for that currency.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default LearnMore;
