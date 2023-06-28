export interface LoginRequest {
  password: string;
  username: string;
}

export interface LoginResponse {
  authentication: {
    access_token: string;
    refresh_token: string;
  };
  user: {
    id: number;
    username: string;
  };
}
