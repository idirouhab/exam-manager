import jwtDecode from "jwt-decode";

const AuthService = {
  authHeader: function () {
    const token = localStorage.getItem("token");
    if (token) {
      return { "x-access-token": token };
    } else {
      return {};
    }
  },
  isTokenStored: function () {
    return localStorage.getItem("token");
  },
  getRole: function () {
    let role = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(localStorage.getItem("token"));
      if (decode["user"]) {
        role = decode["user"]["role"];
      }
    }

    return role;
  },
  getFullName: function () {
    let fullName = "";
    if (this.isTokenStored()) {
      const decode = jwtDecode(localStorage.getItem("token"));
      if (decode["user"]) {
        fullName = decode["user"]["name"] + " " + decode["user"]["lastName"];
      }
    }

    return fullName;
  },
  isExpired: function () {
    let expired = true;
    if (this.isTokenStored()) {
      const decode = jwtDecode(localStorage.getItem("token"));
      if (decode["exp"]) {
        expired = decode["exp"] < new Date().getTime()/1000;
      }
    }
    return expired;
  }
};

export default AuthService;
