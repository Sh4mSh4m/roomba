import axios from 'axios'

const apiClient = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getChanges() {
        return apiClient.get('/changes')
    },
    getChange(id) {
        return apiClient.get('/changes/' + id)
      }
}