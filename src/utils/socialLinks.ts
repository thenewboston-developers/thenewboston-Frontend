import {
  mdiChat,
  mdiFacebook,
  mdiGithub,
  mdiInstagram,
  mdiLinkedin,
  mdiMusic,
  mdiPinterest,
  mdiReddit,
  mdiTwitch,
  mdiTwitter,
  mdiYoutube,
} from '@mdi/js';

export interface SocialPlatform {
  icon: string;
  name: string;
  urlPattern: string;
}

export const socialPlatforms: Record<string, SocialPlatform> = {
  discord: {
    icon: mdiChat,
    name: 'Discord',
    urlPattern: 'https://discord.com/users/{username}',
  },
  facebook: {
    icon: mdiFacebook,
    name: 'Facebook',
    urlPattern: 'https://facebook.com/{username}',
  },
  github: {
    icon: mdiGithub,
    name: 'GitHub',
    urlPattern: 'https://github.com/{username}',
  },
  instagram: {
    icon: mdiInstagram,
    name: 'Instagram',
    urlPattern: 'https://instagram.com/{username}',
  },
  linkedin: {
    icon: mdiLinkedin,
    name: 'LinkedIn',
    urlPattern: 'https://linkedin.com/in/{username}',
  },
  pinterest: {
    icon: mdiPinterest,
    name: 'Pinterest',
    urlPattern: 'https://pinterest.com/{username}',
  },
  reddit: {
    icon: mdiReddit,
    name: 'Reddit',
    urlPattern: 'https://reddit.com/user/{username}',
  },
  tiktok: {
    icon: mdiMusic,
    name: 'TikTok',
    urlPattern: 'https://tiktok.com/@{username}',
  },
  twitch: {
    icon: mdiTwitch,
    name: 'Twitch',
    urlPattern: 'https://twitch.tv/{username}',
  },
  x: {
    icon: mdiTwitter,
    name: 'X',
    urlPattern: 'https://x.com/{username}',
  },
  youtube: {
    icon: mdiYoutube,
    name: 'YouTube',
    urlPattern: 'https://youtube.com/@{username}',
  },
};

export const getSocialUrl = (platform: string, username: string): string => {
  const platformConfig = socialPlatforms[platform];
  if (!platformConfig || !username) return '';
  return platformConfig.urlPattern.replace('{username}', username);
};

export type SocialLinkData = {
  icon: string;
  name: string;
  url: string;
  username: string;
};

export const getSocialLinksFromUser = (user: any): SocialLinkData[] => {
  const links: SocialLinkData[] = [];

  Object.keys(socialPlatforms).forEach((platform) => {
    const usernameField = `${platform}_username`;
    const username = user[usernameField];

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

  return links;
};
