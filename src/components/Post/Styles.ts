import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import UButton from 'components/Button';
import UDropdownMenu from 'components/DropdownMenu';
import {breakpoints, colors, fonts} from 'styles';

export const Avatar = styled(UAvatar)`
  height: 44px;
  margin-right: 12px;
  width: 44px;
`;

export const BoxLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  margin: 12px 0 8px;
`;

export const Button = styled(UButton)<{$isOpenCommentBox?: boolean | false}>`
  background-color: transparent;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 24px;
  color: ${colors.palette.gray[700]};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  height: 34px;
  padding: 0 18px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${colors.palette.gray[100]};
    border-color: ${colors.palette.gray[300]};
    color: ${colors.palette.gray[900]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &:active {
    background-color: ${colors.palette.gray[200]};
    box-shadow: none;
  }

  & svg {
    & path {
      fill: ${colors.palette.gray[600]} !important;
      transition: fill 0.15s ease;
    }
  }

  &:hover svg path {
    fill: ${colors.palette.gray[800]} !important;
  }
`;

export const Container = styled.div`
  background: #fff;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px 24px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Content = styled.div`
  color: ${colors.palette.gray[800]};
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 16px;
  margin-top: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const Description = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  line-height: 1.2;
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

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
  margin-top: -4px;
`;

export const Img = styled.img`
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 16px;
  margin-top: 12px;
  max-height: 600px;
  max-width: 100%;
  object-fit: cover;
`;

export const LongContent = styled.span`
  word-break: break-all;
`;

export const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled.div`
  display: flex;
`;

export const TextContent = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const TextLink = styled.button`
  background: none;
  border: none;
  color: ${colors.palette.blue[700]};
  cursor: pointer;
  font-weight: ${fonts.weight.medium};
  margin-left: 4px;
  outline: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.palette.blue[800]};
    text-decoration: underline;
  }
`;

export const Top = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const TransferAmount = styled.div`
  align-items: center;
  color: ${colors.palette.gray[900]};
  display: flex;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  margin-top: 12px;
`;

export const TransferArrow = styled.span`
  color: ${colors.palette.gray[500]};
  font-size: 15px;
  margin: 0 12px;
`;

export const TransferDetails = styled.div`
  align-items: center;
  display: flex;
  margin-top: 8px;
`;

export const TransferHeader = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  text-transform: uppercase;
`;

export const TransferInfo = styled.div`
  background-color: ${colors.palette.gray[100]};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 12px;
  margin-top: 16px;
  padding: 16px;
`;

export const Username = styled.div<{$id: number | null}>`
  color: ${colors.palette.gray[900]};
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.2;

  &:hover {
    cursor: ${({$id}) => ($id ? 'pointer' : 'default')};
    text-decoration: ${({$id}) => ($id ? 'underline' : 'none')};
  }
`;
