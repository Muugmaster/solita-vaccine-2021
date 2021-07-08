import axios from 'axios'

const API_URL = 'http://localhost:4000/api/vaccinations'

const getExpiredByDate = async (date) => {
  const response = await axios.get(`${API_URL}/expired?date=${date}`)
  return response.data
}

export default { getExpiredByDate }
