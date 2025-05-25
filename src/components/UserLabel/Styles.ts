import styled from 'styled-components';
import {colors, fonts} from 'styles';

import UAvatar from 'components/Avatar';

export const Avatar = styled(UAvatar)`
  margin-right: 8px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Description = styled.div`
  color: ${colors.gray};
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.div<{$id: number | null}>`
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};

  &:hover {
    cursor: ${({$id}) => ($id ? 'pointer' : 'default')};
  }
`;
