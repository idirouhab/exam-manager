import jwtDecode from 'jwt-decode';

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
    },
    getRole: function () {
        let role = '';
        if (this.isTokenStored()) {
            const decode = jwtDecode(localStorage.getItem('token'));
            if (decode['user']) {
                role = decode['user']['role'];
            }
        }

        return role;
    }
};

export default AuthService
