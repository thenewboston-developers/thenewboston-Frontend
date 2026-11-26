import {useState} from 'react';

import {TribesListing, TribesPanelProps} from 'types/tribes';

import {
  AccountField,
  ActionForm,
  count,
  ItemField,
  label,
  memberName,
  NumberField,
  PlotField,
  tribeName,
} from './common';
import * as S from './Styles';

const Listing = ({listing, ...props}: TribesPanelProps & {listing: TribesListing}) => {
  const [quantity, setQuantity] = useState(1);
  const {act, busy, canPlay, state} = props;
  const military = !!(state.catalog.units[listing.item] || state.catalog.defenses[listing.item]);
  const own = listing.user_id === state.viewer?.id;
  const sharedAccount = listing.account === 'tribe' && listing.tribe_id === state.viewer?.tribe_id;
  let orderLabel = listing.user_id ? 'FOR SALE' : 'OPENING STOCK';
  if (listing.kind === 'buy') orderLabel = 'BUY ORDER';
  return (
    <S.Card>
      <S.PanelTitle>
        <h2>{label(listing.item)}</h2>
        <S.Badge>{orderLabel}</S.Badge>
      </S.PanelTitle>
      <S.Row>
        <strong>
          {count(listing.price)} TNB <small>per item</small>
        </strong>
        <span>{count(listing.quantity)} available</span>
      </S.Row>
      <S.Muted style={{marginTop: 12}}>
        {listing.user_id
          ? `${memberName(state, listing.user_id)} · ${tribeName(state, listing.tribe_id)}`
          : 'Finite world supply · never replenished'}
      </S.Muted>
      {sharedAccount && !own && (
        <S.Muted>
          Your tribe owns this listing. Its creator can cancel it to return the escrow; teammates cannot fill it.
        </S.Muted>
      )}
      {own ? (
        <S.Button
          $secondary
          disabled={busy || !canPlay}
          onClick={() => act('cancel_listing', {listing_id: listing.id})}
        >
          Cancel listing & return escrow
        </S.Button>
      ) : (
        <ActionForm
          act={act}
          action="fill_listing"
          disabled={busy || !canPlay || sharedAccount}
          fixed={{listing_id: listing.id, quantity}}
          resetOnSuccess={false}
          submit={`${listing.kind === 'sell' ? 'Buy' : 'Supply'} for ${count(quantity * listing.price)} TNB`}
        >
          <S.Field>
            Quantity
            <input
              max={listing.quantity}
              min={1}
              name="quantity"
              onChange={(event) => setQuantity(Math.min(listing.quantity, Math.max(1, Number(event.target.value))))}
              required
              step="1"
              type="number"
              value={quantity}
            />
          </S.Field>
          {military && <PlotField plots={state.plots.filter((plot) => plot.tribe_id === state.viewer?.tribe_id)} />}
          <AccountField
            label={listing.kind === 'sell' ? 'Pay from / receive goods into' : 'Supply goods from / receive TNB into'}
            personalFirst
          />
        </ActionForm>
      )}
    </S.Card>
  );
};
const Market = (props: TribesPanelProps) => {
  const [filter, setFilter] = useState('all');
  const [item, setItem] = useState('all');
  const {act, busy, canPlay, state} = props;
  const listings = state.listings
    .filter(
      (entry) =>
        entry.quantity > 0 &&
        (item === 'all' || entry.item === item) &&
        (filter === 'all' || (filter === 'mine' ? entry.user_id === state.viewer?.id : entry.kind === filter)),
    )
    .sort((a, b) => a.price - b.price);
  return (
    <S.Grid>
      <S.Stack>
        <S.Card>
          <S.PanelTitle>
            <div>
              <S.Eyebrow>THE GLOBAL MARKETPLACE</S.Eyebrow>
              <h2>Every tribe has something to offer.</h2>
            </div>
            <S.Badge>{listings.length} listings</S.Badge>
          </S.PanelTitle>
          <S.Muted>
            Trade across borders. Prices are in actual TNB. Sell orders reserve goods; buy orders reserve coins until
            filled or cancelled.
          </S.Muted>
          <S.InlineFields>
            <S.Field>
              Show
              <select onChange={(event) => setFilter(event.target.value)} value={filter}>
                <option value="all">All listings</option>
                <option value="sell">Goods for sale</option>
                <option value="buy">Buy orders to fulfill</option>
                <option value="mine">My listings</option>
              </select>
            </S.Field>
            <S.Field>
              Resource
              <select onChange={(event) => setItem(event.target.value)} value={item}>
                <option value="all">All resources</option>
                {(state.catalog.market_items ?? state.catalog.trade_items).map((entry) => (
                  <option key={entry} value={entry}>
                    {label(entry)}
                  </option>
                ))}
              </select>
            </S.Field>
          </S.InlineFields>
        </S.Card>
        <S.Cards>
          {listings.map((listing) => (
            <Listing {...props} key={listing.id} listing={listing} />
          ))}
        </S.Cards>
        {!listings.length && <S.Empty>No matching listings. Your next trade could start the market.</S.Empty>}
      </S.Stack>
      <S.Stack>
        <S.Card>
          <h2>Create a listing</h2>
          <S.Muted>
            Name your price. A buy order commits the full TNB amount now. A sell order commits your goods. To sell
            military units, open your arsenal in Military.
          </S.Muted>
          <ActionForm act={act} action="create_listing" disabled={busy || !canPlay} submit="Place listing">
            <S.Field>
              Order type
              <select name="kind">
                <option value="sell">Sell goods</option>
                <option value="buy">Request goods (buy order)</option>
              </select>
            </S.Field>
            <ItemField items={state.catalog.trade_items} />
            <S.InlineFields>
              <NumberField label="Quantity" name="quantity" />
              <NumberField label="TNB per item" name="price" />
            </S.InlineFields>
            <AccountField label="Account" personalFirst />
          </ActionForm>
        </S.Card>
        <S.Banner>
          Goods expire at the end of the season. Unfilled buy orders return their TNB escrow. Completed purchases are
          final; spent TNB is not reset or replenished.
        </S.Banner>
      </S.Stack>
    </S.Grid>
  );
};
export default Market;
