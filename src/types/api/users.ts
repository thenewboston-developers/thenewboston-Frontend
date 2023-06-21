export interface CreateUserRequest {
  password: string;
  username: string;
}

export interface CreateUserResponse {
  authentication: {
    access_token: string;
    refresh_token: string;
  };
  deposit_account: {
    account_number: string;
  };
  user: {
    id: number;
    username: string;
  };
}
