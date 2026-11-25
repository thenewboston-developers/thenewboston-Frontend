import styled from 'styled-components';

export const Reel = styled.span`
  align-items: center;
  background: linear-gradient(#f4eee0, #ffffff, #e7dfcd);
  border: 2px solid #d8b776;
  border-radius: 12px;
  box-shadow: inset 0 7px 18px #1b292319;
  color: #2b4336;
  display: flex;
  font-size: clamp(22px, 4vw, 42px);
  font-weight: 800;
  height: 112px;
  justify-content: center;
  min-width: 0;
  text-transform: uppercase;
`;
export const Reels = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 30px auto;
  max-width: 420px;
  width: 100%;
`;
