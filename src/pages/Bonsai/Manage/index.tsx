import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';

import {getBonsais} from 'api/bonsais';
import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {getSelf} from 'selectors/state';
import {Bonsai, PaginatedResponse, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Manage: SFC = ({className}) => {
  const self = useSelector(getSelf);
  const [bonsaisData, setBonsaisData] = useState<PaginatedResponse<Bonsai> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 9;

  useEffect(() => {
    if (!self.is_staff) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = await getBonsais({page: currentPage, page_size: pageSize}, {useAuth: true});
        setBonsaisData(response);
      } catch (error) {
        displayErrorToast('Unable to load bonsai entries');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, pageSize, self.is_staff]);

  if (!self.is_staff) {
    return <Navigate to="/bonsai/home" replace />;
  }

  const renderCards = () => {
    if (isLoading) {
      return (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      );
    }

    if (!bonsaisData || !bonsaisData.results.length) {
      return <EmptyText>No bonsai found. Create your first entry to get started.</EmptyText>;
    }

    return (
      <>
        <S.CardGrid>
          {bonsaisData.results.map((bonsai) => (
            <S.Card key={bonsai.id} onClick={() => navigate(`/bonsai/edit/${bonsai.id}`)} type="button">
              {bonsai.images[0]?.url ? (
                <S.CardImage alt={bonsai.name} src={bonsai.images[0].url ?? ''} />
              ) : (
                <S.CardImagePlaceholder>No image available</S.CardImagePlaceholder>
              )}
              <S.CardBody>
                <S.CardHeader>
                  <S.CardTitle>{bonsai.name}</S.CardTitle>
                  <S.StatusBadge $status={bonsai.status}>
                    {bonsai.status === 'published' ? 'Published' : 'Draft'}
                  </S.StatusBadge>
                </S.CardHeader>
                <S.Slug>{bonsai.slug}</S.Slug>
                <S.Dates>
                  <S.DateItem>
                    <S.DateLabel>Updated</S.DateLabel>
                    <S.DateValue>{shortDate(bonsai.modified_date, false)}</S.DateValue>
                  </S.DateItem>
                  <S.DateItem>
                    <S.DateLabel>Created</S.DateLabel>
                    <S.DateValue>{shortDate(bonsai.created_date, false)}</S.DateValue>
                  </S.DateItem>
                </S.Dates>
              </S.CardBody>
            </S.Card>
          ))}
        </S.CardGrid>
        {bonsaisData.count > pageSize ? (
          <S.Pagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={Math.ceil(bonsaisData.count / pageSize)}
          />
        ) : null}
      </>
    );
  };

  return (
    <S.Container className={className}>
      <SectionHeading
        heading="Manage Bonsai"
        rightContent={<Button onClick={() => navigate('/bonsai/manage/create')} text="Create Bonsai" />}
      />
      {renderCards()}
    </S.Container>
  );
};

export default Manage;
