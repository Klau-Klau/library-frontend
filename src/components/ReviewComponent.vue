<template>
    <div>
      <h1>Dodaj recenzję książki</h1>
      <form @submit.prevent="addReview">
        <div>
          <label>Treść recenzji:</label>
          <textarea v-model="reviewData.text" required></textarea>
        </div>
        <div>
          <label>Ocena:</label>
          <select v-model.number="reviewData.rating" required>
            <option disabled value="">Wybierz ocenę</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <button type="submit">Dodaj recenzję</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      reviewData: {
        book_id: this.$route.params.bookId, // Ustawienie ID książki
        text: '',
        rating: null
      },
      message: ''
    }
  },
  methods: {
    addReview () {
      axios.post('/api/add_review', this.reviewData)
        .then(response => {
          this.message = response.data.message
          // Resetowanie formularza po pomyślnym dodaniu recenzji
          this.reviewData = {
            book_id: null,
            text: '',
            rating: null
          }
          alert(this.message) // komunikat o sukcesie
        })
        .catch(error => {
          console.error('Error adding review:', error)
          if (error.response && error.response.data) {
            // Wyświetlanie komunikatu błędu z serwera
            this.message = error.response.data.message
            alert(this.message)
          } else {
            alert('Wystąpił błąd podczas dodawania recenzji.')
          }
        })
    }
  }
}
</script>
