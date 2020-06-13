import Cookies from "js-cookie";

const secure = (process.env.NODE_ENV === "production");

const CookiesProvider = {
  save: function (key, value) {
    return Cookies.set(key, value, { sameSite: "strict", secure: secure });
  },
  delete: function (key) {
    return Cookies.remove(key);
  },
  get: function (key) {
    return Cookies.get(key);
  },
};

export default CookiesProvider;
