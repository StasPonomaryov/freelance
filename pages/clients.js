import { useState, useEffect } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import getClients from '@/controllers/getClients';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
import Checkbox from '@/components/Checkbox';
import LoadingSpinner from '@/components/LoadingSpinner';
import ButtonGroup from '@/components/ButtonGroup';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import { paginate } from '@/utils/Paginate';
import removeClient from '@/controllers/removeClient';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [checkedClients, setCheckedClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const pageSize = 10;
  const paginatedPosts = paginate(clients, currentPage, pageSize);

  const handleOnChange = (event) => {
    console.log('>>>CLICK', event.target.value, checkedClients);
    const selectedId = event.target.value;
    if (checkedClients.includes(selectedId)) {
      const newIds = checkedClients.filter((id) => id !== selectedId);
      setCheckedClients(newIds);
    } else {
      const newIds = [...checkedClients];
      newIds.push(selectedId);
      setCheckedClients(newIds);
    }
  };

  const handleEditButton = () => {
    console.log('>>>EDIT CLIENTS CLICKED', checkedClients);
  };

  const handleRemoveButton = () => {
    console.log('>>>REMOVE CLIENTS CLICKED', checkedClients);
    if (checkedClients.length) {
      console.log('>>>OPEN MODAL');
      setShowModalRemove(true);
    }
  };
  const approveRemoving = async () => {
    console.log('>>>CHECKED IDS', checkedClients);
    for (let i in checkedClients) {
      console.log('>>>REMOVING CLINET', checkedClients[i]);
      removeClient(checkedClients[i])
        .then(() => {
          const filtered = clients.filter((c) => c.id !== checkedClients[i]);
          console.log('>>>FILTERED', filtered);
          setClients(filtered)
        });
    }
    setShowModalRemove(false);
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getClients()
      .then((data) => {
        setClients(data);
      });    
  }, [])

  return (
    <main className="clients bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Clients list
      </h1>
      <div className="container p-4">
        <div className="flex flex-col ml-4 sm:ml-0">
          {clients.length > 0 ? (
            <>
              <Table
                ths={['Name', 'Description', 'Contacts', 'Check']}
                trs={paginatedPosts.map((client) => {
                  return [
                    {
                      cell: client.name,
                      width: '25%',
                    },
                    {
                      cell: client.description,
                      width: '40%',
                    },
                    {
                      cell: client.contacts,
                      width: '30%',
                    },
                    {
                      cell: (
                        <Checkbox
                          key={client.id}
                          checked={
                            checkedClients.includes(client.id) ? true : false
                          }
                          value={client.id}
                          name={`action_${client.id}`}
                          onChange={handleOnChange}
                          width="16"
                        />
                      ),
                      width: '5%',
                    },
                  ];
                })}
              />
              <Pagination
                items={clients.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </>
          ) : (
            <>
              <LoadingSpinner />
              {!clients.length && (
                <Alert type="warning" message="No clients found" />
              )}
            </>
          )}
        </div>
        {checkedClients.length ? (
          <ButtonGroup
            buttons={[
              {
                icon: <BiEdit className="w-4 h-4 mr-2 fill-current" />,
                label: 'Edit client(s)',
                onClick: handleEditButton,
              },
              {
                icon: <BiTrash className="w-4 h-4 mr-2 fill-current" />,
                label: 'Remove client(s)',
                onClick: handleRemoveButton,
              },
            ]}
          />
        ) : (
          ''
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
                click: approveRemoving
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
