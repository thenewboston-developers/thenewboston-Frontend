import {FormEvent, ReactNode, useState} from 'react';

import {Tribe, TribesAccount, TribesAction, TribesActionData, TribesPlot, TribesState} from 'types/tribes';

import ItemIcon from './art/ItemIcon';
import * as S from './Styles';

export const label = (value: string) => value.replace(/_/g, ' ').replace(/^./, (char) => char.toUpperCase());
export const count = (value: number | null | undefined) => (value ?? 0).toLocaleString();
// "1 tribe" but "2 tribes": counts are shown all over the game and a lone item reads wrong in the plural
export const plural = (value: number, noun: string) => `${count(value)} ${noun}${value === 1 ? '' : 's'}`;
export const date = (value: string) => new Date(value).toLocaleString([], {dateStyle: 'medium', timeStyle: 'short'});
export const time = (value: string) => new Date(value).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
export const day = (value: string) => new Date(value).toLocaleDateString([], {day: 'numeric', month: 'short'});
export const duration = (seconds: number) => {
  const minutes = Math.max(0, Math.ceil(seconds / 60));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
};
export const plotName = (plot: TribesPlot) => `${label(plot.terrain)} (${plot.x + 1}, ${plot.y + 1})`;
export const tribeName = (state: TribesState, id: number | null | undefined) =>
  state.tribes.find((tribe) => tribe.id === id)?.name ?? 'Unassigned';
export const memberName = (state: TribesState, id: number) =>
  state.tribes.flatMap((tribe) => tribe.members).find((member) => member.id === id)?.username ?? `Player ${id}`;
export const sum = (inventory: Record<string, number> | null | undefined) =>
  Object.values(inventory ?? {}).reduce((total, value) => total + value, 0);
// Chebyshev distance: diagonals count as one step, exactly like the server's range and adjacency rules
export const distance = (a: {x: number; y: number}, b: {x: number; y: number}) =>
  Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));

const AVATAR_COLORS = ['#2c6b55', '#b8672e', '#4a7fa8', '#8a5a9c', '#b0563f', '#56803a', '#7a6a2e', '#3f7a86'];
export const avatarColor = (name: string) =>
  AVATAR_COLORS[Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0) % AVATAR_COLORS.length];

export type ItemKind = 'building' | 'defense' | 'material' | 'resource' | 'tool' | 'unit';
export const itemKind = (catalog: TribesState['catalog'], item: string): ItemKind => {
  if (catalog.buildings[item]) return 'building';
  if (catalog.units[item]) return 'unit';
  if (catalog.defenses[item]) return 'defense';
  if (item === 'axe' || item === 'pickaxe') return 'tool';
  return catalog.recipes[item] ? 'material' : 'resource';
};

export const ITEM_NOTES: Record<string, string> = {
  animal_hide: 'Gathered in the wilderness. Tanned into leather.',
  axe: 'Any axe in your pack or the warehouse adds +5 timber an hour.',
  barricade: 'Sharpened stakes. Each one absorbs 30 incoming damage.',
  bread: 'Rations for your soldiers.',
  catapult: 'Siege engine. 80 damage, reaches 2 plots.',
  coal: 'Dug from coal deposits. Fuels the furnace.',
  farm: 'Built on plains. +10 wheat an hour on that plot.',
  flour: 'Milled wheat. Baked into bread.',
  furnace: 'Smelts ore and coal into iron ingots.',
  infantry: 'Foot soldiers. 10 damage each, reach 1 plot.',
  iron_ingot: 'Smelted in a furnace. The backbone of tools and weapons.',
  iron_ore: 'Mined from iron deposits. Smelted into ingots.',
  leather: 'Tanned hide for armor and siege slings.',
  lumber: 'Sawn timber. Needed for almost everything.',
  lumber_camp: 'Built on forest. +10 timber an hour on that plot.',
  mine: 'Built on iron or coal deposits. +10 an hour on that plot.',
  pickaxe: 'Any pickaxe in your pack or the warehouse adds +5 ore, coal and stone an hour.',
  quarry_building: 'Built on a quarry. +10 stone an hour on that plot.',
  stone: 'Cut from quarries. Shaped into blocks and foundations.',
  stone_block: 'Dressed stone for walls.',
  stone_wall: 'A proper wall. Each one absorbs 100 incoming damage.',
  timber: 'Felled in forests. Sawn into lumber.',
  trebuchet: 'The heaviest weapon. 200 damage, reaches 3 plots.',
  wheat: 'Grown on plains. Milled into flour.',
  workshop: 'Unlocks tools, soldiers and siege engines.',
};

const NUMBER_FIELDS = new Set([
  'amount',
  'plot_id',
  'unit_id',
  'user_id',
  'tribe_id',
  'target_id',
  'quantity',
  'price',
  'hours',
  'recipient_user_id',
  'recipient_tribe_id',
  'listing_id',
  'job_id',
  'to_tribe_id',
  'work_order_id',
]);

export const ActionForm = ({
  action,
  act,
  children,
  disabled,
  fixed = {},
  footer,
  icon,
  inline,
  resetOnSuccess = true,
  secondary,
  submit,
  transform,
}: {
  action: string;
  act: TribesAction;
  children?: ReactNode;
  disabled?: boolean;
  fixed?: TribesActionData;
  footer?: ReactNode;
  icon?: ReactNode;
  inline?: boolean;
  resetOnSuccess?: boolean;
  secondary?: boolean;
  submit: string;
  transform?: (data: TribesActionData) => TribesActionData;
}) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
    const form = event.currentTarget;
    const data: TribesActionData = {};
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') data[key] = value;
      if (NUMBER_FIELDS.has(key)) data[key] = value === '' ? null : Number(value);
    });
    const success = await act(action, {...(transform ? transform(data) : data), ...fixed});
    if (success && resetOnSuccess && form.isConnected) form.reset();
  };
  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Fieldset $inline={inline} disabled={disabled}>
        {children}
        <S.Button $block={!inline} $secondary={secondary} disabled={disabled} type="submit">
          {icon}
          {submit}
        </S.Button>
        {footer}
      </S.Fieldset>
    </S.Form>
  );
};

export const NumberField = ({
  label: text,
  name,
  max = 1000000000,
  min = 1,
  value = 1,
}: {
  label: string;
  name: string;
  max?: number;
  min?: number;
  value?: number;
}) => (
  <S.Field>
    {text}
    <input defaultValue={value} inputMode="numeric" max={max} min={min} name={name} required step="1" type="number" />
  </S.Field>
);

const ACCOUNT_LABELS = {
  both: {personal: 'Personal', tribe: 'Tribe'},
  goods: {personal: 'My pack', tribe: 'Warehouse'},
  tnb: {personal: 'My wallet', tribe: 'Treasury'},
};

// Every economic action names the account it uses: the shared tribe account or the player's own
export const AccountField = ({
  label: text,
  mode = 'both',
  name = 'account',
  onChange,
  personalFirst = false,
  value,
}: {
  label: string;
  mode?: keyof typeof ACCOUNT_LABELS;
  name?: string;
  onChange?: (account: TribesAccount) => void;
  personalFirst?: boolean;
  value?: TribesAccount;
}) => (
  <S.FieldGroup aria-label={text} role="radiogroup">
    {text}
    <S.Segmented>
      {(['tribe', 'personal'] as const).map((account) => (
        <S.Segment key={account}>
          <input
            {...(value === undefined
              ? {defaultChecked: account === (personalFirst ? 'personal' : 'tribe')}
              : {checked: value === account, onChange: () => onChange?.(account)})}
            name={name}
            type="radio"
            value={account}
          />
          <span>{ACCOUNT_LABELS[mode][account]}</span>
        </S.Segment>
      ))}
    </S.Segmented>
  </S.FieldGroup>
);

export const ItemField = ({
  items,
  label: text = 'Item',
  name = 'item',
}: {
  items: string[];
  label?: string;
  name?: string;
}) => {
  const [item, setItem] = useState(items[0]);
  return (
    <S.Field>
      {text}
      <S.IconControl>
        <ItemIcon item={item} size={24} />
        <select name={name} onChange={(event) => setItem(event.target.value)} required value={item}>
          {items.map((entry) => (
            <option key={entry} value={entry}>
              {label(entry)}
            </option>
          ))}
        </select>
      </S.IconControl>
    </S.Field>
  );
};

export const PlotField = ({
  plots,
  name = 'plot_id',
  selected,
}: {
  plots: TribesPlot[];
  name?: string;
  selected?: number;
}) => (
  <S.Field>
    Location
    <select defaultValue={selected} name={name} required>
      <option value="">Choose an owned plot</option>
      {plots.map((plot) => (
        <option key={plot.id} value={plot.id}>
          {plotName(plot)}
        </option>
      ))}
    </select>
  </S.Field>
);

export const Player = ({name, note, size = 30}: {name: string; note?: ReactNode; size?: number}) => (
  <S.RowMain>
    <S.Avatar $color={avatarColor(name)} $size={size} aria-hidden>
      {name.slice(0, 1)}
    </S.Avatar>
    <div>
      <strong>{name}</strong>
      {note && <small>{note}</small>}
    </div>
  </S.RowMain>
);

export const ownedPlots = (state: TribesState, tribe?: Tribe) =>
  tribe ? state.plots.filter((plot) => plot.tribe_id === tribe.id) : [];
