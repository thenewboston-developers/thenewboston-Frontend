import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import ULine from 'components/Line';
import {colors, fonts} from 'styles';

export const Avatar = styled(UAvatar)`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
`;

export const BottomRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: auto;
`;

export const CoinAmount = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 15px;
  font-weight: 500;
`;

export const CoinDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
`;

export const CoinInfo = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
`;

export const CoinName = styled.div`
  color: ${colors.palette.gray[900]};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 140px;
  padding: 20px;
  position: relative;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.palette.gray[300]};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

export const Line = styled(ULine)`
  margin: 12px 0;
`;

export const Rank = styled.div`
  color: ${colors.palette.gray[700]};
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
`;

export const RankBadge = styled.img`
  height: 24px;
  width: 24px;
`;

export const RankContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 6px;
`;
