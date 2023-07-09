import clientsRepo from '@/repositories/clients';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Save client to database
 * @param {Object} clientData
 * @returns
 */
export default async function setClient(clientData) {
  const connection = new CloudDb(firebaseFirestore);

  return await clientsRepo(connection).saveClient(clientData);
}
