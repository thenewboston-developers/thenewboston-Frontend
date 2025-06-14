import styled from 'styled-components';

import UPriceMini from 'components/PriceMini';
import {colors, fonts} from 'styles';

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const CommentSection = styled.div`
  background: ${colors.background};
  border-radius: 0 12px 12px 12px;
  flex-grow: 1;
  padding: 10px 14px 12px;
`;

export const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  width: 100%;
`;

export const Content = styled.div`
  font-size: 14px;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-wrap: break-word;
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

export const HeadSection = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

export const LongContent = styled.span`
  word-break: break-all;
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 2px;
`;

export const Username = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
`;

export const UsernameDateContainer = styled.div`
  align-items: baseline;
  display: flex;
`;
