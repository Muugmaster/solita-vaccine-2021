import axios from 'axios'

const API_URL = 'http://localhost:4000/api/orders'

const getArrivedBeforeDate = async (date) => {
  const response = await axios.get(`${API_URL}?arrivedBefore=${date}`)
  return response.data
}

export default { getArrivedBeforeDate }
