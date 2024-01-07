import classNames from 'classnames';

export default function Button(props) {
  const { icon, label, roundedLeft, roundedRight, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames({
        'buttons-group': true,
        start: roundedLeft,
        end: roundedRight,
      })}
    >
      {icon}
      {label}
    </button>
  );
}
