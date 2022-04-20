import axios from 'axios'
const initData = axios.create({
    baseURL: 'http://127.0.0.1:9999/api',
})


export default initData