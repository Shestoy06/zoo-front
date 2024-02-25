import axios from "axios";

class AnimalService {
    URL = 'http://127.0.0.1:8000/api/animal'
    async getAll() {
        return axios.get(this.URL).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }

    async getAnimalImage(animalId, imageId) {
        return axios.get(`${this.URL}/${animalId}/image/${imageId}`, {
            responseType: 'arraybuffer',
        }).then(
            res => {
                // image URL: string
                return URL.createObjectURL(
                    new Blob([res.data], {type: 'image/jpeg'})
                )
            }
        )
    }
}

export default new AnimalService()