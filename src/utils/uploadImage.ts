
import { getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Image from '../interfaces/image';
import uploadFile from './firebase/storage/uploadFile';

const uploadImage = async (file: File, collection?: string): Promise<Image> => {
  try {
    const extension = file.name.split('.').pop();
    const imageName = `${uuidv4()}.${extension}`;
    const imageRef = collection ? `image/${collection}/${imageName}` : `image/${imageName}`;
    const uploadResult = await uploadFile(file, imageRef);
    const url = await getDownloadURL(uploadResult.ref);
    return {
      url,
      ref: imageRef,
    };
  } catch (error: any) {
    throw error;
  }
};

export default uploadImage;
