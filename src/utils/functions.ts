import buttonsStr from '../constants/buttonsStr';
import contentTypes from '../constants/contentTypes';
import generalStr from '../constants/generalStr';

const getViewField = (label: string, value: string) => `${label}: ${value}`;

const getViewMediaField = (label: string) => `${label}:`;

const getBackTo = (lenguagePrefix: string, destiny: string) => `${buttonsStr[lenguagePrefix].backButton} ${destiny}`;

const getEditTitle = (lenguagePrefix: string, title: string) => `${generalStr[lenguagePrefix].edit} ${title}`;

const isTextContent = (type: string): boolean => type === contentTypes[0].id || type === contentTypes[1].id || type === contentTypes[3].id;

const isImageContent = (type: string): boolean => type === contentTypes[2].id;

const isParagraphContent = (type: string): boolean => type === contentTypes[3].id;

export {
    getViewField,
    getViewMediaField,
    getBackTo,
    getEditTitle,
    isTextContent,
    isImageContent,
    isParagraphContent,
};
