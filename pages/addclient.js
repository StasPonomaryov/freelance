import { useState } from 'react';
import Head from 'next/head';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddClientValidationRules';
import setClient from '@/controllers/setClient';
import Alert from '@/components/Alert';
import InputText from '@/components/InputText';

export default function AddClient() {
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitCallback,
    validate
  );
  const [saved, setSaved] = useState(false);

  function submitCallback() {
    const clientId = nanoid(8);
    const clientData = {
      id: clientId,
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
        <title>Add client | Freelance dashboard</title>
      </Head>
      <h1 className="page-title">Add client</h1>
      <div className="container p-4">
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
              'input-field': true,
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
              'input-field': true,
              'is-danger': errors.clientContacts,
            })}
            mLength="128"
            handleChange={handleChange}
            value={values.clientContacts || ''}
            req={true}
            onError={errors.clientContacts}
          />
          {saved ? <Alert info={true} message="Client added!" /> : null}
          <button type="submit" className="submit-button">
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
