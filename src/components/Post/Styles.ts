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
  margin-top: 8px;
  margin-bottom: 16px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled(UButton)<{$isOpenCommentBox?: boolean | false}>`
  background-color: #f4f5f6;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  font-weight: ${fonts.weight.semiBold};
  height: 40px;
  color: ${({$isOpenCommentBox}) => ($isOpenCommentBox ? '#5a80ab' : `${colors.black}`)};
  & svg {
    & path {
      fill: ${({$isOpenCommentBox}) => ($isOpenCommentBox ? '#5a80ab !important' : `${colors.black} !important`)};
    }
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

export const BoxRight = styled.div`
  display: flex;
  gap: 10px;
`;
export const TextLink = styled.button`
  outline: none;
  color: #5a80ab;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;

export const Value = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
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
  display: flex;
  flex-direction: row;
  align-items: center;
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
