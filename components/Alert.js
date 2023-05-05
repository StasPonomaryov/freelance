export default function Alert(props) {
  const { type, message } = props;
  let color;
  switch (type) {
    case 'warning': color = 'orange'; break;
    case 'danger': color = 'red'; break;
    case 'info':
    default: color = 'blue'; break;
  }

  return (
    <div
      className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4`}
      role="alert"
    >
      {message}
    </div>
  );
}
