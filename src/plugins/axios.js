import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/vitaminaChallenge/public/api'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
axios.defaults.headers.common['Accept'] = 'application/json'

export default axios