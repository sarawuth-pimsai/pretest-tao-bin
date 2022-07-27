import React, { useCallback, useEffect, useMemo, useState } from "react";
import genUniqueId from "../utils/genUniqueId";

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onClick: (page: number) => void;
};
type PageProps = {
  page: number;
  active: boolean;
  onClick: (page: number) => void;
};
const PageNo = ({ page, active, onClick }: PageProps): JSX.Element => {
  if (active) {
    return (
      <div className="flex min-w-40 rounded-md border px-3 py-2 justify-center bg-blue-700 text-white">
        {page}
      </div>
    );
  }
  return (
    <div
      className="flex min-w-40 rounded-md border px-3 py-2 justify-center"
      onClick={() => onClick(page)}
    >
      {page}
    </div>
  );
};
const PageNoMem = React.memo(PageNo);
const Pagination = ({
  currentPage,
  totalPage,
  onClick,
}: PaginationProps): JSX.Element => {
  const [pages, setPages] = useState([] as number[]);
  useEffect(() => {
    const numbers = [...Array(totalPage).keys()];
    setPages(numbers);
  }, [totalPage]);
  return (
    <>
      <div className="flex justify-center my-4">
        <ul className="flex">
          {pages.map((page) => (
            <li key={`${genUniqueId(5)}`} className="px-3 py-2">
              <PageNoMem
                page={page + 1}
                active={page + 1 === currentPage}
                onClick={onClick}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Pagination;
