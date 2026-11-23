import {Link} from 'react-router-dom';
import {mdiChevronDown, mdiCircleMultipleOutline, mdiSendOutline, mdiSwapHorizontal} from '@mdi/js';
import MdiIcon from '@mdi/react';

import PageHeader from 'components/PageHeader';
import {MAX_MINT_AMOUNT} from 'constants/general';
import {useRequireAuthentication, useToggle} from 'hooks';
import CurrencyModal from 'modals/CurrencyModal';
import {SFC} from 'types';
import {formatNumber} from 'utils/numbers';

import coinsBeingSent from './assets/coins-being-sent.png';
import coinsFlowingIntoWallet from './assets/coins-flowing-into-wallet.png';
import currencyCreation from './assets/currency-creation.png';
import sendingCoinsToFriend from './assets/sending-coins-to-friend.png';
import * as S from './Styles';

const MAX_MINT_AMOUNT_TEXT = formatNumber(MAX_MINT_AMOUNT);

const FEATURES = [
  {
    description: `Create up to ${MAX_MINT_AMOUNT_TEXT} coins, all at once or a little at a time.`,
    icon: mdiCircleMultipleOutline,
    title: 'Mint coins',
  },
  {
    description: 'Every currency gets its own market against TNB on the exchange.',
    icon: mdiSwapHorizontal,
    title: 'Trade on the exchange',
  },
  {
    description: 'Send coins instantly to anyone on the platform.',
    icon: mdiSendOutline,
    title: 'Send to anyone',
  },
];

const QUESTIONS = [
  {
    answer:
      "You can update your currency's description, logo, and social links anytime. However, the ticker symbol is permanent and cannot be changed once created.",
    question: 'Can I change my currency details later?',
  },
  {
    answer: `Each currency can have up to ${MAX_MINT_AMOUNT_TEXT} coins in total. You can mint them all at once or in smaller batches over time.`,
    question: 'How many coins can I mint?',
  },
  {
    answer: 'Straight to your wallet. From there you can send them to other members or sell them on the exchange.',
    question: 'Where do newly minted coins go?',
  },
  {
    answer:
      'A ticker is up to 5 uppercase letters and must be unique, so pick something short and memorable. Logos must be exactly 512 x 512 pixels.',
    question: 'What do I need for a ticker and a logo?',
  },
  {
    answer:
      "Yes. As the owner you can add a whitepaper to your currency's page to explain its purpose and plans, and you can edit or delete it whenever you like.",
    question: 'Can I publish a whitepaper?',
  },
];

const STEPS = [
  {
    description:
      'Choose a unique ticker symbol, upload a logo, and add a description. Your ticker is how people will identify your currency across the platform.',
    illustration: currencyCreation,
    illustrationAlt: 'Currency creation form with ticker, logo upload, and description fields',
    items: [
      'A ticker of up to 5 uppercase letters',
      'A 512 x 512 pixel logo',
      'An optional description of up to 500 characters',
    ],
    title: 'Create your currency',
  },
  {
    description:
      'Decide how many coins you want to create. You can mint more later. All minted coins go directly to your wallet.',
    illustration: coinsFlowingIntoWallet,
    illustrationAlt: 'Minting process with coins flowing into a wallet',
    items: [],
    title: 'Mint your coins',
  },
  {
    description: 'Now the fun begins! You can:',
    illustration: coinsBeingSent,
    illustrationAlt: 'Coins being sent to friends and trading on exchange',
    items: [
      'Send coins to friends and community members',
      'Trade your coins for other currencies on the exchange',
      'Watch as others buy and sell your coins',
    ],
    title: 'Distribute & trade',
  },
];

const LearnMore: SFC = ({className}) => {
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);
  const requireAuthentication = useRequireAuthentication();

  const handleCreateCurrencyClick = () => {
    if (!requireAuthentication('create your own currency')) return;
    toggleCurrencyModal();
  };

  const renderFeatures = () => {
    return FEATURES.map(({description, icon, title}) => (
      <S.Feature key={title}>
        <S.FeatureIcon aria-hidden="true">
          <MdiIcon path={icon} size="24px" />
        </S.FeatureIcon>
        <div>
          <S.FeatureTitle>{title}</S.FeatureTitle>
          <S.FeatureDescription>{description}</S.FeatureDescription>
        </div>
      </S.Feature>
    ));
  };

  const renderQuestions = () => {
    return QUESTIONS.map(({answer, question}, index) => (
      <S.Question key={question} open={index === 0}>
        <S.QuestionSummary>
          {question}
          <S.QuestionIcon aria-hidden="true" path={mdiChevronDown} size="22px" />
        </S.QuestionSummary>
        <S.Answer>{answer}</S.Answer>
      </S.Question>
    ));
  };

  const renderSteps = () => {
    return STEPS.map(({description, illustration, illustrationAlt, items, title}, index) => (
      <S.Step $isReversed={index % 2 === 1} key={title}>
        <S.StepCopy>
          <S.StepNumber>Step {index + 1}</S.StepNumber>
          <S.StepTitle>{title}</S.StepTitle>
          <S.Paragraph>{description}</S.Paragraph>
          {items.length > 0 && (
            <S.List>
              {items.map((item) => (
                <S.ListItem key={item}>{item}</S.ListItem>
              ))}
            </S.List>
          )}
        </S.StepCopy>
        <S.Illustration alt={illustrationAlt} src={illustration} />
      </S.Step>
    ));
  };

  return (
    <>
      <S.Container className={className}>
        <S.Content>
          <PageHeader
            description="Launch a coin for your community, your project, or your next big idea. Mint it, share it with friends, and trade it on the exchange."
            eyebrow="Currencies, explained"
            title="Create your own currency."
          >
            <Link to="/currencies/home">Browse currencies</Link>
          </PageHeader>

          <S.Intro aria-labelledby="possibilities-heading">
            <S.IntroCopy>
              <S.SectionLabel>The possibilities</S.SectionLabel>
              <S.SectionTitle id="possibilities-heading">What can you do with your currency?</S.SectionTitle>
              <S.Paragraph>
                Creating your own currency opens up endless possibilities. Here's what you can do once you've created
                yours:
              </S.Paragraph>
              <S.Features>{renderFeatures()}</S.Features>
            </S.IntroCopy>
            <S.Illustration
              alt="Currency creation, minting coins, sending to friends, and trading"
              src={sendingCoinsToFriend}
            />
          </S.Intro>

          <S.Section aria-labelledby="how-it-works-heading">
            <S.SectionHeading>
              <S.SectionLabel>How it works</S.SectionLabel>
              <S.SectionTitle id="how-it-works-heading">As easy as 1-2-3.</S.SectionTitle>
              <S.Paragraph>Follow these simple steps to create and use your own currency.</S.Paragraph>
            </S.SectionHeading>
            <S.Steps>{renderSteps()}</S.Steps>
          </S.Section>

          <S.Faq aria-labelledby="questions-heading">
            <S.FaqCopy>
              <S.SectionLabel>Good to know</S.SectionLabel>
              <S.SectionTitle id="questions-heading">Frequently asked questions</S.SectionTitle>
              <S.Paragraph>The details worth knowing before you launch.</S.Paragraph>
            </S.FaqCopy>
            <S.Questions>{renderQuestions()}</S.Questions>
          </S.Faq>

          <S.CallToAction>
            <S.CallToActionCopy>
              <S.CallToActionTitle>Ready to launch your currency?</S.CallToActionTitle>
              <S.CallToActionDescription>All it takes is a ticker, a logo, and a minute.</S.CallToActionDescription>
            </S.CallToActionCopy>
            <S.CallToActionButton onClick={handleCreateCurrencyClick} type="button">
              Create Currency
            </S.CallToActionButton>
          </S.CallToAction>
        </S.Content>
      </S.Container>
      {currencyModalIsOpen ? <CurrencyModal close={toggleCurrencyModal} /> : null}
    </>
  );
};

export default LearnMore;
