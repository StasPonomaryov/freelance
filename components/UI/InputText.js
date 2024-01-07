export default function InputText(props) {
  const {
    label,
    id,
    name,
    value,
    className,
    handleChange,
    req,
    mLength,
    onError,
  } = props;

  return (
    <>
      <label htmlFor={name} className="input-label">
        {label}
        {req && <span className="required">*</span>}
      </label>
      <input
        id={id}
        className={className}
        name={name}
        type="text"
        value={value}
        required={req}
        maxLength={mLength}
        onChange={handleChange}
      />
      {onError && <p className="text-sm text-red-600">{onError}</p>}
    </>
  );
}
