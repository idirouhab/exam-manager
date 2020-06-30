import authAxios from "../services/axios";
import axios from "axios";

import { backendUrl } from "../variables/general";

const ExamProvider = {
  fetchExams: async function () {
    return await authAxios.get(`${backendUrl}/api/exam`)
      .then(res => {
        return res.data;
      });
  },
  saveExam: async function (exam) {
    return await authAxios.post(`${backendUrl}/api/exam`, exam);
  },
  updateExam: async function (exam) {
    if (exam.folderId === -1) {
      exam.folderId = null;
    }
    return authAxios.put(`${backendUrl}/api/exam/${exam.id}`, exam);
  },
  deleteExam: async function (examId) {
    return await authAxios.delete(`${backendUrl}/api/exam/${examId}`);
  },
  fetchExam: async function (examId) {
    return await axios.get(`${backendUrl}/api/exam/${examId}`).then((res) => {
        return res.data;
      }
    );
  },
};

export default ExamProvider;
