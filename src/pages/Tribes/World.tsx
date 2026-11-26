import {useState} from 'react';

import {TribesPanelProps} from 'types/tribes';

import {count, label, memberName, plotName, terrainIcon, tribeName} from './common';
import * as S from './Styles';

const TERRAIN_COLORS: Record<string, string> = {
  coal_deposit: '#b9c6b4',
  forest: '#b8cfa2',
  iron_deposit: '#c3cec5',
  plains: '#e1ddb1',
  quarry: '#d1d1bd',
  wilderness: '#d0d9b2',
};
const World = ({act, busy, canPlay, state, tribe}: TribesPanelProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const plot =
    state.plots.find((entry) => entry.id === selected) ??
    state.plots.find((entry) => entry.tribe_id === tribe?.id) ??
    state.plots[0];
  const owner = state.tribes.find((entry) => entry.id === plot?.tribe_id);
  const adjacent =
    !!plot &&
    state.plots.some(
      (entry) => entry.tribe_id === tribe?.id && Math.max(Math.abs(entry.x - plot.x), Math.abs(entry.y - plot.y)) === 1,
    );
  const columns = Math.max(...state.plots.map((entry) => entry.x), 0) + 1;
  const units = state.units.filter((entry) => entry.tribe_id === owner?.id);
  const production = state.jobs.filter(
    (entry) =>
      entry.tribe_id === owner?.id && ['working', 'queued'].includes(entry.status) && state.catalog.units[entry.item],
  );
  return (
    <S.Grid>
      <S.Card>
        <S.PanelTitle>
          <h2>The world</h2>
          <S.Badge>{state.plots.length} plots</S.Badge>
        </S.PanelTitle>
        <S.Muted>
          Select a plot to inspect its resources, owner, and military. Expansion must touch your existing land,
          including diagonals.
        </S.Muted>
        {!state.plots.length ? (
          <S.Empty>
            The world is generated when recruitment ends. Every tribe starts with comparable surroundings.
          </S.Empty>
        ) : (
          <S.MapScroll>
            <S.Map $columns={columns} aria-label="World map">
              {state.plots.map((entry) => {
                const team = state.tribes.find((value) => value.id === entry.tribe_id);
                return (
                  <S.Tile
                    $color={team?.color || TERRAIN_COLORS[entry.terrain]}
                    $selected={entry.id === plot?.id}
                    aria-label={`${plotName(entry)} · ${team?.name ?? 'Unowned'} · ${entry.price} TNB`}
                    aria-pressed={entry.id === plot?.id}
                    key={entry.id}
                    onClick={() => setSelected(entry.id)}
                    title={`${plotName(entry)} · ${team?.name ?? 'Unowned'}`}
                  >
                    {team?.emblem || terrainIcon[entry.terrain] || '◇'}
                    {team && (
                      <small>
                        {entry.x + 1},{entry.y + 1}
                      </small>
                    )}
                  </S.Tile>
                );
              })}
            </S.Map>
          </S.MapScroll>
        )}
        <S.Actions style={{marginTop: 16}}>
          {Object.keys(state.catalog.land).map((terrain) => (
            <S.Badge key={terrain}>
              {terrainIcon[terrain]} {label(terrain)}
            </S.Badge>
          ))}
        </S.Actions>
      </S.Card>
      <S.Stack>
        {plot && (
          <S.Card>
            <S.Eyebrow>
              PLOT {plot.x + 1}, {plot.y + 1}
            </S.Eyebrow>
            <h2>
              {terrainIcon[plot.terrain]} {label(plot.terrain)}
            </h2>
            <S.Row>
              <span>Owner</span>
              <strong>{owner?.name || 'Unclaimed'}</strong>
            </S.Row>
            <S.Row>
              <span>Resource</span>
              <strong>{label(state.catalog.land[plot.terrain]?.resource ?? '')}</strong>
            </S.Row>
            <S.Row>
              <span>Infrastructure</span>
              <strong>{plot.buildings.map(label).join(', ') || 'Undeveloped'}</strong>
            </S.Row>
            {!owner && (
              <>
                <S.Row>
                  <span>Purchase price</span>
                  <strong>{count(plot.price)} TNB</strong>
                </S.Row>
                <S.Muted style={{marginTop: 12}}>
                  Paid from your shared treasury. Land belongs to your tribe until the season ends.
                </S.Muted>
                <S.Button
                  disabled={busy || !canPlay || !adjacent || (tribe?.treasury ?? 0) < plot.price}
                  onClick={() => act('purchase_land', {plot_id: plot.id})}
                >
                  {adjacent ? 'Purchase land' : 'Expand from adjacent land'}
                </S.Button>
              </>
            )}
          </S.Card>
        )}
        {owner && (
          <S.Card>
            <S.Eyebrow>PUBLIC INTELLIGENCE</S.Eyebrow>
            <h2>
              {owner.emblem} {owner.name}
            </h2>
            <S.Muted>{owner.motto || owner.description}</S.Muted>
            {!units.length && !production.length && <S.Empty>No military production reported.</S.Empty>}
            {units.map((unit) => (
              <S.Row key={unit.id}>
                <div>
                  <strong>
                    {count(unit.quantity)} {label(unit.item)}
                  </strong>
                  <small>
                    Controlled by {memberName(state, unit.controller_id)} · plot #{unit.plot_id}
                  </small>
                  <small>
                    {state.catalog.units[unit.item]
                      ? `${count(state.catalog.units[unit.item].damage * unit.quantity)} damage · range ${state.catalog.units[unit.item].range}`
                      : `${count((state.catalog.defenses[unit.item] ?? 0) * unit.quantity)} defense`}
                  </small>
                </div>
                <S.Badge>
                  {unit.target_id === undefined ? 'Target classified' : tribeName(state, unit.target_id)}
                </S.Badge>
              </S.Row>
            ))}
            {production.map((job) => (
              <S.Row key={job.id}>
                <strong>
                  {job.quantity - job.completed} {label(job.item)}
                </strong>
                <S.Badge>In production</S.Badge>
              </S.Row>
            ))}
          </S.Card>
        )}
      </S.Stack>
    </S.Grid>
  );
};
export default World;
