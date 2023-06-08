import tasksRepo from '../repositories/tasks';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';

export default async function getTask(orderId) {
  const connection = new CloudDb(firebaseFirestore);
  return await tasksRepo(connection).getTask(orderId);
}
