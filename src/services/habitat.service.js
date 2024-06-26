import axios from "axios";
import moment from "moment/moment";

class HabitatService {
    URL = 'https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/habitat'

    async get() {
        return axios.get(this.URL).then(res => res.data)
    }
    async getWithPhotos() {
        return axios.get("https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/habitats-photos").then(res => res.data)
    }
    async getByName(name) {
        return axios.get(`https://desolate-tundra-35880-c76e6faf2a0f.herokuapp.com/api/animal/habitat/${name}`).then(res => res.data)
    }

    async put(habitat) {
        return axios.put(`${this.URL}/${habitat.id}`, {
            id: habitat.id,
            name: habitat.name,
            comment: habitat.comment,
            description: habitat.description,
        }).then(res => res.data)
    }

    async post(habitat) {
        return axios.post(`${this.URL}`, {
            name: habitat.name,
            comment: habitat.comment,
            description: habitat.description,
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }

    async getImage(habitatId) {
        return axios.get(`${this.URL}/${habitatId}/image`).then(res => res.data)
    }
    async postImage(body) {
        const {fileArray, id} = body
        return axios.post(`${this.URL}/${id}/image`, {
            file: fileArray[0].file,
            fileName: fileArray[0].fileName,
        }).then(res => res.data)
    }

    async deleteImage(body) {
        const {id, imageId} = body
        return axios.delete(`${this.URL}/${id}/image/${imageId}`).then(res => res.data)
    }
}

export default new HabitatService()