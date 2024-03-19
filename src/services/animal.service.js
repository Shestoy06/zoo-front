import axios from "axios";

class AnimalService {
    URL = 'http://127.0.0.1:8000/api/animal'
    async getAll() {
        return axios.get(this.URL).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }

    async getAnimalImage(animalId) {
        return axios.get(`${this.URL}/${animalId}/image`).then(res => res.data)
    }

    async deleteAnimalImage(animalId, imageId) {
        return axios.delete(`${this.URL}/${animalId}/image/${imageId}`).then(res => res.data)
    }

    async postAnimalImage(animalId, animalImage) {
        return axios.post(`${this.URL}/${animalId}/image`, {
            animalImages: animalImage
        }).then(res => res.data)
    }

    async put(animal) {
        return axios.put(`${this.URL}/${animal.id}`, {
            id: animal.id,
            name: animal.name,
            species: animal.species,
            animalHabitat: animal.animalHabitat,
            vet_review: animal.vetReview,
            food_type: animal.foodType,
            food_quantity: animal.foodQuantity,
            last_review: animal.lastReview,
            details: animal.details,
            animalImages: []
        }).then(res => res.data)
    }

    async post(animal) {
        return axios.post(`${this.URL}`, {
            name: animal.name,
            species: animal.species,
            animalHabitat: animal.animalHabitat,
            vet_review: animal.vetReview,
            food_type: animal.foodType,
            food_quantity: animal.foodQuantity,
            last_review: animal.lastReview,
            details: animal.details,
            animalImages: animal.animalImages
        }).then(res => res.data)
    }
}

export default new AnimalService()