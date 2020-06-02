import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";

const EventProvider = {
    save: async function (data) {
        return await axios.post(`${backendUrl}/api/event`, data, {headers: AuthService.authHeader()})
    },
    delete: async function (data) {
        return await axios.delete(`${backendUrl}/api/event`, {
            headers: AuthService.authHeader(),
            data,
        })
    },
    fetchAll: async function () {
        return await axios.get(`${backendUrl}/api/event`, {headers: AuthService.authHeader()})
    },

};

export default EventProvider