import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";

const SessionProvider = {
    save: async function (currentPath) {
        return await axios.post(`${backendUrl}/api/session`, {currentPath}, {headers: AuthService.authHeader()})
    },
    fetchAll: async function () {
        return await axios.get(`${backendUrl}/api/session`, {headers: AuthService.authHeader()})
            .then(res => {
                return res.data;
            });
    },
};

export default SessionProvider