export interface UserReadSerializer {
  avatar: string | null;
  id: number;
  is_staff: boolean;
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
