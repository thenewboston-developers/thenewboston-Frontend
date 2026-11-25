import {LetItRideHand} from 'types/casino';
import {PAYTABLE} from 'utils/letItRide';

import * as S from './Styles';

interface PaytableProps {
  // One of the three equal bets
  bet: number;
  // The paying hand the cards on show already hold, while a hand is in play
  held: LetItRideHand | null;
  // Bets still on the table
  riding: number;
  // The hand a finished deal made
  won: LetItRideHand | null;
}

// What each hand pays on every bet left riding, with the hand in play picked out
const Paytable = ({bet, held, riding, won}: PaytableProps) => (
  <S.Paytable aria-labelledby="let-it-ride-paytable-heading">
    <S.Eyebrow>Pays on each riding bet</S.Eyebrow>
    <S.Heading id="let-it-ride-paytable-heading">Paytable</S.Heading>
    <S.Table>
      <thead>
        <tr>
          <th scope="col">Hand</th>
          <th scope="col">Pays</th>
          <th scope="col">
            Wins <small>{riding === 1 ? '1 bet' : `${riding} bets`}</small>
          </th>
        </tr>
      </thead>
      <tbody>
        {PAYTABLE.map(({hand, label, odds}) => {
          const isHeld = hand === held;
          const isWon = hand === won;
          let tag = '';
          if (isHeld) tag = 'You have this';
          if (isWon) tag = 'Winner';
          return (
            <S.Row $held={isHeld} $won={isWon} aria-current={isHeld || isWon ? 'true' : undefined} key={hand}>
              <th scope="row">
                {label}
                {tag && <S.Tag $won={isWon}>{tag}</S.Tag>}
              </th>
              <td>{odds} to 1</td>
              <td>+{(bet * riding * odds).toLocaleString()}</td>
            </S.Row>
          );
        })}
      </tbody>
    </S.Table>
    <S.Footnote>
      Winning bets come back too. A pair lower than tens does not pay, and any other hand loses the bets still riding.
    </S.Footnote>
  </S.Paytable>
);

export default Paytable;
