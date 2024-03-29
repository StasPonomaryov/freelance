import Head from 'next/head';
import { useState } from 'react';
import classNames from 'classnames';
import getClients from '@/controllers/getClients';
import setClient from '@/controllers/setClient';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddClientValidationRules';
import Alert from '@/components/UI/Alert';
import InputText from '@/components/UI/InputText';
import SearchAutoComplete from '@/components/UI/SearchAutoComplete';

export default function EditClient({ clients }) {
  const [selected, setSelected] = useState(null);
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitCallback,
    validate
  );
  const [saved, setSaved] = useState(false);

  const handleOnSelect = (item) => {
    setSelected(item);
    setValues({
      clientName: item.name,
      clientDescription: item.description,
      clientContacts: item.contacts,
    });
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span className="search-dropdown">{item.description}</span>
      </>
    );
  };

  function submitCallback() {
    const clientData = {
      id: selected.id,
      name: values.clientName,
      description: values.clientDescription,
      contacts: values.clientContacts,
    };
    setClient(clientData)
      .then((r) => {
        setValues({});
        setSaved(true);
        setTimeout(() => setSaved(false), 5000);
      })
      .catch((e) => <Alert danger={true} message={e} />);
  }

  return (
    <main className="page-content">
      <Head>
        <title>Edit client | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Edit client</h1>
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
        </div>
        {selected ? (
          <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
            <InputText
              label="Name"
              id="clientName"
              name="clientName"
              className={classNames({
                'input-field lg:w-1/3': true,
                'is-danger': errors.clientName,
              })}
              mLength="128"
              handleChange={handleChange}
              value={values.clientName || ''}
              req={true}
              onError={errors.clientName}
            />
            <InputText
              label="Description"
              id="clientDescription"
              name="clientDescription"
              className={classNames({
                'input-field lg:w-1/3': true,
                'is-danger': errors.clientDescription,
              })}
              mLength="128"
              handleChange={handleChange}
              value={values.clientDescription || ''}
              req={true}
              onError={errors.clientDescription}
            />
            <InputText
              label="Contacts"
              id="clientContacts"
              name="clientContacts"
              className={classNames({
                'input-field lg:w-1/3': true,
                'is-danger': errors.clientContacts,
              })}
              mLength="128"
              handleChange={handleChange}
              value={values.clientContacts || ''}
              req={true}
              onError={errors.clientContacts}
            />
            {saved ? <Alert info={true} message="Client updated!" /> : ''}
            <button type="submit" className="submit-button">
              Update
            </button>
          </form>
        ) : null}
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
