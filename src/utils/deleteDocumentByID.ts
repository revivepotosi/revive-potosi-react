import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../app/firebase';

const deleteDocumentByID = async (collectionName: string, id: string): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export default deleteDocumentByID;
