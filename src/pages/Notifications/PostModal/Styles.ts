import styled from 'styled-components';

import {colors} from 'styles';

export const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  bottom: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 40px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

export const PostContainer = styled.div`
  background: ${colors.white};
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  cursor: default;
  max-height: 90vh;
  max-width: 600px;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 101;
`;

export const ScrollableContent = styled.div`
  max-height: 90vh;
  overflow-y: auto;
`;
