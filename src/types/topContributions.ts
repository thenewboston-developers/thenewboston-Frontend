export interface TopContribution {
  user_id: number;
  user_username: string;
  user_avatar: string;
  logo_url: string;
  created_date: string;
  total: number;
}

export type TopContributions = Record<number, TopContribution>;

export interface TopContributor {
  user: {
    id: number;
    username: string;
    avatar: string | null;
    total: number;
    logo_url: string;
  };
  core: {
    logo: string;
  };
  positionIcon: string;
}
