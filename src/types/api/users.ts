export interface CreateUserRequest {
  password: string;
  username: string;
}

export interface CreateUserResponse {
  authentication: {
    access_token: string;
    refresh_token: string;
  };
  user: {
    id: number;
    username: string;
  };
}
