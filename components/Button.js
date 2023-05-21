export default function Button(props) {
  const { icon, label, roundedLeft, roundedRight, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        roundedLeft ? 'rounded-l-lg ' : ''
      }flex items-center px-4 py-2 text-sm font-medium text-amber-900 bg-transparent border-t border-b border border-amber-900 hover:bg-amber-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-amber-500 focus:bg-amber-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700${
        roundedRight ? ' rounded-r-lg' : ''
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
