import tasksRepo from '../repositories/tasks';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';

export default async function removeTask(orderId) {
  const connection = new CloudDb(firebaseFirestore);
  return await tasksRepo(connection).removeTask(orderId);
}
