export interface UserReadSerializer {
  avatar: string | null;
  bio: string;
  discord_username: string | null;
  facebook_username: string | null;
  github_username: string | null;
  id: number;
  instagram_username: string | null;
  is_staff: boolean;
  linkedin_username: string | null;
  pinterest_username: string | null;
  reddit_username: string | null;
  tiktok_username: string | null;
  twitch_username: string | null;
  x_username: string | null;
  username: string;
  youtube_username: string | null;
}

export interface CreateUserRequest {
  invitation_code: string;
  password: string;
  username: string;
}

export interface CreateUserResponse {
  authentication: {
    access_token: string;
    refresh_token: string;
  };
  user: UserReadSerializer;
}
