import {FC, ReactNode} from 'react';
import Icon from '@mdi/react';

import * as S from './Styles';

interface ContributionProps {
  children: ReactNode;
}

interface ContributionCardItemProps {
  iconPath: string;
  children: ReactNode;
}

export const ContributionCard: FC<ContributionProps> = ({children}) => (
  <S.ContributionCard>{children}</S.ContributionCard>
);

export const ContributionCardHeader: FC<ContributionProps> = ({children}) => (
  <S.ContributionCardHeader>{children}</S.ContributionCardHeader>
);

export const ContributionCardBody: FC<ContributionProps> = ({children}) => (
  <S.ContributionCardBody>{children}</S.ContributionCardBody>
);

export const ContributionCardItem: FC<ContributionCardItemProps> = ({iconPath, children}) => (
  <S.ContributionCardItemContainer>
    <S.ContributionCardItemIcon>
      <Icon path={iconPath} size={1} />
    </S.ContributionCardItemIcon>
    {children}
  </S.ContributionCardItemContainer>
);
