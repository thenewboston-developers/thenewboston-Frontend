import {useMemo, useState} from 'react';
import {Crosshair, Lock, Radar, Shield, Swords, Target, TriangleAlert} from 'lucide-react';

import {TribesPanelProps, TribesUnit} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {
  AccountField,
  ActionForm,
  count,
  distance,
  label,
  memberAvatar,
  memberName,
  NumberField,
  PlotField,
  plotName,
  tribeLabel,
  tribeName,
} from '../common';
import Emblem from '../components/Emblem';
import PlayerAvatar from '../components/PlayerAvatar';
import WorldMap from '../WorldMap';

import * as S from './Styles';

const Unit = ({
  focused,
  onFocus,
  unit,
  ...props
}: TribesPanelProps & {focused: boolean; onFocus: (unit: TribesUnit | null) => void; unit: TribesUnit}) => {
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
            state.plots.some((plot) => plot.tribe_id === team.id && distance(plot, origin) <= spec.range),
        )
      : [];
  const controls = unit.controller_id === state.viewer?.id;
  const controller = memberName(state, unit.controller_id);
  const owner = state.tribes.find((team) => team.id === unit.tribe_id);
  const placed = state.plots.find((entry) => entry.id === unit.plot_id);
  const target = state.tribes.find((team) => team.id === unit.target_id);
  return (
    <S.Unit $focused={focused}>
      <S.UnitHead>
        <span>
          <ItemIcon item={unit.item} size={44} />
        </span>
        <div>
          <h2>
            {count(unit.quantity)} {label(unit.item)}
          </h2>
          <S.Badge $tone={spec ? 'ember' : 'sky'}>
            {spec
              ? `${count(spec.damage * unit.quantity)} DAMAGE`
              : `${count((state.catalog.defenses[unit.item] ?? 0) * unit.quantity)} DEFENSE`}
          </S.Badge>
        </div>
        {owner && owner.id !== tribe?.id && (
          <Emblem color={owner.color} emblem={owner.emblem} image={owner.emblem_image} size={30} />
        )}
      </S.UnitHead>
      <S.Row>
        <span>Controller</span>
        <S.RowMain style={{flex: 'none'}}>
          <PlayerAvatar avatar={memberAvatar(state, unit.controller_id)} name={controller} size={22} />
          <strong>{controller}</strong>
        </S.RowMain>
      </S.Row>
      <S.Row>
        <span>Stationed</span>
        <strong>
          {placed ? plotName(placed) : `Plot #${unit.plot_id}`}
          {spec ? ` · range ${spec.range}` : ''}
        </strong>
      </S.Row>
      {spec ? (
        <S.Row>
          <span>Target</span>
          {unit.target_id === undefined && (
            <S.Badge $tone="neutral">
              <Lock size={11} /> Classified
            </S.Badge>
          )}
          {unit.target_id !== undefined &&
            (target ? (
              <S.RowMain style={{flex: 'none'}}>
                <Emblem color={target.color} emblem={target.emblem} image={target.emblem_image} size={22} />
                <strong>{target.name}</strong>
              </S.RowMain>
            ) : (
              <strong>{tribeName(state, unit.target_id)}</strong>
            ))}
        </S.Row>
      ) : (
        <S.Row>
          <span>Role</span>
          <strong>Shared tribal defense</strong>
        </S.Row>
      )}
      {spec && (
        <S.Button
          $block
          $secondary
          $size="small"
          aria-pressed={focused}
          onClick={() => onFocus(focused ? null : unit)}
          style={{marginTop: 12}}
        >
          <Radar size={14} /> {focused ? 'Hide reach' : 'Show reach on the map'}
        </S.Button>
      )}
      {controls && canPlay && (
        <>
          <ActionForm
            act={act}
            action="deploy"
            disabled={busy}
            fixed={{unit_id: unit.id, plot_id: location}}
            icon={<Crosshair size={15} />}
            submit="Save deployment"
          >
            <S.InlineFields>
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
                      unit.target_id && targets.some((entry) => entry.id === unit.target_id) ? unit.target_id : ''
                    }
                    key={location}
                    name="target_id"
                  >
                    <option value="">No target</option>
                    {targets.map((team) => (
                      <option key={team.id} value={team.id}>
                        {tribeLabel(team)}
                      </option>
                    ))}
                  </select>
                </S.Field>
              ) : (
                <input name="target_id" type="hidden" value="" />
              )}
            </S.InlineFields>
            {spec && !targets.length && <S.Hint>No enemy territory is in range from this plot.</S.Hint>}
          </ActionForm>
          <S.Disclosure>
            <summary>Sell units on the marketplace</summary>
            <S.Hint style={{marginTop: 10}}>
              Listed units are removed from your arsenal and have their targets cleared. A buyer receives control.
            </S.Hint>
            <ActionForm
              act={act}
              action="create_listing"
              disabled={busy}
              fixed={{kind: 'sell', item: unit.item, unit_id: unit.id}}
              secondary
              submit="List military for sale"
            >
              <S.InlineFields>
                <NumberField label="Units to sell" max={unit.quantity} name="quantity" />
                <NumberField label="TNB per unit" name="price" />
              </S.InlineFields>
              <AccountField label="Receive sale proceeds into" mode="tnb" initial="personal" />
            </ActionForm>
          </S.Disclosure>
          <S.Disclosure>
            <summary>Transfer this batch</summary>
            <S.Hint style={{margin: '10px 0 12px'}}>
              The recipient controls this entire batch. Its existing target is cleared.
            </S.Hint>
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
              secondary
              submit="Transfer military batch"
            >
              <PlotField plots={state.plots.filter((plot) => plot.tribe_id === recipientTribe?.id)} />
            </ActionForm>
          </S.Disclosure>
        </>
      )}
      {!controls && unit.tribe_id === tribe?.id && (
        <S.Hint style={{marginTop: 12}}>Only the controlling player can change this deployment.</S.Hint>
      )}
    </S.Unit>
  );
};

const Military = (props: TribesPanelProps) => {
  const [focus, setFocus] = useState<TribesUnit | null>(null);
  const [scope, setScope] = useState('tribe');
  const {canPlay, state, tribe} = props;
  const mine = state.units.filter((unit) => unit.tribe_id === tribe?.id);
  const units = state.units.filter((unit) => scope === 'world' || unit.tribe_id === tribe?.id);
  const jobs = state.jobs.filter(
    (job) =>
      ['working', 'queued'].includes(job.status) &&
      (state.catalog.units[job.item] || state.catalog.defenses[job.item]) &&
      (scope === 'world' || job.tribe_id === tribe?.id),
  );
  const attack = mine.reduce((total, unit) => total + (state.catalog.units[unit.item]?.damage ?? 0) * unit.quantity, 0);
  const defense = mine.reduce((total, unit) => total + (state.catalog.defenses[unit.item] ?? 0) * unit.quantity, 0);
  const threat = state.units
    .filter((unit) => unit.tribe_id !== tribe?.id && unit.valid_target_ids.includes(tribe?.id ?? -1))
    .reduce((total, unit) => total + (state.catalog.units[unit.item]?.damage ?? 0) * unit.quantity, 0);
  const weapons = mine.filter((unit) => state.catalog.units[unit.item]);
  const idle = weapons.filter((unit) => !unit.target_id).length;
  let aim = weapons.length ? 'Every weapon is aimed' : 'No weapons yet';
  if (idle) aim = 'They sit out the final battle';
  const focused = focus ? state.units.find((unit) => unit.id === focus.id) : undefined;
  const focusPlot = focused?.plot_id;
  const focusReach = focused ? (state.catalog.units[focused.item]?.range ?? 0) : 0;
  const ranges = useMemo(
    () => (focusPlot !== undefined ? [{plotId: focusPlot, radius: focusReach}] : undefined),
    [focusPlot, focusReach],
  );
  return (
    <S.Stack>
      <S.Card $dark>
        <S.PanelTitle>
          <div>
            <S.Eyebrow $light>
              <Swords size={14} /> Prepare for the great war
            </S.Eyebrow>
            <h2>Your army. Your decisions.</h2>
          </div>
          <S.FieldGroup aria-label="Intelligence" role="radiogroup" style={{color: '#a9bfb1', minWidth: 230}}>
            Intelligence
            <S.Segmented $dark>
              <S.Segment>
                <input
                  checked={scope === 'tribe'}
                  name="military-scope"
                  onChange={() => setScope('tribe')}
                  type="radio"
                  value="tribe"
                />
                <span>Our arsenal</span>
              </S.Segment>
              <S.Segment>
                <input
                  checked={scope === 'world'}
                  name="military-scope"
                  onChange={() => setScope('world')}
                  type="radio"
                  value="world"
                />
                <span>Every tribe</span>
              </S.Segment>
            </S.Segmented>
          </S.FieldGroup>
        </S.PanelTitle>
        <S.Muted $dark>
          Armies and production are public. Targets are private to your tribe until battle. Only each batch's controller
          can change its target. Unassigned units do not attack.
        </S.Muted>
        <S.Forces>
          <S.Force $tone="ember">
            <span>
              <Swords size={13} /> Our attack
            </span>
            <strong>{count(attack)}</strong>
          </S.Force>
          <S.Force $tone="sky">
            <span>
              <Shield size={13} /> Our defense
            </span>
            <strong>{count(defense)}</strong>
          </S.Force>
          <S.Force $tone="gold">
            <span>
              <Target size={13} /> Enemy damage in reach
            </span>
            <strong>{count(threat)}</strong>
          </S.Force>
          {tribe && (
            <S.Force $tone={idle ? 'ember' : 'sky'} $urgent={!!idle}>
              <span>
                <TriangleAlert size={13} /> {idle === 1 ? 'Batch' : 'Batches'} with no target
              </span>
              <strong>{count(idle)}</strong>
              <small>{aim}</small>
            </S.Force>
          )}
        </S.Forces>
        <S.Actions>
          {Object.entries(state.catalog.units).map(([item, spec]) => (
            <S.Reference key={item}>
              <ItemIcon item={item} size={26} />
              <span>
                {label(item)}
                <small>
                  {spec.damage} damage · range {spec.range}
                </small>
              </span>
            </S.Reference>
          ))}
          {Object.entries(state.catalog.defenses).map(([item, absorbs]) => (
            <S.Reference key={item}>
              <ItemIcon item={item} size={26} />
              <span>
                {label(item)}
                <small>absorbs {absorbs}</small>
              </span>
            </S.Reference>
          ))}
        </S.Actions>
      </S.Card>
      <S.Grid>
        <S.Stack>
          <S.Cards $min={300}>
            {units.map((unit) => (
              <Unit
                {...props}
                focused={focused?.id === unit.id}
                key={`${unit.id}:${unit.plot_id}:${unit.target_id}`}
                onFocus={setFocus}
                unit={unit}
              />
            ))}
          </S.Cards>
          {!units.length && (
            <S.Empty>
              <ItemIcon item="catapult" size={48} />
              Your story is still being written. Manufacture units in Production to prepare for battle.
            </S.Empty>
          )}
        </S.Stack>
        <S.Stack>
          {!!state.plots.length && (
            <S.Card $dark $flush>
              <div style={{padding: '18px 20px 12px'}}>
                <S.Eyebrow $light>
                  <Radar size={14} /> War table
                </S.Eyebrow>
                <h2>{focused ? `Reach of ${label(focused.item)}` : 'Where everyone stands'}</h2>
                <S.Hint $dark>
                  {focused
                    ? 'Any tribe with land inside the marked area can be targeted from this position.'
                    : 'Red badges are attack power, blue badges are defense. Pick a weapon to see what it can reach.'}
                </S.Hint>
              </div>
              <div style={{padding: '0 10px 10px'}}>
                <WorldMap compact ranges={ranges} selectedId={focused?.plot_id} state={state} tribe={tribe} />
              </div>
            </S.Card>
          )}
          <S.Card>
            <h2>Military in production</h2>
            {!jobs.length && <S.Muted>No military assignments queued.</S.Muted>}
            {jobs.map((job) => (
              <S.Row key={job.id}>
                <S.RowMain>
                  <ItemIcon item={job.item} size={32} />
                  <div>
                    <strong>
                      {count(job.quantity - job.completed)} {label(job.item)}
                    </strong>
                    <small>
                      {tribeName(state, job.tribe_id)} · {memberName(state, job.user_id)}
                    </small>
                  </div>
                </S.RowMain>
                <S.Badge $tone={job.status === 'working' ? 'gold' : 'neutral'}>{label(job.status)}</S.Badge>
              </S.Row>
            ))}
          </S.Card>
        </S.Stack>
      </S.Grid>
    </S.Stack>
  );
};

export default Military;
