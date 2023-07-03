export default function TableInput(props) {
  const { id, name, value, onChangeInput, required } = props;

  return (
    <input
      id={id}
      type="text"
      name={name}
      className="input-table"
      value={value}
      required={required}
      onChange={onChangeInput}
    />
  );
}
