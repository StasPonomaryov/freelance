import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import getTasks from '@/controllers/getTasks';
import getTask from '@/controllers/getTask';
import getClients from '@/controllers/getClients';
import removeTask from '@/controllers/removeTask';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
import SearchAutoComplete from '@/components/SearchAutoComplete';
import { taskStatuses } from './addorder';

export default function RemoveOrder({ orders, clients }) {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [saved, setSaved] = useState(false);

  const tableFields = [
    { field: 'client', label: 'Client' },
    { field: 'title', label: 'Title' },
    { label: 'Description' },
    { field: 'priceStart', label: 'Price start' },
    { field: 'priceEnd', label: 'Price end' },
    { field: 'start', label: 'Date start' },
    { field: 'end', label: 'Date end' },
    { field: 'hours', label: 'Hours' },
    { label: 'Status' },
  ];

  const parseOrderStatus = (status) => {
    return {
      canceled: 0,
      done: 1,
      processing: 2,
    }[status];
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.title}
        </span>
        <span className="search-dropdown">
          {item.start}
        </span>
      </>
    );
  };

  function handleSubmit() {
    removeTask(order.id).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 5000);
    });
  }

  const handleOnSelect = (item) => {
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
    <main className="page-content">
      <Head>
        <title>Remove order | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Remove order</h1>
      <div className="container p-4">
        {typeof orderId === 'undefined' && (
          <div className="order md:w-2/4 sm:w-full">
            <SearchAutoComplete
              id="taskOrder"
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
        {order && (
          <>
            <Table
              ths={tableFields}
              trs={[
                {
                  id: 'orderSelected',
                  taskStatus: parseOrderStatus(order.status),
                  tds: [
                    {
                      cell: clients.find((c) => c.id === order.client).name,
                    },
                    {
                      cell: order.taskTitle,
                    },
                    {
                      cell: (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {order.text}
                        </ReactMarkdown>
                      ),
                    },
                    {
                      cell: order.priceStart || '-'
                    },
                    {
                      cell: order.priceEnd || '-'
                    },
                    {
                      cell: order.start || '-'
                    },
                    {
                      cell: order.end || '-'
                    },
                    {
                      cell: order.taskHours || '-'
                    },
                    {
                      cell: order.status
                    }
                  ],
                },
              ]}
            />
            {saved ? <Alert info={true} message="Order removed!" /> : ''}
            <button onClick={handleSubmit} className="submit-button">
              Remove
            </button>
          </>
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
