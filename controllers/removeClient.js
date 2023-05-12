import clientsRepo from '../repositories/clients';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';

export default async function removeClient(clientId) {
  const connection = new CloudDb(firebaseFirestore);
  return await clientsRepo(connection).removeClient(clientId);
}
