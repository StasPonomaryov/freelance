import clientsRepo from '@/repositories/clients';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Get clients array from database
 * @returns {Array} clients objects
 */
export default async function getClients() {
  const connection = new CloudDb(firebaseFirestore);

  return clientsRepo(connection).getClients();
}
