import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import {SFC} from 'types';

import * as S from './Styles';

export interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

type PageItem = number | 'ellipsis-end' | 'ellipsis-start';

// The page list never grows past this many slots (ellipses included), which keeps the control narrow enough for modals
const MAX_PAGE_SLOTS = 5;

const Pagination: SFC<PaginationProps> = ({className, currentPage, onPageChange, totalPages}) => {
  const getPageItems = (): PageItem[] => {
    if (totalPages <= MAX_PAGE_SLOTS) return Array.from({length: totalPages}, (_, index) => index + 1);
    if (currentPage <= 3) return [1, 2, 3, 'ellipsis-end', totalPages];
    if (currentPage >= totalPages - 2) return [1, 'ellipsis-start', totalPages - 2, totalPages - 1, totalPages];
    return [1, 'ellipsis-start', currentPage, 'ellipsis-end', totalPages];
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageItems = () => {
    return getPageItems().map((pageItem) => {
      if (typeof pageItem !== 'number') {
        return (
          <S.Ellipsis aria-hidden="true" key={pageItem}>
            &hellip;
          </S.Ellipsis>
        );
      }

      const isActive = pageItem === currentPage;

      return (
        <S.PageButton
          $isActive={isActive}
          aria-current={isActive ? 'page' : undefined}
          aria-label={`Page ${pageItem} of ${totalPages}`}
          key={pageItem}
          onClick={() => handlePageClick(pageItem)}
          type="button"
        >
          {pageItem}
        </S.PageButton>
      );
    });
  };

  if (totalPages <= 1) return null;

  return (
    <S.Container aria-label="Pagination" className={className}>
      <S.NavigationButton
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
        type="button"
      >
        <Icon path={mdiChevronLeft} size="20px" />
      </S.NavigationButton>

      {renderPageItems()}

      <S.NavigationButton
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
        type="button"
      >
        <Icon path={mdiChevronRight} size="20px" />
      </S.NavigationButton>
    </S.Container>
  );
};

export default Pagination;
