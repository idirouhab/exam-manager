import axios from "../services/axios";
import { backendUrl } from "../variables/general";

const AnswerProvider = {
  saveAnswer: async function (answer) {
    return await axios.post(`${backendUrl}/api/answer`, { answer });
  },
  deleteAnswer: async function (answerId) {
    return await axios.delete(`${backendUrl}/api/answer/${answerId}`);
  },
};

export default AnswerProvider;