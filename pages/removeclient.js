import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import getClients from '@/controllers/getClients';
import Alert from '@/components/Alert';
import Modal from '@/components/Modal';
import removeClients from '@/controllers/removeClients';

export default function RemoveClient() {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOnSelect = (item) => {
    setSelected(item);
    setShowModalRemove(true);
  };

  async function approveRemoving() {
    removeClients([selected.id]).then(() => {
      let clientsCopy = [...clients];
      clientsCopy = clientsCopy.filter((c) => c.id !== selected.id);
      console.log('>>>CLIENTS COPY', clientsCopy);
      setClients(clientsCopy);
    });
    setSelected(null);
    setShowModalRemove(false);
    setShowAlert(true);
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {item.description}
        </span>
      </>
    );
  };

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
    });
  }, []);

  return (
    <main className="remove-client content bg-amber-200 dark:bg-gray-800 p-3">
      <Head>
        <title>Remove client | Freelance dashboard</title>
      </Head>
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Remove client
      </h1>
      <div className="container">
        <p className="mb-2">
          Start typing client name or description or contacts
        </p>
        <div className="md:w-2/4 sm:w-full">
          <ReactSearchAutocomplete
            items={clients}
            fuseOptions={{ keys: ['name', 'description', 'contacts'] }}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            styling={{ borderRadius: '0.5rem' }}
          />
          {showAlert ? (
            <div className="mt-2">
              <Alert info={true} message="Client removed!" />
            </div>
          ) : null}
        </div>
        {showModalRemove && (
          <Modal
            title="Removing client"
            text={`Do you really want to remove client?`}
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
