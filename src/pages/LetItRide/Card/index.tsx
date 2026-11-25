import {describeCard, getRankLabel, isRedCard, SUIT_SYMBOLS} from '../utils';

import * as S from './Styles';

interface CardProps {
  // Null is a card that is still face down
  card: string | null;
  className?: string;
  // Position in the deal, for the stagger as the cards arrive
  dealOrder?: number;
  // Fades a card that is not part of the paying hand
  dimmed?: boolean;
  // Lifts a card that is part of the paying hand
  lifted?: boolean;
}

// A playing card that turns over when its face becomes known
const Card = ({card, className, dealOrder = 0, dimmed = false, lifted = false}: CardProps) => (
  <S.Card
    $dimmed={dimmed}
    $lifted={lifted}
    $order={dealOrder}
    aria-label={card ? describeCard(card) : 'Face-down card'}
    className={className}
    role="img"
  >
    <S.Inner $faceUp={!!card}>
      <S.Back aria-hidden="true" />
      <S.Face $red={!!card && isRedCard(card)} aria-hidden="true">
        {card && (
          <>
            <S.Corner>
              <b>{getRankLabel(card)}</b>
              <i>{SUIT_SYMBOLS[card[1]]}</i>
            </S.Corner>
            <S.Pip>{SUIT_SYMBOLS[card[1]]}</S.Pip>
          </>
        )}
      </S.Face>
    </S.Inner>
  </S.Card>
);

export default Card;
