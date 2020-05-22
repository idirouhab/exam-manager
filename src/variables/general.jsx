const drawerWidth = 240;
const backendUrl = process.env.REACT_APP_ENV_BACKEND_URL;
const imageUrl = backendUrl + '/uploads/';
const DEFAULT_QUESTION_TYPE = 'MULTIPLE_CHOICE';
const QUESTION_TYPES = {
    FREE_TEXT: 'free_text',
    MULTIPLE_CHOICE: "multiple_choice"
};

export {drawerWidth, backendUrl, imageUrl, DEFAULT_QUESTION_TYPE, QUESTION_TYPES};
