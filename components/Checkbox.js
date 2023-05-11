export default function Checkbox(props) {
  const { label, value, checked, name, onChange } = props;
  const handleOnchange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex items-center justify-end">
      <input
        id="default-checkbox"
        checked={checked}
        type="checkbox"
        value={value}
        name={name}
        onChange={handleOnchange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      {label && (
        <label
          for="default-checkbox"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  );
}
