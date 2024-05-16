import styled from 'styled-components';
import {colors, fonts} from 'styles';
import UIcon from '@mdi/react';

export const ActionButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div<{selected: boolean}>`
  background-color: ${({selected}) => (selected ? colors.palette.blue[600] : colors.white)};
  padding: 0 22px;
`;

export const WrapperContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.border};
  display: flex;
  gap: 14px;
`;

export const Content = styled.div`
  align-items: flex-start;
  flex-grow: 1;
  font-size: 12px;
  margin: 10px 0;
  padding: 0 10px;
`;

export const Description = styled.div`
  color: ${colors.gray};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  height: 50px;
  margin: 5px 0 10px 0;
  overflow-y: auto;
`;

export const Footer = styled.footer`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const FooterItem = styled.div`
  align-items: center;
  color: ${colors.palette.gray[500]};
  display: flex;
  font-weight: ${fonts.weight.semiBold};
`;

export const StyledIcon = styled(UIcon)`
  height: 20px;
  margin-right: 6px;
  width: 20px;
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
  color: ${colors.gray};
  font-size: 12px;
  font-weight: ${fonts.weight.regular};
  margin-right: 10px;
`;

export const Name = styled.h3`
  color: ${colors.black};
  cursor: pointer;
  font-weight: ${fonts.weight.semiBold};
`;
