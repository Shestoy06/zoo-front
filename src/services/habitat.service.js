import axios from "axios";

class HabitatService {
    URL = 'http://127.0.0.1:8000/api/habitat'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }

}

export default new HabitatService()