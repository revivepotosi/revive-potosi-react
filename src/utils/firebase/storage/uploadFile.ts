
import { UploadResult, getStorage, ref, uploadBytes } from 'firebase/storage';

const uploadFile = async (file: File, fileRef: string): Promise<UploadResult> => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, fileRef);
    const uploadResult = await uploadBytes(storageRef, file);
    return uploadResult;
  } catch (error: any) {
    throw error;
  }
};

export default uploadFile;
