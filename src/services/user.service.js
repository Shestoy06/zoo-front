import axios from "axios";

class ServicesService {
    URL = 'https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/user'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }

    async checkUser(body) {
        const {username, password} = body
        return axios.post(this.URL + '/find', {
            username: username,
            password: password
        }).then(res => res.data)
    }

    async put(body) {
        return axios.put(`${this.URL}/${body.id}`, {
            id: body.id,
            username: body.username,
            password: body.password,
            role: body.role,
        }).then(res => res.data)
    }

    async post(body) {
        return axios.post(`${this.URL}`, {
            username: body.username,
            password: body.password,
            role: body.role,
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new ServicesService()