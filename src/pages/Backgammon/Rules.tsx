import * as S from './Styles';

const Rules = ({className}: {className?: string}) => (
  <S.Rules className={className}>
    <summary>How to play backgammon</summary>
    <ol>
      <li>
        Move all 15 of your checkers into your home board, then bear them off. White moves from point 24 toward 1; black
        moves from 1 toward 24. Your home board is shown at the bottom right.
      </li>
      <li>
        The opening roll is one die for each player. The higher roll starts and uses both dice. After that, roll two
        dice on your turn. Doubles give four moves of that number.
      </li>
      <li>
        Choose a highlighted checker, then a destination. You can use the move buttons below the board too. Preview your
        whole turn, undo if needed, then confirm. You must use both dice when possible; if only one can be used, you
        must use the higher number.
      </li>
      <li>
        You cannot land on two or more opposing checkers. Landing on one sends it to the bar. Checkers on the bar must
        re-enter before you move any others.
      </li>
      <li>
        Once all your checkers are in your home board, exact rolls bear them off. A higher roll can bear off your
        farthest checker. The game highlights only legal moves.
      </li>
      <li>
        A regular win earns 1 point, a gammon 2 (your opponent has borne off none), and a backgammon 3 (they have also
        left a checker on the bar or in your home board), multiplied by the cube. Reach the match target to win.
      </li>
      <li>
        Before rolling, you can offer to double the game’s point value. Accepting gives your opponent the cube;
        declining concedes the current game at its previous value. The cube is disabled for the first game when a player
        is one point from winning—the Crawford game.
      </li>
    </ol>
    <p>
      <strong>TNB matches have a fixed prize.</strong> Each player contributes the agreed stake. The match winner
      receives the whole pool, with no game fee. The doubling cube and gammons change points, never the coin stake.
      Resigning or running out of time concedes the entire match. Your clock continues if you close the page or
      disconnect, and pauses between games.
    </p>
    <p>
      Computer games are always free. Easy, normal, and hard offer different computer strategies. Both players use the
      same rules and server-rolled dice.
    </p>
  </S.Rules>
);

export default Rules;
