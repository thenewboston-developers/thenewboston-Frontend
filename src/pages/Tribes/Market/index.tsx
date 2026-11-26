import {useState} from 'react';
import {Store, Tag} from 'lucide-react';

import {TribesListing, TribesPanelProps} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {
  AccountField,
  ActionForm,
  avatarColor,
  count,
  ItemField,
  label,
  memberName,
  PlotField,
  plural,
  tribeName,
} from '../common';

import * as S from './Styles';

const FILTERS = [
  ['all', 'All'],
  ['sell', 'For sale'],
  ['buy', 'Buy orders'],
  ['mine', 'Mine'],
] as const;

const Listing = ({listing, ...props}: TribesPanelProps & {listing: TribesListing}) => {
  const [quantity, setQuantity] = useState(1);
  const {act, busy, canPlay, state} = props;
  const military = !!(state.catalog.units[listing.item] || state.catalog.defenses[listing.item]);
  const own = listing.user_id === state.viewer?.id;
  const sharedAccount = listing.account === 'tribe' && listing.tribe_id === state.viewer?.tribe_id;
  let orderLabel = listing.user_id ? 'FOR SALE' : 'OPENING STOCK';
  if (listing.kind === 'buy') orderLabel = 'BUY ORDER';
  let kind: 'buy' | 'sell' | 'stock' = listing.user_id ? 'sell' : 'stock';
  if (listing.kind === 'buy') kind = 'buy';
  return (
    <S.Listing $kind={kind}>
      <S.ListingHead>
        <span>
          <ItemIcon item={listing.item} size={40} />
        </span>
        <div>
          <h2>{label(listing.item)}</h2>
          <S.Badge $tone={{buy: 'sky', sell: 'green', stock: 'gold'}[kind] as 'gold' | 'green' | 'sky'}>
            {orderLabel}
          </S.Badge>
        </div>
      </S.ListingHead>
      <S.Price>
        <div>
          <strong>{count(listing.price)} TNB</strong>
          <small>per item</small>
        </div>
        <span>{count(listing.quantity)} available</span>
      </S.Price>
      <S.Seller>
        {listing.user_id ? (
          <>
            <S.Avatar $color={avatarColor(memberName(state, listing.user_id))} $size={20} aria-hidden>
              {memberName(state, listing.user_id).slice(0, 1)}
            </S.Avatar>
            {memberName(state, listing.user_id)} · {tribeName(state, listing.tribe_id)}
          </>
        ) : (
          'Finite world supply · never replenished'
        )}
      </S.Seller>
      {sharedAccount && !own && (
        <S.Hint style={{marginTop: 10}}>
          Your tribe owns this listing. Its creator can cancel it to return the escrow; teammates cannot fill it.
        </S.Hint>
      )}
      {own ? (
        <S.Button
          $block
          $variant="danger"
          disabled={busy || !canPlay}
          onClick={() => act('cancel_listing', {listing_id: listing.id})}
          style={{marginTop: 16}}
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
          <S.Pair>
            <S.Field>
              Quantity
              <input
                inputMode="numeric"
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
            <AccountField
              label={listing.kind === 'sell' ? 'Pay from' : 'Supply from'}
              mode={listing.kind === 'sell' ? 'tnb' : 'goods'}
              personalFirst
            />
          </S.Pair>
          {military && <PlotField plots={state.plots.filter((plot) => plot.tribe_id === state.viewer?.tribe_id)} />}
        </ActionForm>
      )}
    </S.Listing>
  );
};

const Market = (props: TribesPanelProps) => {
  const [filter, setFilter] = useState('all');
  const [item, setItem] = useState('all');
  const [kind, setKind] = useState('sell');
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
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
              <S.Eyebrow>
                <Store size={14} /> The global marketplace
              </S.Eyebrow>
              <h2>Every tribe has something to offer.</h2>
            </div>
            <S.Badge>{plural(listings.length, 'listing')}</S.Badge>
          </S.PanelTitle>
          <S.Muted>
            Trade across borders. Prices are in actual TNB. Sell orders reserve goods; buy orders reserve coins until
            filled or cancelled.
          </S.Muted>
          <S.Filters>
            <S.FieldGroup aria-label="Show" role="radiogroup">
              Show
              <S.Segmented>
                {FILTERS.map(([value, text]) => (
                  <S.Segment key={value}>
                    <input
                      checked={filter === value}
                      name="listing-filter"
                      onChange={() => setFilter(value)}
                      type="radio"
                      value={value}
                    />
                    <span>{text}</span>
                  </S.Segment>
                ))}
              </S.Segmented>
            </S.FieldGroup>
            <S.Field>
              Resource
              <S.IconControl>
                <ItemIcon item={item === 'all' ? 'warehouse' : item} size={24} />
                <select onChange={(event) => setItem(event.target.value)} value={item}>
                  <option value="all">All resources</option>
                  {(state.catalog.market_items ?? state.catalog.trade_items).map((entry) => (
                    <option key={entry} value={entry}>
                      {label(entry)}
                    </option>
                  ))}
                </select>
              </S.IconControl>
            </S.Field>
          </S.Filters>
        </S.Card>
        <S.Cards $min={280}>
          {listings.map((listing) => (
            <Listing {...props} key={listing.id} listing={listing} />
          ))}
        </S.Cards>
        {!listings.length && (
          <S.Empty>
            <ItemIcon item="tnb" size={44} />
            No matching listings. Your next trade could start the market.
          </S.Empty>
        )}
      </S.Stack>
      <S.Stack>
        <S.Card>
          <S.Eyebrow>
            <Tag size={14} /> Name your price
          </S.Eyebrow>
          <h2>Create a listing</h2>
          <S.Muted>
            Name your price. A buy order commits the full TNB amount now. A sell order commits your goods. To sell
            military units, open your arsenal in Military.
          </S.Muted>
          <ActionForm act={act} action="create_listing" disabled={busy || !canPlay} submit="Place listing">
            <S.FieldGroup aria-label="Order type" role="radiogroup">
              Order type
              <S.Segmented>
                <S.Segment>
                  <input
                    checked={kind === 'sell'}
                    name="kind"
                    onChange={() => setKind('sell')}
                    type="radio"
                    value="sell"
                  />
                  <span>Sell goods</span>
                </S.Segment>
                <S.Segment>
                  <input
                    checked={kind === 'buy'}
                    name="kind"
                    onChange={() => setKind('buy')}
                    type="radio"
                    value="buy"
                  />
                  <span>Request goods</span>
                </S.Segment>
              </S.Segmented>
            </S.FieldGroup>
            <ItemField items={state.catalog.trade_items} />
            <S.InlineFields>
              <S.Field>
                Quantity
                <input
                  inputMode="numeric"
                  max={1000000}
                  min={1}
                  name="quantity"
                  onChange={(event) => setQuantity(Math.max(1, Math.floor(Number(event.target.value)) || 1))}
                  required
                  step="1"
                  type="number"
                  value={quantity}
                />
              </S.Field>
              <S.Field>
                TNB per item
                <input
                  inputMode="numeric"
                  max={1000000}
                  min={1}
                  name="price"
                  onChange={(event) => setPrice(Math.max(1, Math.floor(Number(event.target.value)) || 1))}
                  required
                  step="1"
                  type="number"
                  value={price}
                />
              </S.Field>
            </S.InlineFields>
            <AccountField
              label={kind === 'sell' ? 'Sell from' : 'Pay from'}
              mode={kind === 'sell' ? 'goods' : 'tnb'}
              personalFirst
            />
            <S.Total>
              <span>{kind === 'sell' ? 'You receive when filled' : 'Held in escrow now'}</span>
              <strong>{count(price * quantity)} TNB</strong>
            </S.Total>
          </ActionForm>
        </S.Card>
        <S.Banner>
          <Tag size={18} />
          <div>
            Goods expire at the end of the season. Unfilled buy orders return their TNB escrow. Completed purchases are
            final; spent TNB is not reset or replenished.
          </div>
        </S.Banner>
      </S.Stack>
    </S.Grid>
  );
};

export default Market;
