import styled from 'styled-components';

import UButton from 'components/Button';
import USectionHeading from 'components/SectionHeading';
import {Contents} from 'components/SectionHeading/Styles';
import {colors, fonts, hiddenScroll, pagePadding} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  ${pagePadding};
  ${hiddenScroll};
  height: 100%;
  margin: 0 auto;
  max-width: 800px;
  overflow-y: auto;
  width: 100%;
`;

export const EndMessageContainer = styled.div`
  margin: 8px 0;
`;

export const Header = styled.div`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  flex-shrink: 0;
  padding: 20px 24px;
  z-index: 1;
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
  margin-bottom: 8px;
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
