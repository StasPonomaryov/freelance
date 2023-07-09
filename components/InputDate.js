export default function InputDate(props) {
  const { label, id, name, value, className, handleChange, req, onError } =
    props;

  return (
    <>
      <label htmlFor={name} className="input-label">
        {label}
        {req && <span className="required">*</span>}
      </label>
      <input
        id={id}
        name={name}
        required={req}
        type="date"
        onChange={handleChange}
        value={value}
        className={className}
      />
      {onError && <p className="text-sm text-red-600">{onError}</p>}
    </>
  );
}
