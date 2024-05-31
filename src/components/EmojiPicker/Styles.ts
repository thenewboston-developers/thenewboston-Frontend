import styled from 'styled-components';
import {colors} from 'styles';

export const EmojiBox = styled.div`
  position: absolute;
  right: 0;
  top: 85px;
  z-index: 1;
`;

export const EmojiButton = styled.button<{$isOpenEmojiBox?: boolean | false}>`
  background: none;
  border: none;
  color: ${({$isOpenEmojiBox}) => ($isOpenEmojiBox ? '#5a80ab' : colors.gray)};
  cursor: pointer;
  font-weight: 600;
  outline: none;
  position: absolute;
  right: 15px;
  top: 30px;
`;
