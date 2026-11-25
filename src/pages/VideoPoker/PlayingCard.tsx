import * as S from './Styles';
import {cardRank, cardSuit, isRedCard, SUIT_SYMBOLS} from './utils';

interface PlayingCardProps {
  card: string | null;
  dim?: boolean;
  held?: boolean;
}

// One card on the screen: its face, or the machine's blue back while it is face down.
const PlayingCard = ({card, dim = false, held = false}: PlayingCardProps) => {
  const rank = card ? cardRank(card) : '';
  const suit = card ? SUIT_SYMBOLS[cardSuit(card)] : '';
  const isFace = ['J', 'K', 'Q'].includes(rank);
  return (
    <S.Card $back={!card} $dim={dim} $held={held} $red={!!card && isRedCard(card)} aria-hidden="true">
      {card && (
        <>
          <S.CardIndex>
            {rank}
            <span>{suit}</span>
          </S.CardIndex>
          <S.CardFigure $face={isFace}>
            {isFace && rank}
            {suit}
          </S.CardFigure>
        </>
      )}
    </S.Card>
  );
};

export default PlayingCard;
