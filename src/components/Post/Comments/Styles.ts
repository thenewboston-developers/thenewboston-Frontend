import UIcon from '@mdi/react';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors} from 'styles';

export const IMG_HEIGHT = 24;

export const Box = styled.div`
  float: right;
  margin-bottom: 6px;
  padding: 0 16px;
`;

export const Button = styled(UButton)`
  background-color: ${colors.background};
  color: ${colors.black};
  height: 40px;
  padding: 10px;

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

export const CommentButton = styled(UButton)`
  background-color: transparent;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 24px;
  color: ${colors.palette.gray[700]};
  font-size: 13px;
  font-weight: 500;
  height: 34px;
  padding: 0 18px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${colors.palette.gray[100]};
    border-color: ${colors.palette.gray[300]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    color: ${colors.palette.gray[900]};
  }

  &:active {
    background-color: ${colors.palette.gray[200]};
    box-shadow: none;
  }
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0 10px 0;
`;

export const ContentInput = styled(UInlineInput)<{$isMobileDevice: boolean | false}>`
  background-color: ${colors.white};
  border-radius: 12px;
  flex: 1;
  padding: ${({$isMobileDevice}) => ($isMobileDevice ? '26px 95px 26px 16px' : '26px 300px 26px 16px')};
  position: relative;
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    margin: 8px 0;
    width: 100%;
  }
`;

export const Div = styled.div`
  border: 0;
  border-top: 1px solid ${colors.palette.gray[200]};
  flex: 1;
  margin: 0 16px;
`;

export const EmojiBox = styled.div`
  position: absolute;
  right: 18%;
  top: 60px;
  z-index: 100;

  @media (max-width: ${breakpoints.mini}) {
    right: 0;
    top: 70px;
  }

  @media (min-width: ${breakpoints.mini}) and (max-width: ${breakpoints.mobile}) {
    right: 8%;
    top: 70px;
  }

  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    right: 30%;
  }

  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.largeDesktop}) {
    right: 25%;
  }

  @media (min-width: ${breakpoints.largeDesktop}) and (max-width: ${breakpoints.xlDesktop}) {
    right: 12%;
  }
`;

export const EmojiButton = styled.button<{$isOpenEmojiBox?: boolean | false}>`
  background: none;
  border: none;
  color: ${({$isOpenEmojiBox}) => ($isOpenEmojiBox ? '#5a80ab' : `${colors.black}`)};
  cursor: pointer;
  font-weight: 600;
  outline: none;
`;

export const Icon = styled(UIcon)`
  color: ${colors.secondary};
  margin-left: 12px;

  &:hover {
    color: ${colors.backgroundDark};
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const IconRight = styled(UIcon)`
  margin-left: 6px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMG_HEIGHT}px`};
  margin-left: 12px;
  width: ${`${IMG_HEIGHT}px`};

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    cursor: pointer;
  }
`;

export const InputBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const PriceAmountInput = styled(UInlineInput)`
  border-left: 1px solid ${colors.borderDarker};
  border-radius: 0 8px 8px 0;
  margin-left: 8px;
  width: 130px;

  @media (max-width: ${breakpoints.mini}) {
    height: 40px;
  }
`;

export const PriceAmountInputContainer = styled.div`
  align-items: center;
  background-color: ${colors.whiteHover};
  border-radius: 8px;
  display: grid;
  grid-auto-flow: column;

  @media (max-width: ${breakpoints.mini}) {
    width: 40%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
`;
