export default function Pagination({
  nextPage,
  PreviousPage,
  currentPage,
  totalPages,
}) {
  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <li
        // Active if the current page is not 1, disabled if it is 1
         className={currentPage != 1 ? "page-item" : "page-item disabled"}
        >
          <a className="page-link" href="#" onClick={PreviousPage}>
            Geri
          </a>
        </li>
        <li
        // Active if the current page is smaller than the total number of pages, otherwise disabled
        className={currentPage < totalPages ? "page-item" : "page-item disabled"}
        >
          <a className="page-link" href="#" onClick={nextPage}>
            İleri
          </a>
        </li>
      </ul>
    </nav>
  );
}
