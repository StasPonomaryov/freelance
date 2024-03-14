import Head from 'next/head';
import { useState, useEffect } from 'react';
import { BiEdit, BiRefresh, BiTrash } from 'react-icons/bi';
import getClients from '@/controllers/getClients';
import removeClients from '@/controllers/removeClients';
import updateClients from '@/controllers/updateClients';
import { paginate } from '@/utils/Paginate';
import Alert from '@/components/UI/Alert';
import Table from '@/components/Table';
import Checkbox from '@/components/UI/Checkbox';
import ButtonGroup from '@/components/UI/ButtonGroup';
import Pagination from '@/components/Pagination';
import Modal from '@/components/UI/Modal';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [formInputData, setFormInputData] = useState([]);
  const [checkedClients, setCheckedClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [updateButtonActive, setUpdateButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const pageSize = 10;
  const paginatedPosts = paginate(clients, currentPage, pageSize);

  const isChecked = (id) => {
    return checkedClients.some((client) => client === id);
  };

  const actionButtons = [
    {
      icon: <BiEdit className="button-icon" />,
      label: 'Edit client(s)',
      onClick: handleEditButton,
      active: true,
    },
    {
      icon: <BiRefresh className="button-icon" />,
      label: 'Update',
      onClick: handleFormSubmit,
      active: updateButtonActive,
    },
    {
      icon: <BiTrash className="button-icon" />,
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

  function approveRemoving() {
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
    async function getClientsData() {
      setLoading(true);
      try {
        const fetchedClients = await getClients();
        if (fetchedClients?.length) setClients(fetchedClients);
      } catch (e) {
        console.log('>>>ERROR', e);
      } finally {
        setLoading(false);
      }
    }

    getClientsData();
  }, []);

  return (
    <main className="page-content">
      <Head>
        <title>Clients | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Clients list</h1>
      <div className="container p-4">
        {loading ? (
          <LoadingSpinner />
        ) : clients?.length ? (
          <form className="clients-form" onSubmit={handleFormSubmit}>
            <Table
              onChangeInput={handleTableChange}
              ths={[
                { field: 'name', label: 'Name' },
                { field: 'description', label: 'Description' },
                { field: 'contacts', label: 'Contacts' },
                { field: 'check', label: 'Check' },
              ]}
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
            <div className="actions-area">
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
              },
            ]}
          />
        )}
      </div>
    </main>
  );
}
