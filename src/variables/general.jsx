import i18n from "../i18n";
import m from "moment";
import "moment/min/locales";

const CHAT_URL = process.env.REACT_APP_ENV_CHAT_URL;
const drawerWidth = 240;
const backendUrl = process.env.REACT_APP_ENV_BACKEND_URL;
const imageBackendUrl = process.env.REACT_APP_ENV_IMAGE_BACKEND_URL;
const imageUrl = imageBackendUrl + "/api/image/";
const DEFAULT_QUESTION_TYPE = "MULTIPLE_CHOICE";
const QUESTION_TYPES = {
  //FREE_TEXT: 'free_text',
  MULTIPLE_CHOICE: "multiple_choice"
};
const LANGUAGE = i18n.language.split("-")[0];

m.locale(LANGUAGE);
const moment = m;

const humanFileSize = (size) => {
  if (size === 0) {
    return 0;
  }

  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};

const LANGUAGES_LABEL = [
  {
    code: "en",
    text: "English",
  },
  {
    code: "es",
    text: "Español",
  },
  {
    code: "ca",
    text: "Català",
  },
  {
    code: "gl",
    text: "Galego",
  },
];

export {
  drawerWidth,
  backendUrl,
  imageUrl,
  DEFAULT_QUESTION_TYPE,
  QUESTION_TYPES,
  LANGUAGE,
  imageBackendUrl,
  humanFileSize,
  moment,
  LANGUAGES_LABEL,
  CHAT_URL
};
