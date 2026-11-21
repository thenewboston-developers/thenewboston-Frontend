import {Link} from 'react-router-dom';
import {mdiBookOpenPageVariantOutline, mdiCheckCircleOutline, mdiSwapHorizontal, mdiWalletOutline} from '@mdi/js';
import MdiIcon from '@mdi/react';

import {SFC} from 'types';

import PageHeader from '../PageHeader';

import * as S from './Styles';

const GUIDE_SECTIONS = [
  {id: 'limit-orders', label: 'Limit orders'},
  {id: 'placing-an-order', label: 'Placing an order'},
  {id: 'order-matching', label: 'Order matching'},
  {id: 'trade-fills', label: 'Trades & partial fills'},
  {id: 'cancelling-orders', label: 'Cancelling orders'},
];

const LearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <PageHeader
          description="From your first limit order to your final fill. Learn how prices, matching, and reserved funds work on the exchange."
          eyebrow="The exchange, explained"
          title="A little knowledge. More confidence."
        >
          <Link to="/exchange/home">Explore markets</Link>
        </PageHeader>

        <S.Highlights aria-label="Trading essentials">
          <S.Highlight>
            <S.HighlightIcon aria-hidden="true">
              <MdiIcon path={mdiSwapHorizontal} size="24px" />
            </S.HighlightIcon>
            <div>
              <S.HighlightTitle>You set the limit</S.HighlightTitle>
              <S.HighlightDescription>Choose your price and quantity.</S.HighlightDescription>
            </div>
          </S.Highlight>
          <S.Highlight>
            <S.HighlightIcon aria-hidden="true">
              <MdiIcon path={mdiWalletOutline} size="24px" />
            </S.HighlightIcon>
            <div>
              <S.HighlightTitle>Funds stay reserved</S.HighlightTitle>
              <S.HighlightDescription>Until your order fills or you cancel.</S.HighlightDescription>
            </div>
          </S.Highlight>
          <S.Highlight>
            <S.HighlightIcon aria-hidden="true">
              <MdiIcon path={mdiCheckCircleOutline} size="24px" />
            </S.HighlightIcon>
            <div>
              <S.HighlightTitle>Matching is automatic</S.HighlightTitle>
              <S.HighlightDescription>Compatible orders become trades.</S.HighlightDescription>
            </div>
          </S.Highlight>
        </S.Highlights>

        <S.GuideLayout>
          <S.ContentsNavigation aria-label="Exchange guide sections">
            <S.ContentsTitle>
              <MdiIcon aria-hidden="true" path={mdiBookOpenPageVariantOutline} size="20px" />
              In this guide
            </S.ContentsTitle>
            <S.ContentsLinks>
              {GUIDE_SECTIONS.map(({id, label}) => (
                <S.ContentsLink href={`#${id}`} key={id}>
                  {label}
                </S.ContentsLink>
              ))}
            </S.ContentsLinks>
            <S.ContentsNote>New to trading? Start with limit orders and work your way down.</S.ContentsNote>
          </S.ContentsNavigation>

          <S.Sections>
            <S.Section aria-labelledby="limit-orders-heading" id="limit-orders">
              <S.SectionLabel>The basics</S.SectionLabel>
              <S.SectionTitle id="limit-orders-heading">Your price. Your limit.</S.SectionTitle>
              <S.Paragraph>
                The exchange uses <S.Bold>limit orders</S.Bold>. You choose how many coins to buy or sell and the price
                you are willing to accept.
              </S.Paragraph>
              <S.ExampleGrid>
                <S.ExampleCard>
                  <S.ExampleLabel $side="buy">Buy limit</S.ExampleLabel>
                  <S.SubSectionTitle>The most you will pay</S.SubSectionTitle>
                  <S.Paragraph>A buy order sets the highest price you are willing to pay for each coin.</S.Paragraph>
                </S.ExampleCard>
                <S.ExampleCard>
                  <S.ExampleLabel $side="sell">Sell limit</S.ExampleLabel>
                  <S.SubSectionTitle>The least you will accept</S.SubSectionTitle>
                  <S.Paragraph>A sell order sets the lowest price you are willing to accept for each coin.</S.Paragraph>
                </S.ExampleCard>
              </S.ExampleGrid>
            </S.Section>

            <S.Section aria-labelledby="placing-an-order-heading" id="placing-an-order">
              <S.SectionLabel>Make your move</S.SectionLabel>
              <S.SectionTitle id="placing-an-order-heading">Placing an order</S.SectionTitle>
              <S.Paragraph>
                Choose a market, enter your price and quantity, then place your buy or sell order.
              </S.Paragraph>
              <S.ExampleGrid>
                <S.ExampleCard>
                  <S.ExampleLabel $side="buy">Buy example</S.ExampleLabel>
                  <S.ExampleAmount>100 ABC</S.ExampleAmount>
                  <S.ExamplePrice>at a limit of 10 TNB per coin</S.ExamplePrice>
                  <S.Paragraph>
                    You are willing to buy 100 ABC coins for <S.Bold>no more than 10 TNB each</S.Bold>. Your TNB is
                    reserved so it is available when the order matches.
                  </S.Paragraph>
                </S.ExampleCard>
                <S.ExampleCard>
                  <S.ExampleLabel $side="sell">Sell example</S.ExampleLabel>
                  <S.ExampleAmount>50 XYZ</S.ExampleAmount>
                  <S.ExamplePrice>at a limit of 20 TNB per coin</S.ExamplePrice>
                  <S.Paragraph>
                    You are offering 50 XYZ coins for <S.Bold>no less than 20 TNB each</S.Bold>. Those coins are
                    reserved from your wallet until the order fills or you cancel.
                  </S.Paragraph>
                </S.ExampleCard>
              </S.ExampleGrid>
              <S.Callout>
                <MdiIcon aria-hidden="true" path={mdiWalletOutline} size="24px" />
                <S.CalloutText>
                  <S.Bold>Reserved means temporarily locked.</S.Bold> Funds or coins committed to an open order are
                  unavailable for other use.
                </S.CalloutText>
              </S.Callout>
            </S.Section>

            <S.Section aria-labelledby="order-matching-heading" id="order-matching">
              <S.SectionLabel>Behind the scenes</S.SectionLabel>
              <S.SectionTitle id="order-matching-heading">When orders meet</S.SectionTitle>
              <S.Paragraph>
                Matching happens automatically whenever a compatible order exists in the order book.
              </S.Paragraph>
              <S.List>
                <S.ListItem>
                  <S.Bold>Buy orders</S.Bold> match sell orders at the same or a lower price.
                </S.ListItem>
                <S.ListItem>
                  <S.Bold>Sell orders</S.Bold> match buy orders at the same or a higher price.
                </S.ListItem>
                <S.ListItem>
                  At the same price, orders match <S.Bold>first come, first served</S.Bold> (FIFO).
                </S.ListItem>
              </S.List>
              <S.MatchExample aria-label="Example of compatible orders">
                <S.MatchDetail>
                  <S.MatchLabel>Your buy limit</S.MatchLabel>
                  <S.MatchValue>12 TNB</S.MatchValue>
                  <S.MatchCaption>100 ABC coins</S.MatchCaption>
                </S.MatchDetail>
                <S.MatchIcon aria-hidden="true">
                  <MdiIcon path={mdiSwapHorizontal} size="28px" />
                </S.MatchIcon>
                <S.MatchDetail>
                  <S.MatchLabel>Existing sell order</S.MatchLabel>
                  <S.MatchValue>10 TNB</S.MatchValue>
                  <S.MatchCaption>100 ABC coins</S.MatchCaption>
                </S.MatchDetail>
              </S.MatchExample>
              <S.Paragraph>
                These orders match immediately: the buyer is willing to pay at least the seller's asking price.
              </S.Paragraph>
            </S.Section>

            <S.Section aria-labelledby="trade-fills-heading" id="trade-fills">
              <S.SectionLabel>From order to trade</S.SectionLabel>
              <S.SectionTitle id="trade-fills-heading">Understanding your fills</S.SectionTitle>
              <S.Paragraph>
                A matched trade is called a <S.Bold>fill</S.Bold>. On this exchange, the trade executes at the lower
                price of the two matched orders.
              </S.Paragraph>
              <S.List>
                <S.ListItem>
                  In the example above, the trade executes at <S.Bold>10 TNB per coin</S.Bold>.
                </S.ListItem>
                <S.ListItem>The buyer receives 100 ABC coins, and the seller receives the funds in TNB.</S.ListItem>
                <S.ListItem>
                  The difference between the buyer's 12 TNB limit and the 10 TNB execution price is refunded to the
                  buyer's wallet.
                </S.ListItem>
              </S.List>
              <S.SubSection>
                <S.SubSectionTitle>What if only part of my order matches?</S.SubSectionTitle>
                <S.Paragraph>
                  If you want 100 ABC coins but only 50 are available at your limit price or better, you receive those
                  50 coins immediately. The remaining 50 stay in the order book until filled or cancelled.
                </S.Paragraph>
                <S.Callout>
                  <MdiIcon aria-hidden="true" path={mdiWalletOutline} size="24px" />
                  <S.CalloutText>Funds for the unfilled portion stay reserved while the order is open.</S.CalloutText>
                </S.Callout>
              </S.SubSection>
            </S.Section>

            <S.Section aria-labelledby="cancelling-orders-heading" id="cancelling-orders">
              <S.SectionLabel>Stay in control</S.SectionLabel>
              <S.SectionTitle id="cancelling-orders-heading">Changed your mind?</S.SectionTitle>
              <S.Paragraph>
                You can cancel any open or partially filled order from the <S.Bold>Orders</S.Bold> page. Reserved funds
                or coins for the unfilled portion are returned to your wallet immediately.
              </S.Paragraph>
              <S.Footer>
                <S.FooterText>Ready to take a look around?</S.FooterText>
                <S.MarketLink to="/exchange/home">Browse markets</S.MarketLink>
              </S.Footer>
            </S.Section>
          </S.Sections>
        </S.GuideLayout>
      </S.Content>
    </S.Container>
  );
};

export default LearnMore;
