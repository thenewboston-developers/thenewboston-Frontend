import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import SectionHeading from 'components/SectionHeading';
import {getCurrencies} from 'dispatchers/currencies';
import {AppDispatch, Currency, PaginatedResponse, SFC} from 'types';

import CurrencyCard from './CurrencyCard';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currenciesData, setCurrenciesData] = useState<PaginatedResponse<Currency> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const pageSize = 10;

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoading(true);
      try {
        const data = await dispatch(getCurrencies({page: currentPage, page_size: pageSize}));
        setCurrenciesData(data);
      } catch (error) {
        // Error fetching currencies
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencies();
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!currenciesData || !currenciesData.results.length) return <EmptyText>No currencies to display.</EmptyText>;
    return renderCurrencies();
  };

  const renderCurrencies = () => {
    if (!currenciesData) return null;
    const currencyCards = currenciesData.results.map((currency) => (
      <CurrencyCard currency={currency} key={currency.id} />
    ));
    return (
      <>
        <S.CardsContainer>{currencyCards}</S.CardsContainer>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(currenciesData.count / pageSize)}
        />
      </>
    );
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
