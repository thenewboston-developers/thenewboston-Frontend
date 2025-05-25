import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  align-items: center;
  background: ${colors.palette.gray[100]};
  border-radius: 16px;
  display: flex;
  font-size: 12px;
`;

export const CopyText = styled.div`
  cursor: pointer;
  font-weight: ${fonts.weight.bold};
`;

export const Text = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${fonts.weight.semiBold};
  gap: 5px;
  margin: 0px 16px 0px 16px;
  overflow-wrap: anywhere;
`;
export const Button = styled(CopyToClipboard)`
  background-color: ${colors.palette.red[500]};
  border-radius: 0px 16px 16px 0px;
  color: white;
  cursor: pointer;
  display: flex;
  padding: 10px 15px;
  @media (max-width: ${breakpoints.mini}) {
    border-radius: 50%;
    padding: 10px;
  }
`;
