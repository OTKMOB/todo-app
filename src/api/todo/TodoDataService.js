import axios from "axios";
//const API_URL = 'http://localhost:8080'
const API_JPA_URL = 'http://localhost:8080/jpa'

class TodoDataService {
    retriveAllTodos(name) {
        return axios.get(`${API_JPA_URL}/users/${name}/todos`)
    }
    
    deleteTodo(name, id) {
        return axios.delete(`${API_JPA_URL}/users/${name}/todos/${id}`)
    }

    retriveTodo(name, id) {
        return axios.get(`${API_JPA_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`${API_JPA_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`${API_JPA_URL}/users/${name}/todos/`, todo)
    }
}

export default new TodoDataService()