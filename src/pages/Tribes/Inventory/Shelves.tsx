import {CSSProperties, PointerEvent, useEffect, useRef, useState} from 'react';

import {TribesInventory, TribesState} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {count, itemKind, label} from '../common';
import AnimatedNumber from '../components/AnimatedNumber';

import * as S from './Styles';

export interface Stack {
  item: string;
  place: S.Place;
}

const GROUPS = [
  ['resource', 'Raw resources'],
  ['material', 'Refined materials'],
  ['tool', 'Tools'],
] as const;

export const PLACES: Record<S.Place, string> = {pack: 'your pack', warehouse: 'the warehouse'};

// Notes every change in a count for a moment, whether the player moved the goods or a worker just delivered them
const useDelta = (value: number) => {
  const [delta, setDelta] = useState<{amount: number; id: number} | null>(null);
  const previous = useRef(value);

  useEffect(() => {
    const amount = value - previous.current;
    previous.current = value;
    if (!amount) return undefined;
    setDelta({amount, id: Date.now()});
    const timer = window.setTimeout(() => setDelta(null), 1600);
    return () => window.clearTimeout(timer);
  }, [value]);

  return delta;
};

const Slot = ({
  fresh,
  held,
  interactive,
  item,
  onPick,
  onPress,
  order,
  place,
  selected,
  twin,
}: {
  fresh: boolean;
  held: number;
  interactive: boolean;
  item: string;
  onPick: (stack: Stack) => void;
  onPress: (event: PointerEvent<HTMLElement>, stack: Stack) => void;
  order: number;
  place: S.Place;
  selected: boolean;
  twin: boolean;
}) => {
  const delta = useDelta(held);
  const name = label(item);
  const style = {'--order': order} as CSSProperties;
  const body = (
    <>
      <S.SlotTile $held={held > 0} $kind={place} $selected={selected} $twin={twin} data-slot={`${place}:${item}`}>
        <S.SlotIcon $bump={!!delta} key={`icon:${delta?.id ?? 0}`}>
          <ItemIcon item={item} size={36} />
        </S.SlotIcon>
        <S.SlotCount $long={held > 99999} style={held ? undefined : {visibility: 'hidden'}}>
          <AnimatedNumber value={held} />
        </S.SlotCount>
        {delta && (
          <S.Delta $gain={delta.amount > 0} key={`delta:${delta.id}`}>
            {delta.amount > 0 ? '+' : '−'}
            {count(Math.abs(delta.amount))}
          </S.Delta>
        )}
      </S.SlotTile>
      <S.SlotName $held={held > 0} $kind={place}>
        {name}
      </S.SlotName>
    </>
  );

  if (!held || !interactive)
    return (
      <S.Slot
        $fresh={fresh}
        $held={false}
        $kind={place}
        aria-label={held ? `${name}: ${count(held)} in ${PLACES[place]}` : `${name}: none in ${PLACES[place]}`}
        as="div"
        role="img"
        style={style}
      >
        {body}
      </S.Slot>
    );

  return (
    <S.Slot
      $fresh={fresh}
      $held
      $kind={place}
      $selected={selected}
      aria-label={`${name}: ${count(held)} in ${PLACES[place]}`}
      aria-pressed={selected}
      onClick={() => onPick({item, place})}
      onPointerDown={(event) => onPress(event, {item, place})}
      style={style}
      type="button"
    >
      {body}
    </S.Slot>
  );
};

// Everything one store holds, laid out the same way in the pack and in the warehouse so a good is always found in
// the same spot on both sides
const Shelves = ({
  catalog,
  interactive,
  onPick,
  onPress,
  place,
  selected,
  stock,
}: {
  catalog: TribesState['catalog'];
  interactive: boolean;
  onPick: (stack: Stack) => void;
  onPress: (event: PointerEvent<HTMLElement>, stack: Stack) => void;
  place: S.Place;
  selected: Stack | null;
  stock: TribesInventory;
}) => {
  const [fresh, setFresh] = useState(true);

  // Goods drop into place once, when the store first opens. A slot that later empties or fills changes quietly.
  useEffect(() => {
    const timer = window.setTimeout(() => setFresh(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {GROUPS.map(([group, title]) => {
        const items = catalog.trade_items.filter((item) => itemKind(catalog, item) === group);
        if (!items.length) return null;
        return (
          <S.Bay $kind={place} key={group}>
            <S.BayLabel $kind={place}>{title}</S.BayLabel>
            <S.Slots>
              {items.map((item) => (
                <Slot
                  fresh={fresh}
                  held={stock[item] ?? 0}
                  interactive={interactive}
                  item={item}
                  key={item}
                  onPick={onPick}
                  onPress={onPress}
                  order={catalog.trade_items.indexOf(item)}
                  place={place}
                  selected={selected?.place === place && selected.item === item}
                  twin={!!selected && selected.place !== place && selected.item === item}
                />
              ))}
            </S.Slots>
          </S.Bay>
        );
      })}
    </>
  );
};

export default Shelves;
