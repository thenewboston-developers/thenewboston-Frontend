import styled from 'styled-components';

export const Ulist = styled.ul`
  list-style: none;
  padding: 0px;
  border: solid 1px #f2f2f2;
  border-radius: 6px;
  position: absolute;
  background: #fff;
  z-index: 50;
  top: 105px;
  width: 89%;
`;
export const Uli = styled.li`
  list-style: none;
  padding: 6px;
  border-bottom: solid 1px #f2f2f2;

  &:hover {
    background-color: #e0e0e0;
  }
`;
export const Input = styled.input`
  background: #f3f4f6;
  border-radius: 3px;
  font-family: OpenSans, sans-serif;
  height: 40px;
  padding: 10px 14px;
  border: 1px solid #f44336;
  display: block;
  width: 100%;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 36px;
  width: 36px;
  float: right;
`;
export const Span = styled.span`
  font-size: 13pt;
`;
export const Table = styled.table`
  width: 100%;
`;

export const SelectedUserDiv = styled.div`
  border: solid 1px #f2f2f2;
  border-radius: 6px;
  margin-bottom: 10px;
  padding-left: 6px;
  padding-right: 6px;
`;
export const A = styled.a`
  float: right;
  font-size: 14pt;
`;
export const Label = styled.label`
  text-transform: uppercase;
`;
