import { nanoid } from 'nanoid';
import useForm from '@/hooks/useAddClientForm';
import validate from '@/utils/AddClientValidationRules';
import setClient from '@/controllers/setClient';

export default function AddClient() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    submitCallback,
    validate
  );
  function submitCallback() {
    const clientId = nanoid(8);
    const clientData = {
      id: clientId,
      name: values.clientName,
      description: values.clientDescription,
      contacts: values.clientContacts
    };
    console.log('>>>SUBMITTING DATA', clientData);
    setClient(clientData).then((r) => console.log(r));
  }

  return (
    <main className="add-client bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Add client
      </h1>
      <div className="container p-4">
        <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="client-name">
            <label
              htmlFor="clientName"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Name<span className="required">*</span>
            </label>
            <input
              id="clientName"
              name="clientName"
              required
              type="text"
              maxLength="128"
              onChange={handleChange}
              value={values.clientName || ''}
              className={`w-1/3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.clientName && 'is-danger'
              }`}
            />
            {errors.clientName && (
              <p className="text-sm text-red-800">{errors.clientName}</p>
            )}
          </div>
          <div className="client-description w-full">
            <label
              htmlFor="clientDescription"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Description<span className="required">*</span>
            </label>
            <input
              id="clientDescription"
              name="clientDescription"
              required
              type="text"
              maxLength="128"
              onChange={handleChange}
              value={values.clientDescription || ''}
              className={`w-1/3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.clientDescription && 'is-danger'
              }`}
            />
            {errors.clientDescription && (
              <p className="text-sm text-red-800">{errors.clientDescription}</p>
            )}
          </div>
          <div className="client-contacts w-full">
            <label
              htmlFor="clientContacts"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Contacts<span className="required">*</span>
            </label>
            <input
              id="clientContacts"
              name="clientContacts"
              required
              type="text"
              maxLength="128"
              onChange={handleChange}
              value={values.clientContacts || ''}
              className={`w-1/3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.clientContacts && 'is-danger'
              }`}
            />
            {errors.clientContacts && (
              <p className="text-sm text-red-800">{errors.clientContacts}</p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-600
              hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:ring-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
