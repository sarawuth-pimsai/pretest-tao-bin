import React, { useEffect } from "react";
import Pagination from "../components/Pagination";
import useGithubDispatchContext from "../hooks/useGithubDispatchContext";
import useGithubStateContext from "../hooks/useGithubStateContext";
import githubService from "../services/githubService";
import genUniqueId from "../utils/genUniqueId";

type Props = {};

const GithubPage = ({}: Props) => {
  const { repos, totalPage, currentPage } = useGithubStateContext();
  const githubDispatch = useGithubDispatchContext();
  const fetchGithubRepos = async () => {
    const response = await githubService.getRepos();
    githubDispatch({ type: "LOAD_REPOS", payload: response });
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center p-4">
        <table className="mb-4 mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="min-w-320">Owner</th>
            </tr>
          </thead>
          <tbody>
            {repos?.length === 0 && (
              <tr>
                <td colSpan={5}>Loading</td>
              </tr>
            )}
            {repos &&
              repos.map((repo) => {
                return (
                  <tr key={`repo_${repo?.id}_${genUniqueId(5)}`}>
                    <td>{repo.fullName}</td>
                    <td>{repo.description}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <img
                          className="p-1 w-10 h-10 rounded-full ring-1 ring-gray-300 dark:ring-gray-500"
                          src={repo.owner?.avatarUrl}
                        />
                        <div>{repo.owner?.login}</div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onClick={(page) =>
            githubDispatch({ type: "SET_PAGE", payload: page })
          }
        />
      </section>
    </>
  );
};

export default React.memo(GithubPage);
