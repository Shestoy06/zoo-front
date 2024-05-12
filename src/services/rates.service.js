import axios from "axios";

class RatesService {
    URL = 'http://127.0.0.1:8000/api/rates'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }

    async put(rate) {
        return axios.put(`${this.URL}/${rate.id}`, {
            id: rate.id,
            pseudo: rate.pseudo,
            message: rate.message,
            status: rate.status
        }).then(res => res.data)
    }

    async post(rate) {
        return axios.post(`${this.URL}`, {
            pseudo: rate.pseudo,
            message: rate.message,
            status: "Waiting"
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new RatesService()