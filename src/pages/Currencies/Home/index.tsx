import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {getCurrencies} from 'dispatchers/currencies';
import {AppDispatch, Currency, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import CurrencyCard from './CurrencyCard';
import * as S from './Styles';

type CurrencyOrdering = '-created_date' | '-modified_date' | '-ticker' | 'created_date' | 'ticker';

const CURRENCY_SORT_OPTIONS: {label: string; value: CurrencyOrdering}[] = [
  {label: 'Recently Updated', value: '-modified_date'},
  {label: 'Newest First', value: '-created_date'},
  {label: 'Oldest First', value: 'created_date'},
  {label: 'Ticker (A-Z)', value: 'ticker'},
  {label: 'Ticker (Z-A)', value: '-ticker'},
];
const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_DELAY_MS = 300;

const Home: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currenciesData, setCurrenciesData] = useState<PaginatedResponse<Currency> | null>(null);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortOrdering, setSortOrdering] = useState<CurrencyOrdering>('-modified_date');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await dispatch(
          getCurrencies({
            ordering: sortOrdering,
            page: currentPage,
            page_size: PAGE_SIZE,
            search: debouncedSearchValue || undefined,
          }),
        );
        setCurrenciesData(data);
      } catch (error) {
        displayErrorToast('Error fetching currencies');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, debouncedSearchValue, dispatch, sortOrdering]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchValue(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSortOrdering(event.target.value as CurrencyOrdering);
  };

  const renderContent = () => {
    if (isLoading) return <S.Loader />;
    if (!currenciesData || !currenciesData.results.length) {
      if (debouncedSearchValue) return <EmptyText>No currencies matched your search.</EmptyText>;
      return <EmptyText>No currencies to display.</EmptyText>;
    }
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
        <S.Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(currenciesData.count / PAGE_SIZE)}
        />
      </>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <SectionHeading heading="Currencies" />
        <S.FiltersContainer>
          <S.SearchInput
            onChange={handleSearchChange}
            placeholder="Search by ticker, domain, owner, or description"
            type="text"
            value={searchValue}
          />
          <S.SortSelect onChange={handleSortChange} value={sortOrdering}>
            {CURRENCY_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.SortSelect>
        </S.FiltersContainer>
        {renderContent()}
      </S.Container>
    </>
  );
};

export default Home;
