import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';
import UUserLabel from 'components/UserLabel';
import UIcon from '@mdi/react';

export const ContentContainer = styled.div`
  min-height: 347px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const ActionButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const IconContainer = styled.div`
  height: 36px;
  min-width: 36px;
  width: 36px;
  background: rgba(211, 211, 211, 0.25);
  box-shadow: 0 2px 2px rgba(211, 211, 211, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(UIcon)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Container = styled.div`
  border-radius: 0 0 14px 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;

export const Content = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 18px;
`;

export const Description = styled.div`
  color: ${colors.gray};
  font-weight: ${fonts.weight.regular};
  font-size: 14px;
  line-height: 22px;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f1f1;
  padding: 16px;
  border-radius: 0 0 14px 14px;
`;

export const FooterItem = styled.div<{$gap: number}>`
  align-items: center;
  display: flex;
  gap: ${(props) => props.$gap}px;
  img {
    border-radius: 100px;
  }
`;

export const InstructorName = styled.h3`
  font-weight: ${fonts.weight.semiBold};
  font-size: 14px;
  line-height: 18px;
`;

export const Position = styled.p`
  font-weight: ${fonts.weight.semiBold};
  font-size: 12px;
  line-height: 20px;
  color: #969696;
  margin-bottom: 0;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  border-radius: 14px 14px 0 0;
  display: block;
  max-height: 150px;
  max-width: 100%;
  object-fit: cover;
  width: 100%;
`;

export const Link = styled(ULink)`
  color: ${colors.black};

  &:hover {
    color: ${colors.black};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Name = styled.h3`
  font-weight: ${fonts.weight.semiBold};
  font-size: 16px;
  line-height: 24px;
`;
export const NameContainer = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
`;

export const TimeText = styled.p`
  font-weight: ${fonts.weight.semiBold};
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 0;
  color: #969696;
`;

export const UserLabel = styled(UUserLabel)``;
