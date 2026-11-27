import {
  KeyboardEvent,
  memo,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {LocateFixed, Maximize, Minus, Plus} from 'lucide-react';

import {Tribe, TribesPlot, TribesState} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {count, distance, label, plotName, tribeLabel} from '../common';
import {palette} from '../theme';

import * as S from './Styles';

export interface MapRange {
  plotId: number;
  radius: number;
}

interface WorldMapProps {
  canExpand?: boolean;
  compact?: boolean;
  onSelect?: (plotId: number) => void;
  ranges?: MapRange[];
  selectedId?: number | null;
  state: TribesState;
  tribe?: Tribe;
}

// Isometric tile: twice as wide as it is tall, with a slab of earth below the edge tiles
const TILE_WIDTH = 96;
const TILE_HEIGHT = 48;
const DEPTH = 18;
const HEADROOM = 74;
const PADDING = 30;
const MAX_TILE_PIXELS = 136;
const ANIMATED_TILE_LIMIT = 450;
const DIAMOND = `M0 ${-TILE_HEIGHT / 2}L${TILE_WIDTH / 2} 0 0 ${TILE_HEIGHT / 2} ${-TILE_WIDTH / 2} 0Z`;

const GROUND: Record<string, [string, string]> = {
  coal_deposit: ['#7b887d', '#748176'],
  forest: ['#5f9c63', '#58945d'],
  iron_deposit: ['#9ba591', '#949e8a'],
  plains: ['#b9cf72', '#b1c86b'],
  quarry: ['#b5b9a8', '#adb2a1'],
  wilderness: ['#86b46c', '#7fad66'],
};

const hex = (color: string | undefined) => (color && /^#[0-9a-f]{6}$/i.test(color) ? color : '#46634a');

const Pine = ({scale = 1, x, y}: {scale?: number; x: number; y: number}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="1" cy="1" fill="rgba(13, 31, 26, 0.22)" rx="9" ry="3.6" />
    <rect fill="#6b4226" height="8" width="3" x="-1.5" y="-7" />
    <path d="M0-36 9-20H-9ZM0-29 11.5-11h-23ZM0-21 13-3h-26Z" fill="#3f8455" />
    <path d="M0-36 9-20H0ZM0-29 11.5-11H0ZM0-21 13-3H0Z" fill="#2f6b4f" />
    <path d="M0-36-4-29H0ZM0-29l-5 8h5Z" fill="#62a66a" />
  </g>
);

const Block = ({height = 8, size = 9, x, y}: {height?: number; size?: number; x: number; y: number}) => {
  const half = size / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-size} ${-height}L0 ${half - height}V${half}L${-size} 0Z`} fill="#9aa5a6" />
      <path d={`M${size} ${-height}L0 ${half - height}V${half}L${size} 0Z`} fill="#7b8789" />
      <path d={`M0 ${-half - height}L${size} ${-height} 0 ${half - height} ${-size} ${-height}Z`} fill="#d3dbd9" />
    </g>
  );
};

const Mound = ({base, dark, light}: {base: string; dark: string; light: string}) => (
  <>
    <ellipse cx="1" cy="6" fill="rgba(13, 31, 26, 0.2)" rx="22" ry="7" />
    <path d="M-19 5-12-10-3-17 6-12 14-15 21 3 8 10H-8Z" fill={base} />
    <path d="M6-12 14-15 21 3 8 10 3-1Z" fill={dark} />
    <path d="M-12-10-3-17-1-7-10-2Z" fill={light} />
  </>
);

const DECOR: Record<string, ReactNode> = {
  coal_deposit: (
    <>
      <Mound base="#59636a" dark="#434c52" light="#737e85" />
      <path d="M-9 2-4-4 3-2 2 5-5 7ZM7-6l5-2 3 5-5 3ZM-2-12l4-2 3 4-5 2Z" fill="#23272b" />
      <path d="M-6 0l3-2 2 1ZM9-6l2-1 1 2ZM0-12l2-1 1 2Z" fill="#7d8790" />
    </>
  ),
  forest: (
    <>
      <Pine scale={0.86} x={-20} y={-3} />
      <Pine scale={1.08} x={3} y={-9} />
      <Pine scale={0.8} x={22} y={2} />
      <Pine scale={0.95} x={-3} y={9} />
    </>
  ),
  iron_deposit: (
    <>
      <Mound base="#8f9a9c" dark="#6c777a" light="#b9c2c3" />
      <path d="M-8 1-4-3 1 0-3 5ZM8-7l4-1 2 4-4 2ZM-1-12l3-2 3 3-4 2Z" fill="#c7773f" />
      <path d="M-6 0l2-1 1 1ZM10-7l1-1 1 2Z" fill="#e7a56e" />
    </>
  ),
  plains: (
    <>
      <g fill="none" strokeDasharray="1.5 4.6" strokeLinecap="round" strokeWidth="3.4">
        <path d="M-30-1-4 12M-20-7 9 7.5M-9-12.5 20 2M2-18 30-4" stroke="#d8ad3a" />
        <path d="M-30-2.5-4 10.5M-20-8.5 9 6M-9-14 20 .5M2-19.5 30-5.5" stroke="#f0d06a" />
      </g>
    </>
  ),
  quarry: (
    <>
      <ellipse cx="0" cy="6" fill="rgba(13, 31, 26, 0.18)" rx="24" ry="7" />
      <Block height={7} size={10} x={-13} y={-2} />
      <Block height={12} size={11} x={8} y={-5} />
      <Block height={6} size={8} x={-1} y={8} />
    </>
  ),
  wilderness: (
    <>
      <ellipse cx="-17" cy="-1" fill="#4f8f55" rx="9" ry="6.5" />
      <ellipse cx="-14" cy="-4" fill="#72b06a" rx="5.5" ry="4" />
      <ellipse cx="22" cy="6" fill="#4f8f55" rx="6" ry="4.5" />
      <ellipse cx="23.5" cy="4.5" fill="#72b06a" rx="3.5" ry="2.5" />
      <g transform="translate(5 2)">
        <ellipse cx="0.5" cy="3.4" fill="rgba(13, 31, 26, 0.2)" rx="8" ry="2.4" />
        <path d="M-5-3v6M-2-3v6M3-3v6M6-3v6" stroke="#8f5730" strokeWidth="1.5" />
        <ellipse cx="0.5" cy="-5" fill="#b9794a" rx="7" ry="3.7" />
        <path d="M5-7 9-12.5 11.5-10.5 8-5Z" fill="#b9794a" />
        <path d="M9.5-12.5l-1.5-4M10-12.5l2.5-3.5" stroke="#8f5730" strokeLinecap="round" strokeWidth="1.1" />
        <ellipse cx="-6.5" cy="-6" fill="#e9d8bd" rx="1.6" ry="1.4" />
      </g>
    </>
  ),
};

const Keep = ({clip, color, emblem, image}: {clip: string; color: string; emblem: string; image?: string | null}) => (
  <g>
    <ellipse cx="2" cy="8" fill="rgba(13, 31, 26, 0.26)" rx="30" ry="10" />
    <path d="M-24-2 0 10V-4L-24-16Z" fill="#efe3c8" />
    <path d="M24-2 0 10V-4L24-16Z" fill="#d1c09c" />
    <path d="M-28-15 0-1 0-36Z" fill={color} />
    <path d="M28-15 0-1 0-36Z" fill={color} />
    <path d="M28-15 0-1 0-36Z" fill="rgba(13, 31, 26, 0.24)" />
    <path d="M-28-15 0-1 0-36Z" fill="rgba(255, 255, 255, 0.12)" />
    <path d="M6 7V-1q4-5 8-3V3Z" fill="#6b4226" />
    <path d="M-17-4v-5l5 2.5v5ZM-8 .5v-5l5 2.5v5Z" fill="#f6c865" />
    <circle className="smoke" cx="-12" cy="-30" fill="#e8efe9" r="4" />
    <circle className="smoke" cx="-12" cy="-30" fill="#e8efe9" r="3" style={{animationDelay: '1.8s'}} />
    <path d="M20-12V-52" stroke="#5a3a20" strokeLinecap="round" strokeWidth="2.2" />
    <path className="flag" d="M21-52q6-3.5 11 0t11 0v12q-6 3.5-11 0t-11 0Z" fill={color} />
    <circle cx="0" cy="-52" fill="#fffdf6" r="12.5" stroke={color} strokeWidth="3" />
    {image ? (
      <image
        clipPath={`url(#${clip})`}
        height="23"
        href={image}
        preserveAspectRatio="xMidYMid slice"
        width="23"
        x="-11.5"
        y="-63.5"
      />
    ) : (
      <text fontSize="14" textAnchor="middle" x="0" y="-47">
        {emblem}
      </text>
    )}
  </g>
);

interface Geometry {
  height: number;
  position: (plot: {x: number; y: number}) => [number, number];
  width: number;
}

const BUILDING_SPOTS: [number, number][] = [
  [-41, -17],
  [18, -9],
  [-13, 3],
];

const Terrain = memo(
  ({
    geometry,
    owners,
    plots,
    size,
  }: {
    geometry: Geometry;
    owners: Map<number, Tribe>;
    plots: TribesPlot[];
    size: {columns: number; rows: number};
  }) => {
    const animate = plots.length <= ANIMATED_TILE_LIMIT;
    return (
      <g>
        {plots.map((plot) => {
          const [x, y] = geometry.position(plot);
          const owner = plot.tribe_id === null ? undefined : owners.get(plot.tribe_id);
          const [ground, alternate] = GROUND[plot.terrain] ?? GROUND.wilderness;
          return (
            <g key={plot.id} transform={`translate(${x} ${y})`}>
              <g
                className={animate ? 'tile' : undefined}
                style={animate ? {animationDelay: `${(plot.x + plot.y) * 24}ms`} : undefined}
              >
                {plot.y === size.rows - 1 && (
                  <>
                    <path
                      d={`M${-TILE_WIDTH / 2} 0 0 ${TILE_HEIGHT / 2}v${DEPTH}L${-TILE_WIDTH / 2} ${DEPTH}Z`}
                      fill="#8a6a45"
                    />
                    <path d={`M${-TILE_WIDTH / 2} 0 0 ${TILE_HEIGHT / 2}v5L${-TILE_WIDTH / 2} 5Z`} fill="#4c7f4f" />
                  </>
                )}
                {plot.x === size.columns - 1 && (
                  <>
                    <path
                      d={`M${TILE_WIDTH / 2} 0 0 ${TILE_HEIGHT / 2}v${DEPTH}L${TILE_WIDTH / 2} ${DEPTH}Z`}
                      fill="#6c5035"
                    />
                    <path d={`M${TILE_WIDTH / 2} 0 0 ${TILE_HEIGHT / 2}v5L${TILE_WIDTH / 2} 5Z`} fill="#3d6b44" />
                  </>
                )}
                <path
                  d={DIAMOND}
                  fill={(plot.x + plot.y) % 2 ? alternate : ground}
                  stroke="rgba(13, 31, 26, 0.16)"
                  strokeWidth="1"
                />
                {owner && <path d={DIAMOND} fill={hex(owner.color)} opacity="0.3" />}
              </g>
            </g>
          );
        })}
      </g>
    );
  },
);

const Scenery = memo(
  ({
    clip,
    geometry,
    owners,
    plots,
  }: {
    clip: string;
    geometry: Geometry;
    owners: Map<number, Tribe>;
    plots: TribesPlot[];
  }) => {
    const animate = plots.length <= ANIMATED_TILE_LIMIT;
    return (
      <g>
        {/* One outline for every keep: a clip path is measured in the coordinates of the tile that uses it */}
        <clipPath id={clip}>
          <circle cx="0" cy="-52" r="11" />
        </clipPath>
        {plots.map((plot) => {
          const [x, y] = geometry.position(plot);
          const owner = plot.tribe_id === null ? undefined : owners.get(plot.tribe_id);
          const home = !!owner && plot.price === 0;
          return (
            <g key={plot.id} transform={`translate(${x} ${y})`}>
              <g
                className={animate ? 'tile' : undefined}
                style={animate ? {animationDelay: `${(plot.x + plot.y) * 24}ms`} : undefined}
              >
                {home ? (
                  <Keep clip={clip} color={hex(owner.color)} emblem={owner.emblem} image={owner.emblem_image} />
                ) : (
                  DECOR[plot.terrain]
                )}
                {plot.buildings.slice(0, BUILDING_SPOTS.length).map((building, index) => (
                  <g
                    key={building}
                    transform={`translate(${BUILDING_SPOTS[index][0] - (home ? 6 : 0)} ${BUILDING_SPOTS[index][1] + (home ? 8 : 0)})`}
                  >
                    <ellipse cx="13" cy="24" fill="rgba(13, 31, 26, 0.22)" rx="11" ry="3.5" />
                    <ItemIcon item={building} size={26} />
                  </g>
                ))}
              </g>
            </g>
          );
        })}
      </g>
    );
  },
);

const WorldMap = ({canExpand, compact, onSelect, ranges, selectedId, state, tribe}: WorldMapProps) => {
  const [animating, setAnimating] = useState(false);
  const [focused, setFocused] = useState<number | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [size, setSize] = useState({height: 0, width: 0});
  const [view, setView] = useState({k: 1, x: 0, y: 0});
  const drag = useRef<{moved: boolean; originX: number; originY: number; x: number; y: number} | null>(null);
  const framed = useRef<string | null>(null);
  const suppressClick = useRef(false);
  const viewport = useRef<HTMLDivElement>(null);
  // Two maps can be on the page at once, so each names its own clip outline
  const clip = `tribes-keep-emblem-${useId().replace(/[^\w-]/g, '')}`;
  const {plots, tribes, units} = state;

  const grid = useMemo(
    () => ({
      columns: Math.max(...plots.map((plot) => plot.x), 0) + 1,
      rows: Math.max(...plots.map((plot) => plot.y), 0) + 1,
    }),
    [plots],
  );
  const geometry = useMemo<Geometry>(() => {
    const originX = (grid.rows * TILE_WIDTH) / 2 + PADDING;
    const originY = TILE_HEIGHT / 2 + HEADROOM + PADDING;
    return {
      height: ((grid.columns + grid.rows) * TILE_HEIGHT) / 2 + DEPTH + HEADROOM + PADDING * 2,
      position: (plot) => [
        originX + ((plot.x - plot.y) * TILE_WIDTH) / 2,
        originY + ((plot.x + plot.y) * TILE_HEIGHT) / 2,
      ],
      width: ((grid.columns + grid.rows) * TILE_WIDTH) / 2 + PADDING * 2,
    };
  }, [grid]);
  const orderedPlots = useMemo(() => [...plots].sort((a, b) => a.x + a.y - (b.x + b.y) || a.x - b.x), [plots]);
  const owners = useMemo(() => new Map(tribes.map((entry) => [entry.id, entry])), [tribes]);
  const lookup = useMemo(() => new Map(plots.map((plot) => [`${plot.x}:${plot.y}`, plot])), [plots]);
  const byId = useMemo(() => new Map(plots.map((plot) => [plot.id, plot])), [plots]);
  const home = useMemo(
    () =>
      plots.find((plot) => plot.tribe_id === tribe?.id && plot.price === 0) ??
      plots.find((plot) => plot.tribe_id === tribe?.id),
    [plots, tribe?.id],
  );

  // The frame takes the height the world needs at full width, within sensible limits for the page
  const frame = size.width
    ? Math.round(
        Math.min(
          compact ? 340 : 620,
          Math.max(
            compact ? 200 : 280,
            geometry.height * Math.min(size.width / geometry.width, MAX_TILE_PIXELS / TILE_WIDTH),
          ),
        ),
      )
    : undefined;
  const fit = size.width
    ? Math.min(size.width / geometry.width, (frame ?? size.height) / geometry.height, MAX_TILE_PIXELS / TILE_WIDTH)
    : 1;
  const maxZoom = Math.max(1, 150 / (TILE_WIDTH * fit));
  const scale = fit * view.k;
  const zoomable = !compact && maxZoom > 1.08;
  const left = (size.width - geometry.width * scale) / 2 + view.x;
  const top = ((frame ?? size.height) - geometry.height * scale) / 2 + view.y;

  const clamp = useCallback(
    (next: {k: number; x: number; y: number}) => {
      const k = Math.min(maxZoom, Math.max(1, next.k));
      const limitX = Math.max(0, (geometry.width * fit * k - size.width) / 2 + 48);
      const limitY = Math.max(0, (geometry.height * fit * k - (frame ?? size.height)) / 2 + 48);
      return {
        k,
        x: k === 1 ? 0 : Math.min(limitX, Math.max(-limitX, next.x)),
        y: k === 1 ? 0 : Math.min(limitY, Math.max(-limitY, next.y)),
      };
    },
    [fit, frame, geometry, maxZoom, size],
  );

  const borders = useMemo(() => {
    const segments: {color: string; d: string; key: string}[] = [];
    plots.forEach((plot) => {
      if (plot.tribe_id === null) return;
      const [x, y] = geometry.position(plot);
      const color = hex(owners.get(plot.tribe_id)?.color);
      const corner = {
        bottom: `${x} ${y + TILE_HEIGHT / 2}`,
        left: `${x - TILE_WIDTH / 2} ${y}`,
        right: `${x + TILE_WIDTH / 2} ${y}`,
        top: `${x} ${y - TILE_HEIGHT / 2}`,
      };
      const edges: [number, number, string, string][] = [
        [1, 0, corner.right, corner.bottom],
        [0, 1, corner.left, corner.bottom],
        [-1, 0, corner.left, corner.top],
        [0, -1, corner.top, corner.right],
      ];
      edges.forEach(([dx, dy, from, to]) => {
        if (lookup.get(`${plot.x + dx}:${plot.y + dy}`)?.tribe_id === plot.tribe_id) return;
        segments.push({color, d: `M${from}L${to}`, key: `${plot.id}:${dx}:${dy}`});
      });
    });
    return segments;
  }, [geometry, lookup, owners, plots]);

  const garrisons = useMemo(() => {
    const totals = new Map<number, {attack: number; defense: number}>();
    units.forEach((unit) => {
      const entry = totals.get(unit.plot_id) ?? {attack: 0, defense: 0};
      entry.attack += (state.catalog.units[unit.item]?.damage ?? 0) * unit.quantity;
      entry.defense += (state.catalog.defenses[unit.item] ?? 0) * unit.quantity;
      totals.set(unit.plot_id, entry);
    });
    return Array.from(totals.entries());
  }, [state.catalog, units]);

  const work = useMemo(
    () =>
      state.jobs
        .filter((job) => job.status === 'working' && job.tribe_id === tribe?.id && job.kind !== 'build')
        .map((job) => {
          let item = job.item === 'timber' ? 'axe' : 'pickaxe';
          if (job.kind !== 'gather') item = 'workshop';
          return {id: job.id, item, plot: byId.get(job.plot_id)};
        })
        .filter((job) => job.plot),
    [byId, state.jobs, tribe?.id],
  );

  const frontier = useMemo(
    () =>
      canExpand && tribe
        ? plots.filter(
            (plot) =>
              plot.tribe_id === null &&
              plots.some((entry) => entry.tribe_id === tribe.id && distance(entry, plot) === 1),
          )
        : [],
    [canExpand, plots, tribe],
  );

  const focusOn = useCallback(
    (plot: TribesPlot | undefined, zoom?: number) => {
      if (!plot) return;
      const k = Math.min(maxZoom, Math.max(1, zoom ?? view.k));
      const [x, y] = geometry.position(plot);
      setAnimating(true);
      setView(clamp({k, x: -(x - geometry.width / 2) * fit * k, y: -(y - geometry.height / 2) * fit * k}));
    },
    [clamp, fit, geometry, maxZoom, view.k],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, plot: TribesPlot) => {
    const step = {ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1]}[event.key];
    if (!step) return;
    const next = lookup.get(`${plot.x + step[0]}:${plot.y + step[1]}`);
    if (!next) return;
    event.preventDefault();
    viewport.current?.querySelector<HTMLButtonElement>(`[data-plot="${next.id}"]`)?.focus();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || view.k === 1) return;
    drag.current = {moved: false, originX: view.x, originY: view.y, x: event.clientX, y: event.clientY};
  };

  const handlePointerEnd = () => {
    if (!drag.current) return;
    suppressClick.current = drag.current.moved;
    drag.current = null;
    setGrabbing(false);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const {current} = drag;
    if (!current) return;
    const deltaX = event.clientX - current.x;
    const deltaY = event.clientY - current.y;
    if (!current.moved && Math.hypot(deltaX, deltaY) < 5) return;
    current.moved = true;
    setAnimating(false);
    setGrabbing(true);
    setView((value) => clamp({k: value.k, x: current.originX + deltaX, y: current.originY + deltaY}));
  };

  const handleSelect = (plotId: number) => {
    if (suppressClick.current) return;
    onSelect?.(plotId);
  };

  const handleZoom = (factor: number) => {
    setAnimating(true);
    setView((value) => {
      const k = Math.min(maxZoom, Math.max(1, value.k * factor));
      return clamp({k, x: (value.x * k) / value.k, y: (value.y * k) / value.k});
    });
  };

  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return undefined;
    const measure = () => setSize({height: element.clientHeight, width: element.clientWidth});
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // On a large world the whole map is too small to read, so the first view opens on the viewer's own land
  useEffect(() => {
    const key = `${state.season.id}:${tribe?.id ?? 0}:${plots.length}`;
    if (!size.width || !plots.length || framed.current === key) return;
    framed.current = key;
    if (!compact && home && TILE_WIDTH * fit < 30) focusOn(home, 60 / (TILE_WIDTH * fit));
    else setView({k: 1, x: 0, y: 0});
  }, [compact, fit, focusOn, home, plots.length, size.width, state.season.id, tribe?.id]);

  useEffect(() => {
    const element = viewport.current;
    if (!element || !zoomable) return undefined;
    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      setAnimating(false);
      const bounds = element.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;
      setView((value) => {
        const k = Math.min(maxZoom, Math.max(1, value.k * Math.exp(-event.deltaY * 0.01)));
        const before = fit * value.k;
        const after = fit * k;
        const stageX = (pointerX - ((bounds.width - geometry.width * before) / 2 + value.x)) / before;
        const stageY = (pointerY - ((bounds.height - geometry.height * before) / 2 + value.y)) / before;
        return clamp({
          k,
          x: pointerX - stageX * after - (bounds.width - geometry.width * after) / 2,
          y: pointerY - stageY * after - (bounds.height - geometry.height * after) / 2,
        });
      });
    };
    element.addEventListener('wheel', handleWheel, {passive: false});
    return () => element.removeEventListener('wheel', handleWheel);
  }, [clamp, fit, geometry, maxZoom, zoomable]);

  const selected = selectedId == null ? undefined : byId.get(selectedId);
  const tip = hovered == null ? undefined : byId.get(hovered);
  const tipOwner = tip?.tribe_id == null ? undefined : owners.get(tip.tribe_id);
  const tabStop = focused ?? selected?.id ?? home?.id ?? plots[0]?.id;

  return (
    <S.Viewport
      $compact={compact}
      $grabbing={grabbing}
      $zoomed={view.k > 1}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerEnd}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      ref={viewport}
      style={frame ? {height: frame} : undefined}
    >
      <S.Cloud $delay={-12} $top={4} />
      <S.Cloud $delay={-47} $top={52} />
      <S.Stage
        data-animate={animating}
        style={{
          height: geometry.height,
          transform: `translate(${left}px, ${top}px) scale(${scale})`,
          width: geometry.width,
        }}
      >
        <svg aria-hidden height={geometry.height} width={geometry.width}>
          <path
            d={`M${geometry.width / 2} ${HEADROOM + PADDING + 30}L${geometry.width - PADDING + 22} ${
              HEADROOM + PADDING + 30 + (grid.columns * TILE_HEIGHT) / 2
            } ${geometry.width / 2 + ((grid.columns - grid.rows) * TILE_WIDTH) / 2} ${geometry.height - PADDING + 26} ${
              PADDING - 22
            } ${HEADROOM + PADDING + 30 + (grid.rows * TILE_HEIGHT) / 2}Z`}
            fill="rgba(0, 0, 0, 0.3)"
          />
          {/* Ground markings sit beneath all scenery, including objects on neighboring tiles. */}
          <Terrain geometry={geometry} owners={owners} plots={orderedPlots} size={grid} />
          <g fill="none" strokeLinecap="round">
            {borders.map((segment) => (
              <path d={segment.d} key={segment.key} stroke="rgba(255, 253, 246, 0.85)" strokeWidth="4.5" />
            ))}
            {borders.map((segment) => (
              <path d={segment.d} key={segment.key} stroke={segment.color} strokeWidth="2.6" />
            ))}
          </g>
          {(ranges ?? []).map((range) => {
            const origin = byId.get(range.plotId);
            if (!origin) return null;
            const x0 = Math.max(0, origin.x - range.radius);
            const x1 = Math.min(grid.columns - 1, origin.x + range.radius);
            const y0 = Math.max(0, origin.y - range.radius);
            const y1 = Math.min(grid.rows - 1, origin.y + range.radius);
            const north = geometry.position({x: x0, y: y0});
            const east = geometry.position({x: x1, y: y0});
            const south = geometry.position({x: x1, y: y1});
            const west = geometry.position({x: x0, y: y1});
            return (
              <path
                d={`M${north[0]} ${north[1] - TILE_HEIGHT / 2}L${east[0] + TILE_WIDTH / 2} ${east[1]} ${south[0]} ${south[1] + TILE_HEIGHT / 2} ${west[0] - TILE_WIDTH / 2} ${west[1]}Z`}
                fill="rgba(217, 87, 59, 0.16)"
                key={`${range.plotId}:${range.radius}`}
                stroke={palette.ember}
                strokeDasharray="9 7"
                strokeLinejoin="round"
                strokeWidth="2.6"
              />
            );
          })}
          {frontier.map((plot) => {
            const [x, y] = geometry.position(plot);
            return (
              <g className="hint" key={plot.id} transform={`translate(${x} ${y})`}>
                <path
                  d={DIAMOND}
                  fill="rgba(246, 200, 101, 0.16)"
                  stroke={palette.goldBright}
                  strokeDasharray="5 5"
                  strokeWidth="1.6"
                />
              </g>
            );
          })}
          {tip && tip.id !== selected?.id && (
            <path
              d={DIAMOND}
              fill="rgba(255, 255, 255, 0.16)"
              stroke="#ffffff"
              strokeWidth="2"
              transform={`translate(${geometry.position(tip).join(' ')})`}
            />
          )}
          {selected && (
            <g transform={`translate(${geometry.position(selected).join(' ')})`}>
              <path
                d={DIAMOND}
                fill="none"
                stroke={palette.goldBright}
                strokeLinejoin="round"
                strokeWidth="7"
                opacity="0.55"
              />
              <path
                className="selected"
                d={DIAMOND}
                fill="rgba(255, 255, 255, 0.2)"
                stroke="#ffffff"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </g>
          )}
          <Scenery clip={clip} geometry={geometry} owners={owners} plots={orderedPlots} />
          {work.map((job) => {
            const [x, y] = geometry.position(job.plot!);
            return (
              <g key={job.id} transform={`translate(${x + 14} ${y - 44})`}>
                <circle
                  cx="13"
                  cy="13"
                  fill="rgba(13, 31, 26, 0.78)"
                  r="15"
                  stroke={palette.goldBright}
                  strokeWidth="1.6"
                />
                <g className="work">
                  <g transform="translate(3 3)">
                    <ItemIcon item={job.item} size={20} />
                  </g>
                </g>
              </g>
            );
          })}
          {garrisons.map(([plotId, total]) => {
            const plot = byId.get(plotId);
            if (!plot) return null;
            const [x, y] = geometry.position(plot);
            const badges = [
              total.attack ? {color: '#b8432c', text: count(total.attack), type: 'attack'} : null,
              total.defense ? {color: '#2f6f9e', text: count(total.defense), type: 'defense'} : null,
            ].filter(Boolean) as {color: string; text: string; type: string}[];
            const widths = badges.map((badge) => 24 + badge.text.length * 6.4);
            const totalWidth = widths.reduce((value, entry) => value + entry, 0) + (badges.length - 1) * 3;
            let offset = -totalWidth / 2;
            return (
              <g key={plotId} transform={`translate(${x - 16} ${y - 30})`}>
                {badges.map((badge, index) => {
                  const start = offset;
                  offset += widths[index] + 3;
                  return (
                    <g key={badge.type} transform={`translate(${start} 0)`}>
                      <rect
                        fill={badge.color}
                        height="17"
                        rx="8.5"
                        stroke="rgba(255, 253, 246, 0.9)"
                        strokeWidth="1.4"
                        width={widths[index]}
                        y="-8.5"
                      />
                      {badge.type === 'attack' ? (
                        <path
                          d="M6 3.5 12-2.5M12-2.5v-1.6h-1.6M6-2.5l6 6M6-2.5v-1.6h1.6"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                        />
                      ) : (
                        <path d="M9-4.6 12.6-3.3v3c0 2.3-1.5 3.9-3.6 4.8C6.9 3.6 5.4 2 5.4-.3v-3Z" fill="#fff" />
                      )}
                      <text fill="#fff" fontSize="10" x="16.5" y="3.6">
                        {badge.text}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        <div aria-label="World map" role="group">
          {plots.map((plot) => {
            const [x, y] = geometry.position(plot);
            const owner = plot.tribe_id === null ? undefined : owners.get(plot.tribe_id);
            return (
              <S.Hit
                aria-label={`${plotName(plot)} · ${owner?.name ?? 'Unowned'} · ${plot.price} TNB`}
                aria-pressed={plot.id === selected?.id}
                data-plot={plot.id}
                key={plot.id}
                onBlur={() => setHovered((value) => (value === plot.id ? null : value))}
                onClick={() => handleSelect(plot.id)}
                onFocus={() => {
                  setFocused(plot.id);
                  setHovered(plot.id);
                }}
                onKeyDown={(event) => handleKeyDown(event, plot)}
                onPointerEnter={() => setHovered(plot.id)}
                onPointerLeave={() => setHovered((value) => (value === plot.id ? null : value))}
                style={{
                  height: TILE_HEIGHT,
                  left: x - TILE_WIDTH / 2,
                  top: y - TILE_HEIGHT / 2,
                  width: TILE_WIDTH,
                }}
                tabIndex={plot.id === tabStop ? 0 : -1}
                type="button"
              />
            );
          })}
        </div>
      </S.Stage>
      {tip && !grabbing && (
        <S.Tooltip
          style={{
            left: left + geometry.position(tip)[0] * scale,
            top: Math.max(64, top + (geometry.position(tip)[1] - TILE_HEIGHT / 2) * scale),
          }}
        >
          <strong>
            {label(tip.terrain)} · {tip.x + 1}, {tip.y + 1}
          </strong>
          <span>
            {tipOwner ? tribeLabel(tipOwner) : 'Unclaimed land'}
            {tip.buildings.length ? ` · ${tip.buildings.map(label).join(', ')}` : ''}
          </span>
          {!tipOwner && <em>{count(tip.price)} TNB</em>}
        </S.Tooltip>
      )}
      {zoomable && (
        <S.Controls>
          {home && (
            <S.Control
              aria-label="Center on our land"
              onClick={() => focusOn(home, Math.max(view.k, Math.min(maxZoom, 1.6)))}
              title="Center on our land"
              type="button"
            >
              <LocateFixed size={16} />
            </S.Control>
          )}
          <S.Control
            aria-label="Zoom out"
            disabled={view.k <= 1}
            onClick={() => handleZoom(1 / 1.45)}
            title="Zoom out"
            type="button"
          >
            <Minus size={16} />
          </S.Control>
          <S.Control
            aria-label="Zoom in"
            disabled={view.k >= maxZoom}
            onClick={() => handleZoom(1.45)}
            title="Zoom in"
            type="button"
          >
            <Plus size={16} />
          </S.Control>
          <S.Control
            aria-label="Show the whole world"
            disabled={view.k === 1}
            onClick={() => {
              setAnimating(true);
              setView({k: 1, x: 0, y: 0});
            }}
            title="Show the whole world"
            type="button"
          >
            <Maximize size={16} />
          </S.Control>
        </S.Controls>
      )}
    </S.Viewport>
  );
};

// The page ticks once a second for its countdowns; the map only redraws when the world or the selection changes
export default memo(WorldMap);
