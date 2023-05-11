const clientsRepo = (db) => ({
  async saveClient(orderData) {
    return await db.saveClient(orderData);
  },

  async getClients() {
    return await db.getClients();
  },
});

export default clientsRepo;
