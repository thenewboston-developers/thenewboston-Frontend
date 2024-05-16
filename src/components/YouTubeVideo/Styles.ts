import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  background-color: ${colors.black};
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  padding-top: 56.25%; // Default for 16:9 aspect ratio
  position: relative;
  width: 100%;
  z-index: 10;

  & iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;
