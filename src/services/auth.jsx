const AuthService = {
    authHeader: function () {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            return {'x-access-token': token};
        } else {
            return {};
        }
    },
    isTokenStore: function () {
        return JSON.parse(localStorage.getItem('token'));
    }
};


export default AuthService