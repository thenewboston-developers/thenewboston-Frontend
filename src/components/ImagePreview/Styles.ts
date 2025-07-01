import styled from 'styled-components';

export const CloseButtonContainer = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0 12px 0 12px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Container = styled.div`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: inline-block;
  overflow: hidden;
  position: relative;
`;

export const Img = styled.img`
  border-radius: 12px;
  display: block;
  max-height: 260px;
  max-width: 260px;
`;
