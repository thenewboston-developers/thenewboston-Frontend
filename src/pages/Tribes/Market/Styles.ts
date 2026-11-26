import styled from 'styled-components';

import {easing, palette, shadows} from '../theme';

export * from '../Styles';

export const Filters = styled.div`
  align-items: flex-end;
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(0, 1.6fr) minmax(160px, 1fr);

  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Listing = styled.article<{$kind: 'buy' | 'sell' | 'stock'}>`
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: 16px;
  box-shadow: ${shadows.card};
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  padding: 18px;
  position: relative;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ${easing.out};

  &::before {
    background: ${({$kind}) => {
      if ($kind === 'buy') return palette.sky;
      return $kind === 'stock' ? palette.gold : palette.leaf;
    }};
    content: '';
    height: 4px;
    inset: 0 0 auto;
    position: absolute;
  }

  &:hover {
    box-shadow: ${shadows.lifted};
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ListingHead = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;

  > span:first-child {
    align-items: center;
    background: #faf7ee;
    border: 1px solid ${palette.line};
    border-radius: 14px;
    display: inline-flex;
    flex-shrink: 0;
    height: 56px;
    justify-content: center;
    width: 56px;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  h2 {
    font-size: 16px;
    margin: 0 0 4px;
  }
`;

export const Price = styled.div`
  align-items: baseline;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin: 14px 0 4px;

  strong {
    font-feature-settings: 'tnum';
    font-size: 24px;
    font-weight: 750;
    letter-spacing: -0.03em;
  }

  small {
    color: ${palette.muted};
    font-size: 12px;
    font-weight: 600;
    margin-left: 5px;
  }

  span {
    color: ${palette.muted};
    font-size: 12.5px;
    font-weight: 600;
  }
`;

export const Seller = styled.p`
  align-items: center;
  color: ${palette.muted};
  display: flex;
  font-size: 12.5px;
  gap: 7px;
  margin: 2px 0 0;
`;

export const Total = styled.div`
  align-items: center;
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 12px;
  color: ${palette.muted};
  display: flex;
  font-size: 13px;
  font-weight: 600;
  justify-content: space-between;
  padding: 10px 12px;

  strong {
    color: ${palette.text};
    font-feature-settings: 'tnum';
    font-size: 15px;
  }
`;
