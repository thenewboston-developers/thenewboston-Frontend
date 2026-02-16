import styled from 'styled-components';

import UPriceMini from 'components/PriceMini';
import {colors, fonts} from 'styles';

export const ActionsContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 3px;
  min-width: 0;
`;

export const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const Content = styled.div`
  color: ${colors.palette.gray[800]};
  font-size: 14px;
  line-height: 1.32;
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
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 1px;
`;

export const Username = styled.div`
  color: ${colors.palette.gray[900]};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
`;

export const UsernameDateContainer = styled.div`
  align-items: baseline;
  display: flex;
`;
