import classNames from 'classnames';

export default function Modal(props) {
  const { title, text, setOpenModal, buttons } = props;

  return (
    <div className="modal-backdrop">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <h3>{title}</h3>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="modal-close-button"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{text}</p>
          </div>
          {buttons && (
            <div className="modal-footer">
              {buttons.map((button) => (
                <button
                  key={button.label}
                  onClick={
                    button.click
                      ? () => button.click()
                      : () => setOpenModal(false)
                  }
                  className={classNames({
                    'modal-footer-button': true,
                    red: button.background && button.background === 'red',
                  })}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
