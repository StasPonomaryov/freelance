import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import getTasks from '@/controllers/getTasks';
import getTask from '@/controllers/getTask';
import setTask from '@/controllers/setTask';
import getClients from '@/controllers/getClients';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddOrderValidationRules';
import { taskStatuses, toggleStatus } from './addorder';
import RadioButton from '@/components/RadioButton';
import Alert from '@/components/Alert';
import InputText from '@/components/InputText';
import InputDate from '@/components/InputDate';
import InputNumber from '@/components/InputNumber';
import SearchAutoComplete from '@/components/SearchAutoComplete';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function EditOrder({ orders, clients }) {
  const router = useRouter();
  const { orderId } = router.query;
  const [selected, setSelected] = useState(null);
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitCallback,
    validate
  );
  const [taskText, setTaskText] = useState('**Task description**');
  const [taskStatus, setTaskStatus] = useState(taskStatuses);
  const [saved, setSaved] = useState(false);

  function submitCallback() {
    const orderData = {
      id: orderId || selected,
      clientId: values.client,
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
      .then((r) => setSaved(true))
      .catch((e) => <Alert danger={true} message={e} />);
  }

  const handleOnSelect = (item) => {
    setSelected(item);
    setSelected(item.id);
    setTaskText(item.text);
    setTaskStatus((taskStatus) => toggleStatus(taskStatus, item.status, true));
    setValues({
      taskTitle: item.title,
      taskStart: item.start,
      ...(item.end && { taskEnd: item.end }),
      ...(item.priceStart && { taskPriceStart: item.priceStart }),
      ...(item.priceEnd && { taskPriceEnd: item.priceEnd }),
      ...(item.hours && { taskHours: item.hours }),
    });
  };

  const handleOnSelectClient = (item) => {
    setValues({
      ...values,
      client: item.id,
    });
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.title}
        </span>
        <span className="search-dropdown">{item.start}</span>
      </>
    );
  };

  const formatResultClients = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span className="search-dropdown">{item.description}</span>
      </>
    );
  };

  function handleStatusChange(id, checked) {
    setTaskStatus((taskStatus) => toggleStatus(taskStatus, id, checked));
  }

  useEffect(() => {
    if (orderId) {
      getTask(orderId).then((order) => {
        setTaskText(order.text);
        setTaskStatus((taskStatus) =>
          toggleStatus(taskStatus, order.status, true)
        );
        setValues({
          taskTitle: order.title,
          taskStart: order.start,
          ...(order.end && { taskEnd: order.end }),
          ...(order.priceStart && { taskPriceStart: order.priceStart }),
          ...(order.priceEnd && { taskPriceEnd: order.priceEnd }),
          ...(order.hours && { taskHours: order.hours }),
        });
      });
    }
  }, [orderId, setValues]);

  return (
    <main className="page-content">
      <Head>
        <title>Edit order | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Edit order</h1>
      <div className="container p-4">
        {typeof orderId === 'undefined' && (
          <div className="order md:w-2/4 sm:w-full">
            <SearchAutoComplete
              id="taskName"
              label="Order"
              required={true}
              items={orders}
              keys={['title', 'start', 'id']}
              handleOnSelect={handleOnSelect}
              formatResult={formatResult}
              tip="Start typing order title or start time"
              resultStringKeyName="title"
            />
          </div>
        )}
        {selected || orderId ? (
          <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
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
            <div className="task-client md:w-2/4 sm:w-full">
              <SearchAutoComplete
                id="taskClient"
                label="Client"
                required={true}
                items={clients}
                keys={['name', 'description', 'contacts']}
                handleOnSelect={handleOnSelectClient}
                formatResult={formatResultClients}
                tip="Start typing client name or description or contacts"
                resultStringKeyName="name"
              />
            </div>
            <div className="task-description">
              <MDEditor
                value={taskText}
                onChange={setTaskText}
                style={{ zIndex: 2 }}
              />
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
                    values.taskStart || new Date().toLocaleDateString('uk-UA')
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
            {saved ? <Alert info={true} message="Order updated!" /> : ''}
            <button type="submit" className="submit-button">
              Update
            </button>
          </form>
        ) : null}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const orders = await getTasks();
  const clients = await getClients();

  return {
    props: {
      orders,
      clients,
    },
  };
}
