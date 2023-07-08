import Head from 'next/head';
import { useState } from 'react';
import getClients from '@/controllers/getClients';
import removeClients from '@/controllers/removeClients';
import Alert from '@/components/Alert';
import Modal from '@/components/Modal';
import SearchAutoComplete from '@/components/SearchAutoComplete';

export default function RemoveClient({ clients }) {
  const [selected, setSelected] = useState(null);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOnSelect = (item) => {
    setSelected(item);
    setShowModalRemove(true);
  };

  async function approveRemoving() {
    await removeClients([selected.id]);
    setSelected(null);
    setShowModalRemove(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span className="search-dropdown">{item.description}</span>
      </>
    );
  };

  return (
    <main className="page-content">
      <Head>
        <title>Remove client | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Remove client</h1>
      <div className="container p-4">
        <div className="md:w-2/4 sm:w-full">
          <SearchAutoComplete
            id="taskClient"
            label="Client"
            required={true}
            items={clients}
            keys={['name', 'description', 'contacts']}
            handleOnSelect={handleOnSelect}
            formatResult={formatResult}
            tip="Start typing client name or description or contacts"
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

export async function getServerSideProps() {
  const clients = await getClients();

  return {
    props: {
      clients,
    },
  };
}
