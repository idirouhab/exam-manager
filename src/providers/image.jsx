import axios from "axios";
import {backendUrl} from "../variables/general";
import AuthService from "../services/auth";

const ImageProvider = {
    saveImage: async function (image) {
        const formData = new FormData();
        formData.append("image", image);
        return await axios.post(`${backendUrl}/api/image`, formData, {headers: AuthService.authHeader()})
    },
};

export default ImageProvider
