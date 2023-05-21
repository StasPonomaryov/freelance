import clientsRepo from '../repositories/clients';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';

export default async function updateClients(clientsData) {
  const connection = new CloudDb(firebaseFirestore);
  return await clientsRepo(connection).updateClients(clientsData);
}
