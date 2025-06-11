import {SFC} from 'types';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Your Digital Wallet Guide</S.Title>

        <S.Introduction>
          Welcome to your digital wallet hub! This guide will help you understand how wallets work, how to send and
          receive coins, and how to connect with external currency networks.
        </S.Introduction>

        <S.PlaceholderGraphic $height="300px">
          Graphic: Overview illustration showing wallets, coin transfers between users, and connections to external
          cores
          <br />
          Dimensions: 800x300px
        </S.PlaceholderGraphic>

        <S.Section>
          <S.SectionTitle>What Are Wallets?</S.SectionTitle>
          <S.Paragraph>
            Wallets are your personal coin storage on thenewboston.net. Think of them like digital piggy banks - each
            wallet holds coins for a specific currency. You can have multiple wallets for different currencies, allowing
            you to:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Store coins</S.Bold> safely in your account
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Send coins</S.Bold> to friends instantly
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Receive coins</S.Bold> from other users
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Trade coins</S.Bold> on the exchange
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Wallets Are Created</S.SectionTitle>
          <S.Paragraph>There are two ways wallets come to life:</S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Manual Creation</S.SubSectionTitle>
            <S.Paragraph>
              You can create a wallet anytime by clicking the "Create Wallet" button. Just select the currency you want
              to store, and your wallet is ready instantly!
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Automatic Creation</S.SubSectionTitle>
            <S.Paragraph>
              When someone sends you coins in a currency you don't have a wallet for yet, we automatically create one
              for you. This means you'll never miss receiving coins!
            </S.Paragraph>
          </S.SubSection>

          <S.PlaceholderGraphic $height="200px">
            Graphic: Split illustration showing manual wallet creation on the left and automatic creation when receiving
            coins on the right
            <br />
            Dimensions: 700x200px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Understanding Transfers</S.SectionTitle>
          <S.Paragraph>
            The transfers section is your transaction history. It shows every coin movement in and out of your wallet:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Coins received</S.Bold> from posts, comments, or direct sends
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Coins sent</S.Bold> to other users or through posts
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Exchange trades</S.Bold> when you buy or sell currencies
            </S.ListItem>
          </S.List>

          <S.PlaceholderGraphic $height="250px">
            Graphic: Mock transfer history showing different types of transactions with icons for posts, comments, and
            direct transfers
            <br />
            Dimensions: 600x250px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Internal vs External Currencies</S.SectionTitle>
          <S.Paragraph>Not all currencies are created equal! Here's the difference:</S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Internal Currencies</S.SubSectionTitle>
            <S.Paragraph>
              These currencies exist only within thenewboston.net. They're perfect for community transactions, tipping,
              and trading. Transfers are instant and free!
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>External Currencies</S.SubSectionTitle>
            <S.Paragraph>
              These special currencies connect to external core servers - independent digital currency networks. With
              external currencies, you can deposit coins from outside thenewboston.net and withdraw them to external
              wallets.
            </S.Paragraph>
          </S.SubSection>

          <S.PlaceholderGraphic $height="200px">
            Graphic: Comparison diagram showing internal currency transactions within the platform vs external currency
            connections to core servers
            <br />
            Dimensions: 700x200px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Deposits Work</S.SectionTitle>
          <S.Paragraph>
            Depositing brings coins from an external core into your thenewboston.net wallet. Here's how it works:
          </S.Paragraph>

          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>Check Your Core Balance</S.StepTitle>
            <S.StepParagraph>
              We check how many coins you have on the external core server. You need enough to cover your deposit plus a
              small transaction fee.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Authorize the Transfer</S.StepTitle>
            <S.StepParagraph>
              Using secure cryptographic signatures, we transfer coins from your core account to thenewboston.net's
              account on the core.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Receive Your Coins</S.StepTitle>
            <S.StepParagraph>
              Your wallet balance updates instantly! Now you can trade on the exchange or send coins to friends.
            </S.StepParagraph>
          </S.Step>

          <S.PlaceholderGraphic $height="250px">
            Graphic: Animated-style flow diagram showing coins moving from external core through deposit process into
            user's wallet
            <br />
            Dimensions: 700x250px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Withdrawals Work</S.SectionTitle>
          <S.Paragraph>
            Withdrawing sends coins from your thenewboston.net wallet back to an external core account:
          </S.Paragraph>

          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>Enter Recipient Details</S.StepTitle>
            <S.StepParagraph>
              Provide the account number where you want to send coins and the amount. Make sure you have enough balance!
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Confirm the Transaction</S.StepTitle>
            <S.StepParagraph>
              We send a secure request to the core server to transfer coins from thenewboston.net's account to your
              chosen recipient.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Transaction Complete</S.StepTitle>
            <S.StepParagraph>
              Your wallet balance updates, and the recipient receives coins on the external core. A transaction record
              is saved in your transfer history.
            </S.StepParagraph>
          </S.Step>

          <S.PlaceholderGraphic $height="250px">
            Graphic: Flow diagram showing withdrawal process from wallet through thenewboston.net to external recipient
            on core
            <br />
            Dimensions: 700x250px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>What Can You Do With Your Coins?</S.SectionTitle>
          <S.Paragraph>Once coins are in your wallet, the possibilities are endless:</S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Trade on the Exchange</S.SubSectionTitle>
            <S.Paragraph>
              Visit the exchange to buy and sell different currencies. Set your own prices and watch the market move!
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Send to Friends</S.SubSectionTitle>
            <S.Paragraph>
              Transfer coins instantly to anyone on the platform. Perfect for splitting bills, gifts, or just being
              generous!
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Support Content Creators</S.SubSectionTitle>
            <S.Paragraph>
              Use coins to tip great posts and comments. It's a fun way to show appreciation and support the community!
            </S.Paragraph>
          </S.SubSection>

          <S.PlaceholderGraphic $height="200px">
            Graphic: Three icons showing exchange trading, sending to friends, and tipping content
            <br />
            Dimensions: 600x200px
          </S.PlaceholderGraphic>
        </S.Section>

        <S.Section>
          <S.SectionTitle>External Resources</S.SectionTitle>
          <S.Paragraph>Want to dive deeper into the world of digital currencies and cores?</S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Core Source Code</S.SubSectionTitle>
            <S.Paragraph>
              Explore how core servers work:{' '}
              <S.ExternalLink
                href="https://github.com/thenewboston-developers/Core"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/thenewboston-developers/Core
              </S.ExternalLink>
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Desktop Application</S.SubSectionTitle>
            <S.Paragraph>
              Use tnbOS to connect directly to cores and manage your external wallets:{' '}
              <S.ExternalLink
                href="https://github.com/thenewboston-developers/tnbOS"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/thenewboston-developers/tnbOS
              </S.ExternalLink>
            </S.Paragraph>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Frequently Asked Questions</S.SectionTitle>

          <S.SubSection>
            <S.SubSectionTitle>Are there fees for transfers?</S.SubSectionTitle>
            <S.Paragraph>
              Internal transfers between thenewboston.net users are always free! External deposits and withdrawals
              include small transaction fees required by the core network.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>How fast are transactions?</S.SubSectionTitle>
            <S.Paragraph>
              Internal transfers are instant. External deposits and withdrawals typically complete within seconds,
              depending on the core server's response time.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Can I delete a wallet?</S.SubSectionTitle>
            <S.Paragraph>
              Wallets with zero balance are hidden automatically. If you receive coins for that currency later, the
              wallet will reappear with your new balance.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>What's a deposit account?</S.SubSectionTitle>
            <S.Paragraph>
              Your deposit account is your unique account number on an external core server. It's like your mailing
              address for receiving coins from outside thenewboston.net.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default LearnMore;
