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
      if (decode["user"]) {
        role = decode["user"]["role"];
      }
    }

    return role;
  },

  getUserId: function () {
    let id = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(CookiesProvider.get("token"));
      if (decode["user"]) {
        id = decode["user"]["id"];
      }
    }

    return id;
  },

  getFullName: function () {
    let fullName = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(CookiesProvider.get("token"));
      if (decode["user"]) {
        fullName = decode["user"]["name"] + " " + decode["user"]["lastName"];
      }
    }

    return fullName;
  },
  isExpired: function () {
    let expired = true;
    if (this.isTokenStored()) {
      const decode = jwtDecode(CookiesProvider.get("token"));
      if (decode["exp"]) {
        expired = decode["exp"] < new Date().getTime() / 1000;
      }
    }
    return expired;
  },
  setToken: function (token) {
    CookiesProvider.save("token", token);
  },
  removeUser: function () {
    CookiesProvider.delete("token");
  },
};

export default AuthService;
