import styled from 'styled-components';

export const Chip = styled.span`
  display: block;
  filter: drop-shadow(0 3px 0 #7a5a1e) drop-shadow(0 6px 6px #00000059);
  height: var(--chip-size, 46px);
  width: var(--chip-size, 46px);

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
