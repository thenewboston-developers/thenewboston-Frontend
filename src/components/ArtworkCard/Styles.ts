import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import ULine from 'components/Line';
import UThumbnail from 'components/Thumbnail';
import {colors, fonts} from 'styles';

export const Bottom = styled.div`
  display: flex;
  flex: 1;
  padding: 12px 16px 16px;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  overflow: hidden;
  transition: all 0.2s ease-in-out 0s;
`;

export const Description = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  margin-top: 4px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
`;

export const Line = styled(ULine)`
  margin: 16px 0;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Thumbnail = styled(UThumbnail)`
  border-radius: 0;
`;

export const Top = styled.div`
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 12px;
`;
