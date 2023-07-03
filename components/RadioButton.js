export default function RadioButton(props) {
  const { id, name, value, checked, onChange, label } = props;

  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="input-radio"
      />
      {label && (
        <label
          className="input-radio-label"
        >
          {label}
        </label>
      )}
    </div>
  );
}
