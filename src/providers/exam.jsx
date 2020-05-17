import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";


const ExamProvider = {
    fetchExams: async function () {
        return await axios.get(`${backendUrl}/api/exam`, {headers: AuthService.authHeader()})
            .then(res => {
                return res.data;
            });
    },
    saveExam: async function (exam) {
        return await axios.post(`${backendUrl}/api/exam`, {
                exam,
                headers: AuthService.authHeader()
            }
        )
    },
    deleteExam: async function (examId) {
        return await axios.delete(`${backendUrl}/api/exam/${examId}`, {headers: AuthService.authHeader()})
    },
    fetchExam: async function (examId) {
        return await axios.get(`${backendUrl}/api/exam/${examId}`, {headers: AuthService.authHeader()}).then((res) => {
                return res.data;
            }
        )
    },
};


export default ExamProvider