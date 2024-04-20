import axios from 'axios'

axios.interceptors.response.use(
  response => {
    // Obsługa pomyślnych odpowiedzi
    return response
  },
  error => {
    if (error.response) {
      console.error('Błąd odpowiedzi z serwera:', error.response)
    } else {
      console.error('Błąd sieci lub inny błąd:', error)
    }
    return Promise.reject(error)
  }
)

export default axios
