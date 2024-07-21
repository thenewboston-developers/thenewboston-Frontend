import styled from 'styled-components';
import {colors} from 'styles';
import ULine from 'components/Line';

export const Container = styled.div``;

export const CardContainer = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;

export const CardHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const CardBody = styled.div`
  align-items: center;
  padding: 20px;
`;

export const CardItem = styled.div`
  gap: 10px;
  align-items: center;
  display: flex;
`;

export const Line = styled(ULine)``;
