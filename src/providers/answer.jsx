import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";

const AnswerProvider = {

    getUser: async function (data) {
        return await axios.get(`${backendUrl}/api/user`,{headers: AuthService.authHeader() }).then((res) => {
                return res.data;
            }
        )
    },

};


export default AnswerProvider