import configs from "../configs";
import { GithubOwner, GithubRepo } from "../models/github";

type Error = {
  error: string;
  message: string;
};
const githubService = {
  getRepos: async (): Promise<GithubRepo[] | Error | any> => {
    const url = `${configs.githubApiBaseUrl}/repositories`;
    const init = {
      headers: {
        Accept: "application/vnd.github+json",
      },
      method: "GET",
    };
    const response = await fetch(url, init);
    const jsonData = await response.json();
    if (!response.ok)
      return {
        error: jsonData.message,
        message: jsonData.message,
      } as Error;
    let repos = [];
    for (let i: number = 0; i < jsonData.length; i++) {
      const data = jsonData[i];
      const owner = data.owner;
      const repo = {
        id: data.id,
        fullName: data.full_name,
        description: data.description,
        name: data.name,
        owner: {
          id: owner.id,
          login: owner.login,
          avatarUrl: owner.avatar_url,
          url: owner.url,
        } as GithubOwner,
      } as GithubRepo;
      repos.push(repo);
    }
    return repos;
  },
};

export default githubService;
