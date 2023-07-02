import Head from 'next/head';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddOrderValidationRules';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import getClients from '@/controllers/getClients';
import RadioButton from '@/components/RadioButton';
import setTask from '@/controllers/setTask';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import SearchAutoComplete from '@/components/SearchAutoComplete';
import InputText from '@/components/InputText';
import InputDate from '@/components/InputDate';

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

export default function AddOrder({ clients }) {
  const [clientSelected, setClientSelected] = useState(null);
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitCallback,
    validate
  );
  const [taskText, setTaskText] = useState('**Task description**');
  const [taskStatus, setTaskStatus] = useState(taskStatuses);
  const [saved, setSaved] = useState(false);

  function handleOnSelect(item) {
    setClientSelected(item.id);
  }

  function submitCallback() {
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
      ...(values.taskHours && { hours: values.taskHours }),
    };
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

  function formatResult(item) {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span className="search-dropdown">{item.description}</span>
      </>
    );
  }

  function handleStatusChange(id, checked) {
    setTaskStatus((taskStatus) => toggleStatus(taskStatus, id, checked));
  }

  return (
    <main className="page-content">
      <Head>
        <title>Add order | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Add order</h1>
      <div className="container p-4">
        <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="client-name">
            <SearchAutoComplete
              id="taskClient"
              label="Client"
              required={true}
              items={clients}
              keys={['name', 'description', 'contacts']}
              handleOnSelect={handleOnSelect}
              formatResult={formatResult}
              tip="Start typing client name or description or contacts"
            />
          </div>
          <InputText
            label="Title"
            id="taskTitle"
            name="taskTitle"
            className={classNames({
              'input-field lg:w-2/4': true,
              'is-danger': errors.taskTitle,
            })}
            handleChange={handleChange}
            value={values.taskTitle || ''}
            req={true}
            onError={errors.taskTitle}
          />
          <div className="task-description">
            <MDEditor value={taskText} onChange={setTaskText} />
          </div>
          <div className="input-row">
            <div className="task-date-start">
              <InputDate
                label="Date started"
                id="taskStart"
                name="taskStart"
                className={classNames({
                  'input-field': true,
                  'is-danger': errors.taskStart,
                })}
                handleChange={handleChange}
                value={
                  values.taskStart || new Date().toLocaleDateString('uk-UA')
                }
                req={false}
                onError={errors.taskStart}
              />
            </div>
            <div className="task-date-end">
              <InputDate
                label="Date ended"
                id="taskEnd"
                name="taskEnd"
                className={classNames({
                  'input-field': true,
                  'is-danger': errors.taskEnd,
                })}
                handleChange={handleChange}
                value={
                  values.taskStart || new Date().toLocaleDateString('uk-UA')
                }
                req={true}
                onError={errors.taskEnd}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="task-price-start">
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
            <div className="task-price-end">
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
          <div className="flex flex-row items-start w-full lg:w-2/4">
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

export async function getServerSideProps() {
  const clients = await getClients();

  return {
    props: {
      clients,
    },
  };
}
