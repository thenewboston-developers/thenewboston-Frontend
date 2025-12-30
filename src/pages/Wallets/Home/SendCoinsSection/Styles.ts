import styled from 'styled-components';

import UButton from 'components/Button';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  margin-bottom: 24px;
  padding: 24px;
`;

export const SearchRow = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 16px;
`;

export const SendButton = styled(UButton)`
  min-width: 160px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: ${fonts.weight.bold};
  margin-bottom: 20px;
`;
