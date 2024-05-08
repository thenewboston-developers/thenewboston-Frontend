import styled from 'styled-components';

import {colors, fonts} from 'styles';
import UIcon from '@mdi/react';

export const ActionButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div<{selected: boolean}>`
  padding: 0 22px;
  background-color: ${({selected}) => (selected ? colors.palette.blue[600] : colors.white)};
`;

export const WrapperContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  border-bottom: 1px solid ${colors.border};
`;

export const Content = styled.div`
  align-items: flex-start;
  flex-grow: 1;
  font-size: 12px;
  padding: 0 10px;
  margin: 10px 0;
`;

export const Description = styled.div`
  color: ${colors.gray};
  margin: 5px 0px 10px 0px;
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
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
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.palette.gray[500]};
`;

export const StyledIcon = styled(UIcon)`
  height: 20px;
  width: 20px;
  margin-right: 6px;
`;

export const Img = styled.img`
  cursor: pointer;
  object-fit: cover;
  width: 120px;
  border-radius: 6px;
`;

export const Icon = styled(UIcon)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const LectureNumber = styled.div`
  font-size: 12px;
  margin-right: 10px;
  font-weight: ${fonts.weight.regular};
  color: ${colors.gray};
`;

export const Name = styled.h3`
  color: ${colors.black};
  cursor: pointer;
  font-weight: ${fonts.weight.semiBold};
`;
