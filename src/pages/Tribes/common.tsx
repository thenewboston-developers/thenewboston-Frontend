import {FormEvent, ReactNode} from 'react';

import {TribesAction, TribesActionData, TribesPlot, TribesState} from 'types/tribes';

import * as S from './Styles';

export const label = (value: string) => value.replace(/_/g, ' ').replace(/^./, (char) => char.toUpperCase());
export const count = (value: number | null | undefined) => (value ?? 0).toLocaleString();
export const date = (value: string) => new Date(value).toLocaleString([], {dateStyle: 'medium', timeStyle: 'short'});
export const duration = (seconds: number) => {
  const minutes = Math.max(0, Math.ceil(seconds / 60));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
};
export const terrainIcon: Record<string, string> = {
  coal_deposit: '◈',
  forest: '🌲',
  iron_deposit: '⛰️',
  plains: '🌾',
  quarry: '🪨',
  wilderness: '🦌',
};
export const plotName = (plot: TribesPlot) => `${label(plot.terrain)} (${plot.x + 1}, ${plot.y + 1})`;
export const tribeName = (state: TribesState, id: number | null | undefined) =>
  state.tribes.find((tribe) => tribe.id === id)?.name ?? 'Unassigned';
export const memberName = (state: TribesState, id: number) =>
  state.tribes.flatMap((tribe) => tribe.members).find((member) => member.id === id)?.username ?? `Player ${id}`;

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
  resetOnSuccess = true,
  submit,
  transform,
}: {
  action: string;
  act: TribesAction;
  children?: ReactNode;
  disabled?: boolean;
  fixed?: TribesActionData;
  resetOnSuccess?: boolean;
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
      <fieldset disabled={disabled} style={{border: 0, display: 'grid', gap: 14, margin: 0, minWidth: 0, padding: 0}}>
        {children}
        <S.Button disabled={disabled} type="submit">
          {submit}
        </S.Button>
      </fieldset>
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
    <input defaultValue={value} max={max} min={min} name={name} required step="1" type="number" />
  </S.Field>
);
export const AccountField = ({
  label: text,
  name = 'account',
  personalFirst = false,
}: {
  label: string;
  name?: string;
  personalFirst?: boolean;
}) => (
  <S.Field>
    {text}
    <select defaultValue={personalFirst ? 'personal' : 'tribe'} name={name}>
      <option value="tribe">Tribal warehouse / treasury</option>
      <option value="personal">Personal inventory / TNB wallet</option>
    </select>
  </S.Field>
);
export const ItemField = ({items, name = 'item'}: {items: string[]; name?: string}) => (
  <S.Field>
    Item
    <select name={name} required>
      {items.map((item) => (
        <option key={item} value={item}>
          {label(item)}
        </option>
      ))}
    </select>
  </S.Field>
);
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
