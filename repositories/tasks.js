const tasksRepo = (db) => ({
  async getTask(id) {
    return await db.getOrder(id);
  },

  async getTasks() {
    return await db.getOrders();
  },

  async getTasksByYear(year) {
    const allOrders = await db.getOrders();
    const filtered = allOrders.filter((o) => {
      const date = new Date(o.end);
      const y = new Date(year.toString());

      return date.getYear() === y.getYear();
    });

    return filtered;
  },

  async getYears() {
    const allOrders = await db.getOrders();
    let years = [];
    if (!allOrders || (allOrders && !allOrders.length)) return;
    allOrders.forEach((order) => {
      if (order.end) {
        const date = new Date(order.end);
        years.push(date.getFullYear());
      }
    });

    return [...new Set(years)];
  },

  async removeTask(id) {
    return await db.removeOrder(id);
  },

  async saveTask(orderData) {
    return await db.saveOrder(orderData);
  },
});

export default tasksRepo;
