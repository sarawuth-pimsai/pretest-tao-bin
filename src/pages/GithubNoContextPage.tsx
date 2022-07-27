import React, { useEffect } from "react";
import GithubCard from "../components/GithubCard";
import Pagination from "../components/Pagination";
import useGithub from "../hooks/useGithub";
import genUniqueId from "../utils/genUniqueId";

type Props = {};

export default function GithubNoContextPage({}: Props) {
  const { repos, pages, current, setPage, loadRepos } = useGithub({
    limitPerPage: 10,
  });
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    loadRepos();
    console.log({ pages, current });
  }, []);
  return (
    <>
      <section className="flex flex-col h-full px-3 py-2 space-y-4">
        <header className="flex w-full items-center justify-center min-h-44">
          <h1 className="text-2xl">Github public repos</h1>
        </header>
        <main className="flex flex-col flex-grow">
          {repos.length < 1 && (
            <div className="flex h-full w-full justify-center items-center">
              <h5 className="text-xl">Loading</h5>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {repos.map((repo) => (
              <GithubCard
                key={`repo_card_${repo.id}_${genUniqueId(5)}`}
                repo={repo}
              />
            ))}
          </div>
        </main>
        <footer className="flex md:justify-center">
          <div className="flex w-full md:justify-center overflow-x-auto">
            <Pagination
              currentPage={current}
              totalPage={pages.length}
              onClick={(page) => handleChangePage(page)}
            />
          </div>
        </footer>
      </section>
    </>
  );
}
