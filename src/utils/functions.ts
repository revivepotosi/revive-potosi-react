import buttonsStr from '../constants/buttonsStr';
import collections from '../constants/collections';
import contentTypes from '../constants/contentTypes';
import generalStr from '../constants/generalStr';

const getViewField = (label: string, value: string) => `${label}: ${value}`;

const getViewMediaField = (label: string) => `${label}:`;

const getBackTo = (lenguagePrefix: string, destiny: string) => `${buttonsStr[lenguagePrefix].backButton} ${destiny}`;

const getEditTitle = (lenguagePrefix: string, title: string) => `${generalStr[lenguagePrefix].edit} ${title}`;

const isTextContent = (type: string): boolean => type === contentTypes[0].id || type === contentTypes[1].id || type === contentTypes[3].id;

const isImageContent = (type: string): boolean => type === contentTypes[2].id;

const isParagraphContent = (type: string): boolean => type === contentTypes[3].id;

const getDeleteTitle = (lenguagePrefix: string, objectToDelete: string) => `${generalStr[lenguagePrefix].deleteTitle} ${objectToDelete}?`;

const isHistoricCenter = (type: string) => type === collections.historicCenter;

const getImagePath = (type: string, id?: string) => isHistoricCenter(type) ? `${collections.historicCenter}/content/${id}` : collections.info;


export {
    getViewField,
    getViewMediaField,
    getBackTo,
    getEditTitle,
    isTextContent,
    isImageContent,
    isParagraphContent,
    getDeleteTitle,
    isHistoricCenter,
    getImagePath,
};
