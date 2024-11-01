
import { getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import uploadFile from './firebase/storage/uploadFile';
import FileFirebase from '../interfaces/fileFirebase';

const uploadActivator = async (file: File, historicCenterID: string): Promise<FileFirebase> => {
  try {
    const extension = file.name.split('.').pop();
    const activatorName = `${uuidv4()}.${extension}`;
    const activatorRef = `activator/${historicCenterID}/${activatorName}`;
    const uploadResult = await uploadFile(file, activatorRef);
    const url = await getDownloadURL(uploadResult.ref);
    return {
      url,
      ref: activatorRef,
    };
  } catch (error: any) {
    throw error;
  }
};

export default uploadActivator;
