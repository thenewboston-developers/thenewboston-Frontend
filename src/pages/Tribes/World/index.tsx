import {useMemo, useState} from 'react';
import {ArrowRight, Eye, Globe, Lock} from 'lucide-react';

import {TribesPanelProps} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {count, distance, label, memberName, plotName, plural, tribeName} from '../common';
import Emblem from '../components/Emblem';
import WorldMap from '../WorldMap';

import * as S from './Styles';

const World = ({act, busy, canPlay, go, state, tribe}: TribesPanelProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const plot =
    state.plots.find((entry) => entry.id === selected) ??
    state.plots.find((entry) => entry.tribe_id === tribe?.id && entry.price === 0) ??
    state.plots.find((entry) => entry.tribe_id === tribe?.id) ??
    state.plots[0];
  const owner = state.tribes.find((entry) => entry.id === plot?.tribe_id);
  const adjacent = !!plot && state.plots.some((entry) => entry.tribe_id === tribe?.id && distance(entry, plot) === 1);
  const units = state.units.filter((entry) => entry.tribe_id === owner?.id);
  const production = state.jobs.filter(
    (entry) =>
      entry.tribe_id === owner?.id && ['working', 'queued'].includes(entry.status) && state.catalog.units[entry.item],
  );
  // Weapons standing on the selected plot draw their reach on the map
  const reach = Math.max(
    0,
    ...state.units
      .filter((entry) => entry.plot_id === plot?.id)
      .map((entry) => state.catalog.units[entry.item]?.range ?? 0),
  );
  const resource = plot ? state.catalog.land[plot.terrain]?.resource : undefined;
  const plotId = plot?.id;
  const ranges = useMemo(
    () => (plotId !== undefined && reach ? [{plotId, radius: reach}] : undefined),
    [plotId, reach],
  );

  return (
    <S.Grid $wide>
      <S.Card $dark $flush>
        <S.MapHead>
          <S.PanelTitle>
            <div>
              <S.Eyebrow $light>
                <Globe size={14} /> Season {state.season.id}
              </S.Eyebrow>
              <h2>The world</h2>
            </div>
            <S.Actions>
              <S.Badge $tone="dark">{plural(state.plots.length, 'plot')}</S.Badge>
              <S.Badge $tone="dark">{plural(state.tribes.length, 'tribe')}</S.Badge>
            </S.Actions>
          </S.PanelTitle>
          <S.Muted $dark style={{margin: 0}}>
            Select a plot to inspect its resources, owner, and military. Expansion must touch your existing land,
            including diagonals.
          </S.Muted>
        </S.MapHead>
        {!state.plots.length ? (
          <S.MapFrame style={{paddingBottom: 18}}>
            <S.Empty $dark>
              <ItemIcon item="forest" size={48} />
              <strong>No land to show yet</strong>
              The world is generated when recruitment ends. Every tribe starts with comparable surroundings.
            </S.Empty>
          </S.MapFrame>
        ) : (
          <>
            <S.MapFrame>
              <WorldMap
                canExpand={canPlay}
                onSelect={setSelected}
                ranges={ranges}
                selectedId={plot?.id}
                state={state}
                tribe={tribe}
              />
            </S.MapFrame>
            <S.Legend>
              {Object.entries(state.catalog.land).map(([terrain, land]) => (
                <S.LegendItem key={terrain}>
                  <ItemIcon item={terrain} size={26} />
                  <span>
                    {label(terrain)}
                    <small>
                      {label(land.resource)} · {land.price} TNB
                    </small>
                  </span>
                </S.LegendItem>
              ))}
            </S.Legend>
          </>
        )}
      </S.Card>
      <S.Stack>
        {plot && (
          <S.Card key={plot.id}>
            <S.PlotHead>
              <S.PlotArt $color={owner?.color}>
                <ItemIcon item={plot.terrain} size={52} />
              </S.PlotArt>
              <div>
                <S.Eyebrow style={{marginBottom: 4}}>
                  Plot {plot.x + 1}, {plot.y + 1}
                </S.Eyebrow>
                <h2>{label(plot.terrain)}</h2>
              </div>
              {owner && plot.price === 0 && (
                <S.Badge $tone="gold" style={{marginLeft: 'auto'}}>
                  Home
                </S.Badge>
              )}
            </S.PlotHead>
            <S.Row>
              <span>Owner</span>
              {owner ? (
                <S.RowMain style={{flex: 'none'}}>
                  <Emblem color={owner.color} emblem={owner.emblem} size={22} />
                  <strong>{owner.name}</strong>
                </S.RowMain>
              ) : (
                <strong>Unclaimed</strong>
              )}
            </S.Row>
            <S.Row>
              <span>Resource</span>
              <S.RowMain style={{flex: 'none'}}>
                {resource && <ItemIcon item={resource} size={22} />}
                <strong>{label(resource ?? '')}</strong>
              </S.RowMain>
            </S.Row>
            <S.Row>
              <span>Infrastructure</span>
              {plot.buildings.length ? (
                <S.Structures>
                  {plot.buildings.map((building) => (
                    <span key={building}>
                      <ItemIcon item={building} size={20} />
                      {label(building)}
                    </span>
                  ))}
                </S.Structures>
              ) : (
                <strong>Undeveloped</strong>
              )}
            </S.Row>
            {!!reach && (
              <S.Row>
                <span>Weapons here reach</span>
                <strong>{plural(reach, 'plot')}</strong>
              </S.Row>
            )}
            {!owner && (
              <>
                <S.Row>
                  <span>Purchase price</span>
                  <S.RowMain style={{flex: 'none'}}>
                    <ItemIcon item="tnb" size={20} />
                    <strong>{count(plot.price)} TNB</strong>
                  </S.RowMain>
                </S.Row>
                <S.Muted style={{marginTop: 12}}>
                  Paid from your shared treasury. Land belongs to your tribe until the season ends.
                </S.Muted>
                <S.Button
                  $block
                  disabled={busy || !canPlay || !adjacent || (tribe?.treasury ?? 0) < plot.price}
                  onClick={() => act('purchase_land', {plot_id: plot.id})}
                >
                  {adjacent ? 'Purchase land' : 'Expand from adjacent land'}
                </S.Button>
                {canPlay && adjacent && (tribe?.treasury ?? 0) < plot.price && (
                  <S.Hint style={{marginTop: 8}}>
                    The treasury holds {count(tribe?.treasury)} TNB. Deposit more in Inventory to afford this plot.
                  </S.Hint>
                )}
              </>
            )}
            {owner && owner.id === tribe?.id && canPlay && (
              <S.Button $block $secondary onClick={() => go?.('production')} style={{marginTop: 14}}>
                Put your worker here <ArrowRight size={15} />
              </S.Button>
            )}
          </S.Card>
        )}
        {owner && (
          <S.Card key={`intelligence:${owner.id}`}>
            <S.Eyebrow>
              <Eye size={14} /> Public intelligence
            </S.Eyebrow>
            <S.PlotHead style={{marginBottom: 6}}>
              <Emblem color={owner.color} emblem={owner.emblem} size={36} />
              <h2>{owner.name}</h2>
            </S.PlotHead>
            <S.Muted>{owner.motto || owner.description}</S.Muted>
            {!units.length && !production.length && <S.Empty>No military production reported.</S.Empty>}
            {units.map((unit) => (
              <S.Row key={unit.id}>
                <S.RowMain>
                  <ItemIcon item={unit.item} size={32} />
                  <div>
                    <strong>
                      {count(unit.quantity)} {label(unit.item)}
                    </strong>
                    <small>
                      {state.catalog.units[unit.item]
                        ? `${count(state.catalog.units[unit.item].damage * unit.quantity)} damage · range ${state.catalog.units[unit.item].range}`
                        : `${count((state.catalog.defenses[unit.item] ?? 0) * unit.quantity)} defense`}
                    </small>
                    <small>
                      {memberName(state, unit.controller_id)} ·{' '}
                      {plotName(state.plots.find((entry) => entry.id === unit.plot_id) ?? plot!)}
                    </small>
                  </div>
                </S.RowMain>
                {state.catalog.units[unit.item] &&
                  (unit.target_id === undefined ? (
                    <S.Badge $tone="neutral">
                      <Lock size={11} /> Target classified
                    </S.Badge>
                  ) : (
                    <S.Badge $tone="ember">{tribeName(state, unit.target_id)}</S.Badge>
                  ))}
              </S.Row>
            ))}
            {production.map((job) => (
              <S.Row key={job.id}>
                <S.RowMain>
                  <ItemIcon item={job.item} size={32} />
                  <strong>
                    {job.quantity - job.completed} {label(job.item)}
                  </strong>
                </S.RowMain>
                <S.Badge $tone="gold">In production</S.Badge>
              </S.Row>
            ))}
          </S.Card>
        )}
      </S.Stack>
    </S.Grid>
  );
};

export default World;
