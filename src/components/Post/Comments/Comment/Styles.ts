import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import UPriceMini from 'components/PriceMini';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  width: 100%;
`;

export const Content = styled.div`
  line-height: 1.3;
  margin-top: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const LongContent = styled.span`
  word-break: break-all;
`;

export const Date = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const Dot = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  margin: 0 4px;
`;

export const DropdownMenu = styled(UDropdownMenu)``;

export const CommentSection = styled.div`
  background: ${colors.background};
  border-radius: 0 14px 14px 14px;
  flex-grow: 1;
  padding: 14px;
`;

export const HeadSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 2px;
`;

export const Right = styled.div`
  margin-left: 10px;
`;

export const Username = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;

export const UsernameDateContainer = styled.div`
  align-items: baseline;
  display: flex;
`;

export const Text = styled.div`
  display: flex;
  gap: 20px;
`;
