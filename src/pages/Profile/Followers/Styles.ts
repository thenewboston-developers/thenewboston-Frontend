import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const FollowerCards = styled.div`
  display: grid;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin-top: 16px;
`;
export const Rank = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const UserLabelContainer = styled.div``;

export const RewardAmountContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: start;
  width: 100%;
`;
export const UserLabel = styled.div`
  flex-grow: 1;
`;
export const StatusFollow = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.palette.blue['500']};
`;

export const StatusFollowing = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.palette.red['500']};
`;

export const TableGrid = styled.div`
  width: 100%;
  grid-template-columns: 1fr 16fr 2fr;
  display: grid;
`;
export const UserName = styled.div`
  font-size: 16px;
  text-transform: capitalize;
`;

export const Status = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const FollowerUser = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const ContributorContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 8px 0;

  &:first-child {
    padding-top: 20px;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 20px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  padding-top: 23px;
`;

export const Title = styled.div`
  font-size: 20px;
  color: ${colors.gray};
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;

export const Search = styled.div`
  position: relative;
  display: flex;
  height: 46px;
  width: 300px;
  background-color: #f4f4f4;
  border-radius: 100px;

  & svg {
    height: 20px;
    width: 20px;
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.gray};
  }

  & input {
    width: 100%;
    padding-left: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    font-weight: ${fonts.weight.regular};
    color: ${colors.gray};
    border-radius: 100px;
  }
`;
