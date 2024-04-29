export interface UserReadSerializer {
  avatar: string | null;
  id: number;
  username: string;
}

export interface UserStatsReadSerializer extends UserReadSerializer {
  default_wallet_balance: number;
  followers: number;
  following: number;
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
