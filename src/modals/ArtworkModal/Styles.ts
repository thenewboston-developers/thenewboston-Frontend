import styled from 'styled-components';

import UModal from 'components/Modal';
import UTab from 'components/Tab';
import UTabs from 'components/Tabs';

import {breakpoints} from 'styles';

export const Container = styled.div``;

export const Divider = styled.div`
  height: 3vh;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  max-width: 520px;
  width: 80%;

  @media (max-width: ${breakpoints.mini}) {
    width: 90%;
  }
`;

export const Row = styled.div`
  display: grid;
  gap: 1vw;
  grid-template-columns: repeat(2, 1fr);
`;

export const Tab = styled(UTab)`
  font-size: 0.8em;
`;

export const Tabs = styled(UTabs)`
  font-weight: bold;
`;
