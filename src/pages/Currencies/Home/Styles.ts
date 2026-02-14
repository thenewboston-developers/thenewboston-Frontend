import styled from 'styled-components';

import ULoader from 'components/Loader';
import UPagination from 'components/Pagination';
import {breakpoints, colors, inputStyle, pagePadding} from 'styles';

export const CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: auto;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const FiltersContainer = styled.div`
  align-items: center;
  column-gap: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 8px;
  row-gap: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Loader = styled(ULoader)`
  margin-top: 128px;
`;

export const Pagination = styled(UPagination)`
  margin-top: 32px;
`;

export const SearchInput = styled.input`
  ${inputStyle};
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 6%);
  font-size: 14px;
  max-width: 480px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  width: 100%;

  &:focus {
    border: 1px solid ${colors.palette.blue[200]};
  }
`;

export const SortSelect = styled.select`
  ${inputStyle};
  appearance: none;
  background-color: ${colors.white};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23536471' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-position: right 14px center;
  background-repeat: no-repeat;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 6%);
  font-size: 14px;
  outline: none;
  padding-right: 36px;
  transition: border-color 0.2s ease-in-out;
  width: 220px;

  &:focus {
    border: 1px solid ${colors.palette.blue[200]};
  }

  &:hover:not(:focus) {
    border: 1px solid #cbd0d9;
  }

  &:hover {
    cursor: pointer;
  }
`;
