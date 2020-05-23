import i18n from "../i18n";

const drawerWidth = 240;
const backendUrl = process.env.REACT_APP_ENV_BACKEND_URL;
const imageBackendUrl = process.env.REACT_APP_ENV_IMAGE_BACKEND_URL;
const imageUrl = imageBackendUrl + '/uploads/';
const DEFAULT_QUESTION_TYPE = 'MULTIPLE_CHOICE';
const QUESTION_TYPES = {
    FREE_TEXT: 'free_text',
    MULTIPLE_CHOICE: "multiple_choice"
};
const LANGUAGE = i18n.language.split('-')[0];

export {drawerWidth, backendUrl, imageUrl, DEFAULT_QUESTION_TYPE, QUESTION_TYPES, LANGUAGE, imageBackendUrl};
