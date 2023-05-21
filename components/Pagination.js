export default function Pagination(props) {
  const { items, pageSize, currentPage, onPageChange } = props;
  console.log('>>>PROPS', props);
  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav className="py-4">
      <ul className="flex -space-x-px justify-end">
        <li>
          <span
            className="px-3 py-4 ml-0 leading-tight text-amber-500  border border-amber-300 rounded-l-lg hover:bg-amber-100 hover:text-amber-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
            onClick={() =>
              onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Previous
          </span>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <span
              className={
                page === currentPage
                  ? 'px-3 py-4 text-amber-600 border border-amber-300 bg-amber-50 hover:bg-amber-100 hover:text-amber-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'px-3 py-4 leading-tight text-amber-500 border border-amber-300 hover:bg-amber-100 hover:text-amber-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
        <li>
          <span
            className="px-3 py-4 leading-tight text-amber-500 border border-amber-300 rounded-r-lg hover:bg-amber-100 hover:text-amber-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
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
