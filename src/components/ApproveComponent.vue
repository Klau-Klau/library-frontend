<template>
  <NavbarComponent />
  <div class="review-approval-container">
    <h1>Zatwierdzanie recenzji</h1>
    <ul v-if="reviews.length">
      <li v-for="review in reviews" :key="review.id">
        <p>Recenzja od użytkownika ID: {{ review.user_id }}</p>
        <p>Tekst: {{ review.text }}</p>
        <p>Ocena: {{ review.rating }}</p>
        <button @click="manageReview(review.id, 'zatwierdzona')" class="approve-button">Zatwierdź</button>
        <button @click="manageReview(review.id, 'odrzucona')" class="reject-button">Odrzuć</button>
      </li>
    </ul>
    <p v-else>Brak recenzji do wyświetlenia</p>
  </div>
</template>

<script>
import axios from 'axios'

import NavbarComponent from './NavbarComponent.vue'
export default {
  components: {
    NavbarComponent
  },
  data () {
    return {
      reviews: []
    }
  },
  created () {
    this.fetchPendingReviews()
  },
  methods: {
    fetchPendingReviews () {
      axios.get('/api/pending_reviews')
        .then(response => {
          this.reviews = response.data
        })
        .catch(error => {
          console.error('Error fetching reviews:', error)
        })
    },
    manageReview (reviewId, decision) {
      axios.post(`/api/approve_review/${reviewId}`, { decision })
        .then(() => {
          alert(`Recenzja została ${decision}.`)
          this.fetchPendingReviews() // Ponowne pobieranie recenzji po decyzji
        })
        .catch(error => {
          console.error('Error managing review:', error)
          alert('Wystąpił błąd podczas zarządzania recenzją')
        })
    }
  }
}
</script>
<style scoped>
.review-approval-container {
  margin-top: 100px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 0 auto;
  border: 4px solid #0e4928;
  font-size: 18px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-align: left;
}

.approve-button, .reject-button {
  display: inline-block;
  padding: 7px 12px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 2px solid #0e4928;
  transition: background-color 0.3s;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
}

.reject-button {
  background-color: #F44336;
}

.approve-button:hover {
  background-color: #7bce7d;
}

.reject-button:hover {
  background-color: #ff6659;
}

h1 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
}
</style>
