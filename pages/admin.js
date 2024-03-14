import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getClients from '@/controllers/getClients';
import getTasksByYear from '@/controllers/getTasksByYear';
import getYearsOfTasks from '@/controllers/getYearsOfTasks';
import chartClaculations from '@/utils/charts';
import Select from '@/components/UI/Select';
import Alert from '@/components/UI/Alert';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const clientsTasksOptions = {
  ...options,
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export default function Admin() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [clients, setClients] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTasks() {
      setLoading(true);
      try {
        const fetchedClients = await getClients();
        if (fetchedClients?.length) {
          setClients(fetchedClients);
        }
        const fetchedYears = await getYearsOfTasks();
        if (fetchedYears?.length) {
          setYears(fetchedYears);
        }
        const fetchedOrders = await getTasksByYear(year);
        if (fetchedOrders?.length) {
          setFilteredOrders(fetchedOrders);
        }
      } catch (e) {
        console.log('>>>ERROR', e);
      } finally {
        setLoading(false);
      }
    }

    getTasks();
  }, [year]);

  function handleSelect(e) {
    e.preventDefault();
    const selectedYear = e.target.value;
    if (selectedYear) setYear(selectedYear);
  }

  return (
    <main className="page-content">
      <h1 className="page-title">Analytics</h1>
      {loading ? (
        <LoadingSpinner />
      ) : clients.length && filteredOrders.length ? (
        <>
          <div className="inline-block p-4">
            <Select
              id="years"
              options={years.map((y) => ({ text: y.toString(), value: y }))}
              onChange={handleSelect}
            />
          </div>
          <div className="container flex flex-wrap p-4">
            <div className="top-clients-income lg:w-1/4">
              <h2>Top clients (income)</h2>
              <Bar
                data={chartClaculations(
                  filteredOrders,
                  clients,
                  year
                ).dataClientsIncome()}
                options={options}
              />
            </div>
            <div className="top-clients-tasks lg:w-1/4">
              <h2>Top clients (orders)</h2>
              <Bar
                data={chartClaculations(
                  filteredOrders,
                  clients,
                  year
                ).dataClientsOrders()}
                options={clientsTasksOptions}
              />
            </div>
            <div className="top-clients-income lg:w-1/4">
              <h2>Income count</h2>
              <Bar
                data={chartClaculations(
                  filteredOrders,
                  clients,
                  year
                ).dataYearIncome()}
                options={options}
              />
            </div>
            <div className="top-clients-tasks lg:w-1/4">
              <h2>Orders count</h2>
              <Bar
                data={chartClaculations(
                  filteredOrders,
                  clients,
                  year
                ).dataYearOrders()}
                options={clientsTasksOptions}
              />
            </div>
          </div>
        </>
      ) : (
        <Alert danger message="Помилка з'єднання з базою даних" />
      )}
    </main>
  );
}

// export async function getServerSideProps() {
//   const clients = await getClients();
//   const years = await getYearsOfTasks();
//   const filteredOrders = await getTasksByYear('2023');

//   return {
//     props: {
//       clients,
//       filteredOrders,
//       years,
//     },
//   };
// }
