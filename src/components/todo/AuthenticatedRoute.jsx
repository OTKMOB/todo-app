import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'
import {Navigate} from 'react-router-dom'
import axios from 'axios';

class AuthenticatedRoute extends Component {
    constructor() {
        super();
        this.setupAxiosInterceptors = this.setupAxiosInterceptors.bind(this);
    }

    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            this.setupAxiosInterceptors();
            return {...this.props.children};
        }
        else {
            return <Navigate to="/login"/>;
        }
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = sessionStorage.getItem('token');
                return config;
            }
        )
    }
}

export default AuthenticatedRoute