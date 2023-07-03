import Head from 'next/head';
import { useState, useEffect } from 'react';
import { BiEdit, BiRefresh, BiTrash } from 'react-icons/bi';
import getClients from '@/controllers/getClients';
import removeClients from '@/controllers/removeClients';
import updateClients from '@/controllers/updateClients';
import { paginate } from '@/utils/Paginate';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
import Checkbox from '@/components/Checkbox';
import ButtonGroup from '@/components/ButtonGroup';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [formInputData, setFormInputData] = useState([]);
  const [checkedClients, setCheckedClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [updateButtonActive, setUpdateButtonActive] = useState(false);
  
  const pageSize = 10;
  const paginatedPosts = paginate(clients, currentPage, pageSize);
  
  const isChecked = (id) => {
    return checkedClients.some((client) => client === id);
  };
  
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

  function handleCheckboxChange(event) {
    const selectedId = event.target.value;
    let newIds = [...checkedClients];
    newIds.push(selectedId);
    if (checkedClients.includes(selectedId)) {
      newIds = checkedClients.filter((id) => id !== selectedId);      
    }
    setCheckedClients(newIds);
  }

  function handleTableChange(event) {
    event.target.style.background = '';
    if (event.target.value === '' && event.target.required === true) {
      event.target.style.background = '#a00';
    }
    const updatedRow = formInputData.filter((r) => r.id === event.target.id);
    if (updatedRow.length) {
      updatedRow[0][event.target.name] = event.target.value;
      setFormInputData([...formInputData, updatedRow[0]]);
    } else {
      const setRow = clients.filter((r) => r.id === event.target.id);
      setRow[0][event.target.name] = event.target.value;
      setFormInputData([...formInputData, setRow[0]]);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    let emptyInput = [];
    formInputData.forEach((i) => {
      if (Object.values(i).some((v) => v === '')) emptyInput.push(i);
    });
    if (!emptyInput.length) {
      const newData = (data) => [...data, formInputData];
      updateClients(formInputData).then(() => {
        setClients(newData);
      });
      setFormInputData(newData);
      setCheckedClients([]);
    }
  }

  function handleEditButton() {
    setUpdateButtonActive(true);
    setEditingMode(true);
  }

  function handleRemoveButton() {
    if (checkedClients.length) {
      setShowModalRemove(true);
    }
  }

  async function approveRemoving() {
    removeClients(checkedClients).then(() => {
      let clientsCopy = [...clients];
      checkedClients.forEach((i) => {
        clientsCopy = clientsCopy.filter((c) => c.id !== i);
      });
      setClients(clientsCopy);
    });
    setCheckedClients([]);
    setShowModalRemove(false);
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
    });
  }, []);

  return (
    <main className="clients content bg-amber-200 dark:bg-gray-800 p-3">
      <Head>
        <title>Clients | Freelance dashboard</title>
      </Head>
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Clients list
      </h1>
      <div className="container">
        {clients.length > 0 ? (
          <form
            className="flex flex-col ml-4 sm:ml-0"
            onSubmit={handleFormSubmit}
          >
            <Table
              onChangeInput={handleTableChange}
              ths={['Name', 'Description', 'Contacts', 'Check']}
              trs={paginatedPosts.map((client) => {
                return {
                  id: client.id,
                  tds: [
                    {
                      cell: client.name,
                      label: 'name',
                      width: '25%',
                      required: true,
                      checked: isChecked(client.id) && editingMode,
                    },
                    {
                      cell: client.description,
                      label: 'description',
                      width: '40%',
                      checked: isChecked(client.id) && editingMode,
                    },
                    {
                      cell: client.contacts,
                      label: 'contacts',
                      required: true,
                      width: '30%',
                      checked: isChecked(client.id) && editingMode,
                    },
                    {
                      cell: (
                        <Checkbox
                          onChange={handleCheckboxChange}
                          value={client.id}
                          checked={isChecked(client.id)}
                          name={`action_${client.id}`}
                        />
                      ),
                      width: '5%',
                    },
                  ],
                };
              })}
              onRowClick={() => {
                return false;
              }}
            />
            <div className="flex flex-row justify-between">
              <Pagination
                items={clients.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
              {checkedClients.length ? (
                <ButtonGroup buttons={actionButtons} />
              ) : (
                ''
              )}
            </div>
          </form>
        ) : (
          <Alert warning={true} message="No clients found" />
        )}

        {showModalRemove && (
          <Modal
            title="Removing client(s)"
            text={`Do you really want to remove ${checkedClients.length} client(s)?`}
            setOpenModal={setShowModalRemove}
            buttons={[
              {
                label: 'Yes',
                background: 'red',
                click: approveRemoving,
              },
              {
                label: 'No',
                background: '',
              },
            ]}
          />
        )}
      </div>
    </main>
  );
}
