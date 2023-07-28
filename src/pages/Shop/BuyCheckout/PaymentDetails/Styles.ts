import styled from 'styled-components';

import UButton from 'components/Button';
import {colors, fonts} from 'styles';

export const Amount = styled.div`
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  margin-left: 8px;
`;

export const Button = styled(UButton)`
  width: 100%;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const CoreLogo = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 11px;
  margin-top: 12px;
`;

export const PriceContainer = styled.div`
  align-items: center;
  display: flex;
  line-height: 1.2;
  margin-bottom: 12px;
`;
