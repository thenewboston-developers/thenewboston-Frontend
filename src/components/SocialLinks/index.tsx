import React, {FC} from 'react';

import {Currency, UserReadSerializer} from 'types';

import discordIcon from './assets/discord.svg';
import facebookIcon from './assets/facebook.svg';
import githubIcon from './assets/github.svg';
import instagramIcon from './assets/instagram.svg';
import linkedinIcon from './assets/linkedin.svg';
import pinterestIcon from './assets/pinterest.svg';
import redditIcon from './assets/reddit.svg';
import tiktokIcon from './assets/tiktok.svg';
import twitchIcon from './assets/twitch.svg';
import xIcon from './assets/x.svg';
import youtubeIcon from './assets/youtube.svg';
import * as S from './Styles';

type SocialLinksEntity = Currency | UserReadSerializer;

interface SocialLinksProps {
  entity: SocialLinksEntity;
}

interface SocialPlatform {
  icon: string;
  name: string;
  urlPattern: string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  discord: {
    icon: discordIcon,
    name: 'Discord',
    urlPattern: 'https://discord.com/users/{username}',
  },
  facebook: {
    icon: facebookIcon,
    name: 'Facebook',
    urlPattern: 'https://facebook.com/{username}',
  },
  github: {
    icon: githubIcon,
    name: 'GitHub',
    urlPattern: 'https://github.com/{username}',
  },
  instagram: {
    icon: instagramIcon,
    name: 'Instagram',
    urlPattern: 'https://instagram.com/{username}',
  },
  linkedin: {
    icon: linkedinIcon,
    name: 'LinkedIn',
    urlPattern: 'https://linkedin.com/in/{username}',
  },
  pinterest: {
    icon: pinterestIcon,
    name: 'Pinterest',
    urlPattern: 'https://pinterest.com/{username}',
  },
  reddit: {
    icon: redditIcon,
    name: 'Reddit',
    urlPattern: 'https://reddit.com/user/{username}',
  },
  tiktok: {
    icon: tiktokIcon,
    name: 'TikTok',
    urlPattern: 'https://tiktok.com/@{username}',
  },
  twitch: {
    icon: twitchIcon,
    name: 'Twitch',
    urlPattern: 'https://twitch.tv/{username}',
  },
  x: {
    icon: xIcon,
    name: 'X',
    urlPattern: 'https://x.com/{username}',
  },
  youtube: {
    icon: youtubeIcon,
    name: 'YouTube',
    urlPattern: 'https://youtube.com/@{username}',
  },
};

const SocialLinks: FC<SocialLinksProps> = ({entity}) => {
  const getSocialUrl = (platform: string, username: string): string => {
    const platformConfig = socialPlatforms[platform];
    if (!platformConfig || !username) return '';
    return platformConfig.urlPattern.replace('{username}', username);
  };

  const getSocialLinksFromEntity = () => {
    const links: Array<{icon: string; name: string; url: string; username: string}> = [];

    Object.keys(socialPlatforms).forEach((platform) => {
      const usernameField = `${platform}_username` as keyof SocialLinksEntity;
      const username = entity[usernameField] as string | null;

      if (username) {
        const platformConfig = socialPlatforms[platform];
        links.push({
          icon: platformConfig.icon,
          name: platformConfig.name,
          url: getSocialUrl(platform, username),
          username,
        });
      }
    });

    // Sort to ensure Discord is always last
    return links.sort((a, b) => {
      if (a.name === 'Discord') return 1;
      if (b.name === 'Discord') return -1;
      return 0;
    });
  };

  const socialLinks = getSocialLinksFromEntity();

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <S.Container>
      {socialLinks.map((link) => {
        if (link.name === 'Discord') {
          return (
            <S.DiscordContainer key={link.name} title={`${link.name}: ${link.username}`}>
              <img src={link.icon} alt={link.name} width="24" height="24" />
              <S.DiscordUsername>{link.username}</S.DiscordUsername>
            </S.DiscordContainer>
          );
        }
        return (
          <S.SocialLink
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${link.name}: ${link.username}`}
          >
            <img src={link.icon} alt={link.name} width="24" height="24" />
          </S.SocialLink>
        );
      })}
    </S.Container>
  );
};

export default SocialLinks;
