import axios from "../services/axios";
import { backendUrl } from "../variables/general";

const DocumentProvider = {
  fetchDocuments: async function (documentName) {
    return await axios.get(`${backendUrl}/api/document/${documentName}`)
      .then(res => {
        return res.data;
      });
  },
  fetchDocument: async function (documentName, documentId) {
    return await axios.get(`${backendUrl}/api/document/${documentName}/${documentId}`)
      .then(res => {
        return res.data;
      });
  },
  updateDocument: async function (documentName, documentId, document) {
    return await axios.put(`${backendUrl}/api/document/${documentName}/${documentId}`, document)
      .then(res => {
        return res.data;
      });
  }
};

export default DocumentProvider;
