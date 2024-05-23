import styled from 'styled-components';
import UButton from 'components/Button';
import UDropdownMenu from 'components/DropdownMenu';
import {breakpoints, colors, fonts} from 'styles';
import UAvatar from 'components/Avatar';

export const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 16px 20px;
`;

export const Content = styled.div`
  font-size: 15px;
  margin-bottom: 16px;
  margin-top: 8px;
  word-break: break-all;
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
`;

export const Img = styled.img`
  border-radius: 4px;
  margin-top: 12px;
  max-height: 600px;
  max-width: 100%;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled(UButton)<{$isOpenCommentBox?: boolean | false}>`
  background-color: ${colors.background};
  border-radius: 8px;
  border: none;
  color: ${({$isOpenCommentBox}) => ($isOpenCommentBox ? '#5a80ab' : `${colors.black}`)};
  height: 40px;
  font-weight: ${fonts.weight.regular};
  & svg {
    & path {
      fill: ${({$isOpenCommentBox}) => ($isOpenCommentBox ? '#5a80ab !important' : `${colors.black} !important`)};
    }
  }
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mini}) {
    justify-content: center;
  }
`;

export const Dot = styled.div`
  color: ${colors.secondary};
  font-size: 16px;
`;
export const BoxLeft = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0px;
`;

export const TextLink = styled.button`
  background: none;
  border: none;
  color: #5a80ab;
  cursor: pointer;
  font-weight: 600;
  outline: none;
`;

export const Value = styled.span`
  align-items: center;
  color: ${colors.black};
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  gap: 5px;
`;

export const TNBLogo = styled.img`
  border-radius: 50%;
  margin: 0 3px;
  width: 20px;
`;

export const Avatar = styled(UAvatar)`
  margin-right: 8px;
`;

export const Description = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const Username = styled.div<{$id: number | null}>`
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};

  &:hover {
    cursor: ${({$id}) => ($id ? 'pointer' : 'default')};
  }
`;

export const Text = styled.div`
  display: flex;
`;
