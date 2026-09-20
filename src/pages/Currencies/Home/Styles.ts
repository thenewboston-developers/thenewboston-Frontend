import styled, {css} from 'styled-components';

import UEmptyText from 'components/EmptyText';
import UIcon from 'components/Icon';
import UPagination from 'components/Pagination';
import {breakpoints, cardStyle, colors, fonts, pagePadding, radii, shadows} from 'styles';

const CHEVRON_COLOR = encodeURIComponent(colors.secondary);
const CHEVRON_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='${CHEVRON_COLOR}' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`;
const CONTROL_HEIGHT = 44;

const controlMixin = css`
  background-color: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  color: ${colors.primary};
  font-family: ${fonts.family.default};
  font-size: 14px;
  height: ${`${CONTROL_HEIGHT}px`};
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: ${colors.borderDarker};
  }

  /* The border shares the color of shadows.focusRing, so the border and the ring read as a single outline */
  &:focus {
    border-color: ${colors.palette.blue[500]};
    box-shadow: ${shadows.focusRing};
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));

  @media (max-width: ${breakpoints.mini}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const EmptyText = styled(UEmptyText)`
  ${cardStyle};
  font-size: 14px;
  padding: 64px 24px;
`;

export const FiltersContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const Pagination = styled(UPagination)`
  margin-top: 32px;
`;

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 480px;
  min-width: 0;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    flex: none;
    max-width: none;
  }
`;

export const SearchIcon = styled(UIcon)`
  color: ${colors.secondary};
  left: 14px;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const SearchInput = styled.input`
  ${controlMixin};
  padding: 0 14px 0 42px;
  text-overflow: ellipsis;
  width: 100%;

  /* Firefox lowers the opacity of placeholders by default, which would drop the text below the 4.5:1 contrast ratio */
  &::placeholder {
    color: ${colors.secondary};
    opacity: 1;
  }
`;

export const SortSelect = styled.select`
  ${controlMixin};
  appearance: none;
  background-image: ${CHEVRON_ICON};
  background-position: right 14px center;
  background-repeat: no-repeat;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0 40px 0 14px;
  width: 220px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;
