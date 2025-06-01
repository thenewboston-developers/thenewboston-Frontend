import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';
import {Col as UCol, Row as URow} from 'styles/components/GridStyle';

export const CodeBlock = styled.div`
  padding: 0 15px;
`;

export const CodeContainer = styled.div`
  background-color: ${colors.whiteHover};
  border-radius: 10px;
  flex: 1;
  margin-left: 15px;
  padding: 5px;

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

export const CodeDetail = styled.div`
  padding: 5px 15px;
`;

export const CodeTitle = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin-left: 20px;
`;

export const CodeTitleContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: bold;
  padding: 10px;
`;

export const Col = styled(UCol)``;

export const Container = styled.div`
  padding: 24px 32px;
`;

export const Img = styled.img`
  height: 40px;
  width: 40px;
`;

export const Row = styled(URow)`
  margin-bottom: 20px;
`;
