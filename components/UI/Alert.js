import classNames from 'classnames';

export default function Alert(props) {
  const { color, warning, info, danger, message } = props;

  return (
    <div
      className={classNames('alert', {
        'alert-orange': warning,
        'alert-blue': info,
        'alert-red': danger,
      })}
      role="alert"
    >
      {message}
    </div>
  );
}
