import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchAutoComplete(props) {
  const {
    id,
    label,
    required,
    items,
    keys,
    handleOnSelect,
    formatResult,
    tip,
  } = props;
  return (
    <>
      <label htmlFor={id} className="autocomplete-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <ReactSearchAutocomplete
        id={id}
        items={items}
        fuseOptions={{ keys }}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        styling={{ borderRadius: '0.5rem' }}
      />
      {tip && <p className="autocomplete-tip">{tip}</p>}
    </>
  );
}
