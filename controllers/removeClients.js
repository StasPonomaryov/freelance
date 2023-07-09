import clientsRepo from '@/repositories/clients';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Remove clients from database
 * @param {Array} clientIds
 * @returns
 */
export default async function removeClients(clientIds) {
  const connection = new CloudDb(firebaseFirestore);

  return await clientsRepo(connection).removeClients(clientIds);
}
