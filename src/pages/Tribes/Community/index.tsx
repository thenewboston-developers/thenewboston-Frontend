import {ClipboardList, Crown, Flag} from 'lucide-react';

import {TribesPanelProps} from 'types/tribes';

import Activity from '../Activity';
import ItemIcon from '../art/ItemIcon';
import {AccountField, ActionForm, count, ItemField, label, NumberField, Player, sum} from '../common';
import Emblem from '../components/Emblem';
import Progress from '../components/Progress';

import * as S from './Styles';

const ORDER_TONES = {cancelled: 'neutral', completed: 'green', open: 'gold'} as const;

export const Projects = ({act, busy, canPlay, state}: TribesPanelProps) => (
  <S.Card>
    <S.PanelTitle>
      <div>
        <S.Eyebrow>
          <ClipboardList size={14} /> Work orders
        </S.Eyebrow>
        <h2>Shared projects</h2>
      </div>
      <S.Badge $tone="gold">{state.work_orders.filter((order) => order.status === 'open').length} open</S.Badge>
    </S.PanelTitle>
    <S.Muted>See what the tribe needs and contribute supplies toward a common goal.</S.Muted>
    {!state.work_orders.length && (
      <S.Empty>No projects yet. Create a work order to give your team a shared objective.</S.Empty>
    )}
    {state.work_orders.map((order) => (
      <S.Project key={order.id}>
        <S.PanelTitle>
          <h3>{order.title}</h3>
          <S.Badge $tone={ORDER_TONES[order.status]}>{label(order.status)}</S.Badge>
        </S.PanelTitle>
        {order.description && <S.Muted>{order.description}</S.Muted>}
        <S.ProjectGoal>
          <S.RowMain>
            <ItemIcon item={order.item} size={30} />
            <span>{label(order.item)}</span>
          </S.RowMain>
          <strong>
            {count(order.contributed)} / {count(order.quantity)}
          </strong>
        </S.ProjectGoal>
        <Progress
          color={order.status === 'completed' ? '#4f9a6d' : '#e6aa3c'}
          label={`${order.title} progress`}
          max={order.quantity}
          thick
          value={order.contributed}
        />
        {order.status === 'open' && !state.catalog.trade_items.includes(order.item) && (
          <S.Hint style={{marginTop: 8}}>Tracked automatically as tribe production completes.</S.Hint>
        )}
        {order.status === 'open' && state.catalog.trade_items.includes(order.item) && (
          <ActionForm
            act={act}
            action="contribute_work_order"
            disabled={busy || !canPlay}
            fixed={{work_order_id: order.id}}
            submit="Contribute supplies"
          >
            <S.InlineFields>
              <NumberField label="Quantity" max={Math.max(1, order.quantity - order.contributed)} name="quantity" />
              <AccountField label="Contribute from" mode="goods" name="source" personalFirst />
            </S.InlineFields>
          </ActionForm>
        )}
        {order.status === 'open' && (
          <S.Button
            $size="small"
            $variant="danger"
            disabled={busy || !canPlay}
            onClick={() => act('cancel_work_order', {work_order_id: order.id})}
            style={{marginTop: 12}}
          >
            Cancel project & release supplies
          </S.Button>
        )}
      </S.Project>
    ))}
  </S.Card>
);

const Community = (props: TribesPanelProps) => {
  const {act, busy, canPlay, state, tribe} = props;
  const land = state.plots.filter((plot) => plot.tribe_id === tribe?.id).length;
  return (
    <S.Grid>
      <S.Stack>
        <S.Card $flush>
          <S.Crest $color={tribe?.color ?? '#46634a'}>
            <Emblem color={tribe?.color ?? '#46634a'} emblem={tribe?.emblem ?? '🛡️'} size={72} />
            <div>
              <S.Eyebrow $light>Your tribe</S.Eyebrow>
              <h2>{tribe?.name ?? 'Find a tribe to get started'}</h2>
              {tribe?.motto && <em>{tribe.motto}</em>}
            </div>
          </S.Crest>
          {tribe && (
            <S.CrestBody>
              {tribe.description && <S.Muted>{tribe.description}</S.Muted>}
              <S.CrestStats>
                <div>
                  <span>Members</span>
                  <strong>
                    {tribe.members.length}/{state.catalog.max_members}
                  </strong>
                </div>
                <div>
                  <span>Territory</span>
                  <strong>{land} plots</strong>
                </div>
                <div>
                  <span>Treasury</span>
                  <strong>{count(tribe.treasury)}</strong>
                </div>
                <div>
                  <span>Warehouse</span>
                  <strong>{count(sum(tribe.inventory))}</strong>
                </div>
              </S.CrestStats>
              {tribe.members.map((member) => (
                <S.Row key={member.id}>
                  <Player name={member.username} />
                  <S.Badge $tone={member.id === tribe.founder_id ? 'gold' : 'neutral'}>
                    {member.id === tribe.founder_id && <Crown size={11} />}
                    {member.id === tribe.founder_id ? 'Founder' : 'Member'}
                  </S.Badge>
                </S.Row>
              ))}
            </S.CrestBody>
          )}
        </S.Card>
        <Projects {...props} />
        <Activity state={state} />
      </S.Stack>
      <S.Stack>
        <S.Card>
          <S.Eyebrow>
            <Flag size={14} /> Rally the tribe
          </S.Eyebrow>
          <h2>Create a work order</h2>
          <S.Muted>
            A clear objective helps everyone find a way to contribute. Military and building goals track production
            automatically; contributed supplies are reserved until the project is complete.
          </S.Muted>
          <ActionForm act={act} action="create_work_order" disabled={busy || !canPlay} submit="Create shared project">
            <S.Field>
              Project title
              <input maxLength={120} name="title" placeholder="Prepare our northern defenses" required />
            </S.Field>
            <S.Field>
              Description
              <textarea maxLength={500} name="description" placeholder="Tell your team why this matters." />
            </S.Field>
            <S.InlineFields>
              <ItemField items={state.catalog.work_order_items ?? state.catalog.trade_items} label="Goal" />
              <NumberField label="Amount needed" name="quantity" />
            </S.InlineFields>
          </ActionForm>
        </S.Card>
        <S.Banner $tone="green">
          <Crown size={18} />
          <div>
            Every member has equal economic permissions. Coordinate in Messages and use the activity log to keep your
            shared plans transparent.
          </div>
        </S.Banner>
      </S.Stack>
    </S.Grid>
  );
};

export default Community;
