import styled, {keyframes} from 'styled-components';

import UPost from 'components/Post';
import {CommentForm, ControlsWrapper} from 'components/Post/Comments/Styles';
import {breakpoints, colors} from 'styles';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const CloseButton = styled.button`
  align-items: center;
  background: rgba(0, 0, 0, 0.65);
  border: none;
  border-radius: 999px;
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  left: 24px;
  position: absolute;
  top: 24px;
  width: 40px;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: ${breakpoints.mobile}) {
    left: 16px;
    top: 16px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  height: 100%;
  position: relative;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr) 360px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const DetailsPanel = styled.div`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }
`;

export const ImagePanel = styled.div`
  align-items: center;
  animation: ${fadeIn} 0.2s ease-out;
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
  z-index: 1;

  &::before {
    background: ${colors.backgroundDark};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.99;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`;

export const Modal = styled.div`
  align-items: stretch;
  display: flex;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
`;

export const Overlay = styled.div`
  animation: ${addOverlay} 0.3s forwards;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
`;

export const Photo = styled.img`
  animation: ${scaleIn} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: default;
  display: block;
  height: auto;
  max-height: 90%;
  max-width: 90%;
  object-fit: contain;
  position: relative;
  width: auto;
  z-index: 1;
`;

export const Post = styled(UPost)`
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;

  ${CommentForm} {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  ${ControlsWrapper} {
    justify-content: flex-end;
    width: 100%;
  }
`;
