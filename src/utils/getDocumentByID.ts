import { doc, getDoc } from 'firebase/firestore';
import { db } from '../app/firebase';

const getDocumentByID = async (collectionName: string, id: string): Promise<any> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw Error('No such document!')
  }
};

export default getDocumentByID;
