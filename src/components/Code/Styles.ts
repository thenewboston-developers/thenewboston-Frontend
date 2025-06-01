import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  color: ${colors.palette.darkGray['400']};
  font-size: 12px;
  line-height: 1.5;
  margin: 0 10px;
  padding: 10px;

  pre {
    font-family: monospace;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;
