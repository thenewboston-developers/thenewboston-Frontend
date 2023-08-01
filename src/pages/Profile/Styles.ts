import styled from 'styled-components';

import UButton from 'components/Button';

export const Button = styled(UButton)`
  margin-top: 24px;
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 260px 1fr;
  padding: 24px 32px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 240px;
`;

export const Invitations = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr 2fr 1fr 1fr min-content;
  padding: 12px 0;
`;

export const Left = styled.div``;

export const Right = styled.div``;
