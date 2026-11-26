import {TribesPanelProps} from 'types/tribes';

import {count, label, memberName, tribeName} from './common';
import * as S from './Styles';

const History = ({state, tribe}: TribesPanelProps) => {
  const result = state.battle?.standings.find((row) => row.tribe_id === tribe?.id);
  const contribution =
    state.battle?.attacks
      .filter((attack) => attack.controller_id === state.viewer?.id)
      .reduce((sum, attack) => sum + attack.effective_damage, 0) ?? 0;
  return (
    <S.Stack>
      <S.Card>
        <S.Eyebrow>SEASON {state.season.id} / THE GREAT WAR</S.Eyebrow>
        <h2>{state.battle ? 'The decisions. The damage. The history.' : 'A week of decisions. One final battle.'}</h2>
        <S.Muted>
          Final score = effective damage dealt − effective damage received. Defense absorbs incoming damage
          proportionally across attackers. Equal scores share a rank.
        </S.Muted>
        {!state.battle ? (
          <S.Empty>
            The final leaderboard appears when this season ends. Select a completed season above to revisit its story.
          </S.Empty>
        ) : (
          <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Tribe</th>
                  <th>Dealt</th>
                  <th>Received</th>
                  <th>Blocked</th>
                  <th>Net score</th>
                </tr>
              </thead>
              <tbody>
                {state.battle.standings.map((row) => (
                  <tr key={row.tribe_id}>
                    <td>
                      <S.Badge>#{row.rank}</S.Badge>
                    </td>
                    <td>
                      <strong>{row.name}</strong>
                    </td>
                    <td>{count(row.outgoing)}</td>
                    <td>{count(row.incoming)}</td>
                    <td>{count(row.blocked)}</td>
                    <td>
                      <strong>
                        {row.score > 0 ? '+' : ''}
                        {count(row.score)}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableScroll>
        )}
      </S.Card>
      {result && (
        <S.Stats>
          <S.Stat>
            <span>Your tribe rank</span>
            <strong>#{result.rank}</strong>
          </S.Stat>
          <S.Stat>
            <span>Raw incoming damage</span>
            <strong>{count(result.raw_incoming)}</strong>
          </S.Stat>
          <S.Stat>
            <span>Defense absorbed</span>
            <strong>{count(result.blocked)}</strong>
          </S.Stat>
          <S.Stat>
            <span>Your effective damage</span>
            <strong>{count(contribution)}</strong>
          </S.Stat>
        </S.Stats>
      )}
      {state.battle && (
        <S.Card>
          <h2>The targeting reveal</h2>
          <S.Muted>Every valid attack, revealed together. No online advantage at the cutoff.</S.Muted>
          {!state.battle.attacks.length ? (
            <S.Empty>No military units had valid targets at the final cutoff.</S.Empty>
          ) : (
            <S.TableScroll>
              <S.Table>
                <thead>
                  <tr>
                    <th>Attacker</th>
                    <th>Controller</th>
                    <th>Target</th>
                    <th>Raw damage</th>
                    <th>Effective damage</th>
                  </tr>
                </thead>
                <tbody>
                  {state.battle.attacks.map((attack) => (
                    <tr key={attack.unit_id}>
                      <td>{tribeName(state, attack.tribe_id)}</td>
                      <td>{memberName(state, attack.controller_id)}</td>
                      <td>{tribeName(state, attack.target_id)}</td>
                      <td>{count(attack.raw_damage)}</td>
                      <td>{count(attack.effective_damage)}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.TableScroll>
          )}
        </S.Card>
      )}
      {state.viewer && (
        <S.Card>
          <h2>Your economic contribution</h2>
          <S.Muted>Total goods produced by your worker this season.</S.Muted>
          {!Object.keys(state.viewer.production).length && (
            <S.Empty>Your completed production will be recorded here.</S.Empty>
          )}
          <S.Cards>
            {Object.entries(state.viewer.production).map(([item, quantity]) => (
              <S.Stat key={item}>
                <span>{label(item)}</span>
                <strong>{count(quantity)}</strong>
              </S.Stat>
            ))}
          </S.Cards>
        </S.Card>
      )}
    </S.Stack>
  );
};
export default History;
