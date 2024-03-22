import axios from "axios";
import moment from "moment/moment";

class HabitatService {
    URL = 'http://127.0.0.1:8000/api/habitat'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }

    async put(body) {
        const {habitat} = body
        return axios.put(`${this.URL}/${habitat.id}`, {
            id: habitat.id,
            name: habitat.name,
            comment: habitat.comment
        }).then(res => res.data)
    }

    async post(body) {
        const {habitat} = body
        return axios.post(`${this.URL}`, {
            id: habitat.id,
            name: habitat.name,
            comment: habitat.comment
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new HabitatService()