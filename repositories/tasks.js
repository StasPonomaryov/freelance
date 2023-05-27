const tasksRepo = (db) => ({
  async saveTask(orderData) {
    return await db.saveOrder(orderData);
  }
});

export default tasksRepo;