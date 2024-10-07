import { useMemberDetails } from "../../../hooks/useMemberDetails";
import "./Pagination.css";

const Pagination = () => {
  const { pageSize, currentPage, totalItems, setCurrentPage } =
    useMemberDetails();

  const totalPages = Math.ceil(totalItems / pageSize);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(totalItems / pageSize));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      <button
        className="first-page"
        disabled={currentPage <= 1}
        onClick={goToFirstPage}
      >
        {"<<"}
      </button>
      <button
        className="previous-page"
        disabled={currentPage <= 1}
        onClick={goToPreviousPage}
      >
        {"<"}
      </button>
      <div className="pages">
        {new Array(totalPages).fill(0).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="next-page"
        disabled={currentPage >= totalPages}
        onClick={goToNextPage}
      >
        {">"}
      </button>
      <button
        className="last-page"
        disabled={currentPage >= totalPages}
        onClick={goToLastPage}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
