import {SFC} from 'types';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Create Your Own Currency</S.Title>

        <S.Introduction>
          Here you can create, mint, and distribute your own coins. You can also trade them for other coins or send them
          to your friends.
        </S.Introduction>

        <S.PlaceholderGraphic style={{height: '300px'}}>
          Graphic: Illustrated overview showing currency creation, minting coins, sending to friends, and trading on
          exchange
          <br />
          Dimensions: 800x300px
        </S.PlaceholderGraphic>

        <S.Section>
          <S.SectionTitle>What Can You Do With Your Currency?</S.SectionTitle>
          <S.Paragraph>
            Creating your own currency opens up endless possibilities. Here's what you can do once you've created your
            coins:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Create tokens</S.Bold> with a unique ticker symbol and logo
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Mint coins</S.Bold> in any quantity you choose
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Trade on the exchange</S.Bold> by listing your currency for others to buy and sell
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Send to anyone</S.Bold> instantly through the platform
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Control the supply</S.Bold> - only you can mint new coins
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
            <S.Paragraph style={{marginTop: '12px', marginBottom: 0}}>
              Choose a unique ticker symbol (like BTC or ETH), upload a logo, and add a description. Your ticker is how
              people will identify your currency across the platform.
            </S.Paragraph>
          </S.Step>

          <S.PlaceholderGraphic style={{height: '200px'}}>
            Graphic: Screenshot mockup of currency creation form with ticker, logo upload, and description fields
            <br />
            Dimensions: 600x200px
          </S.PlaceholderGraphic>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Mint Your Coins</S.StepTitle>
            <S.Paragraph style={{marginTop: '12px', marginBottom: 0}}>
              Decide how many coins you want to create. You can mint more later, but choose wisely - the total supply
              affects your currency's value. All minted coins go directly to your wallet.
            </S.Paragraph>
          </S.Step>

          <S.PlaceholderGraphic style={{height: '200px'}}>
            Graphic: Illustration of minting process with coins flowing into a wallet
            <br />
            Dimensions: 600x200px
          </S.PlaceholderGraphic>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Distribute & Trade</S.StepTitle>
            <S.Paragraph style={{marginTop: '12px', marginBottom: 0}}>Now the fun begins! You can:</S.Paragraph>
            <S.List style={{marginTop: '8px'}}>
              <S.ListItem>Send coins to friends and community members</S.ListItem>
              <S.ListItem>List your currency on the exchange for trading</S.ListItem>
              <S.ListItem>Set your own exchange rates against other currencies</S.ListItem>
              <S.ListItem>Build liquidity by encouraging others to trade</S.ListItem>
            </S.List>
          </S.Step>

          <S.PlaceholderGraphic style={{height: '250px'}}>
            Graphic: Split illustration showing coins being sent to friends on one side and trading on exchange on the
            other
            <br />
            Dimensions: 700x250px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Key Concepts</S.SectionTitle>

          <S.SubSection>
            <S.SubSectionTitle>Minting</S.SubSectionTitle>
            <S.Paragraph>
              Minting is the process of creating new coins. As the currency creator, only you can mint new coins. This
              gives you control over the total supply.
            </S.Paragraph>
          </S.SubSection>
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
              There's no hard limit, but remember: minting too many coins can decrease their value. Many successful
              currencies start with a reasonable supply and mint more only when needed.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default LearnMore;
