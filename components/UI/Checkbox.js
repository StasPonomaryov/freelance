export default function Checkbox(props) {
  const { label, value, name, checked, onChange } = props;

  return (
    <div className="checkbox">
      <input
        checked={checked}
        type="checkbox"
        value={value}
        name={name}
        onChange={onChange}
        className="checkbox-input"
      />
      {label && (
        <label for={name} className="checkbox-label">
          {label}
        </label>
      )}
    </div>
  );
}
