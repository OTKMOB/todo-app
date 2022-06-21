import axios from "axios";

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get("http://localhost:8080/hello-world/");
    }

    executeHelloWorldBeanService() {
        return axios.get("http://localhost:8080/hello-world-bean/");
    }

    executeHelloWorldPathVariableService(name) {
        let username = 'otkmob';
        let password = '12345';
        let basicAuthHeader = 'Basic ' + window.btoa(`${username}:${password}`)
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '**',
                authorization: basicAuthHeader
            }
        });
    }
}

export default new HelloWorldService();