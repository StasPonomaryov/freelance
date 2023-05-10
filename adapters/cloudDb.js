import { doc, getDoc, setDoc } from 'firebase/firestore';

export class CloudDb {
  constructor(database) {
    this.cloudDb = database;
    this.clients = 'clients';
    this.tasks = 'tasks';
  }
  /**
   * Get clients list from cloud DB
   */
  async getClients() {
    let result = [];
    const docRef = doc(this.cloudDb, this.clients);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    }

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
}
