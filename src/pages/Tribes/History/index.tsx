import {ArrowRight, Medal, ScrollText, Shield, Swords, Target, Trophy} from 'lucide-react';

import {TribesPanelProps} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {count, label, memberName, tribeName} from '../common';
import AnimatedNumber from '../components/AnimatedNumber';
import Emblem from '../components/Emblem';

import * as S from './Styles';

const History = ({state, tribe}: TribesPanelProps) => {
  const result = state.battle?.standings.find((row) => row.tribe_id === tribe?.id);
  const contribution =
    state.battle?.attacks
      .filter((attack) => attack.controller_id === state.viewer?.id)
      .reduce((total, attack) => total + attack.effective_damage, 0) ?? 0;
  const team = (id: number) => state.tribes.find((entry) => entry.id === id);
  const podium = state.battle?.standings.filter((row) => row.rank <= 3).slice(0, 3) ?? [];
  const strongest = Math.max(
    1,
    ...(state.battle?.standings.map((row) => Math.max(row.outgoing, row.raw_incoming)) ?? []),
  );
  const heaviest = Math.max(1, ...(state.battle?.attacks.map((attack) => attack.raw_damage) ?? []));
  return (
    <S.Stack>
      <S.Card $dark>
        <S.Intro>
          <S.Eyebrow $light>
            <Trophy size={14} /> Season {state.season.id} / The Great War
          </S.Eyebrow>
          <h2>{state.battle ? 'The decisions. The damage. The history.' : 'A week of decisions. One final battle.'}</h2>
          <S.Muted $dark style={{marginBottom: 0}}>
            Final score = effective damage dealt − effective damage received. Defense absorbs incoming damage
            proportionally across attackers. Equal scores share a rank.
          </S.Muted>
        </S.Intro>
        {!state.battle ? (
          <S.Empty $dark style={{marginTop: 20}}>
            <ItemIcon item="catapult" size={48} />
            The final leaderboard appears when this season ends. Select a completed season above to revisit its story.
          </S.Empty>
        ) : (
          <S.Podium>
            {podium.map((row, index) => {
              const entry = team(row.tribe_id);
              const place = Math.min(3, index + 1);
              return (
                <S.Pedestal $place={place} key={row.tribe_id}>
                  <Emblem
                    color={entry?.color ?? '#46634a'}
                    emblem={entry?.emblem ?? '🛡️'}
                    size={place === 1 ? 58 : 46}
                  />
                  <strong>{row.name}</strong>
                  <small>
                    {row.score > 0 ? '+' : ''}
                    {count(row.score)} net
                  </small>
                  <div>{row.rank}</div>
                </S.Pedestal>
              );
            })}
          </S.Podium>
        )}
      </S.Card>
      {state.battle && (
        <S.Card>
          <S.Eyebrow>
            <Medal size={14} /> Final standings
          </S.Eyebrow>
          <h2>The leaderboard</h2>
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
                {state.battle.standings.map((row) => {
                  const entry = team(row.tribe_id);
                  return (
                    <tr key={row.tribe_id}>
                      <td>
                        <S.Rank $rank={row.rank}>#{row.rank}</S.Rank>
                      </td>
                      <td>
                        <S.Side>
                          <Emblem color={entry?.color ?? '#46634a'} emblem={entry?.emblem ?? '🛡️'} size={28} />
                          <strong>{row.name}</strong>
                        </S.Side>
                      </td>
                      <td style={{minWidth: 110}}>
                        {count(row.outgoing)}
                        <S.Bar $color="#d9573b" $value={(row.outgoing / strongest) * 100} />
                      </td>
                      <td style={{minWidth: 110}}>
                        {count(row.incoming)}
                        <S.Bar $color="#8d978f" $value={(row.incoming / strongest) * 100} />
                      </td>
                      <td>{count(row.blocked)}</td>
                      <td>
                        <S.Score $positive={row.score >= 0}>
                          {row.score > 0 ? '+' : ''}
                          {count(row.score)}
                        </S.Score>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </S.TableScroll>
        </S.Card>
      )}
      {result && (
        <S.Stats>
          <S.Stat>
            <S.StatIcon $tone="gold">
              <Trophy size={20} />
            </S.StatIcon>
            <div>
              <span>Your tribe rank</span>
              <strong>#{result.rank}</strong>
            </div>
          </S.Stat>
          <S.Stat>
            <S.StatIcon $tone="ember">
              <Swords size={20} />
            </S.StatIcon>
            <div>
              <span>Raw incoming damage</span>
              <strong>
                <AnimatedNumber value={result.raw_incoming} />
              </strong>
            </div>
          </S.Stat>
          <S.Stat>
            <S.StatIcon $tone="sky">
              <Shield size={20} />
            </S.StatIcon>
            <div>
              <span>Defense absorbed</span>
              <strong>
                <AnimatedNumber value={result.blocked} />
              </strong>
            </div>
          </S.Stat>
          <S.Stat>
            <S.StatIcon>
              <Target size={20} />
            </S.StatIcon>
            <div>
              <span>Your effective damage</span>
              <strong>
                <AnimatedNumber value={contribution} />
              </strong>
            </div>
          </S.Stat>
        </S.Stats>
      )}
      {state.battle && (
        <S.Card>
          <S.Eyebrow>
            <Target size={14} /> Every secret, revealed
          </S.Eyebrow>
          <h2>The targeting reveal</h2>
          <S.Muted>Every valid attack, revealed together. No online advantage at the cutoff.</S.Muted>
          {!state.battle.attacks.length ? (
            <S.Empty>No military units had valid targets at the final cutoff.</S.Empty>
          ) : (
            state.battle.attacks.map((attack) => {
              const attacker = team(attack.tribe_id);
              const defender = team(attack.target_id);
              return (
                <S.Attack key={attack.unit_id}>
                  <S.Side>
                    <Emblem color={attacker?.color ?? '#46634a'} emblem={attacker?.emblem ?? '🛡️'} size={28} />
                    <div>
                      <strong>{tribeName(state, attack.tribe_id)}</strong>
                      <small>{memberName(state, attack.controller_id)}</small>
                    </div>
                  </S.Side>
                  <ArrowRight size={18} />
                  <S.Side>
                    <Emblem color={defender?.color ?? '#46634a'} emblem={defender?.emblem ?? '🛡️'} size={28} />
                    <strong>{tribeName(state, attack.target_id)}</strong>
                  </S.Side>
                  <S.Damage>
                    {count(attack.effective_damage)}
                    <small>of {count(attack.raw_damage)} landed</small>
                    <S.Bar $color="#d9573b" $value={(attack.effective_damage / heaviest) * 100} />
                  </S.Damage>
                </S.Attack>
              );
            })
          )}
        </S.Card>
      )}
      {state.viewer && (
        <S.Card>
          <S.Eyebrow>
            <ScrollText size={14} /> Your season
          </S.Eyebrow>
          <h2>Your economic contribution</h2>
          <S.Muted>Total goods produced by your worker this season.</S.Muted>
          {!Object.keys(state.viewer.production).length && (
            <S.Empty>Your completed production will be recorded here.</S.Empty>
          )}
          <S.Cards $min={190}>
            {Object.entries(state.viewer.production).map(([item, quantity]) => (
              <S.Tile key={item}>
                <ItemIcon item={item} size={36} />
                <div>
                  <span>{label(item)}</span>
                  <strong>{count(quantity)}</strong>
                </div>
              </S.Tile>
            ))}
          </S.Cards>
        </S.Card>
      )}
    </S.Stack>
  );
};

export default History;
