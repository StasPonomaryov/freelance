export default function Alert(props) {
  const { color, message } = props;

  return (
    <div
      className={`bg-${color}-50 border-l-4 border-${color}-500 text-${color}-700 p-4 dark:bg-gray-900 dark:text-white`}
      role="alert"
    >
      {message}
    </div>
  );
}
