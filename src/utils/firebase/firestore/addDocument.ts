import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../app/firebase';

const addDocument = async (collectionName: string, newDocument: any): Promise<void> => {
  await addDoc(collection(db, collectionName), newDocument);
};

export default addDocument;
