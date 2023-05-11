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
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
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
                  ? 'px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
        <li>
          <span
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
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
