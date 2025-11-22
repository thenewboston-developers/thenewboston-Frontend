import styled, {css} from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, colors, fonts, pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 240px;
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;

export const Card = styled.button`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  text-align: left;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${colors.palette.blue[300]};
    box-shadow: 0 10px 30px rgb(15 24 44 / 12%);
    transform: translateY(-2px);
  }
`;

export const CardImage = styled.img`
  height: 180px;
  object-fit: cover;
  width: 100%;
`;

export const CardImagePlaceholder = styled.div`
  align-items: center;
  background: ${colors.background};
  color: ${colors.secondary};
  display: flex;
  font-size: 14px;
  height: 180px;
  justify-content: center;
  padding: 16px;
  text-align: center;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px 20px;
`;

export const CardHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const StatusBadge = styled.span<{$status: string}>`
  border-radius: 999px;
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  padding: 4px 12px;
  text-transform: capitalize;
  ${({$status}) =>
    $status === 'published'
      ? css`
          background: ${colors.palette.green[50]};
          color: ${colors.palette.green[700]};
        `
      : css`
          background: ${colors.palette.orange[50]};
          color: ${colors.palette.orange[700]};
        `}
`;

export const Slug = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
`;

export const Dates = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;

export const DateItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DateLabel = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DateValue = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const Pagination = styled(UPagination)`
  margin: 32px auto 0;
  width: 100%;
`;
