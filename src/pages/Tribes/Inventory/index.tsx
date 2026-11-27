import {CSSProperties, useCallback, useEffect, useRef, useState} from 'react';
import {ArrowDownToLine, ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpFromLine, Hand, Lock, Send} from 'lucide-react';

import {TribesAction, TribesActionData, TribesInventory, TribesPanelProps} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {ActionForm, count, NumberField, sum, tribeLabel} from '../common';
import AnimatedNumber from '../components/AnimatedNumber';
import Emblem from '../components/Emblem';
import PlayerAvatar from '../components/PlayerAvatar';
import {art} from '../theme';

import Shelves, {Stack} from './Shelves';
import * as S from './Styles';
import Tray, {Move} from './Tray';
import {useStackDrag} from './useStackDrag';

interface Flight {
  away: boolean;
  delay: number;
  dx: number;
  dy: number;
  id: number;
  item: string;
  left: number;
  lift: number;
  top: number;
}

const EMPTY: TribesInventory = {};
const FLIGHT_SIZE = 40;

// Keeps the last picked good on screen for a moment after it is put back, so its tray can close smoothly
const useLinger = (value: Stack | null) => {
  const [kept, setKept] = useState(value);

  useEffect(() => {
    if (value) {
      setKept(value);
      return undefined;
    }
    const timer = window.setTimeout(() => setKept(null), 340);
    return () => window.clearTimeout(timer);
  }, [value]);

  return value ?? kept;
};

const Inventory = ({act, busy, canPlay, state, tribe}: TribesPanelProps) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selected, setSelected] = useState<Stack | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const ghost = useRef<HTMLSpanElement>(null);
  const sequence = useRef(0);
  const shown = useLinger(selected);
  const timers = useRef<number[]>([]);
  const {viewer} = state;
  const rivals = state.tribes.filter((entry) => entry.id !== tribe?.id);
  const stock: Record<S.Place, TribesInventory> = {
    pack: viewer?.inventory ?? EMPTY,
    warehouse: tribe?.inventory ?? EMPTY,
  };
  const selectedHeld = selected ? (stock[selected.place][selected.item] ?? 0) : 0;
  const teammates = tribe?.members.filter((member) => member.id !== viewer?.id) ?? [];

  // Sends a few copies of a good (or coins) flying from one spot to another, or up and away when it leaves the tribe
  const handleLaunch = useCallback((item: string, from: string, to: string | null, quantity: number) => {
    const root = area.current;
    if (!root || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const origin = root.getBoundingClientRect();
    const source = root.querySelector(`[data-slot="${from}"]`)?.getBoundingClientRect();
    const target = to ? root.querySelector(`[data-slot="${to}"]`)?.getBoundingClientRect() : null;
    if (!source) return;
    const dx = target ? target.left + target.width / 2 - (source.left + source.width / 2) : 0;
    const dy = target ? target.top + target.height / 2 - (source.top + source.height / 2) : -150;
    const pieces = Math.min(5, Math.max(1, Math.ceil(Math.log2(quantity + 1))));
    const batch = Array.from({length: pieces}, (_, index) => {
      sequence.current += 1;
      return {
        away: !target,
        delay: index * 85,
        dx,
        dy,
        id: sequence.current,
        item,
        left: source.left + source.width / 2 - FLIGHT_SIZE / 2 - origin.left,
        lift: 44 + Math.abs(dx) * 0.08,
        top: source.top + source.height / 2 - FLIGHT_SIZE / 2 - origin.top,
      };
    });
    setFlights((value) => [...value, ...batch]);
    const timer = window.setTimeout(
      () => {
        setFlights((value) => value.filter((flight) => !batch.includes(flight)));
        timers.current = timers.current.filter((entry) => entry !== timer);
      },
      900 + pieces * 85,
    );
    timers.current.push(timer);
  }, []);

  const handleCoins = useCallback<TribesAction>(
    async (action, data) => {
      const success = await act(action, data);
      const amount = Number(data?.amount) || 1;
      if (success && action === 'treasury_deposit') handleLaunch('tnb', 'wallet', 'treasury', amount);
      if (success && action === 'treasury_withdraw') handleLaunch('tnb', 'treasury', 'wallet', amount);
      if (success && action === 'transfer_tnb') handleLaunch('tnb', 'treasury', null, amount);
      return success;
    },
    [act, handleLaunch],
  );

  const handleMove = useCallback(
    async ({item, place, quantity, recipient, to}: Move) => {
      const data: TribesActionData = {
        destination: to === 'pack' || to === 'teammate' ? 'personal' : 'tribe',
        item,
        quantity,
        source: place === 'pack' ? 'personal' : 'tribe',
      };
      if (to === 'teammate') data.recipient_user_id = recipient ?? null;
      if (to === 'tribe') data.recipient_tribe_id = recipient ?? null;
      const success = await act('transfer_items', data);
      if (success)
        handleLaunch(item, `${place}:${item}`, to === 'pack' || to === 'warehouse' ? `${to}:${item}` : null, quantity);
    },
    [act, handleLaunch],
  );

  // Dropping a stack on the other store moves all of it
  const handleDrop = (stack: Stack, place: S.Place) => {
    const quantity = stock[stack.place][stack.item] ?? 0;
    if (quantity > 0) handleMove({...stack, quantity, to: place});
  };

  const drag = useStackDrag({area, enabled: canPlay && !busy, ghost, onDrop: handleDrop});

  const handlePick = (stack: Stack) => {
    if (drag.wasDragged()) return;
    setSelected((value) => (value?.place === stack.place && value.item === stack.item ? null : stack));
  };

  // A good that has run out, or a tournament that has closed, cannot stay picked
  useEffect(() => {
    if (selected && (!selectedHeld || !canPlay)) setSelected(null);
  }, [canPlay, selected, selectedHeld]);

  // On a phone the tray opens below the fold, so it is brought into view once it has unfolded
  useEffect(() => {
    if (!selected) return undefined;
    const timer = window.setTimeout(() => {
      area.current
        ?.querySelector(`[data-tray="${selected.place}"]`)
        ?.scrollIntoView?.({behavior: 'smooth', block: 'nearest'});
    }, 360);
    return () => window.clearTimeout(timer);
  }, [selected]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const moving = drag.carried ?? selected;
  let direction: 'backward' | 'forward' | undefined;
  if (moving) direction = moving.place === 'pack' ? 'forward' : 'backward';

  const renderBridgeIcon = () => {
    if (!direction) return <ArrowLeftRight size={17} />;
    return direction === 'forward' ? (
      <ArrowRight size={18} strokeWidth={2.6} />
    ) : (
      <ArrowLeft size={18} strokeWidth={2.6} />
    );
  };

  const renderHint = (place: S.Place) => {
    const empty = !sum(stock[place]);
    if (!viewer) return 'Sign in to carry goods of your own.';
    if (!tribe) return 'The organizer must assign you to a tribe before you can carry goods in this tournament.';
    if (state.tournament.status === 'finished') return 'This tournament is over. These are the goods as it ended.';
    if (!canPlay) return 'Moving goods is closed for this tournament.';
    if (place === 'pack') {
      if (empty) return 'Your pack is empty. Send your worker’s output here, or take goods out of the warehouse.';
      return (
        <>
          Pick anything to store it in the warehouse{teammates.length ? ' or hand it to a teammate' : ''}.
          <S.MouseOnly> You can also drag it across.</S.MouseOnly>
        </>
      );
    }
    if (empty) return 'The warehouse is empty. Store goods here so the whole tribe can use them.';
    return (
      <>
        Pick anything to take it into your pack{rivals.length ? ' or send it to another tribe' : ''}.
        <S.MouseOnly> You can also drag it across.</S.MouseOnly>
      </>
    );
  };

  const renderStore = (place: S.Place) => {
    const open = selected?.place === place;
    const stack = shown?.place === place ? shown : null;
    return (
      <>
        <Shelves
          catalog={state.catalog}
          interactive={canPlay}
          onPick={handlePick}
          onPress={drag.handlePress}
          place={place}
          selected={selected}
          stock={stock[place]}
        />
        <S.Tray $open={open} aria-hidden={!open} data-tray={place}>
          <div>
            {stack && (
              <Tray
                busy={busy || !open}
                held={stock[place][stack.item] ?? 0}
                item={stack.item}
                key={stack.item}
                onClose={() => setSelected(null)}
                onMove={handleMove}
                other={stock[place === 'pack' ? 'warehouse' : 'pack'][stack.item] ?? 0}
                place={place}
                rivals={rivals}
                teammates={teammates}
              />
            )}
          </div>
        </S.Tray>
        {!open && (
          <S.TrayHint>
            {canPlay ? <Hand size={15} /> : <Lock size={14} />}
            <span>{renderHint(place)}</span>
          </S.TrayHint>
        )}
      </>
    );
  };

  return (
    <S.Storage $carrying={!!drag.carried} ref={area}>
      <S.SectionLabel>
        <h2>Goods</h2>
        <p>
          What you gather and craft this tournament. Your pack is yours alone, and the warehouse is shared by the whole
          tribe.
        </p>
      </S.SectionLabel>
      <S.Stores>
        <S.Leather
          $handle
          $over={drag.over === 'pack'}
          $target={!!drag.carried && drag.carried.place !== 'pack'}
          aria-labelledby="tribes-pack"
          data-store="pack"
        >
          <S.LeatherFlap $handle>
            <S.StoreIcon>
              <ItemIcon item="pack" size={42} />
            </S.StoreIcon>
            <S.StoreName>
              <h2 id="tribes-pack">My pack</h2>
              <p>
                {viewer && <PlayerAvatar avatar={viewer.avatar} name={viewer.username} size={18} />}
                Only you can use what is in here
              </p>
            </S.StoreName>
            <S.Tally>
              <strong>
                <AnimatedNumber value={sum(stock.pack)} />
              </strong>{' '}
              <small>goods</small>
            </S.Tally>
            <S.Buckle aria-hidden />
          </S.LeatherFlap>
          <S.LeatherBody>{renderStore('pack')}</S.LeatherBody>
        </S.Leather>
        <S.Bridge $direction={direction} aria-hidden>
          <S.BridgeBadge $direction={direction}>{renderBridgeIcon()}</S.BridgeBadge>
        </S.Bridge>
        <S.Timber
          $over={drag.over === 'warehouse'}
          $target={!!drag.carried && drag.carried.place !== 'warehouse'}
          aria-labelledby="tribes-warehouse"
          data-store="warehouse"
        >
          <S.Roof aria-hidden>
            <svg preserveAspectRatio="none" viewBox="0 0 400 76">
              <path d="M0 68L200 4L400 68V76H0Z" fill={S.roofColors.main} />
              <path d="M200 4L400 68V76H200Z" fill={S.roofColors.dark} opacity="0.62" />
              <path
                d="M137.5 24H262.5M87.5 40H312.5M37.5 56H362.5"
                opacity="0.4"
                stroke={S.roofColors.dark}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 68L200 4L400 68"
                fill="none"
                stroke={S.roofColors.light}
                strokeLinejoin="round"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              <rect fill={art.woodDark} height="8" width="400" y="68" />
            </svg>
            {tribe && (
              <S.RoofEmblem>
                <Emblem color={tribe.color} emblem={tribe.emblem} image={tribe.emblem_image} size={26} />
              </S.RoofEmblem>
            )}
          </S.Roof>
          <S.Lintel>
            <S.StoreIcon>
              <ItemIcon item="warehouse" size={42} />
            </S.StoreIcon>
            <S.StoreName>
              <h2 id="tribes-warehouse">Warehouse</h2>
              <p>{tribe ? `Shared by everyone in ${tribe.name}` : 'Shared by everyone in a tribe'}</p>
            </S.StoreName>
            <S.Tally>
              <strong>{tribe ? <AnimatedNumber value={sum(stock.warehouse)} /> : '—'}</strong> <small>goods</small>
            </S.Tally>
          </S.Lintel>
          <S.TimberBody>
            {tribe ? (
              renderStore('warehouse')
            ) : (
              <S.Locked>
                <Lock size={22} />
                <strong>The doors are closed</strong>
                Every warehouse is private to its tribe. Your organizer assigns your tribe and its shared warehouse.
              </S.Locked>
            )}
          </S.TimberBody>
        </S.Timber>
      </S.Stores>
      <S.SectionLabel style={{marginTop: 10}}>
        <h2>TNB</h2>
        <p>
          Real thenewboston coins. Your wallet stays with you between tournaments, and the treasury pays for the tribe’s
          land and trades.
        </p>
      </S.SectionLabel>
      <S.Stores>
        <S.Leather aria-labelledby="tribes-wallet">
          <S.LeatherFlap>
            <S.StoreIcon data-slot="wallet">
              <ItemIcon item="tnb" size={38} />
            </S.StoreIcon>
            <S.StoreName>
              <h2 id="tribes-wallet">My wallet</h2>
              <p>Yours alone, in every tournament</p>
            </S.StoreName>
            <S.Tally>
              <strong>
                <AnimatedNumber value={viewer?.wallet_balance ?? 0} />
              </strong>{' '}
              <small>TNB</small>
            </S.Tally>
            <S.Buckle aria-hidden />
          </S.LeatherFlap>
          <S.LeatherBody>
            <S.Paper>
              <ActionForm
                act={handleCoins}
                action="treasury_deposit"
                disabled={busy || !canPlay}
                icon={<ArrowDownToLine size={15} />}
                inline
                submit="Deposit TNB"
              >
                <NumberField
                  label="Deposit into the treasury"
                  max={Math.max(1, viewer?.wallet_balance ?? 0)}
                  name="amount"
                />
              </ActionForm>
              <S.Hint>Coins you deposit belong to the whole tribe.</S.Hint>
            </S.Paper>
            <S.WalletLink>
              <S.LinkButton to="/wallets/home">
                Open wallets <ArrowRight size={14} />
              </S.LinkButton>
            </S.WalletLink>
          </S.LeatherBody>
        </S.Leather>
        <S.Bridge aria-hidden>
          <S.BridgeBadge>
            <ArrowLeftRight size={17} />
          </S.BridgeBadge>
        </S.Bridge>
        <S.Timber aria-labelledby="tribes-treasury">
          <S.Lintel $roofless>
            <S.StoreIcon data-slot="treasury">
              <ItemIcon item="treasury" size={42} />
            </S.StoreIcon>
            <S.StoreName>
              <h2 id="tribes-treasury">Treasury</h2>
              <p>{tribe ? `Shared by everyone in ${tribe.name}` : 'Shared by everyone in a tribe'}</p>
            </S.StoreName>
            <S.Tally>
              <strong>{tribe ? <AnimatedNumber value={tribe.treasury ?? 0} /> : '—'}</strong> <small>TNB</small>
            </S.Tally>
          </S.Lintel>
          <S.TimberBody $roofless>
            <S.Paper>
              <ActionForm
                act={handleCoins}
                action="treasury_withdraw"
                disabled={busy || !canPlay}
                icon={<ArrowUpFromLine size={15} />}
                inline
                secondary
                submit="Withdraw to my wallet"
              >
                <NumberField label="Withdraw from the treasury" max={Math.max(1, tribe?.treasury ?? 0)} name="amount" />
              </ActionForm>
              <S.Hint>
                All members can spend or withdraw shared TNB. Unspent treasury is split equally among the locked roster
                at tournament end.
              </S.Hint>
            </S.Paper>
            <S.Disclosure>
              <summary>
                <Send size={15} /> Send TNB to another tribe
              </summary>
              <div>
                <ActionForm
                  act={handleCoins}
                  action="transfer_tnb"
                  disabled={busy || !canPlay || !rivals.length}
                  icon={<Send size={15} />}
                  secondary
                  submit="Send TNB"
                >
                  <S.InlineFields>
                    <S.Field>
                      Recipient tribe
                      <select name="recipient_tribe_id" required>
                        {rivals.map((team) => (
                          <option key={team.id} value={team.id}>
                            {tribeLabel(team)}
                          </option>
                        ))}
                      </select>
                    </S.Field>
                    <NumberField label="TNB from the treasury" max={Math.max(1, tribe?.treasury ?? 0)} name="amount" />
                  </S.InlineFields>
                </ActionForm>
              </div>
            </S.Disclosure>
          </S.TimberBody>
        </S.Timber>
      </S.Stores>
      {flights.map((flight) => (
        <S.Flight
          $away={flight.away}
          aria-hidden
          data-flight={flight.item}
          key={flight.id}
          style={
            {
              '--dx': `${flight.dx}px`,
              '--dy': `${flight.dy}px`,
              '--lift': `${flight.lift}px`,
              animationDelay: `${flight.delay}ms`,
              left: flight.left,
              top: flight.top,
            } as CSSProperties
          }
        >
          <span>
            <ItemIcon item={flight.item} size={FLIGHT_SIZE} />
          </span>
        </S.Flight>
      ))}
      {drag.carried && (
        <S.DragGhost aria-hidden ref={ghost}>
          <ItemIcon item={drag.carried.item} size={40} />
          {count(stock[drag.carried.place][drag.carried.item])}
        </S.DragGhost>
      )}
    </S.Storage>
  );
};

export default Inventory;
