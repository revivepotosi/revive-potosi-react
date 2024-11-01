
import { getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import uploadFile from './firebase/storage/uploadFile';
import FileFirebase from '../interfaces/fileFirebase';

const uploadModel = async (file: File, historicCenterID: string): Promise<FileFirebase> => {
  try {
    const extension = file.name.split('.').pop();
    const modelName = `${uuidv4()}.${extension}`;
    const modelRef = `model/${historicCenterID}/${modelName}`;
    const uploadResult = await uploadFile(file, modelRef);
    const url = await getDownloadURL(uploadResult.ref);
    return {
      url,
      ref: modelRef,
    };
  } catch (error: any) {
    throw error;
  }
};

export default uploadModel;
