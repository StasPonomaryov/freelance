import { useState } from 'react';

export default function Modal(props) {
  const { title, text, setOpenModal, buttons } = props;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {text}
            </p>
          </div>
          {buttons && (
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end">
              {buttons.map((button) => (
                <button
                  key={button.label}
                  onClick={
                    button.click
                      ? () => button.click()
                      : () => setOpenModal(false)
                  }
                  type="button"
                  className={`text-white bg-${button.background} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${button.background}-600 dark:focus:ring-blue-800 border border-slate-500 dark:border-gray-200`}
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
