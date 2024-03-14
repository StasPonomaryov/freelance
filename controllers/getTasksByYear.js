import tasksRepo from '@/repositories/tasks';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Get orders of the year drom database
 * @param {String} year
 * @returns {Array} orders
 */
export default async function getTasksByYear(year) {
  const connection = new CloudDb(firebaseFirestore);

  return tasksRepo(connection).getTasksByYear(year);
}
