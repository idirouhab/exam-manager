import axios from "../services/axios";
import { backendUrl, imageBackendUrl } from "../variables/general";

const ImageProvider = {
  saveImage: async function (image) {
    const formData = new FormData();
    formData.append("image", image);
    return await axios.post(`${imageBackendUrl}/api/image`, formData);
  },
  deleteImage: async function (imageId) {
    return await axios.delete(`${imageBackendUrl}/api/image/${imageId}`);
  },
  fetchImages: async function () {
    return await axios.get(`${backendUrl}/api/image`)
      .then(res => {
        return res.data;
      });
  },
};

export default ImageProvider;
