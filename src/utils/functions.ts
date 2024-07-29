import buttonsStr from '../constants/buttonsStr';
import generalStr from '../constants/generalStr';

const getViewField = (label: string, value: string) => `${label}: ${value}`;

const getViewMediaField = (label: string) => `${label}:`;

const getBackTo = (lenguagePrefix: string, destiny: string) => `${buttonsStr[lenguagePrefix].backButton} ${destiny}`;

const getEditTitle = (lenguagePrefix: string, title: string) => `${generalStr[lenguagePrefix].edit} ${title}`;

export {
    getViewField,
    getViewMediaField,
    getBackTo,
    getEditTitle,
};
