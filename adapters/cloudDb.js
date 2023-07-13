import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  writeBatch,
} from 'firebase/firestore';

export class CloudDb {
  constructor(database) {
    this.cloudDb = database;
    this.clients = 'clients';
    this.tasks = 'tasks';
  }
  /**
   * Get clients list from cloud DB
   * @returns {Array} client objects
   */
  async getClients() {
    let result = [];
    const q = query(collection(this.cloudDb, this.clients));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }

  /**
   * Save client data
   * @param {Object} clientData - client object
   */
  async saveClient(clientData) {
    return await setDoc(
      doc(this.cloudDb, this.clients, `${clientData.id}`),
      clientData
    );
  }

  /**
   * Update multiple clients
   * @param {Array} clientsData - client objects
   */
  async updateClients(clientsData) {
    const batch = writeBatch(this.cloudDb);
    for (const currentClient of clientsData) {
      const docRef = doc(this.cloudDb, this.clients, `${currentClient.id}`);
      batch.update(docRef, currentClient);
    }
  
    return await batch.commit();
  }

  /**
   * Remove multiple clients
   * @param {Array} clientsIds 
   */
  async removeClients(clientsIds) {
    const batch = writeBatch(this.cloudDb);
    for (const currentClient of clientsIds) {
      const docRef = doc(this.cloudDb, this.clients, `${currentClient}`);
      batch.delete(docRef);
    }

    return await batch.commit();
  }

  /**
   * Get orders list from cloud DB
   * @returns {Array} orders objects
   */
  async getOrders() {
    let result = [];
    const q = query(collection(this.cloudDb, this.tasks));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }

  /**
   * Save order data
   * @param {Object} orderData 
   */
  async saveOrder(orderData) {
    return await setDoc(
      doc(this.cloudDb, this.tasks, `${orderData.id}`),
      orderData
    );
  }

  /**
   * Remove order by id
   * @param {String} orderId 
   * @returns 
   */
  async removeOrder(orderId) {
    return await deleteDoc(doc(this.cloudDb, this.tasks, `${orderId}`));
  }
}
