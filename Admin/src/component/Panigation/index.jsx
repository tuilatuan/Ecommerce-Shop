import React, { useMemo } from "react";
const PAGE_STEP = 1;

const Panigation = ({ page, limit = 0, total = 0, onPaniChange }) => {
  const totalPage = useMemo(() => {
    if (!limit || !total) {
      return 1;
    }
    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [limit, total]);

  const pageList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;

    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }
    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }

    const list = [];
    for (let index = start; index < end + 1; index++) {
      list.push(index);
    }
    return list;
  }, [page, totalPage]);

  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPage) {
      onPaniChange(nextPage);
    }
  };
  const onPrev = () => {
    const prevPage = page - 1;
    if ([prevPage > 0]) {
      onPaniChange(prevPage);
    }
  };

  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <PagiItem isDisabled={page === 1} onClick={onPrev}>
            Prev
          </PagiItem>
          {pageList?.length > 0 &&
            pageList.map((pageNumb) => (
              <PagiItem
                key={pageNumb}
                isActive={pageNumb === page}
                onClick={() => {
                  onPaniChange(pageNumb);
                }}
              >
                {pageNumb}
              </PagiItem>
            ))}
          <PagiItem
            isDisabled={pageList[pageList.length - 1] === page}
            onClick={onNext}
          >
            Next
          </PagiItem>
        </ul>
      </nav>
    </div>
  );
};

const PagiItem = ({
  children,
  isActive = false,
  isDisabled = false,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <li
      className={`page-item  ${isActive ? "active" : ""}  ${
        isDisabled ? "disable" : ""
      }`}
      onClick={() => {
        isDisabled ? {} : onClick();
      }}
      {...props}
    >
      <a className="page-link">{children}</a>
    </li>
  );
};

export default Panigation;
