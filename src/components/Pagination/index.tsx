import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import {SFC} from 'types';

import * as S from './Styles';

export interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: SFC<PaginationProps> = ({className, currentPage, onPageChange, totalPages}) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <S.Container className={className}>
      <S.NavigationButton disabled={currentPage === 1} onClick={handlePreviousClick}>
        <Icon path={mdiChevronLeft} size="20px" />
      </S.NavigationButton>

      <S.PageInfo>
        Page {currentPage} of {totalPages}
      </S.PageInfo>

      <S.NavigationButton disabled={currentPage === totalPages} onClick={handleNextClick}>
        <Icon path={mdiChevronRight} size="20px" />
      </S.NavigationButton>
    </S.Container>
  );
};

export default Pagination;
