import {useEffect, useMemo, useState} from 'react';

import {getBonsais} from 'api/bonsais';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {Bonsai, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const BonsaiHome: SFC = ({className}) => {
  const [bonsais, setBonsais] = useState<Bonsai[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await getBonsais({status: 'published'});
        setBonsais(response);
      } catch (error) {
        displayErrorToast('Unable to load bonsai entries');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const content = useMemo(() => {
    if (isLoading) return <Loader />;
    if (!bonsais.length) return <EmptyText>No bonsai published yet.</EmptyText>;
    return (
      <S.CardGrid>
        {bonsais.map((bonsai) => (
          <S.Card key={bonsai.slug} to={`/bonsai/${bonsai.slug}`}>
            {bonsai.images[0] ? (
              <S.CardImage alt={bonsai.name} src={bonsai.images[0].url} />
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
                  {bonsai.price_amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}{' '}
                  {bonsai.price_currency?.ticker}
                </S.Price>
              </S.PriceRow>
            </S.CardBody>
          </S.Card>
        ))}
      </S.CardGrid>
    );
  }, [isLoading, bonsais]);

  return (
    <S.Container className={className}>
      <SectionHeading heading="Bonsai" />
      {content}
    </S.Container>
  );
};

export default BonsaiHome;
