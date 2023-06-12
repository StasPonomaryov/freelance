import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import getTasks from '@/controllers/getTasks';
import getTask from '@/controllers/getTask';
import Alert from '@/components/Alert';
import { taskStatuses } from './addorder';
import getClients from '@/controllers/getClients';
import removeTask from '@/controllers/removeTask';

export default function RemoveOrder({ orders, clients }) {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [saved, setSaved] = useState(false);

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.title}
        </span>
        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {item.start}
        </span>
      </>
    );
  };

  function handleSubmit() {
    console.log('>>>SUBMITTING REMOVE');
    removeTask(order.id).then(() => setSaved(true));
  }

  const handleOnSelect = (item) => {
    console.log('>>>ITEM', item);
    const status = taskStatuses.find((s) => s.id === item.status).name;

    setOrder({
      id: item.id,
      text: item.text,
      status,
      client: item.clientId,
      taskTitle: item.title,
      taskStart: item.start,
      ...(item.end && { taskEnd: item.end }),
      ...(item.priceStart && { taskPriceStart: item.priceStart }),
      ...(item.priceEnd && { taskPriceEnd: item.priceEnd }),
      ...(item.hours && { taskHours: item.hours }),
    });
  };

  useEffect(() => {
    if (orderId) {
      getTask(orderId).then((order) => {
        console.log(order);
        if (!Object.keys(order).length) return;
        const status = taskStatuses.find((s) => s.id === order.status).name;

        setOrder({
          id: orderId,
          text: order.text,
          status,
          client: order.clientId,
          taskTitle: order.title,
          start: order.start,
          ...(order.end && { end: order.end }),
          ...(order.priceStart && { taskPriceStart: order.priceStart }),
          ...(order.priceEnd && { taskPriceEnd: order.priceEnd }),
          ...(order.hours && { taskHours: order.hours }),
        });
      });
    }
  }, [orderId]);

  return (
    <main className="remove-order bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Remove order
      </h1>
      <div className="container p-4">        
        {typeof orderId === 'undefined' && (
          <div className="order md:w-2/4 sm:w-full">
            <label
              htmlFor="taskOrder"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Order<span className="required">*</span>
            </label>
            <ReactSearchAutocomplete
              items={orders}
              fuseOptions={{ keys: ['title', 'start', 'id'] }}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
              resultStringKeyName="title"
              styling={{ borderRadius: '0.5rem', zIndex: 3 }}
            />
            <p className="text-sm text-gray-500">
              Start typing order title or start time
            </p>
          </div>
        )}
        {order ? (
          <>
            <table className="border-separate border-spacing-y-2 text-sm">
              <thead className="text-black dark:text-white hidden md:table-header-group">
                <tr>
                  <th className="p-3 text-left cursor-pointer">Client</th>
                  <th className="p-3 text-left cursor-pointer">Title</th>
                  <th className="p-3 text-left cursor-pointer">Description</th>
                  <th className="p-3 text-left cursor-pointer">Price start</th>
                  <th className="p-3 text-left cursor-pointer">Price end</th>
                  <th className="p-3 text-left cursor-pointer">Date start</th>
                  <th className="p-3 text-left cursor-pointer">Date end</th>
                  <th className="p-3 text-left cursor-pointer">Hours</th>
                  <th className="p-3 text-left cursor-pointer">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tr-class">
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {clients.find((c) => c.id === order.client).name}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.taskTitle}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {order.text}
                    </ReactMarkdown>
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.priceStart || '-'}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.priceEnd || '-'}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.start || '-'}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.end || '-'}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.taskHours || '-'}
                  </td>
                  <td
                    className={classNames({
                      'td-class': true,
                      processing: order.status === 'processing',
                      done: order.status === 'done',
                      canceled: order.status === 'canceled',
                    })}
                  >
                    {order.status}
                  </td>
                </tr>
              </tbody>
            </table>
            {saved ? <Alert info={true} message="Order removed!" /> : ''}
            <button
              onClick={handleSubmit}
              className="text-white bg-blue-600
              hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:ring-blue-700 dark:focus:ring-blue-800"
            >
              Remove
            </button>
          </>
        ) : (
          <Alert danger={true} message="Order not found" />
        )}
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
