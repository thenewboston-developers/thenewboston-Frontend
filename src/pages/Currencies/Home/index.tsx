import {useSelector} from 'react-redux';

import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {getCurrenciesOrdered} from 'selectors/state';
import {SFC} from 'types';

import CurrencyCard from './CurrencyCard';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  const currenciesList = useSelector(getCurrenciesOrdered);

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
