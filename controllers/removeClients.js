import clientsRepo from '../repositories/clients';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';

export default async function removeClients(clientIds) {
  const connection = new CloudDb(firebaseFirestore);
  return await clientsRepo(connection).removeClients(clientIds);
}
