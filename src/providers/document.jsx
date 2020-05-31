import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";

const DocumentProvider = {
    fetchDocuments: async function (documentName) {
        return await axios.get(`${backendUrl}/api/document/${documentName}`, {headers: AuthService.authHeader()})
            .then(res => {
                return res.data;
            });
    },
    fetchDocument: async function (documentName, documentId) {
        return await axios.get(`${backendUrl}/api/document/${documentName}/${documentId}`, {headers: AuthService.authHeader()})
            .then(res => {
                return res.data;
            });
    },
};

export default DocumentProvider
