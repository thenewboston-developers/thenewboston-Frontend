import {SFC} from 'types';

import * as S from './Styles';

const Rules: SFC = ({className}) => (
  <S.Rules className={className}>
    <summary>How to play Reversi</summary>
    <ol>
      <li>
        Two players share an 8 by 8 board. One plays the black disks and the other the white disks. Black moves first.
      </li>
      <li>
        On your turn, place a disk so that one or more of your opponent’s disks sit in a straight line between the new
        disk and another disk of yours. Lines run across, down, and diagonally.
      </li>
      <li>
        Every disk you trap this way flips to your color. One move can flip disks in several directions at once. The
        board shows each square you can play.
      </li>
      <li>
        A move must flip at least one disk. If you have no such move, your turn is passed automatically and your
        opponent plays again.
      </li>
      <li>
        The game ends when neither player can move, usually when the board is full. The player with more disks wins. An
        equal count is a draw.
      </li>
      <li>
        Corners can never be flipped back, so they are worth fighting for. Having the most disks early matters less than
        leaving your opponent with few good moves.
      </li>
    </ol>
    <p>
      <strong>TNB matches have a fixed prize.</strong> Each player puts in the agreed stake and the winner receives the
      whole pool, with no game fee. A draw returns each player’s stake. Resigning or running out of time loses the
      match. Your clock keeps running if you close the page or disconnect.
    </p>
    <p>
      Computer games are always free. Easy, normal, and hard offer different computer strategies. Finish a game against
      the computer with more disks to earn a reward from the community game fund while it lasts.
    </p>
  </S.Rules>
);

export default Rules;
