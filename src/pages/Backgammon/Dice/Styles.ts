import styled, {css, keyframes} from 'styled-components';

const tumble = keyframes`
  0% { transform: translateY(-5px) rotate(-18deg) scale(0.88); }
  24% { transform: translateY(-12px) rotate(24deg) scale(1.06); }
  52% { transform: translateY(1px) rotate(-12deg) scale(0.97); }
  76% { transform: translateY(-4px) rotate(6deg); }
  100% { transform: translateY(0) rotate(0) scale(1); }
`;

export const Caption = styled.span`
  color: #667d68;
  font-size: 11px;
  line-height: 1.4;
`;

export const Dice = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Die = styled.div<{$animate: boolean; $index: number; $rolling: boolean; $used: boolean}>`
  align-items: center;
  background: #fffdf6;
  border: 1px solid #ddd6bf;
  border-radius: 10px;
  box-shadow: 0 2px 0 #d6d0bd;
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(3, 1fr);
  height: 42px;
  opacity: ${({$used}) => ($used ? 0.35 : 1)};
  padding: 8px;
  transform-origin: center;
  transition: opacity 140ms;
  width: 42px;

  @media (prefers-reduced-motion: no-preference) {
    ${({$animate, $index, $rolling}) =>
      ($rolling || $animate) &&
      css`
        animation: ${tumble} 560ms ${$index * 45}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${$rolling ? 'infinite' : '1'}
          both;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Dot = styled.span<{$visible: boolean}>`
  aspect-ratio: 1;
  background: ${({$visible}) => ($visible ? '#244d3c' : 'transparent')};
  border-radius: 50%;
`;

export const Group = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 7px;
`;
