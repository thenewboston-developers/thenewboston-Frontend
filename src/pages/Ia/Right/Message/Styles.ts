import styled, {css} from 'styled-components';

import UTools from 'components/Tools';
import {colors, fonts} from 'styles';
import {HTMLAttributes} from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  senderType: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 8px 16px;
  position: relative;

  ${(props) =>
    props.senderType === 'USER' &&
    css`
      flex-direction: row-reverse;
    `}

  &:hover {
    background: rgba(208, 215, 222, 0.32);
  }
`;

export const Content = styled.div<ContainerProps>`
  font-size: 14px;
  margin-top: 1px;
  background-color: ${colors.lightGray};
  color: ${colors.black};
  padding: 10px;
  margin-top: 5px;
  border-radius: 0px 10px 10px 10px;
  font-weight: 300;
  max-width: 75%;
  line-height: 18px;
  display: inline-block;

  ${(props) =>
    props.senderType === 'USER' &&
    css`
      background-color: ${colors.palette.blue[400]};
      border-radius: 10px 0px 10px 10px;
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
    props.senderType === 'USER'
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

export const SenderType = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: #888;
`;

export const Tools = styled(UTools)<ContainerProps>`
  top: -6px;

  ${(props) =>
    props.senderType === 'USER'
      ? css`
          left: 12px;
        `
      : css`
          right: 12px;
        `}
`;
