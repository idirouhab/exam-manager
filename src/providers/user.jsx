import axios from "axios";
import { backendUrl } from "../variables/general";
import AuthService from "../services/auth";

const UserProvider = {
  saveUser: async function (user) {
    return await axios.post(`${backendUrl}/login`, { user });
  },
  updateUser: async function (userId, user) {
    return axios.put(`${backendUrl}/api/user/${userId}`, { user }, { headers: AuthService.authHeader() });
  },
  fetchUser: async function (email, password) {
    return axios.get(`${backendUrl}/login`, {
      params: {
        email: email,
        password: password
      }
    });
  },
  deleteUser: async function (userId) {
    return await axios.delete(`${backendUrl}/api/user/${userId}`, { headers: AuthService.authHeader() });
  },
  fetchUsers: async function () {
    return await axios.get(`${backendUrl}/api/user`, { headers: AuthService.authHeader() })
      .then(res => {
        return res.data;
      });
  },
};

export default UserProvider;