import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BiEdit, BiTrash } from 'react-icons/bi';
import LoadingSpinner from '@/components/LoadingSpinner';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
// import OrdersTable from '@/components/OrdersTable';
import Pagination from '@/components/Pagination';
import ButtonGroup from '@/components/ButtonGroup';
import getTasks from '@/controllers/getTasks';
import { paginate } from '@/utils/Paginate';

export default function Orders({ orders }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedRow, setCheckedRow] = useState(null);

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
      icon: <BiEdit className="w-4 h-4 mr-2 fill-current" />,
      label: 'Edit order',
      onClick: handleEditButton,
      active: true,
    },
    {
      icon: <BiTrash className="w-4 h-4 mr-2 fill-current" />,
      label: 'Remove order',
      onClick: handleRemoveButton,
      active: true,
    },
  ];

  function handleRowClick(row) {
    console.log('>>>ROW', row);
    if (checkedRow == row) {
      return setCheckedRow(null);
    }
    return setCheckedRow(row);
  }

  function handleEditButton() {
    console.log('>>>EDIT CLICKED', checkedRow);
    router.push(`/editorder?orderId=${checkedRow}`);
  }

  function handleRemoveButton() {
    console.log('>>>REMOVE CLICKED');
    router.push(`/removeorder?orderId=${checkedRow}`);
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <main className="content orders bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Orders list
      </h1>
      <div className="container">
        {orders.length > 0 ? (
          <div className="flex flex-col ml-4 sm:ml-0">
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
            {/* <OrdersTable
              data={paginatedPosts}
              columns={tableFields}
            /> */}
            <div className="flex flex-row justify-between">
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

export async function getServerSideProps() {
  const data = await getTasks();
  const orders = data.sort((a, b) => new Date(b.start) - new Date(a.start));

  return {
    props: {
      orders,
    },
  };
}
