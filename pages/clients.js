import { useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import getClients from '@/controllers/getClients';
import Alert from '@/components/Alert';
import Table from '@/components/Table';
import Checkbox from '@/components/Checkbox';
import LoadingSpinner from '@/components/LoadingSpinner';
import ButtonGroup from '@/components/ButtonGroup';
import Pagination from '@/components/Pagination';
import { paginate } from '@/utils/Paginate';

export default function Clients({ clients }) {
  const [checkedClients, setCheckedClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

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
                    client.name,
                    client.description,
                    client.contacts,
                    <Checkbox
                      key={client.id}
                      checked={
                        checkedClients.includes(client.id) ? true : false
                      }
                      value={client.id}
                      name={`action_${client.id}`}
                      onChange={handleOnChange}
                    />,
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
              },
              {
                icon: <BiTrash className="w-4 h-4 mr-2 fill-current" />,
                label: 'Remove client(s)',
              },
            ]}
          />
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
export async function getStaticProps() {
  const clients = await getClients();

  return {
    props: { clients },
  };
}
