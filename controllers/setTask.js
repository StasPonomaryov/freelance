import tasksRepo from '@/repositories/tasks';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Save order to database
 * @param {Object} orderData
 * @returns
 */
export default async function setTask(orderData) {
  const connection = new CloudDb(firebaseFirestore);

  return await tasksRepo(connection).saveTask(orderData);
}
