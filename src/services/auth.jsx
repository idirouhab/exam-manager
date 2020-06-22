import jwtDecode from "jwt-decode";
import CookiesProvider from "../providers/cookies";

const AuthService = {
  authHeader: function () {
    const token = CookiesProvider.get("token");
    if (token) {
      return { "x-access-token": token };
    } else {
      return {};
    }
  },
  isTokenStored: function () {
    return CookiesProvider.get("token") || false;
  },
  getRole: function () {
    let role = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(CookiesProvider.get("token"));
      if (decode) {
        role = decode["role"];
      }
    }

    return role;
  },

  getUserId: function () {
    let id = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(CookiesProvider.get("token"));
      if (decode) {
        id = decode["id"];
      }
    }

    return id;
  },

  getFullName: function () {
    let fullName = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(CookiesProvider.get("token"));
      if (decode) {
        fullName = decode["name"] + " " + decode["lastName"];
      }
    }

    return fullName;
  },
  setToken: function (token) {
    CookiesProvider.save("token", token);
  },
  setRefreshToken: function (token) {
    CookiesProvider.save("refreshToken", token);
  },
  removeToken: function () {
    CookiesProvider.delete("token");
  },
  removeRefreshToken: function () {
    CookiesProvider.delete("refreshToken");
  },
  getToken: function () {
    return CookiesProvider.get("token");
  },
};

export default AuthService;
