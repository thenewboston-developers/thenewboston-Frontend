import styled, {keyframes} from 'styled-components';
import UIcon from '@mdi/react';
import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors} from 'styles';

export const IMG_HEIGHT = 24;

export const Button = styled(UButton)`
  background-color: ${colors.background};
  color: ${colors.black};
  height: 40px;
  padding: 10px;

  & svg {
    margin-right: 0px !important;
    & path {
      fill: ${colors.black} !important;
    }
  }
  &:hover {
    background: none !important;
  }
`;

export const Container = styled.div`
  margin-top: 16px;
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

export const InputBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
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
export const Box = styled.div`
  float: right;
  margin-bottom: 6px;
  padding: 0x 16px;
`;

export const CommentBtn = styled(UButton)`
  background-color: ${colors.background};
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  color: #5a80ab;
  width: 600px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0px 10px 0px;
`;

export const Div = styled.div`
  border: 1px solid ${colors.border};
  width: 100%;
`;

export const EmojiIcon = styled.span`
  padding: 9px;
  font-size: 20px;
  font-weight: normal;
  background-color: #f4f5f6;
  border-radius: 8px;
  border: none;
  color: #5a80ab;
  height: 40px;

  /* Styles for nested span */
  & > span {
    font-size: medium;
  }
`;

export const EmojiButton = styled.button<{$isOpenEmojiPicker?: boolean | false}>`
  position: relative;
  outline: none;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  color: ${({$isOpenEmojiPicker}) => ($isOpenEmojiPicker ? '#5a80ab' : `${colors.black}`)};
`;

const slideDownAndFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const EmojiBox = styled.div`
  position: absolute;
  bottom: 50px;
  z-index: 10;
  animation: ${slideDownAndFadeIn} 0.7s ease-out; /* Add animation */
`;
