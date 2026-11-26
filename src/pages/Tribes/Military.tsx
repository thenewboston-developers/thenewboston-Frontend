import {useState} from 'react';

import {TribesPanelProps, TribesUnit} from 'types/tribes';

import {AccountField, ActionForm, count, label, memberName, NumberField, PlotField, tribeName} from './common';
import * as S from './Styles';

const Unit = ({unit, ...props}: TribesPanelProps & {unit: TribesUnit}) => {
  const [location, setLocation] = useState(unit.plot_id);
  const [recipient, setRecipient] = useState('');
  const {act, busy, canPlay, state, tribe} = props;
  const origin = state.plots.find((entry) => entry.id === location);
  const owned = state.plots.filter((plot) => plot.tribe_id === tribe?.id);
  const recipientTribe = state.tribes.find((team) => team.members.some((member) => member.id === Number(recipient)));
  const spec = state.catalog.units[unit.item];
  const targets =
    spec && origin
      ? state.tribes.filter(
          (team) =>
            team.id !== unit.tribe_id &&
            state.plots.some(
              (plot) =>
                plot.tribe_id === team.id &&
                Math.max(Math.abs(plot.x - origin.x), Math.abs(plot.y - origin.y)) <= spec.range,
            ),
        )
      : [];
  const controls = unit.controller_id === state.viewer?.id;
  return (
    <S.Card>
      <S.PanelTitle>
        <h2>
          {count(unit.quantity)} {label(unit.item)}
        </h2>
        <S.Badge>
          {spec
            ? `${count(spec.damage * unit.quantity)} DAMAGE`
            : `${count((state.catalog.defenses[unit.item] ?? 0) * unit.quantity)} DEFENSE`}
        </S.Badge>
      </S.PanelTitle>
      <S.Muted>
        {memberName(state, unit.controller_id)} · Plot #{unit.plot_id}
        {spec ? ` · Range ${spec.range}` : ' · Shared tribal defense'}
      </S.Muted>
      {spec && (
        <S.Row>
          <span>Target</span>
          <strong>{unit.target_id === undefined ? 'Classified' : tribeName(state, unit.target_id)}</strong>
        </S.Row>
      )}
      {controls && canPlay && (
        <>
          <ActionForm
            act={act}
            action="deploy"
            disabled={busy}
            fixed={{unit_id: unit.id, plot_id: location}}
            submit="Save deployment"
          >
            <S.Field>
              Placement
              <select onChange={(event) => setLocation(Number(event.target.value))} value={location}>
                {owned.map((plot) => (
                  <option key={plot.id} value={plot.id}>
                    {label(plot.terrain)} ({plot.x + 1}, {plot.y + 1})
                  </option>
                ))}
              </select>
            </S.Field>
            {spec ? (
              <S.Field>
                Secret target
                <select
                  defaultValue={
                    unit.target_id && targets.some((target) => target.id === unit.target_id) ? unit.target_id : ''
                  }
                  key={location}
                  name="target_id"
                >
                  <option value="">No target</option>
                  {targets.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.emblem} {team.name}
                    </option>
                  ))}
                </select>
              </S.Field>
            ) : (
              <input name="target_id" type="hidden" value="" />
            )}
            {spec && !targets.length && <S.Muted>No enemy territory is in range from this plot.</S.Muted>}
          </ActionForm>
          <details style={{marginTop: 20}}>
            <summary>Sell units on the marketplace</summary>
            <S.Muted style={{marginTop: 12}}>
              Listed units are removed from your arsenal and have their targets cleared. A buyer receives control.
            </S.Muted>
            <ActionForm
              act={act}
              action="create_listing"
              disabled={busy}
              fixed={{kind: 'sell', item: unit.item, unit_id: unit.id}}
              submit="List military for sale"
            >
              <S.InlineFields>
                <NumberField label="Units to sell" max={unit.quantity} name="quantity" />
                <NumberField label="TNB per unit" name="price" />
              </S.InlineFields>
              <AccountField label="Receive sale proceeds into" personalFirst />
            </ActionForm>
          </details>
          <details style={{marginTop: 20}}>
            <summary>Transfer this batch</summary>
            <S.Muted style={{marginTop: 12}}>
              The recipient controls this entire batch. Its existing target is cleared.
            </S.Muted>
            <S.Field>
              New controller
              <select onChange={(event) => setRecipient(event.target.value)} value={recipient}>
                <option value="">Choose a player</option>
                {state.tribes.map((team) => (
                  <optgroup key={team.id} label={team.name}>
                    {team.members
                      .filter((member) => member.id !== state.viewer?.id)
                      .map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.username}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </S.Field>
            <ActionForm
              act={act}
              action="transfer_unit"
              disabled={busy || !recipient}
              fixed={{unit_id: unit.id, recipient_user_id: Number(recipient)}}
              key={recipient}
              submit="Transfer military batch"
            >
              <PlotField plots={state.plots.filter((plot) => plot.tribe_id === recipientTribe?.id)} />
            </ActionForm>
          </details>
        </>
      )}
      {!controls && unit.tribe_id === tribe?.id && (
        <S.Muted style={{marginTop: 12}}>Only the controlling player can change this deployment.</S.Muted>
      )}
    </S.Card>
  );
};
const Military = (props: TribesPanelProps) => {
  const [scope, setScope] = useState('tribe');
  const {state, tribe} = props;
  const units = state.units.filter((unit) => scope === 'world' || unit.tribe_id === tribe?.id);
  const jobs = state.jobs.filter(
    (job) =>
      ['working', 'queued'].includes(job.status) &&
      (state.catalog.units[job.item] || state.catalog.defenses[job.item]) &&
      (scope === 'world' || job.tribe_id === tribe?.id),
  );
  return (
    <S.Stack>
      <S.Card>
        <S.PanelTitle>
          <div>
            <S.Eyebrow>PREPARE FOR THE GREAT WAR</S.Eyebrow>
            <h2>Your army. Your decisions.</h2>
          </div>
          <S.Field>
            Intelligence
            <select onChange={(event) => setScope(event.target.value)} value={scope}>
              <option value="tribe">Our arsenal</option>
              <option value="world">Every tribe</option>
            </select>
          </S.Field>
        </S.PanelTitle>
        <S.Muted>
          Armies and production are public. Targets are private to your tribe until battle. Only each batch's controller
          can change its target. Unassigned units do not attack.
        </S.Muted>
        <S.Actions>
          {Object.entries(state.catalog.units).map(([item, spec]) => (
            <S.Badge key={item}>
              {label(item)} · {spec.damage} damage · range {spec.range}
            </S.Badge>
          ))}
        </S.Actions>
      </S.Card>
      <S.Cards>
        {units.map((unit) => (
          <Unit {...props} key={`${unit.id}:${unit.plot_id}:${unit.target_id}`} unit={unit} />
        ))}
      </S.Cards>
      {!units.length && (
        <S.Empty>Your story is still being written. Manufacture units in Production to prepare for battle.</S.Empty>
      )}
      <S.Card>
        <h2>Military in production</h2>
        {!jobs.length && <S.Muted>No military assignments queued.</S.Muted>}
        {jobs.map((job) => (
          <S.Row key={job.id}>
            <div>
              <strong>
                {count(job.quantity - job.completed)} {label(job.item)}
              </strong>
              <small>
                {tribeName(state, job.tribe_id)} · {memberName(state, job.user_id)}
              </small>
            </div>
            <S.Badge>{label(job.status)}</S.Badge>
          </S.Row>
        ))}
      </S.Card>
    </S.Stack>
  );
};
export default Military;
