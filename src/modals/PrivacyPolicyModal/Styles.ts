import styled from 'styled-components';

import UModal from 'components/Modal';
import {colors, modalBodyPadding} from 'styles';

export const Bold = styled.span`
  font-weight: 600;
`;

export const LastUpdated = styled.p`
  color: ${colors.palette.gray[600]};
  font-size: 14px;
  margin-bottom: 24px;
`;

export const List = styled.ul`
  list-style: disc;
  margin: 12px 0 0 24px;
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
`;

export const Modal = styled(UModal)`
  max-width: 600px;
  width: 90vw;
`;

export const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 12px;
`;

export const ScrollableContent = styled.div`
  ${modalBodyPadding};
  max-height: 70vh;
  overflow-y: auto;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;
