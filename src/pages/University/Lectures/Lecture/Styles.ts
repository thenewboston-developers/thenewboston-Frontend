import styled from 'styled-components';

import {colors} from 'styles';
import UIcon from '@mdi/react';

export const ActionButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div<{selected: boolean}>`
  align-items: center;
  background-color: ${({selected}) => (selected ? colors.palette.blue[100] : colors.white)};
  border-radius: 4px;
  border: 1px solid ${colors.border};
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Content = styled.div`
  align-items: flex-start;
  flex-grow: 1;
  font-size: 12px;
  padding: 0 10px;
`;

export const Description = styled.div`
  color: ${colors.primary};
  margin: 5px 0px 10px 0px;
  height: 50px;
  overflow-y: auto;
`;

export const Footer = styled.footer`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const FooterItem = styled.div`
  align-items: center;
  display: flex;
`;

export const Img = styled.img`
  cursor: pointer;
  object-fit: cover;
  width: 120px;
`;

export const Icon = styled(UIcon)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const LectureNumber = styled.div`
  font-size: 14px;
  margin-right: 10px;
`;

export const Name = styled.h3`
  color: ${colors.primary};
  cursor: pointer;
`;
