import styled from 'styled-components';

import UButton from 'components/Button';
import USectionHeading from 'components/SectionHeading';
import {Contents} from 'components/SectionHeading/Styles';
import {colors, fonts, pagePadding} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  ${pagePadding};
  flex: 1;
`;

export const EndMessageContainer = styled.div`
  margin: 32px 0;
`;

export const Header = styled.div`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  padding: 20px 24px;
`;

export const MarkAllButton = styled(UButton)`
  background: transparent;
  border: 1px solid ${colors.borderDarker};
  border-radius: 20px;
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  height: 36px;
  padding: 0 16px;

  &:hover {
    background: ${colors.whiteHover};
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotificationSkeletonContainer = styled.div`
  margin-bottom: 16px;
  padding: 0 4px;
`;

export const SectionHeading = styled(USectionHeading)`
  margin: 0;

  ${Contents} {
    padding-bottom: 0;
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
