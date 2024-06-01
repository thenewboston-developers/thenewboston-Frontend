import styled from 'styled-components';

import UModal from 'components/Modal';
import UTabs from 'components/Tabs';
import Tab from 'components/Tab';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 519px;
`;
export const Wrap = styled.div`
  font-weight: bold;
`;

export const Tabs = styled(UTabs)`
  font-weight: bold;
  height: 6vh;
  width: 23vw;
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

export const CustomTab = styled(Tab)`
  font-size: 0.8vw;
`;
