import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Currency extends CreatedModified {
  description: string | null;
  discord_username: string | null;
  domain: string | null;
  facebook_username: string | null;
  github_username: string | null;
  id: number;
  instagram_username: string | null;
  linkedin_username: string | null;
  logo: string;
  owner: UserReadSerializer;
  pinterest_username: string | null;
  reddit_username: string | null;
  ticker: string;
  tiktok_username: string | null;
  twitch_username: string | null;
  x_username: string | null;
  youtube_username: string | null;
}

export type Currencies = Dict<Currency>;
