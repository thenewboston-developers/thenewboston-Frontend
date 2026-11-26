import {TribesPanelProps} from 'types/tribes';

import Activity from './Activity';
import {count, label, tribeName} from './common';
import {Projects} from './Community';
import * as S from './Styles';
import {WorkerQueue} from './Workers';

const Dashboard = (props: TribesPanelProps) => {
  const {state, tribe} = props;
  const threats = state.tribes
    .filter((team) => team.id !== tribe?.id)
    .map((team) => ({
      team,
      damage: state.units
        .filter((unit) => unit.tribe_id === team.id && unit.valid_target_ids.includes(tribe?.id ?? -1))
        .reduce((sum, unit) => sum + (state.catalog.units[unit.item]?.damage ?? 0) * unit.quantity, 0),
    }))
    .filter((entry) => entry.damage > 0)
    .sort((a, b) => b.damage - a.damage);
  const plans = state.units.filter((unit) => unit.tribe_id === tribe?.id && state.catalog.units[unit.item]);
  return (
    <S.Grid>
      <S.Stack>
        <WorkerQueue {...props} />
        <Projects {...props} />
        <Activity state={state} />
      </S.Stack>
      <S.Stack>
        <S.Card>
          <S.Eyebrow>
            {tribe?.emblem} {tribe?.name ?? 'TRIBES'}
          </S.Eyebrow>
          <h2>Make your next hour count.</h2>
          <S.Muted>
            {state.work_orders.some((order) => order.status === 'open')
              ? 'Your tribe has open projects. Gather the missing supplies, contribute your stock, or arrange a trade.'
              : 'Build your economy, explore the world, and discuss a plan with your team.'}
          </S.Muted>
          <S.Row>
            <span>Personal supplies</span>
            <strong>
              {count(Object.values(state.viewer?.inventory ?? {}).reduce((sum, value) => sum + value, 0))}
            </strong>
          </S.Row>
          <S.Row>
            <span>Tribal warehouse</span>
            <strong>{count(Object.values(tribe?.inventory ?? {}).reduce((sum, value) => sum + value, 0))}</strong>
          </S.Row>
          <S.Row>
            <span>Territory</span>
            <strong>{state.plots.filter((plot) => plot.tribe_id === tribe?.id).length} plots</strong>
          </S.Row>
        </S.Card>
        <S.Card>
          <S.Eyebrow>NEIGHBORHOOD WATCH</S.Eyebrow>
          <h2>Military intelligence</h2>
          <S.Muted>Potential enemy damage within reach of your land. Their actual targets remain secret.</S.Muted>
          {!threats.length && <S.Empty>No enemy weapons currently threaten your territory.</S.Empty>}
          {threats.map(({team, damage}) => (
            <S.Row key={team.id}>
              <strong>
                {team.emblem} {team.name}
              </strong>
              <S.Badge>{count(damage)} potential damage</S.Badge>
            </S.Row>
          ))}
        </S.Card>
        <S.Card>
          <h2>Our targeting plan</h2>
          {!plans.length && <S.Muted>Your first military units will appear here.</S.Muted>}
          {plans.map((unit) => (
            <S.Row key={unit.id}>
              <div>
                <strong>
                  {count(unit.quantity)} {label(unit.item)}
                </strong>
                <small>{tribeName(state, unit.target_id)}</small>
              </div>
              <S.Badge>{count(unit.quantity * state.catalog.units[unit.item].damage)} damage</S.Badge>
            </S.Row>
          ))}
        </S.Card>
      </S.Stack>
    </S.Grid>
  );
};
export default Dashboard;
