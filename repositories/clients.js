const clientsRepo = (db) => ({
  async getClients() {
    return await db.getClients();
  },

  async removeClients(clientsIds) {
    return await db.removeClients(clientsIds);
  },

  async saveClient(orderData) {
    return await db.saveClient(orderData);
  },

  async updateClients(clientsData) {
    return await db.updateClients(clientsData);
  },
});

export default clientsRepo;
