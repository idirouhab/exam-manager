import axios from "../services/axios";
import { backendUrl } from "../variables/general";

const ExamProvider = {
  fetchExams: async function () {
    return await axios.get(`${backendUrl}/api/exam`)
      .then(res => {
        return res.data;
      });
  },
  saveExam: async function (exam) {
    return await axios.post(`${backendUrl}/api/exam`, exam);
  },
  updateExam: async function (exam) {
    if (exam.folderId === -1) {
      exam.folderId = null;
    }
    return await axios.put(`${backendUrl}/api/exam/${exam.id}`, exam);
  },
  deleteExam: async function (examId) {
    return await axios.delete(`${backendUrl}/api/exam/${examId}`);
  },
  fetchExam: async function (examId) {
    return await axios.get(`${backendUrl}/api/exam/${examId}`).then((res) => {
        return res.data;
      }
    );
  },
};

export default ExamProvider;
