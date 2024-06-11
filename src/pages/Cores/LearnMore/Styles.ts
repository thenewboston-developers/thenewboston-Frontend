import styled from 'styled-components';
import {Col as UCol, Row as URow} from 'styles/components/GridStyle';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  padding: 24px 32px;
`;

export const CodeContainer = styled.div`
  background-color: ${colors.whiteHover};
  border-radius: 10px;
  flex: 1;
  margin: 0 15px;
  padding: 5px 5px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  @media (max-width: ${breakpoints.mobile}) {
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

export const CodeDetail = styled.div`
  padding: 5px 15px;
`;

export const CodeTitleContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: bold;
  padding: 10px;
`;

export const CodeTitle = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin-left: 20px;
`;

export const CodeValueWrapper = styled.div`
  margin-bottom: 4px;
`;

export const ContentDetail = styled.div`
  margin-left: 25px;
`;

export const Col = styled(UCol)``;

export const Img = styled.img`
  height: 40px;
  width: 40px;
`;

export const Row = styled(URow)`
  margin-bottom: 20px;
`;
