export interface UserReadSerializer {
  id: number;
  username: string;
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
