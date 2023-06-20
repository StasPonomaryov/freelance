const tasksRepo = (db) => ({
  async saveTask(orderData) {
    return await db.saveOrder(orderData);
  },

  async getTasks() {
    return await db.getOrders();
  },

  async getTask(id) {
    return await db.getOrder(id);
  },

  async removeTask(id) {
    return await db.removeOrder(id);
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
});

export default tasksRepo;