import axios from "axios";
import { backendUrl } from "../variables/general";
import AuthService from "../services/auth";

const UserProvider = {
  saveUser: async function (user) {
    return await axios.post(`${backendUrl}/login`, { user });
  },
  fetchUser: async function (username, password) {
    return axios.get(`${backendUrl}/login`, {
      params: {
        username: username,
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