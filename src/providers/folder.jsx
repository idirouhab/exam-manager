import axios from "../services/axios";
import { backendUrl } from "../variables/general";

const FolderProvider = {
  saveFolder: async function (folder) {
    return await axios.post(`${backendUrl}/api/folder`, { folder });
  },
  fetchFolder: async function (folderId) {
    return await axios.get(`${backendUrl}/api/folder/${folderId}`);
  },
  fetchFolders: async function () {
    return await axios.get(`${backendUrl}/api/folder`);
  },
  deleteFolder: async function (folderId) {
    return await axios.delete(`${backendUrl}/api/folder/${folderId}`);
  },
  updateFolder: async function (folder) {
    return await axios.put(`${backendUrl}/api/folder/${folder.id}`, { folder });
  },
};

export default FolderProvider;
