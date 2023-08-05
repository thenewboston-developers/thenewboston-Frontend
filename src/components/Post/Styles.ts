import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import {colors} from 'styles';

export const Comments = styled.div`
  margin-top: 16px;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 12px 16px;
`;

export const Content = styled.div`
  font-size: 15px;
  margin-top: 8px;
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
`;

export const Img = styled.img`
  border-radius: 4px;
  margin-top: 12px;
  max-height: 600px;
  max-width: 100%;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
