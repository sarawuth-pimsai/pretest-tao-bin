import { useContext } from "react";
import { GithubDispatchContext } from "../contexts/GithubContext";
import type { GithubRepo } from "../models/github";

const useGithubDispatchContext = () => {
  const dispatch = useContext(GithubDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      `useGithubDispatchContext must be used within GithubProvider`
    );
  }
  const loadRepos = (repos: any) => {
    dispatch({ type: "LOAD_REPOS", payload: repos });
  };
  const setPage = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };
  return { setPage, loadRepos };
};
export default useGithubDispatchContext;
