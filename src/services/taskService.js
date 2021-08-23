import axios from 'axios'

const baseUrl = "http://127.0.0.1:3000";

export const taskService = {

    getAll() {
        return axios.get(baseUrl + "/tareas");
        
    },
    deleteTask(id) {
        return axios.delete(baseUrl + "/tareas/${id}");
        /* axios.delete(`http://localhost:3000/tareas/${id}`); */
    },
}