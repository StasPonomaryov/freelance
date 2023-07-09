/**
 * Group Array of Objects by key
 * @param {Array} xs - Array of objects
 * @param {String} key - object key in xs array
 * @returns {Array} - grouped array
 */
export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
/**
 * Get orders been paid
 * @param {Array} ordersArray
 * @returns {Number} - sum of income
 */
export const getPaidOrders = (ordersArray) => {
  const result = ordersArray.reduce((total, o) => {
    const start = o.priceStart ? Number(o.priceStart) : 0;
    const end = o.priceEnd ? Number(o.priceEnd) : 0;
    return total + start + end;
  }, 0);

  return result;
};
/**
 * Get fulfilled orders of the year monthly
 * @param {Array} orders - orders of the year
 * @returns {Array} completed orders by every month
 */
export const getFinishedOrdersByYear = (orders) => {
  const monthlyOrdersArray = new Array(12).fill(0);
  orders.forEach(
    ({ end }) => (monthlyOrdersArray[new Date(end).getMonth()] += 1)
  );

  return monthlyOrdersArray;
};
/**
 * Get orders of the year been paid monthly
 * @param {Array} orders - orders of the year
 * @returns {Array} income by every month
 */
export const getPaidOrdersByYear = (orders) => {
  const monthlyIncomeArray = new Array(12).fill(0);
  orders.forEach(({ priceStart, priceEnd, end }) => {
    const incomeStart = priceStart ? Number(priceStart) : 0;
    const incomeEnd = priceEnd ? Number(priceEnd) : 0;
    const income = incomeStart + incomeEnd;

    return (monthlyIncomeArray[new Date(end).getMonth()] += income);
  });

  return monthlyIncomeArray;
};
