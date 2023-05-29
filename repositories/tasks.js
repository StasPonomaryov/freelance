const tasksRepo = (db) => ({
  async saveTask(orderData) {
    return await db.saveOrder(orderData);
  },

  async getTasks() {
    return await db.getOrders();
  }
});

export default tasksRepo;