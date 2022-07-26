export type GithubOwner = {
  id?: number;
  login?: string;
  avatarUrl?: string;
  url?: string;
};
export type GithubRepo = {
  id?: number;
  fullName?: string;
  description?: string;
  name?: string;
  owner?: GithubOwner;
};
