import {HTMLAttributes} from 'react';
import styled, {css} from 'styled-components';

import UTools from 'components/Tools';
import {SenderType} from 'enums';
import {colors, fonts} from 'styles';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  $sendertype: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 8px 16px;
  position: relative;

  ${(props) =>
    props.$sendertype === SenderType.USER &&
    css`
      flex-direction: row-reverse;
    `}

  &:hover {
    background: rgba(208, 215, 222, 0.32);
  }
`;

export const Content = styled.div<ContainerProps>`
  background-color: ${colors.lightGray};
  border-radius: 0 10px 10px 10px;
  color: ${colors.black};
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  line-height: 18px;
  margin-top: 5px;
  max-width: 75%;
  padding: 10px;

  ${(props) =>
    props.$sendertype === SenderType.USER &&
    css`
      background-color: ${colors.palette.blue[400]};
      border-radius: 10px 0 10px 10px;
      color: ${colors.white};
    `}
`;

export const Date = styled.div`
  font-size: 10px;
  font-weight: ${fonts.weight.light};
  margin-left: 8px;
`;

export const Dote = styled.div`
  height: 2px;
  width: 2px;
  border-radius: 50%;
  background-color: ${colors.black};
`;

export const DisplayName = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
`;

export const Header = styled.div`
  display: flex;
`;

export const HeaderLeft = styled.div`
  align-items: center;
  display: flex;
  flex: auto;
`;

export const HeaderRight = styled.div`
  align-items: center;
  display: flex;
`;

export const Right = styled.div<ContainerProps>`
  flex: auto;

  ${(props) =>
    props.$sendertype === SenderType.USER
      ? css`
          display: flex;
          flex-direction: column;
          align-items: end;
          margin-right: 10px;
        `
      : css`
          margin-left: 10px;
        `}
`;

export const Tools = styled(UTools)<ContainerProps>`
  top: -6px;

  ${(props) =>
    props.$sendertype === SenderType.USER
      ? css`
          left: 12px;
        `
      : css`
          right: 12px;
        `}
`;
