import * as P from '../Styles';

import * as S from './Styles';

// How a hand is played, the best way to play it, and why it can be trusted
const Rules = () => (
  <S.Rules aria-labelledby="let-it-ride-rules-heading" id="let-it-ride-rules" tabIndex={-1}>
    <P.PanelEyebrow>The house rules</P.PanelEyebrow>
    <P.PanelHeading id="let-it-ride-rules-heading">Three bets down. Two chances to change your mind.</P.PanelHeading>
    <S.Columns>
      <div>
        <h3>How a hand goes</h3>
        <ol>
          <li>Place three equal bets and deal. You get three cards; two community cards wait face down.</li>
          <li>Look at your three cards, then let bet 1 ride or pull it back.</li>
          <li>The first community card turns over. Let bet 2 ride or pull it back.</li>
          <li>The last card turns. Your five cards are paid on every bet still on the table.</li>
        </ol>
        <p>
          Bet 3 always plays. A bet you pull back returns to your wallet when the hand ends, a moment later. You need a
          pair of tens or better to win, and you are not playing against a dealer.
        </p>
      </div>
      <div>
        <h3>When to let it ride</h3>
        <p>With three cards, let bet 1 ride when you hold:</p>
        <ul>
          <li>a pair of tens or better, or three of a kind</li>
          <li>three suited cards in a row or with one gap, at least one of them a ten or higher</li>
          <li>three suited cards with two gaps, at least two of them tens or higher</li>
          <li>a ten, jack and queen of any suits</li>
        </ul>
        <p>With four cards, let bet 2 ride when you hold:</p>
        <ul>
          <li>any hand that already pays</li>
          <li>four cards of one suit</li>
          <li>four cards in a row, from 2-3-4-5 up to 10-J-Q-K</li>
          <li>four different cards that are all tens or higher</li>
        </ul>
        <p>
          Aces count high here. Otherwise pull the bet back. This is the best play for every possible deal; turn on
          Hints at the table to have it pointed out.
        </p>
      </div>
      <div>
        <h3>Fair, and paid in full</h3>
        <p>
          One fresh 52-card deck is used for every hand. All five cards are fixed the moment you bet, by a seed the
          casino commits to beforehand and one your browser adds. The casino reveals its seed when the hand ends; open a
          receipt under Recent hands to deal the same cards in your browser.
        </p>
        <p>
          Played the best way, the table keeps about 3.2% of one bet per hand. The top prize is 100 to 1 so the fund can
          always cover it, and the full house, flush and straight pay more than they do on a casino floor.
        </p>
        <p>
          A hand left unfinished for 10 minutes is completed for you: an undecided bet rides only if your cards already
          pay, and is pulled back otherwise.
        </p>
      </div>
    </S.Columns>
  </S.Rules>
);

export default Rules;
