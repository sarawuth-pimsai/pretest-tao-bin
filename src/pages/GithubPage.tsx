import React, { useEffect } from "react";
import Pagination from "../components/Pagination";
import useGithubDispatchContext from "../hooks/useGithubDispatchContext";
import useGithubStateContext from "../hooks/useGithubStateContext";
import githubService from "../services/githubService";
import genUniqueId from "../utils/genUniqueId";

const GithubPage = () => {
  const { repos, totalPage, currentPage } = useGithubStateContext();
  const { setPage, loadRepos } = useGithubDispatchContext();
  const fetchGithubRepos = async () => {
    const response = await githubService.getRepos();
    loadRepos(response);
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  return (
    <>
      <section className="flex h-full flex-col px-4 py-4">
        <div className="pb-16">
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hidden md:table-cell">Description</th>
                <th className="min-w-320 hidden md:table-cell">Owner</th>
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
                    <tr
                      key={`repo_${repo?.id}_${genUniqueId(5)}`}
                      className="min-h-56 h-14"
                    >
                      <td>{repo.fullName}</td>
                      <td className="hidden md:table-cell">
                        {repo.description}
                      </td>
                      <td className="hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <img
                            className="p-1 w-10 h-10 rounded-full ring-1 ring-gray-300 dark:ring-gray-500"
                            src={repo.owner?.avatarUrl}
                            alt={repo.owner?.login}
                          />
                          <div>{repo.owner?.login}</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="fixed bg-white bottom-0 left-0 right-0">
          <div className="flex w-full md:justify-center overflow-x-auto">
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              onClick={(page) => setPage(page)}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(GithubPage);
