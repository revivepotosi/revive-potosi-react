
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Image from '../interfaces/image';

const uploadImage = async (file: File): Promise<Image> => {
  try {
    const extension = file.name.split('.').pop();
    const name = `${uuidv4()}.${extension}`;
    const imageRef = `image/${name}`;
    const storage = getStorage();
    const storageRef = ref(storage, imageRef);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return {
      url,
      ref: imageRef,
    };
  } catch (error: any) {
    throw error;
  }
};

export default uploadImage;
