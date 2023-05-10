const clientsRepo = (db) => ({
  async saveClient(orderData) {
    return await db.saveClient(orderData);
  },
});

export default clientsRepo;
