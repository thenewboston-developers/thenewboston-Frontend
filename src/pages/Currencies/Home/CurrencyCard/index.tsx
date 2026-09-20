import {KeyboardEvent, MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';

import DateDisplay from 'components/DateDisplay';
import UserLabel from 'components/UserLabel';
import {Currency, SFC} from 'types';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency}) => {
  const currencyPath = `/currencies/${currency.id}`;
  const navigate = useNavigate();

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    // Nested anchors (the owner's avatar and username) lead to the profile on their own, every other pixel of the card
    // opens the currency
    if ((event.target as HTMLElement).closest('a')) return;
    navigate(currencyPath);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Keys pressed on nested controls (the owner's profile link) must not trigger the card navigation
    if (event.target !== event.currentTarget) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    navigate(currencyPath);
  };

  return (
    <S.Container
      aria-label={`${currency.ticker} currency details`}
      className={className}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
    >
      <S.Body>
        <S.Header>
          <S.CurrencyLogo logo={currency.logo} width="56px" />
          <S.HeaderText>
            <S.Ticker>{currency.ticker}</S.Ticker>
            {currency.domain ? (
              <S.Domain title={currency.domain}>{currency.domain}</S.Domain>
            ) : (
              <S.InternalChip>Internal</S.InternalChip>
            )}
          </S.HeaderText>
        </S.Header>
        {currency.description && <S.Description>{currency.description}</S.Description>}
      </S.Body>
      <S.Footer>
        <S.Owner>
          <UserLabel
            avatar={currency.owner.avatar}
            description="Owner"
            id={currency.owner.id}
            username={currency.owner.username}
          />
        </S.Owner>
        <DateDisplay createdDate={currency.created_date} modifiedDate={currency.modified_date} />
      </S.Footer>
    </S.Container>
  );
};

export default CurrencyCard;
