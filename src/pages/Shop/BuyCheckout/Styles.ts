import styled from 'styled-components';
import UUserLabel from 'components/UserLabel';
import {breakpoints, colors, fonts} from 'styles';

export const Address = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Box = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 16px 0px 16px;
  width: 100%;
`;

export const CartProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
`;

export const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: auto 30%;
  height: 100%;
  padding: 16px;
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Heading = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  padding-bottom: 4px;
  & span {
    color: ${colors.black};
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LeftTop = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Participants = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 50%;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Right = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  height: fit-content;
  padding: 16px;
`;

export const UserLabel = styled(UUserLabel)`
  margin-top: 16px;
`;

export const Div = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  flex-grow: 1;
  padding: 16px;
`;

export const User = styled.div`
  margin-top: 16px;
`;

export const AddressContent = styled.div`
  margin-bottom: 10px;
`;
