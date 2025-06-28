import React, {FC} from 'react';
import Icon from '@mdi/react';

import {getSocialLinksFromUser, SocialLinkData} from 'utils/socialLinks';

import * as S from './Styles';

interface SocialLinksProps {
  user: any;
}

const SocialLinks: FC<SocialLinksProps> = ({user}) => {
  const socialLinks = getSocialLinksFromUser(user);

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <S.Container>
      {socialLinks.map((link: SocialLinkData) => (
        <S.SocialLink
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${link.name}: ${link.username}`}
        >
          <Icon path={link.icon} size={1} />
        </S.SocialLink>
      ))}
    </S.Container>
  );
};

export default SocialLinks;
