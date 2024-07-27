
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const uploadImage = async (file: File) => {
  try {
    const extension = file.name.split('.').pop();
    const name = `${uuidv4()}.${extension}`;
    const storage = getStorage();
    const storageRef = ref(storage, `image/${name}`);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  } catch (error: any) {
    throw error;
  }
};

export default uploadImage;
