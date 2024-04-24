import styled from 'styled-components';

import UTools from 'components/Tools';
import {fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  padding: 8px 16px;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
  }
`;

export const Content = styled.div`
  font-size: 14px;
  margin-top: 1px;
`;

export const Date = styled.div`
  font-size: 10px;
  font-weight: ${fonts.weight.light};
  margin-right: 4px;
`;

export const DisplayName = styled.div<{$id: any}>`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin-right: 8px;

  &:hover {
    cursor: ${({$id}) => ($id ? 'pointer' : 'default')};
  }
`;

export const Header = styled.div`
  display: flex;
`;

export const HeaderLeft = styled.div`
  align-items: baseline;
  display: flex;
  flex: auto;
`;

export const HeaderRight = styled.div`
  align-items: center;
  display: flex;
`;

export const Right = styled.div`
  flex: auto;
  margin-left: 10px;
`;

export const Tools = styled(UTools)`
  top: -26px;
`;

export const ToolsContainer = styled.div`
  position: relative;
`;
