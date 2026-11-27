import {useState} from 'react';
import {Check, Clock, Hammer, Pickaxe, Target, TriangleAlert, X} from 'lucide-react';

import {Tribe, TribesAccount, TribesPanelProps, TribesPlot, TribesState} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {
  AccountField,
  ActionForm,
  count,
  distance,
  duration,
  ITEM_NOTES,
  ItemKind,
  itemKind,
  label,
  ownedPlots,
  plotName,
  plural,
  time,
  tribeLabel,
  wholeNumber,
} from '../common';
import Progress from '../components/Progress';

import * as S from './Styles';

const CATEGORIES: [ItemKind, string][] = [
  ['material', 'Materials'],
  ['tool', 'Tools'],
  ['unit', 'Military'],
  ['defense', 'Defenses'],
  ['building', 'Buildings'],
];
const HOURS = [1, 2, 4, 8, 12];
const MINED = ['iron_ore', 'coal'];

// Mirrors the server's hourly gathering rate so the form can show what an assignment will bring in
const gatherRate = (state: TribesState, tribe: Tribe | undefined, plot: TribesPlot) => {
  const item = state.catalog.land[plot.terrain]?.resource ?? '';
  let rate = state.catalog.gather_rate + Math.min(5, Math.floor((state.viewer?.experience?.[item] ?? 0) / 100));
  let tool: string | null = null;
  if (item === 'timber') tool = 'axe';
  if ([...MINED, 'stone'].includes(item)) tool = 'pickaxe';
  if (tool && ((state.viewer?.inventory?.[tool] ?? 0) > 0 || (tribe?.inventory?.[tool] ?? 0) > 0)) rate += 5;
  const boosted = plot.buildings.some((building) => {
    const resource = state.catalog.buildings[building]?.resource;
    return resource === item || (resource === 'mining' && MINED.includes(item));
  });
  return boosted ? rate + 10 : rate;
};

export const WorkerQueue = ({act, busy, canPlay, now, state}: TribesPanelProps) => {
  const jobs = state.jobs.filter(
    (job) => job.user_id === state.viewer?.id && ['working', 'queued'].includes(job.status),
  );
  const booked = Math.max(0, ...jobs.map((job) => (new Date(job.end_at).getTime() - now) / 1000));
  return (
    <S.Card>
      <S.PanelTitle>
        <div>
          <S.Eyebrow>
            <Pickaxe size={14} /> One worker
          </S.Eyebrow>
          <h2>Your worker</h2>
        </div>
        <S.Badge $tone={jobs.length ? 'gold' : 'green'}>
          {jobs.length ? plural(jobs.length, 'assignment') : 'Available'}
        </S.Badge>
      </S.PanelTitle>
      <S.Muted>One worker. Up to 24 hours of queued work. Production continues while you are away.</S.Muted>
      <S.Meter>
        <div>
          <span>Time booked</span>
          <strong>
            {duration(booked, true)} of {Math.round(state.catalog.queue_seconds / 3600)}h
          </strong>
        </div>
        <Progress color="#e6aa3c" label="Worker time booked" max={state.catalog.queue_seconds} value={booked} />
      </S.Meter>
      {!jobs.length && (
        <S.Empty>
          <ItemIcon item="worker" size={44} />
          Your worker is ready. Gather resources or queue a recipe to contribute.
        </S.Empty>
      )}
      {jobs.map((job) => {
        const start = new Date(job.start_at).getTime();
        const end = new Date(job.end_at).getTime();
        const working = job.status === 'working';
        return (
          <S.Job key={job.id}>
            <S.JobHead>
              <S.RowMain>
                <S.JobIcon $working={working}>
                  <ItemIcon item={job.item} size={30} />
                </S.JobIcon>
                <div>
                  <strong>
                    {label(job.kind)} · {label(job.item)}
                  </strong>
                  <small>
                    {working ? `${duration((end - now) / 1000, true)} remaining` : `Starts ${time(job.start_at)}`}
                  </small>
                </div>
              </S.RowMain>
              <S.Button
                $size="small"
                $variant="danger"
                disabled={busy || !canPlay}
                onClick={() => act('cancel_job', {job_id: job.id})}
              >
                Cancel remaining
              </S.Button>
            </S.JobHead>
            <Progress
              active={working}
              label={`${label(job.item)} progress`}
              max={working ? end - start : Math.max(job.quantity, 1)}
              value={working ? now - start : job.completed}
            />
            <S.Hint>
              {count(job.completed)} / {count(job.quantity)} completed · goes to{' '}
              {job.destination === 'tribe' ? 'the warehouse' : 'your pack'}
            </S.Hint>
          </S.Job>
        );
      })}
      <S.Hint style={{marginTop: 10}}>
        Completed output is retained. Cancelling returns materials reserved for unfinished items.
      </S.Hint>
    </S.Card>
  );
};

const Gather = ({act, busy, canPlay, state, tribe}: TribesPanelProps) => {
  const owned = ownedPlots(state, tribe);
  const [hours, setHours] = useState(4);
  const [plotId, setPlotId] = useState<number | undefined>(owned[0]?.id);
  const plot = owned.find((entry) => entry.id === plotId) ?? owned[0];
  const resource = plot ? state.catalog.land[plot.terrain]?.resource : undefined;
  return (
    <S.Card>
      <S.Eyebrow>
        <Pickaxe size={14} /> Put your worker to work
      </S.Eyebrow>
      <h2>Gather resources</h2>
      <S.Muted>
        Choose a tribal plot and an assignment length. Resources arrive progressively; tools, facilities, and experience
        improve production.
      </S.Muted>
      {!owned.length && <S.Empty>Your tribe has no land to work yet.</S.Empty>}
      <ActionForm
        act={act}
        action="queue"
        disabled={busy || !canPlay || !owned.length}
        fixed={{kind: 'gather'}}
        icon={<Pickaxe size={16} />}
        resetOnSuccess={false}
        submit="Queue gathering"
      >
        {!!owned.length && (
          <S.FieldGroup aria-label="Location" role="radiogroup">
            Location
            <S.Choices $min={140} style={{maxHeight: 276, overflowY: 'auto', padding: 3}}>
              {owned.map((entry) => {
                const item = state.catalog.land[entry.terrain]?.resource ?? '';
                return (
                  <S.Choice $block key={entry.id}>
                    <input
                      checked={entry.id === plot?.id}
                      name="plot_id"
                      onChange={() => setPlotId(entry.id)}
                      required
                      type="radio"
                      value={entry.id}
                    />
                    <S.ChoiceBody>
                      <ItemIcon item={item} size={30} />
                      <span>
                        {label(item)}
                        <small>
                          {entry.x + 1}, {entry.y + 1} · {gatherRate(state, tribe, entry)}/h
                        </small>
                      </span>
                    </S.ChoiceBody>
                  </S.Choice>
                );
              })}
            </S.Choices>
          </S.FieldGroup>
        )}
        <S.InlineFields>
          <S.FieldGroup aria-label="Assignment length" role="radiogroup">
            Assignment length
            <S.Segmented>
              {HOURS.map((option) => (
                <S.Segment key={option}>
                  <input
                    checked={option === hours}
                    name="hours"
                    onChange={() => setHours(option)}
                    type="radio"
                    value={option}
                  />
                  <span>{option}h</span>
                </S.Segment>
              ))}
            </S.Segmented>
          </S.FieldGroup>
          <AccountField label="Deposit output into" mode="goods" name="destination" />
        </S.InlineFields>
        {plot && resource && (
          <S.Estimate>
            <ItemIcon item={resource} size={26} />
            <span>
              About <strong>{count(gatherRate(state, tribe, plot) * hours)}</strong> {label(resource).toLowerCase()}{' '}
              over {hours} hour{hours > 1 ? 's' : ''}, arriving a little at a time.
            </span>
          </S.Estimate>
        )}
      </ActionForm>
    </S.Card>
  );
};

const Workshop = ({act, busy, canPlay, now, state, tribe}: TribesPanelProps) => {
  const recipes = Object.keys(state.catalog.recipes);
  const [category, setCategory] = useState<ItemKind>('material');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [recipe, setRecipe] = useState(recipes.includes('lumber') ? 'lumber' : recipes[0]);
  const [source, setSource] = useState<TribesAccount>('tribe');
  const owned = ownedPlots(state, tribe);
  const definition = state.catalog.recipes[recipe];
  const building = !!state.catalog.buildings[recipe];
  const unit = state.catalog.units[recipe];
  const amount = building ? 1 : Number(quantity) || 0;
  // Until a quantity is entered the recipe is shown for a single item
  const basis = Math.max(1, amount);
  const eligible = building
    ? owned.filter(
        (plot) => state.catalog.buildings[recipe].land.includes(plot.terrain) && !plot.buildings.includes(recipe),
      )
    : owned;
  const origin = eligible.find((plot) => plot.id === Number(location));
  const targets =
    unit && origin
      ? state.tribes.filter(
          (team) =>
            team.id !== tribe?.id &&
            state.plots.some((plot) => plot.tribe_id === team.id && distance(plot, origin) <= unit.range),
        )
      : [];
  const stock = (source === 'tribe' ? tribe?.inventory : state.viewer?.inventory) ?? {};
  const facility = definition?.facility;
  const hasFacility = !facility || owned.some((plot) => plot.buildings.includes(facility));
  const short = definition
    ? Object.entries(definition.inputs).some(([item, needed]) => (stock[item] ?? 0) < needed * basis)
    : false;
  const queueEnd = Math.max(
    now,
    ...state.jobs
      .filter((job) => job.user_id === state.viewer?.id && ['working', 'queued'].includes(job.status))
      .map((job) => new Date(job.end_at).getTime()),
  );
  const seconds = (definition?.seconds ?? 0) * amount;
  const finish = queueEnd + seconds * 1000;
  const overbooked = finish > now + state.catalog.queue_seconds * 1000;
  const maximum = definition ? Math.max(1, Math.floor(state.catalog.queue_seconds / definition.seconds)) : 1;
  const options = recipes.filter((item) => itemKind(state.catalog, item) === category);

  const handleRecipe = (item: string) => {
    setRecipe(item);
    setQuantity('');
    setLocation('');
  };

  let warning = '';
  if (!hasFacility) warning = `Your tribe needs a ${label(facility ?? '').toLowerCase()} before it can make this.`;
  else if (overbooked) warning = 'This would push your worker past 24 hours of queued work.';
  else if (short)
    warning = `Not enough materials in ${source === 'tribe' ? 'the warehouse' : 'your pack'} for this order.`;

  return (
    <S.Card>
      <S.Eyebrow>
        <Hammer size={14} /> The workshop
      </S.Eyebrow>
      <h2>Craft, build, and manufacture</h2>
      <S.Muted>Materials are reserved when you queue work. Your tribe must own the required facility.</S.Muted>
      <S.Segmented aria-label="Recipe category" role="tablist">
        {CATEGORIES.filter(([kind]) => recipes.some((item) => itemKind(state.catalog, item) === kind)).map(
          ([kind, text]) => (
            <S.Segment key={kind}>
              <input
                checked={kind === category}
                name="recipe-category"
                onChange={() => setCategory(kind)}
                type="radio"
                value={kind}
              />
              <span>{text}</span>
            </S.Segment>
          ),
        )}
      </S.Segmented>
      <S.Recipes>
        {options.map((item) => (
          <S.Recipe
            $selected={item === recipe}
            aria-pressed={item === recipe}
            key={item}
            onClick={() => handleRecipe(item)}
            type="button"
          >
            <ItemIcon item={item} size={38} />
            {label(item)}
            <small>{duration(state.catalog.recipes[item].seconds)}</small>
          </S.Recipe>
        ))}
      </S.Recipes>
      {definition && (
        <S.Detail key={recipe}>
          <S.DetailHead>
            <span>
              <ItemIcon item={recipe} size={52} />
            </span>
            <div>
              <h3>{label(recipe)}</h3>
              <p>{ITEM_NOTES[recipe] ?? 'Made by your worker.'}</p>
            </div>
          </S.DetailHead>
          <S.Facts>
            <S.Badge $tone="neutral">
              <Clock size={12} /> {duration(definition.seconds)} each
            </S.Badge>
            {facility && (
              <S.Badge $tone={hasFacility ? 'green' : 'ember'}>
                {hasFacility ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                Needs a {label(facility).toLowerCase()}
              </S.Badge>
            )}
            {unit && (
              <S.Badge $tone="ember">
                {unit.damage} damage · range {unit.range}
              </S.Badge>
            )}
            {state.catalog.defenses[recipe] && (
              <S.Badge $tone="sky">Absorbs {state.catalog.defenses[recipe]} damage</S.Badge>
            )}
          </S.Facts>
          <S.FieldGroup as="div" style={{marginTop: 12}}>
            Ingredients{basis > 1 ? ` for ${count(basis)}` : ' per item'}
            <S.Ingredients>
              {Object.entries(definition.inputs).map(([item, needed]) => {
                const have = stock[item] ?? 0;
                return (
                  <S.Ingredient $short={have < needed * basis} key={item}>
                    <ItemIcon item={item} size={26} />
                    <span>
                      {count(needed * basis)} {label(item)}
                      <small>{count(have)} on hand</small>
                    </span>
                  </S.Ingredient>
                );
              })}
            </S.Ingredients>
          </S.FieldGroup>
          <ActionForm
            act={act}
            action="queue"
            disabled={busy || !canPlay || !eligible.length || !hasFacility}
            fixed={{item: recipe, kind: building ? 'build' : 'craft', ...(building ? {quantity: 1} : {})}}
            icon={<Hammer size={16} />}
            onSuccess={() => setQuantity('')}
            resetOnSuccess={false}
            submit={building ? 'Queue construction' : 'Queue production'}
          >
            <S.InlineFields>
              <S.Field>
                {building ? 'Build on' : 'Location'}
                <select
                  name="plot_id"
                  onChange={(event) => setLocation(event.target.value)}
                  required
                  value={origin ? location : ''}
                >
                  <option value="">{eligible.length ? 'Choose an owned plot' : 'No suitable plot'}</option>
                  {eligible.map((plot) => (
                    <option key={plot.id} value={plot.id}>
                      {plotName(plot)}
                    </option>
                  ))}
                </select>
              </S.Field>
              {!building && (
                <S.Field>
                  Quantity
                  <input
                    inputMode="numeric"
                    max={maximum}
                    min={1}
                    name="quantity"
                    onChange={(event) => setQuantity(wholeNumber(event.target.value, maximum))}
                    required
                    step="1"
                    type="number"
                    value={quantity}
                  />
                </S.Field>
              )}
            </S.InlineFields>
            {unit && (
              <S.Field>
                <span>
                  <Target size={12} style={{verticalAlign: '-1px'}} /> Initial secret target
                </span>
                <select key={location} name="target_id">
                  <option value="">Unassigned · choose later</option>
                  {targets.map((team) => (
                    <option key={team.id} value={team.id}>
                      {tribeLabel(team)}
                    </option>
                  ))}
                </select>
              </S.Field>
            )}
            <S.InlineFields>
              <AccountField label="Use materials from" mode="goods" name="source" onChange={setSource} value={source} />
              <AccountField label="Deposit output into" mode="goods" name="destination" />
            </S.InlineFields>
            <S.Estimate $warning={!!warning}>
              {warning ? <TriangleAlert size={18} /> : <Clock size={18} />}
              <span>
                {warning ||
                  (amount ? (
                    <>
                      Takes <strong>{duration(seconds)}</strong> of worker time. Done around{' '}
                      <strong>{time(new Date(finish).toISOString())}</strong>.
                    </>
                  ) : (
                    'Enter a quantity to see how long it takes.'
                  ))}
              </span>
            </S.Estimate>
          </ActionForm>
        </S.Detail>
      )}
    </S.Card>
  );
};

const Workers = (props: TribesPanelProps) => {
  const {state, tribe} = props;
  const owned = ownedPlots(state, tribe);
  return (
    <S.Grid>
      <S.Stack>
        <Gather {...props} />
        <Workshop {...props} />
      </S.Stack>
      <S.Stack>
        <WorkerQueue {...props} />
        <S.Card>
          <S.PanelTitle>
            <h2>Your infrastructure</h2>
            <S.Badge $tone="neutral">{plural(owned.length, 'plot')}</S.Badge>
          </S.PanelTitle>
          {!owned.length && <S.Empty>Purchase land from the world map to develop your economy.</S.Empty>}
          {owned.map((plot) => (
            <S.Row key={plot.id}>
              <S.RowMain>
                <ItemIcon item={plot.terrain} size={32} />
                <div>
                  <strong>{plotName(plot)}</strong>
                  <small>{plot.buildings.map(label).join(' · ') || 'No buildings yet'}</small>
                </div>
              </S.RowMain>
              <S.Structure>
                {plot.buildings.map((entry) => (
                  <ItemIcon item={entry} key={entry} size={24} title={label(entry)} />
                ))}
                <S.Badge $tone="neutral">
                  {plot.buildings.length}/{state.catalog.building_capacity}
                </S.Badge>
              </S.Structure>
            </S.Row>
          ))}
        </S.Card>
      </S.Stack>
    </S.Grid>
  );
};

export default Workers;
