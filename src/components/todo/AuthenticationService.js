import axios from "axios";

class AuthenticationService {
    executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = this.createBasicAuthToken(username, password);
        return axios.get('http://localhost:8080/basicauth', {
            headers: {
                authorization: basicAuthHeader
            }
        })
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        })
    }
    
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username+':'+password);
    }

    createJWTToken(token) {
        sessionStorage.setItem('token', 'Bearer ' + token);
        return 'Bearer ' + token;
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser',username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) return '';
        return user;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService()