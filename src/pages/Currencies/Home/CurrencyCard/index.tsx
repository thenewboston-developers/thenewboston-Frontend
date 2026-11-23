import {KeyboardEvent, MouseEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {mdiArrowTopRight, mdiWeb} from '@mdi/js';
import MdiIcon from '@mdi/react';

import UserLabel from 'components/UserLabel';
import {Currency, SFC} from 'types';
import {longDate, shortDate} from 'utils/dates';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
  dateField?: 'created' | 'modified';
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency, dateField = 'modified'}) => {
  const currencyPath = `/currencies/${currency.id}`;
  const date = dateField === 'created' ? currency.created_date : currency.modified_date;
  const dateLabel = dateField === 'created' ? 'Created' : 'Updated';
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

  const renderOrigin = () => {
    if (!currency.domain) return <S.InternalChip>Internal</S.InternalChip>;

    return (
      <S.Domain title={currency.domain}>
        <MdiIcon aria-hidden="true" path={mdiWeb} size="14px" />
        <S.DomainText>{currency.domain}</S.DomainText>
      </S.Domain>
    );
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
      <S.Header>
        <S.CurrencyLogo logo={currency.logo} width="56px" />
        <S.HeaderText>
          <S.Ticker>{currency.ticker}</S.Ticker>
          {renderOrigin()}
        </S.HeaderText>
        <S.OpenIcon aria-hidden="true">
          <MdiIcon path={mdiArrowTopRight} size="18px" />
        </S.OpenIcon>
      </S.Header>
      {currency.description && <S.Description>{currency.description}</S.Description>}
      <S.Footer>
        <S.Owner>
          <UserLabel
            avatar={currency.owner.avatar}
            avatarSize="28px"
            description=""
            id={currency.owner.id}
            username={currency.owner.username}
          />
        </S.Owner>
        <S.Activity title={longDate(date)}>
          {dateLabel} {shortDate(date, false).trim()}
        </S.Activity>
      </S.Footer>
    </S.Container>
  );
};

export default CurrencyCard;
