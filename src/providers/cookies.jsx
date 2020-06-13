import Cookies from "js-cookie";

const CookiesProvider = {
  save: function (key, value) {
    return Cookies.set(key, value, { sameSite: "strict" });
  },
  delete: function (key) {
    return Cookies.remove(key);
  },
  get: function (key) {
    return Cookies.get(key);
  },
};

export default CookiesProvider;
