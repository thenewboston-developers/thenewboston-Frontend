import styled from 'styled-components';

import UButton from 'components/Button';
import {colors} from 'styles';

export const Button = styled(UButton)`
  margin-top: 24px;
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 260px 1fr;
  padding: 24px 32px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 240px;
`;

export const Left = styled.div``;

export const Right = styled.div``;

export const Tab = styled.div<{$isActive?: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.palette.blue['400'] : 'transparent')};
  border-radius: 4px;
  color: ${({$isActive}) => ($isActive ? '#fff' : colors.primary)};
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;

  &:hover {
    color: ${({$isActive}) => ($isActive ? '#fff' : '#4458b8')};
    cursor: pointer;
  }
`;

export const TabContent = styled.div`
  margin-top: 16px;
`;

export const Tabs = styled.div`
  display: flex;
`;
