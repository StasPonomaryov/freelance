export default function RadioButton(props) {
  const { id, name, value, checked, onChange, label } = props;

  return (
    <div className="radio-button-vertical">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="input-radio"
      />
      {label && <label className="input-radio-label">{label}</label>}
    </div>
  );
}
