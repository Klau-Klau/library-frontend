<template>
    <div>
      <h1>Recenzje książki</h1>
      <input v-model.number="bookId" type="number" placeholder="Wprowadź ID książki">
      <button @click="fetchReviews">Pokaż recenzje</button>

      <div v-if="reviews.length">
        <h2>Recenzje:</h2>
        <ul>
          <li v-for="review in reviews" :key="review.user_id">
            <p>Data: {{ review.date }}</p>
            <p>Tekst: {{ review.text }}</p>
            <p>Ocena: {{ review.rating }}</p>
            <p>Status: {{ review.status }}</p>
          </li>
        </ul>
      </div>
      <p v-else-if="message">{{ message }}</p>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      bookId: null,
      reviews: [],
      message: ''
    }
  },
  methods: {
    fetchReviews () {
      axios.get(`/api/get_reviews/${this.bookId}`)
        .then(response => {
          this.reviews = response.data
          this.message = ''
        })
        .catch(error => {
          console.error('Error fetching reviews:', error)
          this.reviews = []
          this.message = error.response && error.response.data ? error.response.data.error : 'Wystąpił błąd podczas pobierania recenzji.'
        })
    }
  }
}
</script>
