import axios from "../services/axios";
import { backendUrl } from "../variables/general";

const EventProvider = {
  save: async function (data) {
    return await axios.post(`${backendUrl}/api/event`, data);
  },
  delete: async function (data) {
    return await axios.delete(`${backendUrl}/api/event`, { data});
  },
  fetchAll: async function () {
    return await axios.get(`${backendUrl}/api/event`);
  },
};

export default EventProvider;
