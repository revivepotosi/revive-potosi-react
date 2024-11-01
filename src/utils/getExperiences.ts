import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../app/firebase';

const getExperiences = async (collectionName: string, historicCenterID: string): Promise<any> => {
  const q = query(collection(db, collectionName), where('historicCenterID', "==", historicCenterID));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export default getExperiences;
