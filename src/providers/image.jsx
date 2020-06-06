import axios from "axios";
import { backendUrl, imageBackendUrl } from "../variables/general";
import AuthService from "../services/auth";

const ImageProvider = {
    saveImage: async function (image) {
        const formData = new FormData();
        formData.append("image", image);
        return await axios.post(`${imageBackendUrl}/api/image`, formData, {headers: AuthService.authHeader()})
    },
    deleteImage: async function (imageId) {
        return await axios.delete(`${imageBackendUrl}/api/image/${imageId}`, {headers: AuthService.authHeader()})
    },
    fetchImages: async function () {
        return await axios.get(`${backendUrl}/api/image`, {headers: AuthService.authHeader()})
            .then(res => {
                return res.data;
            });
    },
};

export default ImageProvider;
