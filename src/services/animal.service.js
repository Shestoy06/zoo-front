import axios from "axios";
import moment from "moment";

class AnimalService {
    URL = 'http://127.0.0.1:8000/api/animal'
    NEST_URL = 'http://127.0.0.1:3001/api/animal'



    async getAll() {
        return axios.get(this.URL).then(res => {
            return res.data.map(data => ({
                ...data,
                animalHabitat: data.animalHabitat ? data.animalHabitat.name : "No habitat",
                last_review: data.last_review ? moment.utc(data.last_review).format('YYYY-MM-DD HH:mm') : "No reviews"
            }))
        })
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }

    async getAnimalImage(animalId) {
        return axios.get(`${this.URL}/${animalId}/image`).then(res => res.data)
    }
    async getAnimalImages() {
        return axios.get(`http://127.0.0.1:8000/api/image`).then(res => res.data)
    }

    async deleteAnimalImage(body) {
        const {id, imageId} = body
        return axios.delete(`${this.URL}/${id}/image/${imageId}`).then(res => res.data)
    }

    async postAnimalImage(body) {
        const {fileArray, id} = body
        return axios.post(`${this.URL}/${id}/image`, {
            file: fileArray[0].file,
            fileName: fileArray[0].fileName,
        }).then(res => res.data)
    }

    async put(body) {
        const {animal, habitat} = body
        return axios.patch(`${this.NEST_URL}/${animal.animalIdMongo}`, {
            name: animal.name,
        }).then(
            axios.put(`${this.URL}/${animal.id}`, {
                id: animal.id,
                name: animal.name,
                species: animal.species,
                animalHabitat: habitat,
                vet_review: animal.vet_review,
                details: animal.details,
            }).then(res => res.data)
        )

    }

    async post(body) {
        const {animal, habitat} = body
        return axios.post(`${this.NEST_URL}`, {
            name: animal.name,
            views: 0
        }).then(res => {
            const animalIdMongo = res.data._id
            axios.post(`${this.URL}`, {
                name: animal.name,
                species: animal.species,
                animalHabitat: habitat,
                vet_review: animal.vet_review,
                food_type: animal.foodType,
                food_quantity: animal.foodQuantity,
                last_review: moment.utc(animal.last_review).format('YYYY-MM-DDTHH:mm'),
                details: animal.details,
                animal_id_mongo: animalIdMongo,
                animalImages: animal.animalImages
            }).then(res => res.data)
        })
    }

    async incrementViews(body) {
        const {animalId} = body
        return axios.patch(`${this.NEST_URL}/${animalId}/increment-views`)
    }

    async getAnimalsFromNest() {
        return axios.get(this.NEST_URL).then(res => res.data)
    }
}

export default new AnimalService()