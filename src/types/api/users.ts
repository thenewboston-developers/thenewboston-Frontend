export interface UserReadSerializer {
  avatar: string | null;
  id: number;
  username: string;
  default_wallet_balance?: number;
  followers_count?: number;
  following_count?: number;
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
