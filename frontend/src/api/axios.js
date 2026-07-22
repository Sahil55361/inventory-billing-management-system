import axios from 'axios'

const API = axios.create({
  baseURL: 'https://inventory-billing-management-system-i62l.onrender.com/api',
})

export default API