import axios from "axios";
import bcrypt from 'bcryptjs';

class ServicesService {
    URL = 'https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/user'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }

    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    };

    async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    };

    async checkUser(body) {
        const { username, password } = body;
        try {
            const res = await axios.post(`${this.URL}/find`, { username });
            if (res.data.error) {
                return {};
            }
            const isValidPassword = await this.verifyPassword(password, res.data.password);
            if (isValidPassword) {
                return res.data;
            } else {
                return {};
            }
        } catch (error) {
            console.error('Error checking user:', error);
            return {};
        }
    }

    async put(body) {
        const {id, username, role} = body
        return axios.put(`${this.URL}/${id}`, {
            id: id,
            username: username,
            role: role,
        }).then(res => res.data)
    }

    async post(body) {
        const {username, password, role} = body
        this.hashPassword(password).then((hashedPass) => {
            return axios.post(`${this.URL}`, {
                username: username,
                password: hashedPass,
                role: role,
            }).then(res => res.data)
        })
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new ServicesService()