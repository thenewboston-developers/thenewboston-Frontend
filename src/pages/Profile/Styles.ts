import styled from 'styled-components';

import UButton from 'components/Button';

export const Button = styled(UButton)`
  margin-top: 16px;
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

export const Left = styled.div``;

export const Right = styled.div``;

export const TabContent = styled.div``;

export const Username = styled.h1`
  margin-top: 16px;
`;
