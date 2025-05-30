import styled, {keyframes} from 'styled-components';

import Icon from 'components/Icon';

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const fade = keyframes`
  0% {
    opacity: 1;
  }
  75% {
    opacity: .1;
  }
  100% {
    opacity: 1;
  }
`;

const spin = keyframes`
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

export const LoadingIcon = styled(Icon)`
  animation:
    ${fade} 1s linear infinite,
    ${spin} 1s linear infinite;
  display: inline;
`;
