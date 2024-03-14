const clientsRepo = (db) => ({
  async getClients() {
    return db.getClients();
  },

  async removeClients(clientsIds) {
    return db.removeClients(clientsIds);
  },

  async saveClient(orderData) {
    return db.saveClient(orderData);
  },

  async updateClients(clientsData) {
    return db.updateClients(clientsData);
  },
});

export default clientsRepo;
