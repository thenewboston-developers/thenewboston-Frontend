import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

export const Content = styled.div`
  line-height: 1.3;
  margin-top: 2px;
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

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
`;

export const Middle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
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
