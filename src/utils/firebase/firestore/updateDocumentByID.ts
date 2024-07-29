import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../app/firebase';

const updateDocumentByID = async (collectionName: string, id: string, updatedData: any): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, updatedData);
};

export default updateDocumentByID;
