import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {colors} from 'styles';

export const Avatar = styled(UAvatar)`
  margin-right: 8px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Description = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
