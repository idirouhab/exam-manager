import axios from "axios";
import {imageBackendUrl} from "../variables/general";
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
};

export default ImageProvider;
