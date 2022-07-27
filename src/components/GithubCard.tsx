import React from "react";
import { GithubRepo } from "../models/github";

type GithubCardProps = {
  repo: GithubRepo;
};

export default function GithubCard({ repo }: GithubCardProps) {
  return (
    <>
      <section className="flex flex-col rounded-md border px-3 py-2">
        <header className="flex items-center space-x-2 overflow-hidden">
          <img
            src={repo.owner?.avatarUrl}
            alt={repo.owner?.login}
            className="flex rounded-full p-1 ring-1 w-10 h-10"
          />
          <h2 className="text-xl">{repo.fullName}</h2>
        </header>
        <main className="pl-12 text-sm">{repo.description}</main>
        <footer></footer>
      </section>
    </>
  );
}
