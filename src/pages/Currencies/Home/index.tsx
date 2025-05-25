import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {getCurrencies} from 'selectors/state';
import {SFC} from 'types';

import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';

import CurrencyCard from '../CurrencyCard';

import * as S from './Styles';

const Home: SFC = ({className}) => {
  const currencies = useSelector(getCurrencies);

  const currenciesList = useMemo(() => {
    return orderBy(Object.values(currencies), ['ticker']);
  }, [currencies]);

  const renderContent = () => {
    if (!!currenciesList.length) return renderCurrencies();
    return <EmptyText>No currencies to display.</EmptyText>;
  };

  const renderCurrencies = () => {
    const currencyCards = currenciesList.map((currency) => <CurrencyCard currency={currency} key={currency.id} />);
    return <S.CardsContainer>{currencyCards}</S.CardsContainer>;
  };

  return (
    <>
      <S.Container className={className}>
        <SectionHeading heading="Currencies" />
        {renderContent()}
      </S.Container>
    </>
  );
};

export default Home;
