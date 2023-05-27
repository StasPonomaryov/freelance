import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  writeBatch
} from 'firebase/firestore';

export class CloudDb {
  constructor(database) {
    this.cloudDb = database;
    this.clients = 'clients';
    this.tasks = 'tasks';
  }
  /**
   * Get clients list from cloud DB
   */
  async getClient(clientId) {
    let result = {};
    const docRef = doc(this.cloudDb, this.clients, `${clientId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
      console.log('>>>DOCUMENT', docSnap.data());
    } else {
      console.log('>>>NO DOCUMENT FOUND');
    }

    return result;
  }

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
   * @param {Objects} clientData
   * @returns
   */
  async saveClient(clientData) {
    return await setDoc(
      doc(this.cloudDb, this.clients, `${clientData.id}`),
      clientData
    );
  }

  async updateClients(clientsData) {
    const batch = writeBatch(this.cloudDb);
    for (const currentClient of clientsData) {
      const docRef = doc(this.cloudDb, this.clients, `${currentClient.id}`);
      batch.update(docRef, currentClient);
    }
    return await batch.commit();
  }

  async removeClients(clientsIds) {
    const batch = writeBatch(this.cloudDb);
    for (const currentClient of clientsIds) {
      const docRef = doc(this.cloudDb, this.clients, `${currentClient}`);
      batch.delete(docRef);
    }
    return await batch.commit();
  }

  async saveOrder(orderData) {
    return await setDoc(
      doc(this.cloudDb, this.tasks, `${orderData.id}`),
      orderData
    );
  }
}
