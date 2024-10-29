import collections from '../../constants/collections';
import Info from '../../feature/info/interface/info';
import Content from '../../interfaces/content';
import getData from '../firebase/firestore/getData';
import updateDocumentByID from '../firebase/firestore/updateDocumentByID';
import { isHistoricCenter } from '../functions';

const replaceContent = async (id: string, type: string, newContents: Content[]): Promise<void> => {
  if (isHistoricCenter(type)) {
    await updateDocumentByID(
        collections.historicCenter,
        id,
        {
          contents: newContents,
        },
    );
  } else {
    const data: Info[] = await getData(collections.info);
    if (data && Array.isArray(data) && data.length > 0) {
        await updateDocumentByID(
            collections.info,
            data[0].id,
            {
              contents: newContents,
            },
        );
    }
  }
};

export default replaceContent;
