import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BiEdit, BiTrash } from 'react-icons/bi';
import getTasks from '@/controllers/getTasks';
import { paginate } from '@/utils/Paginate';
import Alert from '@/components/UI/Alert';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import ButtonGroup from '@/components/UI/ButtonGroup';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedRow, setCheckedRow] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableFields = [
    { field: 'title', label: 'Title' },
    { label: 'Description' },
    { field: 'priceStart', label: 'Price start' },
    { field: 'priceEnd', label: 'Price end' },
    { field: 'start', label: 'Date start' },
    { field: 'end', label: 'Date end' },
    { label: 'Status' },
  ];
  const pageSize = 10;
  const paginatedPosts = paginate(orders, currentPage, pageSize);
  const router = useRouter();

  const parseOrderStatus = (status) => {
    return {
      0: 'canceled',
      1: 'done',
      2: 'processing',
    }[status];
  };

  const actionButtons = [
    {
      icon: <BiEdit className="button-icon" />,
      label: 'Edit order',
      onClick: handleEditButton,
      active: true,
    },
    {
      icon: <BiTrash className="button-icon" />,
      label: 'Remove order',
      onClick: handleRemoveButton,
      active: true,
    },
  ];

  useEffect(() => {
    async function getTasksData() {
      setLoading(true);
      try {
        const fetchedTasks = await getTasks();
        if (fetchedTasks?.length) {
          const orders = fetchedTasks.sort(
            (a, b) => new Date(b.start) - new Date(a.start)
          );
          setOrders(orders);
        }
      } catch (e) {
        console.log('>>>ERROR', e);
      } finally {
        setLoading(false);
      }
    }

    getTasksData();
  }, []);

  function handleRowClick(row) {
    if (checkedRow == row) {
      return setCheckedRow(null);
    }

    return setCheckedRow(row);
  }

  function handleEditButton() {
    router.push(`/editorder?orderId=${checkedRow}`);
  }

  function handleRemoveButton() {
    router.push(`/removeorder?orderId=${checkedRow}`);
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <main className="page-content">
      <Head>
        <title>Orders | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Orders list</h1>
      <div className="container p-4">
        {loading ? (
          <LoadingSpinner />
        ) : orders?.length > 0 ? (
          <div className="orders-wrapper">
            <Table
              ths={tableFields}
              trs={paginatedPosts.map((order) => {
                return {
                  id: order.id,
                  checked: order.id === checkedRow,
                  tds: [
                    {
                      cell: order.title,
                      label: 'title',
                      width: '10%',
                    },
                    {
                      cell: (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {order.text}
                        </ReactMarkdown>
                      ),
                      label: 'task',
                      width: '40%',
                    },
                    {
                      cell: order.priceStart ? Number(order.priceStart) : 0,
                      label: 'priceStart',
                      width: '5%',
                    },
                    {
                      cell: order.priceEnd ? Number(order.priceEnd) : 0,
                      label: 'priceEnd',
                      width: '5%',
                    },
                    {
                      cell: order.start || '-',
                      label: 'dateStart',
                      width: '5%',
                    },
                    {
                      cell: order.end || '-',
                      label: 'dateEnd',
                      width: '5%',
                    },
                    {
                      cell: parseOrderStatus(order.status),
                      label: 'status',
                      width: '10%',
                    },
                  ],
                  taskStatus: order.status,
                };
              })}
              onRowClick={handleRowClick}
            />
            <div className="actions-area">
              <Pagination
                items={orders.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
              {checkedRow ? <ButtonGroup buttons={actionButtons} /> : ''}
            </div>
          </div>
        ) : (
          <Alert warning={true} message="No orders found" />
        )}
      </div>
    </main>
  );
}
