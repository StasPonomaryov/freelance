import Head from 'next/head';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddOrderValidationRules';
import { useState } from 'react';
import getClients from '@/controllers/getClients';
import setTask from '@/controllers/setTask';
import Alert from '@/components/Alert';
import SearchAutoComplete from '@/components/SearchAutoComplete';
import RadioButton from '@/components/RadioButton';
import InputText from '@/components/InputText';
import InputDate from '@/components/InputDate';
import InputNumber from '@/components/InputNumber';
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
                req={true}
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
                  values.taskEnd || new Date().toLocaleDateString('uk-UA')
                }
                req={false}
                onError={errors.taskEnd}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="task-price-start">
              <InputNumber
                label="Price start"
                id="taskPriceStart"
                name="taskPriceStart"
                className={classNames({
                  'input-field': true,
                  'is-danger': errors.taskPriceStart,
                })}
                value={values.taskPriceStart || ''}
                handleChange={handleChange}
                onError={errors.taskPriceStart}
                req={false}
              />
            </div>
            <div className="task-price-end">
              <InputNumber
                label="Price end"
                id="taskPriceEnd"
                name="taskPriceEnd"
                className={classNames({
                  'input-field': true,
                  'is-danger': errors.taskPriceEnd,
                })}
                value={values.taskPriceEnd || ''}
                handleChange={handleChange}
                onError={errors.taskPriceEnd}
                req={true}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="task-hours">
              <InputNumber
                label="Hours spent"
                id="taskHours"
                name="taskHours"
                className={classNames({
                  'input-field': true,
                  'is-danger': errors.taskHours,
                })}
                value={values.taskHours || ''}
                handleChange={handleChange}
                onError={errors.taskHours}
                req={true}
              />
            </div>
            <div className="task-status">
              <label htmlFor="task-status-radio" className="input-label">
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
          <button type="submit" className="submit-button">
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
