import {FormEvent, useState} from 'react';
import {Backpack, Minus, Plus, Send, Warehouse, X} from 'lucide-react';

import {Tribe, TribesMember} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {count, ITEM_NOTES, label, tribeLabel, wholeNumber} from '../common';
import PlayerAvatar from '../components/PlayerAvatar';

import {PLACES} from './Shelves';
import * as S from './Styles';

export interface Move {
  item: string;
  place: S.Place;
  quantity: number;
  recipient?: number;
  to: 'pack' | 'teammate' | 'tribe' | 'warehouse';
}

// Opens inside a store when one of its goods is picked: how many to move, and where to
const Tray = ({
  busy,
  held,
  item,
  onClose,
  onMove,
  other,
  place,
  rivals,
  teammates,
}: {
  busy: boolean;
  held: number;
  item: string;
  onClose: () => void;
  onMove: (move: Move) => void;
  other: number;
  place: S.Place;
  rivals: Tribe[];
  teammates: TribesMember[];
}) => {
  // Starts at the whole stack, the usual move, and can be cleared to type any other amount
  const [amount, setAmount] = useState(String(held));
  const [away, setAway] = useState(false);
  const [recipient, setRecipient] = useState<number | undefined>();
  const across: S.Place = place === 'pack' ? 'warehouse' : 'pack';
  const name = label(item).toLowerCase();
  const quantity = Math.min(Number(amount) || 0, held);
  const rival = rivals.find((team) => team.id === recipient) ?? rivals[0];
  const teammate = teammates.find((member) => member.id === recipient) ?? teammates[0];
  const elsewhere = place === 'pack' ? !!teammate : !!rival;
  const sending = away && elsewhere;
  const picks: [string, number][] = [];
  if (held > 1) picks.push(['One', 1]);
  if (held > 3) picks.push(['Half', Math.floor(held / 2)]);
  if (held > 1) picks.push(['All', held]);

  const moved = quantity ? `${count(quantity)} ` : '';
  let submit = place === 'pack' ? `Store ${moved}in the warehouse` : `Take ${moved}into my pack`;
  if (sending) submit = place === 'pack' ? `Give ${moved}to ${teammate.username}` : `Send ${moved}to ${rival.name}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy || !quantity) return;
    if (!sending) onMove({item, place, quantity, to: across});
    else if (place === 'pack') onMove({item, place, quantity, recipient: teammate.id, to: 'teammate'});
    else onMove({item, place, quantity, recipient: rival.id, to: 'tribe'});
  };

  const renderIcon = () => {
    if (sending) return <Send size={15} />;
    return place === 'pack' ? <Warehouse size={16} /> : <Backpack size={16} />;
  };

  return (
    <S.Paper as="form" onSubmit={handleSubmit} style={{marginTop: 2}}>
      <S.TrayHead>
        <span>
          <ItemIcon item={item} size={38} />
        </span>
        <div>
          <strong>{label(item)}</strong>
          <small>
            {count(held)} in {PLACES[place]} · {count(other)} in {PLACES[across]}
          </small>
          {ITEM_NOTES[item] && <em>{ITEM_NOTES[item]}</em>}
        </div>
        <S.TrayClose aria-label={`Put the ${name} back`} onClick={onClose} type="button">
          <X size={16} />
        </S.TrayClose>
      </S.TrayHead>
      {elsewhere && (
        <S.FieldGroup aria-label="Move to" role="radiogroup">
          Move to
          <S.Segmented>
            <S.Segment>
              <input checked={!away} name={`move-to-${place}`} onChange={() => setAway(false)} type="radio" />
              <span>
                <ItemIcon item={across} size={18} />
                {place === 'pack' ? 'Warehouse' : 'My pack'}
              </span>
            </S.Segment>
            <S.Segment>
              <input checked={away} name={`move-to-${place}`} onChange={() => setAway(true)} type="radio" />
              <span>{place === 'pack' ? 'A teammate' : 'Another tribe'}</span>
            </S.Segment>
          </S.Segmented>
        </S.FieldGroup>
      )}
      {sending && place === 'pack' && (
        <S.Recipients aria-label="Teammate" role="radiogroup">
          {teammates.map((member) => (
            <S.Choice key={member.id}>
              <input
                checked={member.id === teammate.id}
                name="move-teammate"
                onChange={() => setRecipient(member.id)}
                type="radio"
              />
              <S.ChoiceBody>
                <PlayerAvatar avatar={member.avatar} name={member.username} size={22} />
                {member.username}
              </S.ChoiceBody>
            </S.Choice>
          ))}
        </S.Recipients>
      )}
      {sending && place === 'warehouse' && (
        <S.Field>
          Tribe
          <select onChange={(event) => setRecipient(Number(event.target.value))} value={rival.id}>
            {rivals.map((team) => (
              <option key={team.id} value={team.id}>
                {tribeLabel(team)}
              </option>
            ))}
          </select>
        </S.Field>
      )}
      <S.Quantity>
        <S.Stepper>
          <button
            aria-label="One fewer"
            disabled={quantity <= 1}
            onClick={() => setAmount(String(quantity - 1))}
            type="button"
          >
            <Minus size={15} />
          </button>
          <input
            aria-label={`How many ${name} to move`}
            inputMode="numeric"
            max={held}
            min={1}
            onChange={(event) => setAmount(wholeNumber(event.target.value, held))}
            required
            step="1"
            type="number"
            value={quantity || ''}
          />
          <button
            aria-label="One more"
            disabled={quantity >= held}
            onClick={() => setAmount(String(quantity + 1))}
            type="button"
          >
            <Plus size={15} />
          </button>
        </S.Stepper>
        <S.QuickPicks>
          {picks.map(([text, value]) => (
            <S.QuickPick $active={quantity === value} key={text} onClick={() => setAmount(String(value))} type="button">
              {text}
            </S.QuickPick>
          ))}
        </S.QuickPicks>
      </S.Quantity>
      <S.Button $block disabled={busy} type="submit">
        {renderIcon()}
        {submit}
      </S.Button>
    </S.Paper>
  );
};

export default Tray;
