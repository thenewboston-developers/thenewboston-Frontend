import UIcon from '@mdi/react';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors} from 'styles';

export const IMG_SIZE = '24px';

export const Button = styled(UButton)`
  align-items: center;
  background-color: ${colors.background};
  color: ${colors.black};
  display: flex;
  height: 40px;
  justify-content: center;
  min-width: 40px;
  padding: 10px;
  width: 40px;

  & svg {
    margin-right: 0 !important;

    & path {
      fill: ${colors.black} !important;
    }
  }

  &:hover {
    background: none !important;
  }
`;

export const CommentForm = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Container = styled.div`
  margin-top: 14px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 16px 16px 16px;
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0 10px;
`;

export const ContentInput = styled(UInlineInput)<{$isMobileDevice: boolean | false}>`
  background-color: ${colors.background};
  border: 1px solid ${colors.borderDarker};
  border-radius: 12px;
  flex: 1;
  height: 40px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Divider = styled.div`
  border: 0;
  border-top: 1px solid ${colors.palette.gray[200]};
  flex: 1;
  margin: 0 16px;
`;

export const Icon = styled(UIcon)`
  color: ${colors.secondary};

  &:hover {
    color: ${colors.backgroundDark};
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  align-items: center;
  background-color: ${colors.background};
  border-radius: 7px 0 0 7px;
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: center;
  padding: 0 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[200]};
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  height: ${IMG_SIZE};
  width: ${IMG_SIZE};
`;

export const PriceAmountInput = styled(UInlineInput)`
  background-color: ${colors.background};
  border: none;
  border-left: 1px solid ${colors.borderDarker};
  border-radius: 0 7px 7px 0;
  height: 38px;
  padding: 8px 12px;
  width: 100px;
`;

export const PriceAmountInputContainer = styled.div`
  align-items: center;
  background-color: ${colors.whiteHover};
  border: 1px solid ${colors.borderDarker};
  border-radius: 8px;
  display: grid;
  grid-auto-flow: column;
  height: 40px;
  overflow: hidden;
`;

export const ControlsWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: flex-end;
    width: 100%;
  }
`;
