import axios from "axios";
import moment from "moment/moment";

class ReviewService {
    URL = 'http://127.0.0.1:8000/api/review'

    async get() {
        return axios.get(this.URL).then(res => {
            return res.data.map(data => ({
                ...data,
                animal: data.animal.name,
                date: new Date(data.date)
            }))
        })
    }

    async put(body) {
        const {review, animalId} = body
        return axios.put(`${this.URL}/${review.id}`, {
            id: review.id,
            review: review.review,
            date: moment.utc(review.date).format('YYYY-MM-DDTHH:mm'),
            animalId: animalId
        }).then(res => res.data)
    }

    async post(body) {
        const {review, animalId} = body
        return axios.post(`${this.URL}`, {
            review: review.review,
            date: moment.utc(review.date).format('YYYY-MM-DDTHH:mm'),
            animalId: animalId
        }).then(res => res.data)
    }

    async delete(id) {
        return axios.delete(`${this.URL}/${id}`).then(res => res.data)
    }
}

export default new ReviewService()