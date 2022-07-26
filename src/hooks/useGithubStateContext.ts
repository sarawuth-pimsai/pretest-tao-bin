import { useContext } from "react";
import { GithubStateContext } from "../contexts/GithubContext";

const useGithubStateContext = () => {
  const context = useContext(GithubStateContext);
  if (context === undefined) {
    throw new Error(`useGithubStateContext must be used within GithubProvider`);
  }
  return context;
};

export default useGithubStateContext;
