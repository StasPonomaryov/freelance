import getClients from '@/controllers/getClients';
import getTasksByYear from '@/controllers/getTasksByYear';
import { groupBy, getPaidOrders, getFinishedOrdersByYear, getPaidOrdersByYear } from '@/utils';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labelsYear = ['2023'];
const labelsMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dynamicColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

export default function Admin({ clients, filteredOrders }) {
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
  const ordersGroupedByClient = groupBy(filteredOrders, 'clientId');
  const dataClientsOrders = {
    labels: labelsYear,
    datasets: Object.keys(ordersGroupedByClient).map((o) => {
      return {
        label: clients.find((c) => c.id === o).name,
        data: [ordersGroupedByClient[o].length],
        backgroundColor: dynamicColor(),
      };
    }),
  };

  const dataClientsIncome = {
    labels: labelsYear,
    datasets: Object.keys(ordersGroupedByClient).map((o) => {
      return {
        label: clients.find((c) => c.id === o).name,
        data: [getPaidOrders(ordersGroupedByClient[o])],
        backgroundColor: dynamicColor(),
      };
    }),
  };

  const dataYearIncome = {
    labels: labelsMonths,
    datasets: [
      {
        label: 'UAH',
        data: getPaidOrdersByYear(filteredOrders),
        backgroundColor: dynamicColor(),
      },
    ],
  };

  const dataYearOrders = {
    labels: labelsMonths,
    datasets: [
      {
        label: 'count',
        data: getFinishedOrdersByYear(filteredOrders),
        backgroundColor: dynamicColor(),
      },
    ],
  };

  console.log(getPaidOrdersByYear(filteredOrders));

  return (
    <main className="site-content bg-amber-200 dark:bg-gray-800 p-3">
      <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
        Analytics
      </h1>
      <div className="container p-4">
        <div className="flex flex-row items-center w-full lg:w-2/4">
          <div className="top-clients-income w-full mr-1">
            <h2>Top clients (income)</h2>
            <Bar data={dataClientsIncome} height={300} options={options} />
          </div>
          <div className="top-clients-tasks w-full mr-1">
            <h2>Top clients (orders)</h2>
            <Bar
              data={dataClientsOrders}
              height={300}
              options={clientsTasksOptions}
            />
          </div>
        </div>
        <div className="flex flex-row items-center w-full lg:w-2/4">
          <div className="top-clients-income w-full mr-1">
            <h2>Income by 2023</h2>
            <Bar data={dataYearIncome} height={300} options={options} />
          </div>
          <div className="top-clients-tasks w-full mr-1">
            <h2>Orders by 2023</h2>
            <Bar
              data={dataYearOrders}
              height={300}
              options={clientsTasksOptions}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const clients = await getClients();
  const filteredOrders = await getTasksByYear('2023');

  return {
    props: {
      clients,
      filteredOrders,
    },
  };
}
