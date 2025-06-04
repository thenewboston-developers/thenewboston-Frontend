import {SFC} from 'types';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Trading Guide: Orders, Matching, and Fills</S.Title>

        <S.Introduction>
          Welcome to our trading platform! This guide explains how placing orders, the matching process, and trade
          execution work.
        </S.Introduction>

        <S.Section>
          <S.SectionTitle>Types of Orders</S.SectionTitle>
          <S.Paragraph>
            When trading on our platform, you'll use <S.Bold>limit orders</S.Bold>. Limit orders let you specify exactly
            the price at which you want to buy or sell an asset.
          </S.Paragraph>
          <S.List>
            <S.ListItem>
              <S.Bold>Buy Limit Order:</S.Bold> Specify the highest price you're willing to pay for an asset.
            </S.ListItem>
            <S.ListItem>
              <S.Bold>Sell Limit Order:</S.Bold> Specify the lowest price you're willing to accept when selling an
              asset.
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Placing an Order</S.SectionTitle>

          <S.SubSection>
            <S.SubSectionTitle>Buy Order Example:</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                You place a Buy Limit Order for <S.Bold>100 ABC coins at 10 TNB each</S.Bold>.
              </S.ListItem>
              <S.ListItem>
                This order means you're willing to buy 100 ABC coins but <S.Bold>no more expensive</S.Bold> than 10 TNB
                each.
              </S.ListItem>
              <S.ListItem>
                Your funds (TNB) are immediately <S.Bold>reserved</S.Bold>, meaning temporarily locked and unavailable
                for other use, ensuring they remain available if the order is matched.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Sell Order Example:</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                You place a Sell Limit Order for <S.Bold>50 XYZ coins at 20 TNB each</S.Bold>.
              </S.ListItem>
              <S.ListItem>
                This means you are offering to sell 50 XYZ coins but <S.Bold>no cheaper</S.Bold> than 20 TNB each.
              </S.ListItem>
              <S.ListItem>
                The coins you're selling (XYZ) are immediately <S.Bold>reserved</S.Bold> from your wallet, meaning
                temporarily locked and unavailable for other use until the order is filled or canceled.
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Order Matching Works</S.SectionTitle>
          <S.Paragraph>
            Orders are matched automatically and immediately whenever a compatible order already exists in the order
            book.
          </S.Paragraph>

          <S.SubSection>
            <S.SubSectionTitle>Matching Criteria:</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                <S.Bold>Buy Orders</S.Bold> match against existing Sell Orders at the same or lower price.
              </S.ListItem>
              <S.ListItem>
                <S.Bold>Sell Orders</S.Bold> match against existing Buy Orders at the same or higher price.
              </S.ListItem>
              <S.ListItem>
                Orders are matched on a <S.Bold>first-come-first-served</S.Bold> (FIFO) basis when prices are identical.
              </S.ListItem>
            </S.List>
          </S.SubSection>

          <S.SubSection>
            <S.SubSectionTitle>Example Scenario:</S.SubSectionTitle>
            <S.List>
              <S.ListItem>Suppose you placed a Buy Order for 100 ABC coins at 12 TNB each.</S.ListItem>
              <S.ListItem>There's an existing Sell Order on the book for 100 ABC coins at 10 TNB each.</S.ListItem>
              <S.ListItem>
                Your order matches immediately because your Buy Order price (12 TNB) is equal to or higher than the Sell
                Order price (10 TNB).
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>How Trades (Fills) Occur</S.SectionTitle>
          <S.Paragraph>When a matching order is found, a trade (or "fill") happens:</S.Paragraph>
          <S.List>
            <S.ListItem>
              The trade executes at the <S.Bold>lowest price</S.Bold> among the two matched orders.
            </S.ListItem>
            <S.ListItem>
              Continuing the example above:
              <S.NestedList>
                <S.ListItem>The trade would execute at 10 TNB (the lower of the two prices).</S.ListItem>
                <S.ListItem>You receive 100 ABC coins, and the seller receives the equivalent funds in TNB.</S.ListItem>
                <S.ListItem>
                  Any difference between your original order price (12 TNB) and the trade execution price (10 TNB) is
                  immediately refunded to your wallet.
                </S.ListItem>
              </S.NestedList>
            </S.ListItem>
          </S.List>

          <S.SubSection>
            <S.SubSectionTitle>Partial Fills:</S.SubSectionTitle>
            <S.List>
              <S.ListItem>
                Sometimes, your order may only be partially filled. For instance, if you wanted 100 ABC coins, but only
                50 coins were available at your limit price or better:
                <S.NestedList>
                  <S.ListItem>You immediately get the 50 coins.</S.ListItem>
                  <S.ListItem>
                    Your order stays active in the order book with the remaining 50 coins until filled or canceled.
                  </S.ListItem>
                  <S.ListItem>
                    Funds for the unfilled portion remain reserved (locked) until the order is filled or canceled.
                  </S.ListItem>
                </S.NestedList>
              </S.ListItem>
            </S.List>
          </S.SubSection>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Cancelling Orders</S.SectionTitle>
          <S.List>
            <S.ListItem>You can cancel any open or partially filled order.</S.ListItem>
            <S.ListItem>
              Upon cancellation, reserved (locked) funds or coins for the unfilled portion are immediately returned to
              your wallet.
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Wallet Management</S.SectionTitle>
          <S.List>
            <S.ListItem>Whenever you place an order, the required TNB or coins are reserved (locked).</S.ListItem>
            <S.ListItem>Upon order execution (trading), coins or TNB are instantly credited to your wallet.</S.ListItem>
            <S.ListItem>
              Any refunds due to differences in the limit and executed prices are credited immediately.
            </S.ListItem>
          </S.List>
        </S.Section>

        <S.Divider />

        <S.Footer>Happy trading, and always reach out to support if you have questions!</S.Footer>
      </S.Content>
    </S.Container>
  );
};

export default LearnMore;
