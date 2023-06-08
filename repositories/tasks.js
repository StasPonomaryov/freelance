const tasksRepo = (db) => ({
  async saveTask(orderData) {
    return await db.saveOrder(orderData);
  },

  async getTasks() {
    return await db.getOrders();
  },

  async getTask(id) {
    return await db.getOrder(id);
  }
});

export default tasksRepo;