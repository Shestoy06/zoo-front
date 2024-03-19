import axios from "axios";

class ServicesService {
    URL = 'http://127.0.0.1:8000/api/services'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }

    async put(service) {
        return axios.put(`${this.URL}/${service.id}`, {
            id: service.id,
            name: service.name,
            description: service.description,
        }).then(res => res.data)
    }

    async post(service) {
        return axios.post(`${this.URL}`, {
            id: service.id,
            name: service.name,
            description: service.description,
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new ServicesService()