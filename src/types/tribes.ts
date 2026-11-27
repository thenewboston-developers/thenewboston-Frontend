export type TribesAccount = 'personal' | 'tribe';
export type TribesInventory = Record<string, number>;
export type TribesActionData = Record<string, string | number | null>;
export interface TribesTournament {
  id: number;
  title: string;
  max_players: number;
  player_count: number;
  is_participant: boolean;
  status: 'upcoming' | 'active' | 'finished';
  starts_at: string;
  ends_at: string;
}
export interface TribesMember {
  id: number;
  username: string;
  avatar?: string | null;
}
export interface Tribe {
  id: number;
  name: string;
  emblem: string;
  emblem_image?: string | null;
  color: string;
  description: string;
  motto: string;
  founder_id: number;
  members: TribesMember[];
  treasury: number | null;
  inventory: TribesInventory | null;
}
export interface TribesPlot {
  id: number;
  x: number;
  y: number;
  terrain: string;
  tribe_id: number | null;
  price: number;
  buildings: string[];
}
export interface TribesJob {
  id: number;
  user_id: number;
  tribe_id: number;
  kind: 'gather' | 'craft' | 'build';
  item: string;
  quantity: number;
  completed: number;
  plot_id: number;
  start_at: string;
  end_at: string;
  status: 'queued' | 'working' | 'completed' | 'cancelled';
  source: TribesAccount;
  destination: TribesAccount;
}
export interface TribesUnit {
  id: number;
  tribe_id: number;
  controller_id: number;
  item: string;
  quantity: number;
  plot_id: number;
  target_id?: number | null;
  valid_target_ids: number[];
}
export interface TribesListing {
  id: number;
  kind: 'sell' | 'buy';
  item: string;
  quantity: number;
  price: number;
  user_id: number | null;
  tribe_id: number | null;
  account: TribesAccount;
}
export interface TribesMessage {
  id: number;
  from_tribe_id: number;
  to_tribe_id: number;
  user_id: number;
  username: string;
  avatar?: string | null;
  text: string;
  created_at: string;
}
export interface TribesWorkOrder {
  id: number;
  tribe_id: number;
  title: string;
  item: string;
  quantity: number;
  contributed: number;
  description: string;
  status: 'open' | 'completed' | 'cancelled';
}
export interface TribesAttack {
  unit_id: number;
  tribe_id: number;
  target_id: number;
  controller_id: number;
  raw_damage: number;
  effective_damage: number;
}
export interface TribesStanding {
  tribe_id: number;
  name: string;
  outgoing: number;
  incoming: number;
  raw_incoming: number;
  blocked: number;
  defense: number;
  score: number;
  rank: number;
  attacks: TribesAttack[];
}
export interface TribesState {
  tournament: TribesTournament;
  server_time: string;
  catalog: {
    land: Record<string, {resource: string; price: number}>;
    recipes: Record<string, {inputs: TribesInventory; seconds: number; facility: string | null}>;
    units: Record<string, {damage: number; range: number}>;
    defenses: Record<string, number>;
    buildings: Record<string, {land: string[]; resource: string | null}>;
    items: string[];
    trade_items: string[];
    market_items?: string[];
    work_order_items?: string[];
    max_members: number;
    queue_seconds: number;
    gather_capacity: number;
    unit_capacity: number;
    building_capacity: number;
    currency: string;
    gather_rate: number;
  };
  viewer: null | {
    id: number;
    username: string;
    avatar?: string | null;
    tribe_id: number | null;
    is_participant: boolean;
    wallet_balance: number;
    inventory: TribesInventory;
    production: TribesInventory;
    experience: TribesInventory;
  };
  tribes: Tribe[];
  plots: TribesPlot[];
  jobs: TribesJob[];
  units: TribesUnit[];
  listings: TribesListing[];
  messages: TribesMessage[];
  work_orders: TribesWorkOrder[];
  activity: {
    id: number;
    tribe_id: number;
    user_id: number | null;
    username: string;
    avatar?: string | null;
    text: string;
    created_at: string;
  }[];
  battle: null | {standings: TribesStanding[]; attacks: TribesAttack[]};
}
export type TribesAction = (action: string, data?: TribesActionData) => Promise<boolean>;
export type TribesEmblemUpload = (image: File) => Promise<boolean>;
export interface TribesPanelProps {
  act: TribesAction;
  busy: boolean;
  canPlay: boolean;
  go?: (section: string) => void;
  now: number;
  state: TribesState;
  tribe?: Tribe;
  uploadEmblem?: TribesEmblemUpload;
}
