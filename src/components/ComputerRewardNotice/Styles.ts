import styled from 'styled-components';

export const Notice = styled.div<{$paid?: boolean}>`
  background: ${({$paid}) => ($paid ? '#edf6ef' : '#f3f5f8')};
  border: 1px solid ${({$paid}) => ($paid ? '#bbd8c3' : '#dce2eb')};
  border-radius: 12px;
  color: ${({$paid}) => ($paid ? '#285438' : '#465063')};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 6px;
  line-height: 1.6;
  margin: 14px 0;
  padding: 16px;
`;
