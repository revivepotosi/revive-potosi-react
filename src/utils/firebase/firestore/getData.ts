import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebase';

const getData = async (collectionName: string): Promise<any> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export default getData;
