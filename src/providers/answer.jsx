import axios from "axios";
import {backendUrl} from "../variables/general";

const AnswerProvider = {
    saveAnswer: async function (answer) {
        return await axios.post(`${backendUrl}/api/answer`, {answer})
    },
};

export default AnswerProvider