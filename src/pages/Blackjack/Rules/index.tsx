import * as S from './Styles';

const VALUES = [
  {cards: '2 to 10', counts: 'The number on the card'},
  {cards: 'Jack, Queen, King', counts: '10'},
  {cards: 'Ace', counts: '1 or 11, whichever is better for the hand'},
];

const Rules = () => (
  <S.Rules id="blackjack-rules">
    <summary>How Blackjack works</summary>
    <ol>
      <li>
        Add chips to your bet, then press Deal. Your wager leaves your TNB wallet, and you and the dealer are each dealt
        two cards. One of the dealer's cards stays face down.
      </li>
      <li>
        Get closer to 21 than the dealer without going over. Hit to take another card, or Stand to keep your total. Go
        over 21 and the hand is lost at once.
      </li>
      <li>
        On your first two cards you can Double: your wager is doubled and you receive exactly one more card. This table
        offers no splitting, insurance or surrender.
      </li>
      <li>
        When you stand, the dealer turns over the hidden card and draws until reaching 17 or more. The dealer stands on
        every 17, including a soft 17.
      </li>
      <li>
        An ace and a ten-value card on the deal is a blackjack and pays 3 to 2. Any other win pays 1 to 1, and a tie
        returns your wager. Wagers are even amounts so a blackjack always pays whole coins.
      </li>
      <li>
        A hand left unfinished stands by itself 15 minutes after the deal. It is saved on the server, so you can leave
        and come back to it.
      </li>
      <li>
        Every hand can be checked: the casino commits to a hidden seed before the deal and reveals it afterwards. Open a
        receipt under Recent hands to reshuffle the six decks and replay the hand in your browser.
      </li>
    </ol>
    <S.Values>
      <thead>
        <tr>
          <th scope="col">Card</th>
          <th scope="col">Counts as</th>
        </tr>
      </thead>
      <tbody>
        {VALUES.map(({cards, counts}) => (
          <tr key={cards}>
            <td>{cards}</td>
            <td>{counts}</td>
          </tr>
        ))}
      </tbody>
    </S.Values>
    <S.Footnote>
      Six decks are shuffled for every hand. Your return depends on your decisions; limits depend on the casino fund and
      are shown on the table.
    </S.Footnote>
  </S.Rules>
);

export default Rules;
