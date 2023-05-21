import Button from './Button';

export default function ButtonGroup(props) {
  const { buttons } = props;

  return buttons.length ? (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {buttons.map((button, index) =>
        button.active ? (
          <Button
            key={button.label}
            roundedLeft={index === 0}
            roundedRight={index === buttons.length - 1}
            icon={button.icon}
            label={button.label}
            onClick={button.onClick}
          />
        ) : null
      )}
    </div>
  ) : (
    ''
  );
}
