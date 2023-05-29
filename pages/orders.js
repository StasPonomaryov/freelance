import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LoadingSpinner from '@/components/LoadingSpinner';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
import Checkbox from '@/components/Checkbox';
import Pagination from '@/components/Pagination';
import ButtonGroup from '@/components/ButtonGroup';
import { BiEdit, BiRefresh, BiTrash } from 'react-icons/bi';
import getTasks from '@/controllers/getTasks';
import { paginate } from '@/utils/Paginate';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [checkedOrders, setCheckedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  }

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

  useEffect(() => {
    getTasks().then((data) => {
      setOrders(data);
      console.log(data);
    });
  }, []);

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
              ths={['Title', 'Description', 'Price start', 'Price end', 'Date start', 'Date end', 'Check']}
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
                      cell: <ReactMarkdown remarkPlugins={[remarkGfm]}>{order.text}</ReactMarkdown>,
                      label: 'task',
                      width: '40%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (order.priceStart ? Number(order.priceStart) : 0),
                      label: 'priceStart',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (order.priceEnd ? Number(order.priceEnd) : 0),
                      label: 'priceEnd',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (order.start || '-'),
                      label: 'dateStart',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (order.end || '-'),
                      label: 'dateEnd',
                      required: true,
                      width: '5%',
                      checked: isChecked(order.id) && editingMode,
                    },
                    {
                      cell: (order.status ? parseOrderStatus(order.status) : '-'),
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
                  taskStatus: order.status || ''
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
              <Alert color="orange" message="No clients found" />
            )}
          </>
        )}
      </div>
    </main>
  );
}
