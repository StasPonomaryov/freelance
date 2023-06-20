import tasksRepo from '../repositories/tasks';
import { CloudDb } from '../adapters/cloudDb';
import { firebaseFirestore } from '@/lib/firebase';

export default async function getTasksByYear(year) {
  const connection = new CloudDb(firebaseFirestore);

  return await tasksRepo(connection).getTasksByYear(year);
}
