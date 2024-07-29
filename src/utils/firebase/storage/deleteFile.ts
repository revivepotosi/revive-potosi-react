
import { getStorage, ref, deleteObject } from 'firebase/storage';

const deleteFile = async (fileRef: string): Promise<void> => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, fileRef);
    await deleteObject(storageRef);
  } catch (error: any) {
    throw error;
  }
};

export default deleteFile;
