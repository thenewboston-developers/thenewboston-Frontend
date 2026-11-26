import {useState} from 'react';

import {TribesPanelProps} from 'types/tribes';

import {AccountField, ActionForm, count, date, duration, label, NumberField, PlotField, plotName} from './common';
import * as S from './Styles';

export const WorkerQueue = ({act, busy, canPlay, now, state}: TribesPanelProps) => {
  const jobs = state.jobs.filter(
    (job) => job.user_id === state.viewer?.id && ['working', 'queued'].includes(job.status),
  );
  return (
    <S.Card>
      <S.PanelTitle>
        <h2>Your worker</h2>
        <S.Badge>{jobs.length ? `${jobs.length} assignments` : 'Available'}</S.Badge>
      </S.PanelTitle>
      <S.Muted>One worker. Up to 24 hours of queued work. Production continues while you are away.</S.Muted>
      {!jobs.length && <S.Empty>Your worker is ready. Gather resources or queue a recipe to contribute.</S.Empty>}
      {jobs.map((job) => (
        <div key={job.id}>
          <S.Row>
            <div>
              <strong>
                {label(job.kind)} · {label(job.item)}
              </strong>
              <small>
                {job.status === 'queued'
                  ? `Starts ${date(job.start_at)}`
                  : `${duration((new Date(job.end_at).getTime() - now) / 1000)} remaining`}
              </small>
              <small>
                {count(job.completed)} / {count(job.quantity)} completed · {label(job.destination)}
              </small>
            </div>
            <S.Button $secondary disabled={busy || !canPlay} onClick={() => act('cancel_job', {job_id: job.id})}>
              Cancel remaining
            </S.Button>
          </S.Row>
          <S.Progress
            aria-label={`${label(job.item)} progress`}
            max={Math.max(job.quantity, 1)}
            value={job.completed}
          />
        </div>
      ))}
      <S.Muted>Completed output is retained. Cancelling returns materials reserved for unfinished items.</S.Muted>
    </S.Card>
  );
};

const Workers = (props: TribesPanelProps) => {
  const [location, setLocation] = useState('');
  const [recipe, setRecipe] = useState('lumber');
  const {act, busy, canPlay, state, tribe} = props;
  const owned = state.plots.filter((plot) => plot.tribe_id === tribe?.id);
  const definition = state.catalog.recipes[recipe];
  const building = !!state.catalog.buildings[recipe];
  const eligible = building
    ? owned.filter((plot) => state.catalog.buildings[recipe].land.includes(plot.terrain))
    : owned;
  const origin = eligible.find((plot) => plot.id === Number(location));
  const targets =
    state.catalog.units[recipe] && origin
      ? state.tribes.filter(
          (team) =>
            team.id !== tribe?.id &&
            state.plots.some(
              (plot) =>
                plot.tribe_id === team.id &&
                Math.max(Math.abs(plot.x - origin.x), Math.abs(plot.y - origin.y)) <= state.catalog.units[recipe].range,
            ),
        )
      : [];
  return (
    <S.Grid>
      <S.Stack>
        <S.Card>
          <S.Eyebrow>PUT YOUR WORKER TO WORK</S.Eyebrow>
          <h2>Gather resources</h2>
          <S.Muted>
            Choose a tribal plot and an assignment length. Resources arrive progressively; tools, facilities, and
            experience improve production.
          </S.Muted>
          <ActionForm
            act={act}
            action="queue"
            disabled={busy || !canPlay || !owned.length}
            fixed={{kind: 'gather'}}
            submit="Queue gathering"
          >
            <PlotField plots={owned} />
            <S.InlineFields>
              <S.Field>
                Assignment length
                <select defaultValue={4} name="hours">
                  {[1, 2, 4, 8, 12].map((hours) => (
                    <option key={hours} value={hours}>
                      {hours} hour{hours > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </S.Field>
              <AccountField label="Deposit output into" name="destination" />
            </S.InlineFields>
          </ActionForm>
        </S.Card>
        <S.Card>
          <S.Eyebrow>THE WORKSHOP</S.Eyebrow>
          <h2>Craft, build, and manufacture</h2>
          <S.Muted>Materials are reserved when you queue work. Your tribe must own the required facility.</S.Muted>
          <S.Field>
            Recipe
            <select onChange={(event) => setRecipe(event.target.value)} value={recipe}>
              {Object.keys(state.catalog.recipes).map((item) => (
                <option key={item} value={item}>
                  {label(item)}
                </option>
              ))}
            </select>
          </S.Field>
          {definition && (
            <>
              <S.Row>
                <span>Ingredients per item</span>
                <strong>
                  {Object.entries(definition.inputs)
                    .map(([item, quantity]) => `${quantity} ${label(item)}`)
                    .join(' + ')}
                </strong>
              </S.Row>
              <S.Row>
                <span>Worker time</span>
                <strong>{duration(definition.seconds)}</strong>
              </S.Row>
              <S.Row>
                <span>Required facility</span>
                <strong>{definition.facility ? label(definition.facility) : 'None'}</strong>
              </S.Row>
              {state.catalog.units[recipe] && (
                <S.Row>
                  <span>Military stats</span>
                  <strong>
                    {state.catalog.units[recipe].damage} damage · range {state.catalog.units[recipe].range}
                  </strong>
                </S.Row>
              )}
              {state.catalog.defenses[recipe] && (
                <S.Row>
                  <span>Damage absorption</span>
                  <strong>{state.catalog.defenses[recipe]}</strong>
                </S.Row>
              )}
              <ActionForm
                act={act}
                action="queue"
                disabled={busy || !canPlay || !eligible.length}
                fixed={{item: recipe, kind: building ? 'build' : 'craft', ...(building ? {quantity: 1} : {})}}
                key={recipe}
                submit={building ? 'Queue construction' : 'Queue production'}
              >
                <S.Field>
                  Location
                  <select
                    name="plot_id"
                    onChange={(event) => setLocation(event.target.value)}
                    required
                    value={origin ? location : ''}
                  >
                    <option value="">Choose an owned plot</option>
                    {eligible.map((plot) => (
                      <option key={plot.id} value={plot.id}>
                        {plotName(plot)}
                      </option>
                    ))}
                  </select>
                </S.Field>
                {state.catalog.units[recipe] && (
                  <S.Field>
                    Initial secret target
                    <select key={location} name="target_id">
                      <option value="">Unassigned · choose later</option>
                      {targets.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.emblem} {team.name}
                        </option>
                      ))}
                    </select>
                  </S.Field>
                )}
                {!building && (
                  <NumberField
                    label="Quantity"
                    max={Math.max(1, Math.floor(state.catalog.queue_seconds / definition.seconds))}
                    name="quantity"
                  />
                )}
                <S.InlineFields>
                  <AccountField label="Use materials from" name="source" />
                  <AccountField label="Deposit output into" name="destination" />
                </S.InlineFields>
              </ActionForm>
            </>
          )}
        </S.Card>
      </S.Stack>
      <S.Stack>
        <WorkerQueue {...props} />
        <S.Card>
          <h2>Your infrastructure</h2>
          {!owned.length && <S.Empty>Purchase land from the world map to develop your economy.</S.Empty>}
          {owned.map((plot) => (
            <S.Row key={plot.id}>
              <div>
                <strong>{plotName(plot)}</strong>
                <small>{plot.buildings.map(label).join(' · ') || 'No buildings yet'}</small>
              </div>
              <S.Badge>
                {plot.buildings.length}/{state.catalog.building_capacity}
              </S.Badge>
            </S.Row>
          ))}
        </S.Card>
      </S.Stack>
    </S.Grid>
  );
};
export default Workers;
