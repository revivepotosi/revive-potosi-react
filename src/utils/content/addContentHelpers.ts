import { v4 as uuidv4 } from 'uuid';
import collections from '../../constants/collections';
import Content from '../../interfaces/content';
import addDocument from '../firebase/firestore/addDocument';
import Info from '../../feature/info/interface/info';
import updateDocumentByID from '../firebase/firestore/updateDocumentByID';
import HistoricCenter from '../../feature/historicCenter/interfaces/historicCenter';
import { isHistoricCenter } from '../functions';

const addInfoContent = async (newContent: Content, infos: Info[]) => {
  if (infos.length === 0) {
    await addDocument(collections.info, {
      contents: [ newContent ],
    } as Info);
    return;
  }

  const info: Info = infos[0];
  let contentUpdated: Content[] = (info?.contents && Array.isArray(info?.contents))
    ? [ ...info.contents, newContent] : [ newContent ];

  await updateDocumentByID(
    collections.info,
    info.id,
    {
      contents: contentUpdated,
    }
  );
};

const addHistoricCenterContent = async (newContent: Content, historicCenter: HistoricCenter, id: string) => {
  let contentUpdated: Content[] = (historicCenter?.contents && Array.isArray(historicCenter?.contents))
    ? [ ...historicCenter.contents, newContent] : [ newContent ];
  await updateDocumentByID(
    collections.historicCenter,
    id,
    {
      contents: contentUpdated,
    }
  );
};

const addContent = async (content: Content, type: string, object: HistoricCenter | Info[] | undefined, id: string) => {
  const newContent: Content = {
    ...content,
    id: uuidv4(),
  };
  if (isHistoricCenter(type)) {
    await addHistoricCenterContent(newContent, object as HistoricCenter, id);
  } else {
    await addInfoContent(newContent, object as Info[]);
  }
};

export { addContent };
