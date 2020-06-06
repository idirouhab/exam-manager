import axios from "axios";
import { backendUrl } from "../variables/general";
import AuthService from "../services/auth";

const FolderProvider = {
    saveFolder: async function (folder) {
        return await axios.post(`${backendUrl}/api/folder`, {folder}, {headers: AuthService.authHeader()})
    },
    fetchFolder: async function (folderId) {
        return await axios.get(`${backendUrl}/api/folder/${folderId}`, {headers: AuthService.authHeader()})
    },
    fetchFolders: async function () {
        return await axios.get(`${backendUrl}/api/folder`, {headers: AuthService.authHeader()})
    },
    deleteFolder: async function (folderId) {
        return await axios.delete(`${backendUrl}/api/folder/${folderId}`, {headers: AuthService.authHeader()})
    },
    updateFolder: async function (folder) {
        return await axios.put(`${backendUrl}/api/folder/${folder.id}`, {folder}, {headers: AuthService.authHeader()}
        )
    },
};

export default FolderProvider
