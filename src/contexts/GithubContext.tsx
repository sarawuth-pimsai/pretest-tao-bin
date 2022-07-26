import React, { createContext, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import { GithubRepo } from "../models/github";

type GithubState = {
  limit: number;
  currentPage: number;
  totalPage: number;
  repos: GithubRepo[];
  records: GithubRepo[];
};
type GithubProviderProps = {
  children: JSX.Element;
};
const initialState: GithubState = {
  limit: 10,
  currentPage: 1,
  totalPage: 1,
  repos: [],
  records: [],
};
export const GithubStateContext = createContext(initialState);
export const GithubDispatchContext = createContext<
  React.Dispatch<any> | undefined
>(undefined);

const calPages = (records: [], currentPage: number, limit: number) => {
  const total = records.length;
  const totalPage = Math.ceil(total / limit);
  if (currentPage >= totalPage) currentPage = totalPage;
  let begin = (currentPage - 1) * limit;
  let end = begin + limit;
  return { records: records.slice(begin, end), totalPage };
};
const reducer = (draft: any, action: any) => {
  let pages = { records: [], totalPage: 1 };
  switch (action.type) {
    case "LOAD_REPOS":
      draft.records = action.payload;
      pages = calPages(action.payload, draft.currentPage, draft.limit);
      draft.repos = pages.records;
      draft.totalPage = pages.totalPage;
      break;
    case "SET_PAGE":
      draft.currentPage = action.payload;
      pages = calPages(draft.records, draft.currentPage, draft.limit);
      draft.repos = pages.records;
      draft.totalPage = pages.totalPage;
      break;
    case "RESET":
      return initialState;
  }
};

const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <GithubStateContext.Provider value={contextValue.state}>
      <GithubDispatchContext.Provider value={contextValue.dispatch}>
        {children}
      </GithubDispatchContext.Provider>
    </GithubStateContext.Provider>
  );
};
export default GithubProvider;
