import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div<{aspectRatio?: string}>`
  background-color: ${colors.black};
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: ${({aspectRatio}) => {
    const ratios = aspectRatio?.split(':');
    if (ratios && ratios.length === 2) {
      const width = parseInt(ratios[0]);
      const height = parseInt(ratios[1]);
      return `${(height / width) * 100}%`;
    }
    return '56.25%'; // Default for 16:9 aspect ratio
  }};

  & iframe {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;
