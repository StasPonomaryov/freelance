import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LoadingSpinner from '@/components/LoadingSpinner';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
import Checkbox from '@/components/Checkbox';
import Pagination from '@/components/Pagination';
import ButtonGroup from '@/components/ButtonGroup';
import {
  BiEdit,
  BiRefresh,
  BiTrash,
  BiCaretDown,
  BiCaretUp,
} from 'react-icons/bi';
import getTasks from '@/controllers/getTasks';
import { paginate } from '@/utils/Paginate';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [checkedOrders, setCheckedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState({ key: 'start', direction: 'DESC' });

  const actionButtons = [
    {
      icon: <BiEdit className="w-4 h-4 mr-2 fill-current" />,
      label: 'Edit client(s)',
      onClick: handleEditButton,
      active: true,
    },
    {
      icon: <BiRefresh className="w-4 h-4 mr-2 fill-current b-green" />,
      label: 'Update',
      onClick: handleFormSubmit,
      active: updateButtonActive,
    },
    {
      icon: <BiTrash className="w-4 h-4 mr-2 fill-current" />,
      label: 'Remove client(s)',
      onClick: handleRemoveButton,
      active: true,
    },
  ];
  const tableFields = {
    text: 'Description',
    start: 'Date start',
    end: 'Date end',
    title: 'Title',
    priceStart: 'Price start',
    priceEnd: 'Price end',
    status: 'Status',
  };
  const pageSize = 10;
  const paginatedPosts = paginate(orders, currentPage, pageSize);
  const isChecked = (id) => {
    return checkedOrders.some((client) => client === id);
  };

  const parseOrderStatus = (status) => {
    return {
      0: 'canceled',
      1: 'done',
      2: 'processing',
    }[status];
  };

  const getSortedTh = (field) => {
    if (field === sorted.key) {
      if (sorted.direction === 'ASC') {
        console.log('>>>ASC');
        return (
          <span>
            {tableFields[field]}
            <BiCaretDown />
          </span>
        );
      }
      console.log('>>>DESC');
      return (
        <span className="flex flex-center">
          {tableFields[field]}
          <BiCaretUp />
        </span>
      );
    }
    return tableFields[field];
  };

  function handleEditButton() {
    console.log('>>>EDIT CLICK');
  }

  function handleRemoveButton() {
    console.log('>>>REMOVE BUTTON');
  }

  function handleFormSubmit() {
    console.log('>>>FORM SUBMIT');
  }

  function updateButtonActive() {
    console.log('>>>UPDATE BUTTON');
  }

  function handleTableChange() {
    console.log('>>>TABLE CHANGE');
  }

  function handleCheckboxChange() {
    console.log('>>>CHECKBOX');
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  function onFieldClick(e) {
    const title = e.target.getAttribute('data-title');
    const field = Object.keys(tableFields).find(
      (key) => tableFields[key] === title
    );

    if (sorted.key === field) {
      if (sorted.direction === 'DESC') {
        setSorted({ key: field, direction: 'ASC' });
      }
    }
    setSorted({ key: field, direction: 'ASC' });
  }

  useEffect(() => {
    getTasks().then((data) => {
      console.log('>>>SORTING', sorted.key, sorted.direction);
      if (sorted.direction === 'ASC') {
        data.sort((a, b) => new Date(a[sorted.key]) - new Date(b[sorted.key]));
      } else {
        data.sort((a, b) => new Date(b[sorted.key]) - new Date(a[sorted.key]));
      }
      setOrders(data);
    });
  }, [sorted.direction, sorted.key]);

  return (
    <main className="orders bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Orders list
      </h1>
      <div className="container p-4">
        {orders.length > 0 ? (
          <form
            className="flex flex-col ml-4 sm:ml-0"
            onSubmit={handleFormSubmit}
          >
            <Table
              onChangeInput={handleTableChange}
              onFieldClick={onFieldClick}
              ths={[
                getSortedTh('title'),
                getSortedTh('text'),
                getSortedTh('priceStart'),
                getSortedTh('priceEnd'),
                getSortedTh('start'),
                getSortedTh('end'),
                getSortedTh('status'),
                'Check',
              ]}
              trs={paginatedPosts.map((order) => {
                return {
                  id: order.id,
                  tds: [
                    {
                      cell: order.title,
                      label: 'title',
                      width: '10%',
                      required: true,
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {order.text}
                        </ReactMarkdown>
                      ),
                      label: 'task',
                      width: '40%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: order.priceStart ? Number(order.priceStart) : 0,
                      label: 'priceStart',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: order.priceEnd ? Number(order.priceEnd) : 0,
                      label: 'priceEnd',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: order.start || '-',
                      label: 'dateStart',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: order.end || '-',
                      label: 'dateEnd',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: parseOrderStatus(order.status),
                      label: 'status',
                      required: true,
                      width: '10%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (
                        <Checkbox
                          onChange={handleCheckboxChange}
                          value={order.id}
                          checked={isChecked(order.id)}
                          name={`action_${order.id}`}
                        />
                      ),
                      width: '5%',
                    },
                  ],
                  taskStatus: order.status,
                };
              })}
            />
            <div className="flex flex-row justify-between">
              <Pagination
                items={orders.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
              {checkedOrders.length ? (
                <ButtonGroup buttons={actionButtons} />
              ) : (
                ''
              )}
            </div>
          </form>
        ) : (
          <>
            <LoadingSpinner />
            {!orders.length && (
              <Alert warning={true} message="No clients found" />
            )}
          </>
        )}
      </div>
    </main>
  );
}
