const clientsRepo = (db) => ({
  async saveClient(orderData) {
    return await db.saveClient(orderData);
  },

  async getClients() {
    return await db.getClients();
  },

  async removeClient(clientId) {
    return await db.removeClient(clientId);
  }
});

export default clientsRepo;
