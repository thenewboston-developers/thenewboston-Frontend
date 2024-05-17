import {FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import Icon from '@mdi/react';

import Avatar from 'components/Avatar';
import * as S from './Styles';

interface ContributionProps {
  children: ReactNode;
}

interface ContributionCardItemProps {
  avatarSrc?: string;
  children: ReactNode;
  iconLink?: string;
  iconPath: string;
  isIconLinkExternal?: boolean;
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
  avatarSrc,
  children,
  iconLink,
  iconPath,
  isIconLinkExternal = false,
}) => {
  const renderIconOrAvatar = () => (
    <S.ContributionCardItemIcon>
      {avatarSrc ? <Avatar src={avatarSrc} /> : <Icon path={iconPath} size={1} />}
    </S.ContributionCardItemIcon>
  );

  return (
    <S.ContributionCardItemContainer>
      {iconLink ? (
        <Link
          to={iconLink}
          target={isIconLinkExternal ? '_blank' : '_self'}
          rel={isIconLinkExternal ? 'noopener noreferrer' : undefined}
        >
          {renderIconOrAvatar()}
        </Link>
      ) : (
        renderIconOrAvatar()
      )}
      {children}
    </S.ContributionCardItemContainer>
  );
};
