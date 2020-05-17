import userProvider from "../providers/user";
import AuthService from "../services/auth";

class Auth {
    constructor() {
        this.authenticated = false;
        this.userName = false;
        this.userId = false;
    }

    login(username, password) {
        return userProvider.fetchUser(username, password).then(res => {
            if (res.status === 200) {
                this.userName = res.data.user.username;
                this.userId = res.data.user.id;
                this.authenticated = true;
                localStorage.setItem("token", JSON.stringify(res.data.token));
            }
        });

    }

    logout() {
        this.authenticated = false;
        localStorage.removeItem("token");
    }

    getId() {
        return this.userId;
    }

    getUserName() {
        return this.userName;
    }

    isAuthenticated() {

        return this.authenticated;
    }
}

export default new Auth();