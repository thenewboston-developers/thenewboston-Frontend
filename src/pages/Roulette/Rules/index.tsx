import * as S from './Styles';

const PAYOUTS = [
  {bet: 'Red or black, odd or even, 1–18 or 19–36', chance: '18 in 37', returns: '2×'},
  {bet: 'A dozen or a column', chance: '12 in 37', returns: '3×'},
  {bet: 'A single number, zero included', chance: '1 in 37', returns: '36×'},
];

const Rules = () => (
  <S.Rules id="roulette-rules">
    <summary>How Roulette works</summary>
    <ol>
      <li>
        Pick a chip, then tap the table to place it, or drag the chip onto a spot. Cover as many spots as you like: one
        spin settles them all. Tap a spot again to add chips.
      </li>
      <li>
        Drag a stack to move it to another spot, or off the table to take it back. Right-click a spot to take one chip
        off, and use Undo to step back.
      </li>
      <li>
        Press Spin. Your stake leaves your TNB wallet and the wager settles at once; the wheel then shows you where the
        ball landed.
      </li>
      <li>
        The wheel has 37 pockets: 1 to 36 in red and black, and a single green zero. Zero loses every outside bet.
      </li>
      <li>
        A winning bet returns your stake multiplied by the amount below. The house edge is the same 2.70% on every bet.
      </li>
      <li>
        Every spin can be checked: the casino commits to a hidden seed before you bet and reveals it afterwards. Open a
        receipt under Recent bets to verify the result in your browser.
      </li>
    </ol>
    <S.Payouts>
      <thead>
        <tr>
          <th scope="col">Bet</th>
          <th scope="col">Chance</th>
          <th scope="col">Total return</th>
        </tr>
      </thead>
      <tbody>
        {PAYOUTS.map(({bet, chance, returns}) => (
          <tr key={returns}>
            <td>{bet}</td>
            <td>{chance}</td>
            <td>{returns}</td>
          </tr>
        ))}
      </tbody>
    </S.Payouts>
    <S.Footnote>
      Returns include your original stake. Limits depend on the casino fund and are shown on the table.
    </S.Footnote>
  </S.Rules>
);

export default Rules;
