import styled, {keyframes} from 'styled-components';
import UIcon from '@mdi/react';
import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors} from 'styles';

export const IMG_HEIGHT = 24;

export const Container = styled.div`
  margin-top: 0.4rem;
`;

export const Icon = styled(UIcon)`
  margin-right: 7px;
  vertical-align: middle;
`;

export const CenterDiv = styled.div`
  text-align: center;
`;

export const ClickableAction = styled.a`
  color: #0070e0;
  font-size: 12px;
  vertical-align: -webkit-baseline-middle;
  text-decoration-line: underline;
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
