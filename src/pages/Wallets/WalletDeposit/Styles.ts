import styled from 'styled-components';

import UCopyContainer from 'components/CopyContainer';
import {colors} from 'styles';

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  padding: 16px;
`;

export const CopyContainer = styled(UCopyContainer)`
  margin-top: 8px;
  width: 280px;
`;
