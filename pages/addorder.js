import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddOrderValidationRules';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import getClients from '@/controllers/getClients';
import RadioButton from '@/components/RadioButton';
import setTask from '@/controllers/setTask';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export const taskStatuses = [
  { id: 0, name: 'canceled' },
  { id: 1, name: 'done' },
  { id: 2, name: 'processing', checked: true },
];

export const toggleStatus = (taskStatuses, id, checked) => {
  return taskStatuses.map((status) =>
    status.id === id ? { ...status, checked } : { ...status, checked: false }
  );
};

export default function AddOrder() {
  const [clients, setClients] = useState([]);
  const [clientSelected, setClientSelected] = useState(null);
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitCallback,
    validate
  );
  const [taskText, setTaskText] = useState('**Task description**');
  const [taskStatus, setTaskStatus] = useState(taskStatuses);
  const [saved, setSaved] = useState(false);

  function submitCallback() {
    console.log('>>>SUBMITTING ORDER');
    const orderData = {
      id: nanoid(10),
      clientId: clientSelected,
      title: values.taskTitle,
      text: taskText || '-',
      start: values.taskStart,
      priceEnd: values.taskPriceEnd,
      status: taskStatus.filter((i) => i.checked === true)[0].id,
      ...(values.taskEnd && { end: values.taskEnd }),
      ...(values.taskPriceStart && { priceStart: values.taskPriceStart }),
      ...values.taskHours && { hours: values.taskHours }
    };
    console.log('>>>ORDER DATA', orderData);
    setTask(orderData)
      .then((r) => {
        setValues({});
        setClientSelected(null);
        setTaskText('**Task description**');
        setTaskStatus(taskStatuses);
        setSaved(true);
        setTimeout(() => setSaved(false), 5000);
      })
      .catch((e) => <Alert danger={true} message={e} />);
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {item.description}
        </span>
      </>
    );
  };

  function handleStatusChange(id, checked) {
    console.log('>>>STATUS', taskStatus);
    setTaskStatus((taskStatus) => toggleStatus(taskStatus, id, checked));
  }

  const handleOnSelect = (item) => {
    setClientSelected(item.id);
  };

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
    });
  }, [setValues, values]);

  return (
    <main className="add-client bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Add order
      </h1>
      <div className="container p-4">
        <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="client-name md:w-2/4 sm:w-full">
            <label
              htmlFor="taskClient"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Client<span className="required">*</span>
            </label>
            <ReactSearchAutocomplete
              items={clients}
              fuseOptions={{ keys: ['name', 'description', 'contacts'] }}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
              styling={{ borderRadius: '0.5rem' }}
            />
            <p className="text-sm text-gray-500">
              Start typing client name or description or contacts
            </p>
          </div>
          <div className="task-title">
            <label
              htmlFor="taskTitle"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Title<span className="required">*</span>
            </label>
            <input
              id="taskTitle"
              name="taskTitle"
              required
              type="text"
              onChange={handleChange}
              value={values.taskTitle || ''}
              className={`w-full lg:w-2/4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {errors.taskTitle && (
              <p className="text-sm text-red-800">{errors.taskTitle}</p>
            )}
          </div>
          <div className="task-description">
            <MDEditor value={taskText} onChange={setTaskText} />
          </div>
          <div className="flex flex-row items-center w-2/4">
            <div className="task-date-start w-full mr-1">
              <label
                htmlFor="taskStart"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Date started<span className="required">*</span>
              </label>
              <input
                id="taskStart"
                name="taskStart"
                required
                type="date"
                onChange={handleChange}
                value={
                  values.taskStart || new Date().toLocaleDateString('uk-UA')
                }
                className={`w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.taskStart && (
                <p className="text-sm text-red-800">{errors.taskStart}</p>
              )}
            </div>
            <div className="task-date-end w-full">
              <label
                htmlFor="taskEnd"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Date ended
              </label>
              <input
                id="taskEnd"
                name="taskEnd"
                type="date"
                onChange={handleChange}
                value={values.taskEnd || new Date().toLocaleDateString('uk-UA')}
                className={`w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.taskEnd && (
                <p className="text-sm text-red-800">{errors.taskEnd}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center w-full lg:w-2/4">
            <div className="task-price-start w-full mr-1">
              <label
                htmlFor="taskPriceStart"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Price start
              </label>
              <input
                id="taskPriceStart"
                name="taskPriceStart"
                type="number"
                onChange={handleChange}
                value={values.taskPriceStart || ''}
                className={`w-full lg:w-2/4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.taskPriceStart && (
                <p className="text-sm text-red-800">{errors.taskPriceStart}</p>
              )}
            </div>
            <div className="task-price-end w-full mr-1">
              <label
                htmlFor="taskPriceEnd"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Price end<span className="required">*</span>
              </label>
              <input
                id="taskPriceEnd"
                name="taskPriceEnd"
                required
                type="number"
                onChange={handleChange}
                value={values.taskPriceEnd || ''}
                className={`w-full lg:w-2/4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.taskPriceEnd && (
                <p className="text-sm text-red-800">{errors.taskPriceEnd}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center w-full lg:w-2/4">
            <div className="task-hours w-full mr-1">
              <label
                htmlFor="taskHours"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Hours spent
              </label>
              <input
                id="taskHours"
                name="taskHours"
                type="number"
                onChange={handleChange}
                value={values.taskHours || ''}
                className={`w-2/4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.taskHours && (
                <p className="text-sm text-red-800">{errors.taskHours}</p>
              )}
            </div>
            <div className="task-status w-full">
              <label
                htmlFor="task-status-radio"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Order status
              </label>
              {taskStatus.map(({ id, name, checked }) => (
                <RadioButton
                  key={id}
                  name="task-status-radio"
                  value={id}
                  checked={checked}
                  onChange={(e) => handleStatusChange(id, e.target.checked)}
                  label={name}
                />
              ))}
            </div>
          </div>
          {saved ? <Alert info={true} message="Order added!" /> : ''}
          <button
            type="submit"
            className="text-white bg-blue-600
              hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:ring-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
