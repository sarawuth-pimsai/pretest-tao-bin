import { useContext } from "react";
import { GithubDispatchContext } from "../contexts/GithubContext";

const useGithubDispatchContext = () => {
  const context = useContext(GithubDispatchContext);
  if (context === undefined) {
    throw new Error(
      `useGithubDispatchContext must be used within GithubProvider`
    );
  }
  return context;
};
export default useGithubDispatchContext;
