import {useCallback} from 'react';
import {ArrowRight, Eye, Globe, Shield, Swords, Target} from 'lucide-react';

import {TribesPanelProps} from 'types/tribes';

import Activity from '../Activity';
import ItemIcon from '../art/ItemIcon';
import {count, distance, label, sum, tribeName} from '../common';
import {Projects} from '../Community';
import Emblem from '../components/Emblem';
import {WorkerQueue} from '../Workers';
import WorldMap from '../WorldMap';

import * as S from './Styles';

const Dashboard = (props: TribesPanelProps) => {
  const {canPlay, go, state, tribe} = props;
  const handleOpenWorld = useCallback(() => go?.('world'), [go]);
  const damage = (item: string) => state.catalog.units[item]?.damage ?? 0;
  const threats = state.tribes
    .filter((team) => team.id !== tribe?.id)
    .map((team) => ({
      team,
      damage: state.units
        .filter((unit) => unit.tribe_id === team.id && unit.valid_target_ids.includes(tribe?.id ?? -1))
        .reduce((total, unit) => total + damage(unit.item) * unit.quantity, 0),
    }))
    .filter((entry) => entry.damage > 0)
    .sort((a, b) => b.damage - a.damage);
  const plans = state.units.filter((unit) => unit.tribe_id === tribe?.id && state.catalog.units[unit.item]);
  const powers = state.tribes
    .map((team) => {
      const units = state.units.filter((unit) => unit.tribe_id === team.id);
      return {
        attack: units.reduce((total, unit) => total + damage(unit.item) * unit.quantity, 0),
        defense: units.reduce((total, unit) => total + (state.catalog.defenses[unit.item] ?? 0) * unit.quantity, 0),
        land: state.plots.filter((plot) => plot.tribe_id === team.id).length,
        team,
      };
    })
    .sort((a, b) => b.attack + b.defense - (a.attack + a.defense) || b.land - a.land);

  const working = state.jobs.some(
    (job) => job.user_id === state.viewer?.id && ['working', 'queued'].includes(job.status),
  );
  const openProjects = state.work_orders.filter((order) => order.status === 'open').length;
  const untargeted = plans.filter((unit) => unit.controller_id === state.viewer?.id && !unit.target_id).length;
  const frontier = state.plots.filter(
    (plot) =>
      plot.tribe_id === null &&
      state.plots.some((entry) => entry.tribe_id === tribe?.id && distance(entry, plot) === 1),
  );
  const cheapest = Math.min(...frontier.map((plot) => plot.price));
  const incoming = threats.reduce((total, entry) => total + entry.damage, 0);
  const moves: {action: string; detail: string; icon: string; section: string; text: string}[] = [];
  if (!working)
    moves.push({
      action: 'Assign work',
      detail: 'Queue gathering or a recipe so production continues while you are away.',
      icon: 'worker',
      section: 'production',
      text: 'Your worker is idle.',
    });
  if (untargeted)
    moves.push({
      action: 'Set targets',
      detail: 'Units without a target sit out the final battle.',
      icon: 'catapult',
      section: 'military',
      text: `${untargeted} of your weapon ${untargeted === 1 ? 'batch has' : 'batches have'} no target.`,
    });
  if (openProjects)
    moves.push({
      action: 'View projects',
      detail: 'Gather the missing supplies, contribute your stock, or arrange a trade.',
      icon: 'warehouse',
      section: 'tribe',
      text: `Your tribe has ${openProjects} open project${openProjects === 1 ? '' : 's'}.`,
    });
  if (frontier.length && (tribe?.treasury ?? 0) >= cheapest)
    moves.push({
      action: 'Expand',
      detail: `Neighboring land starts at ${count(cheapest)} TNB and the treasury holds ${count(tribe?.treasury)} TNB.`,
      icon: 'forest',
      section: 'world',
      text: 'There is land within reach.',
    });
  if (incoming)
    moves.push({
      action: 'Review defenses',
      detail: 'Walls and barricades absorb damage before it counts against you.',
      icon: 'stone_wall',
      section: 'military',
      text: `${count(incoming)} enemy damage can reach your land.`,
    });
  if (!moves.length)
    moves.push({
      action: 'Visit the market',
      detail: 'Build your economy, explore the world, and discuss a plan with your team.',
      icon: 'tnb',
      section: 'market',
      text: 'Everything is in motion.',
    });

  return (
    <S.Stack>
      {tribe && (
        <S.Card $dark>
          <S.Briefing>
            <Emblem color={tribe.color} emblem={tribe.emblem} size={52} />
            <div>
              <S.Eyebrow $light style={{marginBottom: 2}}>
                {tribe.name}
              </S.Eyebrow>
              <h2>Make your next hour count.</h2>
            </div>
          </S.Briefing>
          <S.Moves>
            {moves.slice(0, 4).map((move) => (
              <S.Move key={move.text}>
                <span>
                  <ItemIcon item={move.icon} size={32} />
                </span>
                <div>
                  <strong>{move.text}</strong>
                  <small>{move.detail}</small>
                </div>
                {canPlay && (
                  <S.Button $size="small" $variant="accent" onClick={() => go?.(move.section)}>
                    {move.action} <ArrowRight size={14} />
                  </S.Button>
                )}
              </S.Move>
            ))}
          </S.Moves>
        </S.Card>
      )}
      <S.Grid>
        <S.Stack>
          {!!state.plots.length && (
            <S.Card $dark $flush>
              <S.PanelTitle style={{margin: 0, padding: '18px 20px 12px'}}>
                <div>
                  <S.Eyebrow $light>
                    <Globe size={14} /> The world today
                  </S.Eyebrow>
                  <h2>
                    {state.plots.length} plots, {state.tribes.length} tribes
                  </h2>
                </div>
                <S.Button $size="small" $variant="accent" onClick={handleOpenWorld}>
                  Open the map <ArrowRight size={14} />
                </S.Button>
              </S.PanelTitle>
              <div style={{padding: '0 10px 10px'}}>
                <WorldMap compact onSelect={handleOpenWorld} state={state} tribe={tribe} />
              </div>
            </S.Card>
          )}
          {tribe && <WorkerQueue {...props} />}
          {tribe && <Projects {...props} />}
          {tribe && <Activity state={state} />}
        </S.Stack>
        <S.Stack>
          {tribe && (
            <S.Card>
              <S.Eyebrow>Stock check</S.Eyebrow>
              <h2>What we hold</h2>
              <S.Row>
                <span>Personal supplies</span>
                <strong>{count(sum(state.viewer?.inventory))}</strong>
              </S.Row>
              <S.Row>
                <span>Tribal warehouse</span>
                <strong>{count(sum(tribe.inventory))}</strong>
              </S.Row>
              <S.Row>
                <span>Territory</span>
                <strong>{state.plots.filter((plot) => plot.tribe_id === tribe.id).length} plots</strong>
              </S.Row>
              <S.Row>
                <span>Treasury</span>
                <strong>{count(tribe.treasury)} TNB</strong>
              </S.Row>
            </S.Card>
          )}
          <S.Card>
            <S.Eyebrow>
              <Swords size={14} /> Balance of power
            </S.Eyebrow>
            <h2>Powers of the world</h2>
            <S.Muted>Armies are public. What they are aimed at is not.</S.Muted>
            {!powers.length && <S.Empty>No tribes joined this season.</S.Empty>}
            {powers.map(({attack, defense, land, team}) => (
              <S.Power $own={team.id === tribe?.id} key={team.id}>
                <Emblem color={team.color} emblem={team.emblem} size={30} />
                <div>
                  <strong>{team.name}</strong>
                  <small>
                    {team.members.length} players · {land} plots
                  </small>
                </div>
                <S.PowerStats>
                  <S.Badge $tone="ember" title="Attack power">
                    <Swords size={11} /> {count(attack)}
                  </S.Badge>
                  <S.Badge $tone="sky" title="Defense">
                    <Shield size={11} /> {count(defense)}
                  </S.Badge>
                </S.PowerStats>
              </S.Power>
            ))}
          </S.Card>
          {tribe && (
            <S.Card>
              <S.Eyebrow>
                <Eye size={14} /> Neighborhood watch
              </S.Eyebrow>
              <h2>Military intelligence</h2>
              <S.Muted>Potential enemy damage within reach of your land. Their actual targets remain secret.</S.Muted>
              {!threats.length && <S.Empty>No enemy weapons currently threaten your territory.</S.Empty>}
              {threats.map((threat) => (
                <S.Row key={threat.team.id}>
                  <S.RowMain>
                    <Emblem color={threat.team.color} emblem={threat.team.emblem} size={26} />
                    <strong>{threat.team.name}</strong>
                  </S.RowMain>
                  <S.Badge $tone="ember">{count(threat.damage)} potential damage</S.Badge>
                </S.Row>
              ))}
            </S.Card>
          )}
          {tribe && (
            <S.Card>
              <S.Eyebrow>
                <Target size={14} /> For our eyes only
              </S.Eyebrow>
              <h2>Our targeting plan</h2>
              {!plans.length && <S.Muted>Your first military units will appear here.</S.Muted>}
              {plans.map((unit) => (
                <S.Row key={unit.id}>
                  <S.RowMain>
                    <ItemIcon item={unit.item} size={30} />
                    <div>
                      <strong>
                        {count(unit.quantity)} {label(unit.item)}
                      </strong>
                      <small>{unit.target_id ? `Aimed at ${tribeName(state, unit.target_id)}` : 'No target yet'}</small>
                    </div>
                  </S.RowMain>
                  <S.Badge $tone={unit.target_id ? 'ember' : 'neutral'}>
                    {count(unit.quantity * damage(unit.item))} damage
                  </S.Badge>
                </S.Row>
              ))}
            </S.Card>
          )}
        </S.Stack>
      </S.Grid>
    </S.Stack>
  );
};

export default Dashboard;
