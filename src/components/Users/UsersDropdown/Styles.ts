import styled from 'styled-components';

export const Avatar = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin: auto 0;
  float: right;
`;

export const Label = styled.label`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ErrorField = styled.span`
  color: red;
  font-size: x-small;
  margin-left: 10px;
`;
