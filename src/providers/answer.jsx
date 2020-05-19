import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";

const AnswerProvider = {
    saveAnswer: async function (answer) {
        return await axios.post(`${backendUrl}/api/answer`, {answer}, {headers: AuthService.authHeader()})
    },
    deleteAnswer: async function (answerId) {
        return await axios.delete(`${backendUrl}/api/answer/${answerId}`, {headers: AuthService.authHeader()})
    },
};

export default AnswerProvider