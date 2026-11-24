import styled from 'styled-components';

export const BoardFrame = styled.div`
  background: #263e30;
  border: 1px solid #415b41;
  border-radius: 22px;
  box-shadow: 0 16px 32px #243c291c;
  margin: 0 auto;
  max-width: 640px;
  padding: 20px;
  width: 100%;

  @media (min-width: 1000px) and (min-height: 600px) {
    max-width: min(640px, calc(100dvh - 280px));
  }

  @media (max-width: 550px) {
    border-radius: 14px;
    padding: 10px;
  }
`;

export const BoardGrid = styled.div`
  border: 3px solid #182c20;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  overflow: hidden;
`;

export const BoardTitle = styled.div`
  color: #f0f1df;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 12px;
  justify-content: space-between;
  padding: 0 0 14px;
`;

export const Cell = styled.button<{$dark: boolean; $last: boolean; $selected: boolean; $target: boolean}>`
  align-items: center;
  aspect-ratio: 1;
  background: ${({$dark, $last}) => {
    if ($last) return '#8f9c66';
    return $dark ? '#6b805d' : '#e9e3d0';
  }};
  border: 0;
  box-shadow: ${({$selected}) => ($selected ? 'inset 0 0 0 4px #efcb75' : 'none')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-width: 0;
  padding: 0;
  position: relative;

  &:disabled {
    cursor: default;
  }

  &:hover:not(:disabled) {
    box-shadow: inset 0 0 0 3px #efcb75;
  }

  &:focus-visible {
    outline: 4px solid #f7c958;
    outline-offset: -4px;
    z-index: 1;
  }

  &::after {
    background: #f1d38a;
    border: 2px solid #354b30;
    border-radius: 50%;
    content: ${({$target}) => ($target ? "''" : 'none')};
    height: 24%;
    position: absolute;
    width: 24%;
  }
`;

export const Coordinate = styled.span<{$dark: boolean}>`
  bottom: 2px;
  color: ${({$dark}) => ($dark ? '#eff4de' : '#506044')};
  font-size: clamp(8px, 1.1vw, 11px);
  left: 3px;
  line-height: 1;
  position: absolute;
`;

export const Legend = styled.div`
  color: #d6dfc5;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 16px;
  line-height: 1.5;
  padding-top: 14px;
`;

export const Piece = styled.span<{$white: boolean}>`
  align-items: center;
  background: ${({$white}) =>
    $white ? 'linear-gradient(145deg, #fff8e6, #dcd2b6)' : 'linear-gradient(145deg, #4b5650, #17251d)'};
  border: 2px solid ${({$white}) => ($white ? '#fff8e6' : '#59685c')};
  border-radius: 50%;
  box-shadow:
    0 4px 0 ${({$white}) => ($white ? '#a49c83' : '#102018')},
    0 6px 7px #10201866,
    inset 0 0 0 4px ${({$white}) => ($white ? '#c7bea354' : '#8a967c33')};
  color: ${({$white}) => ($white ? '#5b5336' : '#f1dd9c')};
  display: flex;
  font-size: clamp(18px, 4vw, 36px);
  height: 74%;
  justify-content: center;
  line-height: 1;
  transform: translateY(-2px);
  width: 74%;
`;
