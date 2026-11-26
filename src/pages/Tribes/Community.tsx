import {TribesPanelProps} from 'types/tribes';

import Activity from './Activity';
import {AccountField, ActionForm, count, ItemField, label, NumberField} from './common';
import * as S from './Styles';

export const Projects = ({act, busy, canPlay, state}: TribesPanelProps) => (
  <S.Card>
    <S.PanelTitle>
      <h2>Shared projects</h2>
      <S.Badge>{state.work_orders.filter((order) => order.status === 'open').length} open</S.Badge>
    </S.PanelTitle>
    <S.Muted>See what the tribe needs and contribute supplies toward a common goal.</S.Muted>
    {!state.work_orders.length && (
      <S.Empty>No projects yet. Create a work order to give your team a shared objective.</S.Empty>
    )}
    {state.work_orders.map((order) => (
      <div key={order.id} style={{borderTop: '1px solid #edf0e7', paddingTop: 16, marginTop: 16}}>
        <S.PanelTitle>
          <h3 style={{margin: 0}}>{order.title}</h3>
          <S.Badge>{label(order.status)}</S.Badge>
        </S.PanelTitle>
        <S.Muted>{order.description}</S.Muted>
        <S.Row>
          <span>{label(order.item)}</span>
          <strong>
            {count(order.contributed)} / {count(order.quantity)}
          </strong>
        </S.Row>
        <S.Progress aria-label={`${order.title} progress`} max={order.quantity} value={order.contributed} />
        {order.status === 'open' && (
          <S.Button
            $secondary
            disabled={busy || !canPlay}
            onClick={() => act('cancel_work_order', {work_order_id: order.id})}
          >
            Cancel project & release supplies
          </S.Button>
        )}
        {order.status === 'open' && !state.catalog.trade_items.includes(order.item) && (
          <S.Muted>Tracked automatically as tribe production completes.</S.Muted>
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
              <AccountField label="Contribute from" name="source" personalFirst />
            </S.InlineFields>
          </ActionForm>
        )}
      </div>
    ))}
  </S.Card>
);

const Community = (props: TribesPanelProps) => {
  const {act, busy, canPlay, state, tribe} = props;
  return (
    <S.Grid>
      <S.Stack>
        <S.Card>
          <S.Eyebrow>YOUR TRIBE</S.Eyebrow>
          <h2>
            {tribe?.emblem} {tribe?.name ?? 'Find a tribe to get started'}
          </h2>
          <S.Muted>{tribe?.motto}</S.Muted>
          {tribe?.members.map((member) => (
            <S.Row key={member.id}>
              <strong>{member.username}</strong>
              <S.Badge>{member.id === tribe.founder_id ? 'Founder' : 'Member'}</S.Badge>
            </S.Row>
          ))}
        </S.Card>
        <Projects {...props} />
        <Activity state={state} />
      </S.Stack>
      <S.Stack>
        <S.Card>
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
            <ItemField items={state.catalog.work_order_items ?? state.catalog.trade_items} />
            <NumberField label="Supplies needed" name="quantity" />
          </ActionForm>
        </S.Card>
        <S.Banner>
          Every member has equal economic permissions. Coordinate in Messages and use the activity log to keep your
          shared plans transparent.
        </S.Banner>
      </S.Stack>
    </S.Grid>
  );
};
export default Community;
