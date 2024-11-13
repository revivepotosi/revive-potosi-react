import collections from '../../constants/collections';
import HistoricCenter from '../../feature/historicCenter/interfaces/historicCenter';
import Info from '../../feature/info/interface/info';
import Content from '../../interfaces/content';
import getData from '../firebase/firestore/getData';
import getDocumentByID from '../firebase/firestore/getDocumentByID';
import { isHistoricCenter } from '../functions';

const getContent = async (id: string, type: string): Promise<Content[]> => {
  let contents: Content[];

  if (isHistoricCenter(type)) {
    const historicCenter: HistoricCenter = await getDocumentByID(collections.historicCenter, id ?? '');
    contents = historicCenter.contents ?? [];
  } else {
    const data: Info[] = await getData(collections.info);
    if (data && Array.isArray(data) && data.length > 0) {
      contents = data[0].contents ?? [];
    } else {
      contents = [];
    }
  }

  return contents;
};

export { getContent };
