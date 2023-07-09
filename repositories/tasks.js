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
      const y = new Date(year);

      return date.getYear() === y.getYear();
    });

    return filtered;
  },

  async removeTask(id) {
    return await db.removeOrder(id);
  },

  async saveTask(orderData) {
    return await db.saveOrder(orderData);
  },
});

export default tasksRepo;
