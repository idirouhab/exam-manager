import userProvider from "../providers/user";
import AuthService from "../services/auth";

const ROOT_ROLE = "ROOT";

class Auth {
    constructor() {
        this.authenticated = false;
        this.username = false;
        this.userId = false;
    }

    login(username, password) {
        return userProvider.fetchUser(username, password).then(res => {
            if (res.status === 200) {
                const {tokens} = res.data;
                AuthService.setToken(tokens.token);
                AuthService.setRefreshToken(tokens.refreshToken);
            }
        });
    }

    logout() {
        this.authenticated = false;
        AuthService.removeToken();
        AuthService.removeRefreshToken();
    }

    getId() {
        return AuthService.getUserId();
    }

    getUsername() {
        return AuthService.getFullName();
    }

    isRoot() {
        return AuthService.getRole() === ROOT_ROLE;
    }

    isAuthenticated() {
        if (AuthService.isTokenStored()) {
            this.authenticated = true;
        }
        return this.authenticated;
    }
}

export default new Auth();