import {FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import Icon from '@mdi/react';

import * as S from './Styles';

interface ContributionProps {
  children: ReactNode;
}

interface ContributionCardItemProps {
  iconPath: string;
  iconLink?: string;
  isIconLinkExternal?: boolean;
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

export const ContributionCardItem: FC<ContributionCardItemProps> = ({
  iconPath,
  iconLink,
  isIconLinkExternal,
  children,
}) => (
  <S.ContributionCardItemContainer>
    {iconLink ? (
      <Link
        to={iconLink}
        target={isIconLinkExternal ? '_blank' : undefined}
        rel={isIconLinkExternal ? 'noopener noreferrer' : undefined}
      >
        <S.ContributionCardItemIcon>
          <Icon path={iconPath} size={1} />
        </S.ContributionCardItemIcon>
      </Link>
    ) : (
      <S.ContributionCardItemIcon>
        <Icon path={iconPath} size={1} />
      </S.ContributionCardItemIcon>
    )}
    {children}
  </S.ContributionCardItemContainer>
);
