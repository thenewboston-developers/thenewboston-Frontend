export interface UserReadSerializer {
  avatar: string | null;
  id: number;
  is_manual_contribution_allowed: boolean;
  username: string;
}

export interface CreateUserRequest {
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
