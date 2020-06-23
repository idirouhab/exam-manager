import axios from "axios";
import { backendUrl } from "../variables/general";

const ConfirmationProvider = {
  get: async function (token) {
    return await axios.get(`${backendUrl}/login/confirmation/${token}`);
  },
};

export default ConfirmationProvider;