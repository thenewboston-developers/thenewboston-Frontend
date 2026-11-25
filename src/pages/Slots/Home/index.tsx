import CasinoGame from 'components/Casino/Game';
import CasinoSession from 'components/Casino/Session';
import * as C from 'components/Casino/Styles';
import {CasinoBet, CasinoGame as CasinoGameConfig} from 'types/casino';

import * as S from './Styles';

const SYMBOLS: Record<string, string> = {bar: 'BAR', bell: '🔔', cherry: '🍒', diamond: '◆', lemon: '🍋', seven: '7'};

const renderRules = (game?: CasinoGameConfig) => (
  <>
    <C.Note>Maximum payout: 100× your stake. Return to player: 96% over the long run; individual results vary.</C.Note>
    <C.Table>
      <thead>
        <tr>
          <th>Total return</th>
          <th>Chance</th>
        </tr>
      </thead>
      <tbody>
        {game?.payout_table?.map((row) => (
          <tr key={row.multiplier}>
            <td>{row.multiplier}×</td>
            <td>{(row.probability * 100).toLocaleString(undefined, {maximumFractionDigits: 4})}%</td>
          </tr>
        ))}
      </tbody>
    </C.Table>
  </>
);

const renderStage = ({isSubmitting, receipt}: {isSubmitting: boolean; receipt: CasinoBet | null}) => (
  <C.Stage aria-busy={isSubmitting} aria-label="Slot reels">
    <C.Eyebrow style={{color: '#dac48e'}}>CLASSIC SLOTS · UP TO 100×</C.Eyebrow>
    <S.Reels>
      {(receipt?.result.symbols ?? ['★', '7', '◆']).map((symbol, index) => (
        <S.Reel aria-label={symbol} key={index}>
          {SYMBOLS[symbol] || symbol}
        </S.Reel>
      ))}
    </S.Reels>
    <p>{isSubmitting ? 'Confirming your wager…' : 'One spin. One result.'}</p>
  </C.Stage>
);

const Home = () => (
  <CasinoSession>
    <CasinoGame
      gameId="slots"
      heading="Spin the slots"
      renderRules={renderRules}
      renderStage={renderStage}
      title="Slots"
      verb="Spin"
    />
  </CasinoSession>
);

export default Home;
