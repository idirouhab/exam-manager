import axios from "../services/axios";
import { backendUrl } from "../variables/general";

const UserProvider = {
  saveUser: async function (user) {
    return await axios.post(`${backendUrl}/login`, user);
  },
  updateUser: async function (userId, user) {
    return axios.put(`${backendUrl}/api/user/${userId}`, user);
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
    return await axios.delete(`${backendUrl}/api/user/${userId}`);
  },
  fetchUsers: async function () {
    return await axios.get(`${backendUrl}/api/user`)
      .then(res => {
        return res.data;
      });
  },
};

export default UserProvider;