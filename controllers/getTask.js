import tasksRepo from '@/repositories/tasks';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Get specific task from database
 * @param {String} orderId 
 * @returns {Object} order
 */
export default async function getTask(orderId) {
  const connection = new CloudDb(firebaseFirestore);

  return await tasksRepo(connection).getTask(orderId);
}
