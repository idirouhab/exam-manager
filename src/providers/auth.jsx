import userProvider from "../providers/user";
import AuthService from "../services/auth";

const ROOT_ROLE = "ROOT";

class Auth {
  constructor () {
    this.authenticated = false;
    this.email = false;
    this.userId = false;
  }

  login (email, password) {
    return userProvider.fetchUser(email, password).then(res => {
      if (res.status === 200 && !res.data.user.isBlocked) {
        this.email = res.data.user.email;
        this.userId = res.data.user.id;
        this.authenticated = true;
        localStorage.setItem("token", res.data.token);
      }
    });

  }

  logout () {
    this.authenticated = false;
    localStorage.removeItem("token");
  }

  getId () {
    return AuthService.getUserId();
  }

  getEmail () {
    return AuthService.getFullName();
  }

  isRoot () {
    return AuthService.getRole() === ROOT_ROLE;
  }

  isAuthenticated () {
    if (AuthService.isExpired()) {
      this.logout();
    }

    if (AuthService.isTokenStored()) {
      this.authenticated = true;
    }
    return this.authenticated;
  }
}

export default new Auth();