import styled from 'styled-components';

// Each chip below the top one shows as a sliver of its edge
const getStackShadow = (edge: string, height: number) => {
  const layers: string[] = [];
  for (let layer = 1; layer < height; layer += 1) {
    layers.push(`0 ${layer * 2.4 - 0.8}px 0 #0000008c`, `0 ${layer * 2.4}px 0 ${edge}`);
  }
  layers.push(`0 ${height * 2.4 + 1.5}px 5px #00000080`);
  return layers.join(', ');
};

export const Chip = styled.span<{$edge: string; $height: number}>`
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: ${({$edge, $height}) => getStackShadow($edge, $height)};
  display: block;
  width: 100%;

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
