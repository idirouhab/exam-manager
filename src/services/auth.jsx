const AuthService = {
    authHeader: function () {
        const token = localStorage.getItem('token');
        if (token) {
            return {'x-access-token': token};
        } else {
            return {};
        }
    },
    isTokenStored: function () {
        return localStorage.getItem('token');
    }
};


export default AuthService