import classNames from "classnames";

export default function Alert(props) {
  const { color, warning, info, danger, message } = props;

  return (
    <div
      className={classNames(
        'p-4 border-l-4 dark:bg-gray-900 dark:text-white',
        {
          'bg-orange-50 border-orange-500 text-orange dark: border-orange-400': warning,
          'bg-blue-50 border-blue-500 text-blue dark: border-blue-400': info,
          'bg-red-50 border-red-500 text-red dark: border-red-400': danger
        }
      )}
      role="alert"
    >
      {message}
    </div>
  );
}
