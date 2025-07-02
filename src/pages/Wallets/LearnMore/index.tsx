import {SFC} from 'types';

import depositProcess from './assets/deposit-process.png';
import internalVsExternal from './assets/internal-vs-external.png';
import walletCreation from './assets/wallet-creation.png';
import walletOverview from './assets/wallet-overview.png';
import walletTabs from './assets/wallet-tabs.png';
import withdrawalProcess from './assets/withdrawal-process.png';
import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Understanding Wallets</S.Title>

        <S.Introduction>
          This guide explains how wallets work, how to manage your coins, and how to connect with external currency
          networks for deposits and withdrawals.
        </S.Introduction>

        <S.Image
          alt="Overview illustration showing wallets, coin transfers between users, and connections to external cores"
          src={walletOverview}
        />

        <S.Section>
          <S.SectionTitle>What Are Wallets?</S.SectionTitle>
          <S.Paragraph>
            Wallets are your personal coin storage on thenewboston.net. Each wallet holds coins for a specific currency,
            and you can have one wallet per currency. Wallets enable you to:
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Manage your coin balances</S.Bold> across different currencies
            </S.ListItem>
            <S.ListItem>
              <S.Bold>View your transfer history</S.Bold> for all incoming and outgoing transactions
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Connect to external cores</S.Bold> for deposits and withdrawals
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Track coins earned</S.Bold> from posts and comments
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Wallets Are Created</S.SectionTitle>
          <S.Paragraph>There are two ways wallets are created:</S.Paragraph>

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

          <S.Image
            alt="Split illustration showing manual wallet creation on the left and automatic creation when receiving coins on the right"
            src={walletCreation}
          />
        </S.Section>

        <S.Section>
          <S.SectionTitle>Understanding Your Wallet Tabs</S.SectionTitle>
          <S.Paragraph>Each wallet has three tabs to help you manage and track your coins:</S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Transfers Tab</S.SubSectionTitle>
            <S.Paragraph>
              Shows all coins sent and received within thenewboston.net. This includes payments for paid posts, tips on
              comments, and direct transfers between users.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Deposit Tab</S.SubSectionTitle>
            <S.Paragraph>
              For external currencies only. Shows your deposit account QR code, balance, and deposit history. Your
              deposit account is like a personal mailbox on the external core - coins wait there until you transfer them
              into your main wallet on thenewboston.net.
            </S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Withdraw Tab</S.SubSectionTitle>
            <S.Paragraph>
              For external currencies only. Allows you to send coins to external core accounts and view your withdrawal
              history.
            </S.Paragraph>
          </S.SubSection>

          <S.Image
            alt="Visual showing the three tabs with example content - transfers showing posts/comments, deposit showing QR code, withdraw showing form"
            src={walletTabs}
          />
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

          <S.Image
            alt="Comparison diagram showing internal currency transactions within the platform vs external currency connections to core servers"
            src={internalVsExternal}
          />
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Deposits Work</S.SectionTitle>
          <S.Paragraph>
            When you create a wallet for an external currency, we automatically generate a unique deposit account for
            you on that currency's core server. This deposit account is where you'll send coins from external
            applications like tnbOS.
          </S.Paragraph>

          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>Send Coins to Your Deposit Account</S.StepTitle>
            <S.StepParagraph>
              Using software like tnbOS or other compatible applications, send coins to your deposit account number.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Verify and Transfer</S.StepTitle>
            <S.StepParagraph>
              When you click deposit, thenewboston.net checks your deposit account balance on the core. If coins are
              available, they're transferred to thenewboston.net's main account.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Credit Your Wallet</S.StepTitle>
            <S.StepParagraph>
              Your wallet balance updates instantly with the deposited amount minus the 1 coin fee. thenewboston.net
              acts as a custodian for these coins - your wallet balance represents a credit that you can use within the
              platform or withdraw later.
            </S.StepParagraph>
          </S.Step>

          <S.Image
            alt="Animated-style flow diagram showing coins moving from external core through deposit process into user's wallet"
            src={depositProcess}
          />
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Withdrawals Work</S.SectionTitle>
          <S.Paragraph>
            Withdrawing sends coins from your thenewboston.net wallet back to an external core account:
          </S.Paragraph>

          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>Enter Recipient Account</S.StepTitle>
            <S.StepParagraph>
              Provide the recipient's account number on the external core and the amount you want to send.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>Process the Withdrawal</S.StepTitle>
            <S.StepParagraph>
              thenewboston.net sends a request to the core server to transfer coins from its account to the recipient's
              account.
            </S.StepParagraph>
          </S.Step>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>Transaction Complete</S.StepTitle>
            <S.StepParagraph>
              Your wallet balance updates, and the recipient receives coins on the external core minus the 1 coin fee. A
              transaction record is saved in your withdrawal history.
            </S.StepParagraph>
          </S.Step>

          <S.Image
            alt="Flow diagram showing withdrawal process from wallet through thenewboston.net to external recipient on core"
            src={withdrawalProcess}
          />
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
            <S.SubSectionTitle>Are there fees?</S.SubSectionTitle>
            <S.Paragraph>Internal transfers are free. External deposits and withdrawals have a 1 coin fee.</S.Paragraph>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>How fast are transactions?</S.SubSectionTitle>
            <S.Paragraph>
              Internal transfers are instant. External deposits and withdrawals typically complete within seconds,
              depending on the core server's response time.
            </S.Paragraph>
          </S.SubSection>
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default LearnMore;
