import axios from "axios";

class RatesService {
    URL = 'https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/rates'

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