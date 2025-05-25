import styled from 'styled-components';
import {breakpoints, colors} from 'styles';
import {Table as UTable, Tbody as UTbody, Thead as UThead} from 'styles/components/Table';

import UModal from 'components/Modal';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

export const TextMuted = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 0.9rem;
  margin-top: 2px;
  text-transform: lowercase;
`;

export const Table = styled(UTable)`
  th:nth-child(1),
  td:nth-child(1) {
    width: 80px;
  }
`;

export const Tbody = styled(UTbody)``;

export const Thead = styled(UThead)``;
