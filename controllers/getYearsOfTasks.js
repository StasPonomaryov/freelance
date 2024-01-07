import tasksRepo from '@/repositories/tasks';
import { CloudDb } from '@/adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';
/**
 * Get all tasks' years
 * @returns {Array} years
 */
export default async function getYearsOfTasks() {
  const connection = new CloudDb(firebaseFirestore);

  return await tasksRepo(connection).getYears();
}