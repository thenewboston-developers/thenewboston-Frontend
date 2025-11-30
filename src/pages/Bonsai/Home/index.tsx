import {useEffect, useState} from 'react';

import {getBonsais} from 'api/bonsais';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {Bonsai, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import BonsaiCard from './BonsaiCard';
import * as S from './Styles';

const BonsaiHome: SFC = ({className}) => {
  const [bonsaisData, setBonsaisData] = useState<PaginatedResponse<Bonsai> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 24;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderBonsais = () => {
    if (!bonsaisData) return null;
    const bonsaiCards = bonsaisData.results.map((bonsai) => <BonsaiCard bonsai={bonsai} key={bonsai.slug} />);
    return (
      <>
        <S.CardGrid>{bonsaiCards}</S.CardGrid>
        {bonsaisData.count > pageSize ? (
          <S.Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={Math.ceil((bonsaisData?.count ?? 0) / pageSize)}
          />
        ) : null}
      </>
    );
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!bonsaisData || !bonsaisData.results.length) return <EmptyText>No bonsai published yet.</EmptyText>;
    return renderBonsais();
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="Bonsai" />
      {renderContent()}
    </S.Container>
  );
};

export default BonsaiHome;
