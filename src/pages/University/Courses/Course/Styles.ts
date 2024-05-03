import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';
import UUserLabel from 'components/UserLabel';
import UIcon from '@mdi/react';

export const ActionButtonsContainer = styled.div`
  align-items: center;
  background: ${colors.whiteHover};
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const ContentContainer = styled.div`
  border-radius: 14px;
  min-height: 340px;
  overflow: hidden;
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
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
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  height: 50px;
  line-height: 22px;
  min-height: 60px;
  overflow-y: auto;
`;

export const Footer = styled.div`
  align-items: center;
  border-radius: 0 0 14px 14px;
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const FooterItem = styled.div<{$gap: number}>`
  align-items: center;
  display: flex;
  gap: ${(props) => props.$gap}px;
`;

export const IconContainer = styled.div`
  align-items: center;
  background: rgba(211, 211, 211, 0.25);
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(211, 211, 211, 0.25);
  display: flex;
  height: 36px;
  justify-content: center;
  min-width: 36px;
  width: 36px;
`;

export const Icon = styled(UIcon)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const InstructorName = styled.h3`
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 18px;
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
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 24px;
`;
export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TimeText = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  margin-bottom: 0;
`;

export const UserLabel = styled(UUserLabel)``;
