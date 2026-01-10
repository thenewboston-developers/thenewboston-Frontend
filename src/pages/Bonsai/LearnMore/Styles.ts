import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.border};
  margin: 32px 0;
`;

export const ImagePlaceholder = styled.div`
  align-items: center;
  background-color: ${colors.palette.gray[100]};
  border: 2px dashed ${colors.palette.gray[300]};
  border-radius: 8px;
  color: ${colors.palette.gray[500]};
  display: flex;
  font-size: 14px;
  font-style: italic;
  font-weight: ${fonts.weight.medium};
  justify-content: center;
  margin: 24px 0;
  min-height: 200px;
  padding: 24px;
  text-align: center;
`;
