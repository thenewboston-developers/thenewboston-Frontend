import styled, {css} from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div<{$displayMode: 'textarea' | 'inline'}>`
  ${({$displayMode}) =>
    $displayMode === 'textarea'
      ? css`
          margin-top: 6px;
        `
      : css`
          position: relative;
        `}
`;

export const EmojiPicker = styled.div<{$displayMode: 'textarea' | 'inline'}>`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 350px;
  position: absolute;
  width: 300px;
  z-index: 1000;

  ${({$displayMode}) =>
    $displayMode === 'textarea'
      ? css`
          left: 0;
          top: 100%;
          margin-top: 8px;
        `
      : css`
          right: -50px;
          top: 40px;
        `}
`;

export const EmojiButton = styled.button<{
  $displayMode: 'textarea' | 'inline';
  $isOpenEmojiPicker?: boolean | false;
}>`
  align-items: center;
  background: none;
  border: none;
  color: ${({$isOpenEmojiPicker}) => ($isOpenEmojiPicker ? '#5a80ab' : colors.gray)};
  cursor: pointer;
  display: flex;
  font-weight: 600;
  justify-content: center;
  outline: none;
  transition: color 0.2s;

  ${({$displayMode}) =>
    $displayMode === 'textarea'
      ? css`
          height: 32px;
          width: 32px;

          &:hover {
            color: #5a80ab;
          }
        `
      : css`
          height: 40px;
          position: relative;
          width: 40px;

          &:hover {
            color: #5a80ab;
          }
        `}
`;

export const EmojiGrid = styled.div`
  display: grid;
  flex: 1;
  gap: 2px;
  grid-template-columns: repeat(8, 1fr);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px;
`;

export const EmojiItem = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: 24px;
  height: 32px;
  justify-content: center;
  line-height: 1;
  max-width: 32px;
  min-width: 32px;
  outline: none;
  padding: 0;
  transition: background-color 0.1s;
  width: 32px;

  &:hover {
    background-color: ${colors.palette.gray[100]};
  }
`;

export const GroupTab = styled.button<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.palette.gray[100] : 'none')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 20px;
  height: 36px;
  justify-content: center;
  outline: none;
  padding: 0;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${colors.palette.gray[100]};
  }
`;

export const GroupTabs = styled.div`
  border-bottom: 1px solid ${colors.border};
  display: flex;
  gap: 2px;
  padding: 8px;
`;

export const NoResults = styled.div`
  color: ${colors.gray};
  grid-column: 1 / -1;
  padding: 32px;
  text-align: center;
`;

export const SearchContainer = styled.div`
  border-bottom: 1px solid ${colors.border};
  padding: 8px;
`;

export const SearchInput = styled.input`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  padding: 8px 12px;
  width: 100%;

  &:focus {
    border-color: ${colors.palette.blue[500]};
  }
`;
