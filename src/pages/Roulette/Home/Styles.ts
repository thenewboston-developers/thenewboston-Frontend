import styled from 'styled-components';

export const RouletteBall = styled.div<{$color: string}>`
  align-items: center;
  background: ${({$color}) => ({red: '#b93d40', green: '#237353'})[$color] || '#192821'};
  border: 12px solid #d8b776;
  border-radius: 50%;
  box-shadow:
    0 0 0 8px #ffffff12,
    0 0 0 26px #ffffff05;
  color: #ffffff;
  display: flex;
  font-size: 64px;
  font-weight: 600;
  height: 170px;
  justify-content: center;
  margin: 30px auto;
  width: 170px;
`;
