import styled, {css} from 'styled-components';

import {colors, fonts} from 'styles';

import {CalloutType} from './types';

const typeStyles = {
  [CalloutType.ERROR]: css`
    background-color: rgba(247, 205, 205, 0.3);
    border-color: ${colors.palette.red[200]};
    color: ${colors.palette.red[700]};
  `,
  [CalloutType.INFO]: css`
    background-color: rgba(232, 244, 250, 0.5);
    border-color: ${colors.palette.blue[200]};
    color: ${colors.palette.blue[700]};
  `,
  [CalloutType.SUCCESS]: css`
    background-color: rgba(227, 242, 228, 0.5);
    border-color: ${colors.palette.green[200]};
    color: ${colors.palette.green[700]};
  `,
  [CalloutType.WARNING]: css`
    background-color: rgba(255, 240, 217, 0.5);
    border-color: ${colors.palette.orange[200]};
    color: ${colors.palette.orange[700]};
  `,
};

export const Container = styled.div<{$type: CalloutType}>`
  border: 1px solid;
  border-radius: 4px;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
  padding: 12px 16px;
  ${({$type}) => typeStyles[$type]};
`;
