import axios from "axios";
import {backendUrl} from "../variables/general";


const UserProvider = {
    saveUser: async function (user) {
        return await axios.post(`${backendUrl}/api/login`, {user})
    },
    fetchUser: async function (username, password
    ){
        return axios.get(`${backendUrl}/login`, {
            params: {
                username: username,
                password: password
            }
        })
    }

};


export default UserProvider