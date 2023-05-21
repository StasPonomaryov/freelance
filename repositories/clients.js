const clientsRepo = (db) => ({
  async saveClient(orderData) {
    return await db.saveClient(orderData);
  },

  async getClients() {
    return await db.getClients();
  },

  async updateClients(clientsData) {
    return await db.updateClients(clientsData);
  },

  async removeClients(clientsIds) {
    return await db.removeClients(clientsIds);
  }
});

export default clientsRepo;
