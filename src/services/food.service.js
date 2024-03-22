import axios from "axios";
import moment from "moment/moment";

class FoodService {
    URL = 'http://127.0.0.1:8000/api/food'

    async get() {
        return axios.get(this.URL).then(res => {
            return res.data.map(data => ({
                ...data,
                animal: data.animal.name,
                dateTime: new Date(data.dateTime)
            }))

        })
    }

    async put(body) {
        const {food, animalId} = body
        return axios.put(`${this.URL}/${food.id}`, {
            id: food.id,
            food_type: food.food_type,
            food_quantity: food.food_quantity,
            dateTime: moment.utc(food.dateTime).format('YYYY-MM-DDTHH:mm'),
            animalId: animalId
        }).then(res => res.data)
    }

    async post(body) {
        const {food, animalId} = body
        return axios.post(`${this.URL}/animal/${animalId}`, {
            id: food.id,
            food_type: food.food_type,
            food_quantity: food.food_quantity,
            dateTime: food.dateTime
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new FoodService()