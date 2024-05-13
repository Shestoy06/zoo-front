import axios from "axios";

class ServicesService {
    URL = 'https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/services'

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