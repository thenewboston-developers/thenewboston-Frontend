import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints} from 'styles';

const Card = styled(Link)`
  align-items: center;
  background: #ffffff09;
  border: 1px solid #ffffff24;
  border-radius: 14px;
  color: #ffffff;
  display: flex;
  gap: 18px;
  padding: 22px;
  text-decoration: none;

  &:hover {
    background: #ffffff15;
    color: #ffffff;
    text-decoration: none;
  }
  &:focus-visible {
    outline: 3px solid #e0bb70;
    outline-offset: 3px;
  }
  strong {
    display: block;
    font-size: 23px;
    margin-bottom: 5px;
  }
  small {
    color: #d1dfd2;
    font-size: 13px;
  }
`;
const Cards = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 26px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
const Container = styled.section`
  background: radial-gradient(ellipse at top right, #385d47, #173729 75%);
  border: 1px solid #294c37;
  border-radius: 20px;
  color: #ffffff;
  padding: 30px;

  h2 {
    font-size: 30px;
    letter-spacing: -0.04em;
    margin: 0 0 10px;
  }
  p {
    color: #d1dfd2;
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
    max-width: 600px;
  }
`;
const Emblem = styled.span`
  align-items: center;
  border: 1px solid #dfbe7699;
  border-radius: 12px;
  color: #e0bb70;
  display: flex;
  flex-shrink: 0;
  font-size: 30px;
  font-weight: 800;
  height: 64px;
  justify-content: center;
  width: 64px;
`;

const CasinoPreview = () => (
  <Container aria-labelledby="casino-heading">
    <h2 id="casino-heading">Welcome to the casino.</h2>
    <p>
      Slots and Roulette, played with TNB. Choose your game, check the current wager limit, and play when the casino
      fund can cover your bet.
    </p>
    <Cards>
      <Card to="/casino/slots">
        <Emblem aria-hidden="true">777</Emblem>
        <div>
          <strong>Slots</strong>
          <small>One spin · Up to 100× total return</small>
        </div>
      </Card>
      <Card to="/casino/roulette">
        <Emblem aria-hidden="true">◎</Emblem>
        <div>
          <strong>Roulette</strong>
          <small>Single-zero wheel · Classic bets</small>
        </div>
      </Card>
    </Cards>
  </Container>
);

export default CasinoPreview;
