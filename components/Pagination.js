import classNames from 'classnames';

export default function Pagination(props) {
  const { items, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="flex justify-end">
        <li className="buttons-group start">
          <span
            onClick={() =>
              onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Previous
          </span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={classNames({
              'buttons-group': true,
              active: page === currentPage,
            })}
          >
            <span onClick={() => onPageChange(page)}>{page}</span>
          </li>
        ))}
        <li className="buttons-group end">
          <span
            onClick={() =>
              onPageChange(
                currentPage < pagesCount ? currentPage + 1 : currentPage
              )
            }
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
}
