import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";


const DocumentProvider = {
    fetchDocument: async function (documentName) {
        return await axios.get(`${backendUrl}/api/document/${documentName}`, {headers: AuthService.authHeader()})
            .then(res => {
                return res.data;
            });
    },
};


export default DocumentProvider
