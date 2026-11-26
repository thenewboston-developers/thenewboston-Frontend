import styled from 'styled-components';

import {easing, fadeUp, palette, shadows} from '../theme';

export * from '../Styles';

export const Bubble = styled.article<{$own: boolean}>`
  align-items: flex-end;
  animation: ${fadeUp} 0.3s ${easing.out} both;
  display: flex;
  flex-direction: ${({$own}) => ($own ? 'row-reverse' : 'row')};
  gap: 8px;
  max-width: 100%;

  > div {
    background: ${({$own}) => ($own ? palette.forest : palette.white)};
    border: 1px solid ${({$own}) => ($own ? palette.forest : palette.line)};
    border-radius: ${({$own}) => ($own ? '16px 16px 4px 16px' : '16px 16px 16px 4px')};
    box-shadow: 0 1px 2px rgba(28, 43, 37, 0.06);
    color: ${({$own}) => ($own ? palette.white : palette.text)};
    max-width: min(520px, 82%);
    min-width: 0;
    padding: 9px 13px 8px;
  }

  header {
    align-items: center;
    color: ${({$own}) => ($own ? palette.goldBright : palette.moss)};
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 700;
    gap: 6px;
    margin-bottom: 2px;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  small {
    color: ${({$own}) => ($own ? 'rgba(255, 255, 255, 0.6)' : palette.faint)};
    display: block;
    font-size: 10.5px;
    margin-top: 3px;
    text-align: right;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Chat = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  min-height: 560px;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }
`;

export const Composer = styled.div`
  background: ${palette.white};
  border-top: 1px solid ${palette.line};
  padding: 4px 16px 16px;

  form {
    margin-top: 10px;
  }

  textarea {
    min-height: 42px;
    resize: none;
  }

  button {
    min-height: 64px;
  }

  @media (max-width: 480px) {
    button {
      min-height: 42px;
    }
  }
`;

export const Conversation = styled.button<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? palette.white : 'transparent')};
  border: 1px solid ${({$active}) => ($active ? palette.line : 'transparent')};
  border-radius: 12px;
  box-shadow: ${({$active}) => ($active ? shadows.card : 'none')};
  color: ${palette.text};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font: inherit;
  gap: 10px;
  min-width: 0;
  padding: 9px 10px;
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  > span:last-child {
    flex: 1;
    min-width: 0;
  }

  strong {
    display: block;
    font-size: 13.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    color: ${palette.faint};
    display: block;
    font-size: 11.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: ${({$active}) => ($active ? palette.white : 'rgba(255, 255, 255, 0.6)')};
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }

  @media (max-width: 800px) {
    width: 190px;
  }
`;

export const Conversations = styled.div`
  background: #f4efe2;
  border-right: 1px solid ${palette.line};
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding: 14px 10px;

  > p {
    color: ${palette.faint};
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin: 8px 8px 4px;
    text-transform: uppercase;
  }

  @media (max-width: 800px) {
    border-bottom: 1px solid ${palette.line};
    border-right: 0;
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;

    > p {
      display: none;
    }
  }
`;

export const Thread = styled.div`
  background: radial-gradient(600px 300px at 100% 0%, rgba(230, 170, 60, 0.06), transparent 70%), ${palette.paper};
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  max-height: 480px;
  min-height: 280px;
  overflow-y: auto;
  padding: 16px;
`;

export const ThreadHead = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.line};
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  justify-content: space-between;
  padding: 14px 16px;

  h2 {
    margin: 0;
  }
`;

export const ThreadPane = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;
