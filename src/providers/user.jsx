import authAxios from "../services/axios";
import axios from "axios";
import {backendUrl} from "../variables/general";

const UserProvider = {
    saveUser: async function (user) {
        return await axios.post(`${backendUrl}/login`, user);
    },
    updateUser: async function (userId, user) {
        return authAxios.put(`${backendUrl}/api/user/${userId}`, {user});
    },
    forgetPassword: async function (username) {
        return axios.post(`${backendUrl}/api/user/forget-password/`, {username});
    },
    resetPassword: async function (username, password, token) {
        return axios.post(`${backendUrl}/api/user/reset-password`, {username, password, token})
    },
    fetchUser: async function (username, password) {
        return axios.get(`${backendUrl}/login`, {
            params: {
                username: username,
                password: password,

            }
        });
    },
    deleteUser: async function (userId) {
        return await authAxios.delete(`${backendUrl}/api/user/${userId}`);
    },
    fetchUsers: async function () {
        return await authAxios.get(`${backendUrl}/api/user`)
            .then(res => {
                return res.data;
            });
    },

};

export default UserProvider;