import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors} from 'styles';

export const Button = styled(UButton)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 16px;
  @media (min-width: 1025px) {
    flex-grow: 1;
  }
`;

export const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: min-content auto;
  padding: 24px;
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: auto;
    padding: 10px;
  }
`;

export const Box = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border-right: 1px solid ${colors.border};
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;
export const LeftMenu = styled.div`
  min-width: 271px;
  @media (max-width: ${breakpoints.mobile}) {
    min-width: auto;
    width: 100%;
  }
`;

export const Right = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  flex-grow: 1;
  padding: 24px 16px;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 10px;
  }
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: end;
  }
`;
