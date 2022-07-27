import { useImmer } from "use-immer";
import githubService from "../services/githubService";

type Github = {
  limitPerPage: number;
};
type Owner = {
  id?: number;
  login?: string;
  avatarUrl?: string;
  url?: string;
};
type Repo = {
  id?: number;
  fullName?: string;
  description?: string;
  name?: string;
  owner?: Owner;
};
const useGithub = ({ limitPerPage = 10 }: Github) => {
  const [repos, setRepos] = useImmer([] as Repo[]);
  const [data, setData] = useImmer([] as Repo[]);
  const [current, setCurrent] = useImmer(1);
  const [pages, setPages] = useImmer([] as number[]);
  const getPages = (rows: Repo[]) => {
    const total = rows.length;
    const totalPage = Math.ceil(total / limitPerPage);
    let result = [];
    for (let i = 1; i <= totalPage; i++) {
      result.push(i);
    }
    return result;
  };
  const setPage = (currentPage: number) => {
    const total = data.length;
    const totalPage = Math.ceil(total / limitPerPage);
    if (currentPage >= totalPage) currentPage = totalPage;
    let begin = (currentPage - 1) * limitPerPage;
    let end = begin + limitPerPage;
    setRepos(data.slice(begin, end));
    setCurrent(currentPage);
    // return { records: data.slice(begin, end), totalPage };
  };
  const loadRepos = async () => {
    const result = await githubService.getRepos();
    if (!result.error) {
      setData(result);
      setRepos(result.slice(0, limitPerPage));
      setPages(getPages(result));
    }
  };
  const getRepos = (page: number) => {
    // const { records, totalPage } = setPage(page);
    // return records;
  };
  return { repos, pages, current, setPage, loadRepos, getRepos };
};
export default useGithub;
