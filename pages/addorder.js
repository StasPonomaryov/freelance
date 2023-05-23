import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import useForm from '@/hooks/useCustomForm';
import validate from '@/utils/AddClientValidationRules';
import setClient from '@/controllers/setClient';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import getClients from '@/controllers/getClients';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

export default function AddOrder() {
  const [clients, setClients] = useState([]);
  const [clientSelected, setClientSelected] = useState('');
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitCallback,
    validate
  );
  const [taskText, setTaskText] = useState('**Task description**');
  const [saved, setSaved] = useState(false);

  function submitCallback() {
    const clientId = nanoid(8);
    const clientData = {
      id: clientId,
      name: values.clientName,
      description: values.clientDescription,
      contacts: values.clientContacts,
    };
    console.log('>>>SUBMITTING DATA', clientData);
    setClient(clientData)
      .then((r) => setSaved(true))
      .catch((e) => <Alert color="red" message={e} />);
  }

  function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
  }

  const onSelectChange = (e) => {
    e.preventDefault();
    const found = clients.find((c) => c.id === e.target.value).name;
    console.log('>>>SELECTED', found);
    setClientSelected(found);
  };

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
      setClientSelected(data[0].name);
    });
  }, [setValues]);

  return (
    <main className="add-client bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Add order
      </h1>
      <div className="container p-4">
        <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="client-name md:w-2/4 sm:w-full">
            <label
              htmlFor="clientName"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Client<span className="required">*</span>
            </label>
            <select
              id="current-tab"
              name="current-tab"
              defaultValue={clientSelected}
              onChange={(e) => onSelectChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {clients.map((client) => (
                <option value={client.id} key={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientName && (
              <p className="text-sm text-red-800">{errors.clientName}</p>
            )}
          </div>
          <div className="task-description" data-color-mode="dark">
            <MDEditor value={taskText} onChange={setTaskText} />
          </div>
        </form>
      </div>
    </main>
  );
}
