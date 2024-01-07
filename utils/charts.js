import {
  groupBy,
  getPaidOrders,
  getFinishedOrdersByYear,
  getPaidOrdersByYear,
} from '@/utils';

export const labelsMonths = [
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

export const dynamicColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r},${g},${b})`;
};

const chartClaculations = (filteredOrders, clients, year) => ({
  ordersGroupedByClient() {
    return groupBy(filteredOrders, 'clientId');
  },

  dataClientsOrders() {
    return {
      labels: [year],
      datasets: Object.keys(this.ordersGroupedByClient()).map((o) => {
        return {
          label: clients.find((c) => c.id === o).name,
          data: [this.ordersGroupedByClient()[o].length],
          backgroundColor: dynamicColor(),
        };
      }),
    };
  },

  dataClientsIncome() {
    return {
      labels: [year],
      datasets: Object.keys(this.ordersGroupedByClient()).map((o) => {
        return {
          label: clients.find((c) => c.id === o).name,
          data: [getPaidOrders(this.ordersGroupedByClient()[o])],
          backgroundColor: dynamicColor(),
        };
      }),
    };
  },

  dataYearIncome() {
    return {
      labels: labelsMonths,
      datasets: [
        {
          label: 'UAH',
          data: getPaidOrdersByYear(filteredOrders),
          backgroundColor: dynamicColor(),
        },
      ],
    };
  },

  dataYearOrders() {
    return {
      labels: labelsMonths,
      datasets: [
        {
          label: 'count',
          data: getFinishedOrdersByYear(filteredOrders),
          backgroundColor: dynamicColor(),
        },
      ],
    };
  },
});

export default chartClaculations;
