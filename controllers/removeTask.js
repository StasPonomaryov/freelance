import tasksRepo from '../repositories/tasks';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Remove order from database
 * @param {String} orderId
 * @returns
 */
export default async function removeTask(orderId) {
  const connection = new CloudDb(firebaseFirestore);

  return await tasksRepo(connection).removeTask(orderId);
}
