import {useEffect, useState} from 'react';

import {getBonsais} from 'api/bonsais';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {Bonsai, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const BonsaiHome: SFC = ({className}) => {
  const [bonsaisData, setBonsaisData] = useState<PaginatedResponse<Bonsai> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 12;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await getBonsais({status: 'published', page: currentPage, page_size: pageSize});
        setBonsaisData(response);
      } catch (error) {
        displayErrorToast('Unable to load bonsai entries');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, pageSize]);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!bonsaisData || !bonsaisData.results.length) return <EmptyText>No bonsai published yet.</EmptyText>;
    return (
      <>
        <S.CardGrid>
          {bonsaisData.results.map((bonsai) => (
            <S.Card key={bonsai.slug} to={`/bonsai/${bonsai.id}`}>
              {bonsai.images[0]?.url ? (
                <S.CardImage alt={bonsai.name} src={bonsai.images[0].url ?? ''} />
              ) : (
                <S.CardImagePlaceholder>No image available</S.CardImagePlaceholder>
              )}
              <S.CardBody>
                <S.CardTitle>{bonsai.name}</S.CardTitle>
                <S.CardMeta>{bonsai.species}</S.CardMeta>
                <S.CardTeaser>{bonsai.teaser}</S.CardTeaser>
                <S.PriceRow>
                  {bonsai.price_currency?.logo ? (
                    <S.CurrencyLogo alt={`${bonsai.price_currency.ticker} logo`} src={bonsai.price_currency.logo} />
                  ) : null}
                  <S.Price>
                    {bonsai.price_amount.toLocaleString()} {bonsai.price_currency?.ticker}
                  </S.Price>
                </S.PriceRow>
              </S.CardBody>
            </S.Card>
          ))}
        </S.CardGrid>
        {bonsaisData.count > pageSize ? (
          <S.Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={Math.ceil((bonsaisData?.count ?? 0) / pageSize)}
          />
        ) : null}
      </>
    );
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="Bonsai" />
      {renderContent()}
    </S.Container>
  );
};

export default BonsaiHome;
