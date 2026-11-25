import {useState} from 'react';

import CasinoGame from 'components/Casino/Game';
import CasinoSession from 'components/Casino/Session';
import * as C from 'components/Casino/Styles';
import {CasinoBet, CasinoGame as CasinoGameConfig} from 'types/casino';

import * as S from './Styles';

const VALUE_LABELS: Record<string, string> = {
  number: 'Number (0–36)',
  dozen: 'Dozen (1: 1–12, 2: 13–24, 3: 25–36)',
  column: 'Column (1, 2, or 3)',
};

const renderRules = () => (
  <>
    <C.Note>The wheel has 0–36. Zero loses all outside bets. House edge: 2.7027%. One selection per spin.</C.Note>
    <C.Table>
      <thead>
        <tr>
          <th>Bet</th>
          <th>Total return</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Red/black, odd/even, low/high</td>
          <td>2×</td>
        </tr>
        <tr>
          <td>Dozen or column</td>
          <td>3×</td>
        </tr>
        <tr>
          <td>Single number</td>
          <td>36×</td>
        </tr>
      </tbody>
    </C.Table>
  </>
);

const renderStage = ({isSubmitting, receipt}: {isSubmitting: boolean; receipt: CasinoBet | null}) => (
  <C.Stage aria-busy={isSubmitting} aria-label="Roulette result">
    <C.Eyebrow style={{color: '#dac48e'}}>SINGLE-ZERO ROULETTE</C.Eyebrow>
    <S.RouletteBall $color={receipt?.result.color ?? 'green'}>{receipt?.result.number ?? '?'}</S.RouletteBall>
    <p>{isSubmitting ? 'Confirming your wager…' : '37 numbers. Choose your wager below.'}</p>
  </C.Stage>
);

const RouletteGame = () => {
  const [selectionType, setSelectionType] = useState('red');
  const [selectionValue, setSelectionValue] = useState('1');
  const needsValue = ['number', 'column', 'dozen'].includes(selectionType);
  const validSelection =
    !needsValue ||
    (Number.isInteger(Number(selectionValue)) &&
      Number(selectionValue) >= (selectionType === 'number' ? 0 : 1) &&
      Number(selectionValue) <= (selectionType === 'number' ? 36 : 3));

  const renderControls = ({disabled, game}: {disabled: boolean; game?: CasinoGameConfig}) => (
    <>
      <C.Field htmlFor="roulette-selection">
        Bet on
        <C.Select
          disabled={disabled}
          id="roulette-selection"
          onChange={(event) => {
            setSelectionType(event.target.value);
            setSelectionValue(event.target.value === 'number' ? '0' : '1');
          }}
          value={selectionType}
        >
          {game?.bet_types?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </C.Select>
      </C.Field>
      {needsValue && (
        <C.Field htmlFor="roulette-value">
          {VALUE_LABELS[selectionType]}
          <C.Input
            disabled={disabled}
            id="roulette-value"
            max={selectionType === 'number' ? 36 : 3}
            min={selectionType === 'number' ? 0 : 1}
            onChange={(event) => setSelectionValue(event.target.value)}
            required
            step={1}
            type="number"
            value={selectionValue}
          />
        </C.Field>
      )}
    </>
  );

  return (
    <CasinoGame
      gameId="roulette"
      heading="Place your roulette bet"
      renderControls={renderControls}
      renderRules={renderRules}
      renderStage={renderStage}
      selection={{type: selectionType, ...(needsValue ? {value: Number(selectionValue)} : {})}}
      title="Roulette"
      validSelection={validSelection}
      verb="Bet"
    />
  );
};

const Home = () => (
  <CasinoSession>
    <RouletteGame />
  </CasinoSession>
);

export default Home;
