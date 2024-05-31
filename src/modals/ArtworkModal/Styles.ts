import styled from 'styled-components';

import UModal from 'components/Modal';
import UTabs from 'components/Tabs';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 519px;
`;
export const Tabs = styled(UTabs)`
  height: 6vh;
  width: 22vw;
  font-weight: bold;
`;

export const Divider = styled.div`
  height: 3vh;
`;

export const Row = styled.div`
  display: grid;
  gap: 1vw;
  grid-template-columns: repeat(2, 1fr);
`;
export const Container = styled.div``;
