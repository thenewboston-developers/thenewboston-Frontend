import styled from 'styled-components';

import UCopyContainer from 'components/CopyContainer';
import {colors} from 'styles';

export const Container = styled.div``;

export const CopyContainer = styled(UCopyContainer)`
  margin-top: 8px;
  width: 280px;
`;

export const DepositAccountRow = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

export const Panel = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  margin-top: 16px;
  padding: 16px;
`;

export const QrWrapper = styled.div`
  margin-top: 16px;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
