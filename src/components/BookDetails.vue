<template>
  <NavbarComponent />
  <div v-if="bookDetails" class="book-details">
    <div v-if="user && user.role === 'czytelnik'" class="buttons-container">
      <div v-if="bookDetails.available" class="button-background">
        <button @click="addToCart" class="borrow-button">
          Wypożycz książkę
        </button>
      </div>
      <div class="button-background">
        <button @click="goToReservationCart" class="reservation-cart-button">
          Przejdź do koszyka rezerwacji
        </button>
      </div>
    </div>

    <h2 class="book-title">{{ bookDetails.title }}</h2>

    <div class="book-info-container">
    <div class="book-cover">
      <img v-if="bookDetails.cover_image_url" :src="bookDetails.cover_image_url" alt="Okładka książki" />
    </div>
    <div class="book-info">
      <p><strong>Autor:</strong> {{ bookDetails.author }}</p>
      <p><strong>Gatunek:</strong> {{ bookDetails.genre }}</p>
      <p><strong>Rok wydania:</strong> {{ bookDetails.publication_year }}</p>
      <p><strong>Opis:</strong> {{ bookDetails.description }}</p>
    </div>
  </div>

    <div class="reviews-container">
      <button v-if="user && user.role === 'czytelnik'" @click="goToAddReview" class="add-review-button">
        Dodaj recenzję
      </button>
      <h3>Recenzje</h3>
        <ul>
          <li v-for="review in bookDetails.reviews" :key="review.date">
            <div class="review-rating">Ocena: {{ review.rating }}</div>
            <div class="review-text">{{ review.text }}</div>
            <div class="review-date">Data: {{ review.date }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="loading">
      Ładowanie szczegółów książki...
    </div>
  </template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import NavbarComponent from './NavbarComponent.vue'

export default {
  components: {
    NavbarComponent
  },
  data () {
    return {
      bookDetails: null
    }
  },
  computed: {
    ...mapState(['user']) // Użycie mapState, aby uzyskać dostęp do stanu użytkownika z Vuex
  },
  created () {
    this.fetchBookDetails()
  },
  methods: {
    goToAddReview () {
      this.$router.push({ name: 'ReviewComponent', params: { bookId: this.bookDetails.book_id } })
    },
    fetchBookDetails () {
      const bookId = this.$route.params.id
      axios.get(`/api/books/${bookId}`)
        .then(response => {
          this.bookDetails = response.data
        })
        .catch(error => {
          console.error('Error fetching book details:', error)
          this.$router.push('/')
        })
    },
    addToCart () {
      axios.post('http://localhost:5000/api/add_to_cart', { book_id: this.bookDetails.book_id }, { withCredentials: true })
        .then(response => {
          if (response.data.success) {
            // Obsługa sukcesu - książka została dodana do koszyka
            alert('Książka została dodana do koszyka.')
          }
        })
        .catch(error => {
          // Obsługa błędu - książka nie została dodana do koszyka
          console.error('Błąd podczas dodawania do koszyka:', error)
          alert('Wystąpił błąd podczas dodawania książki do koszyka.')
        })
    },
    goToReservationCart () {
      this.$router.push({ path: '/reservation-cart' })
    }
  }
}
</script>

<style scoped>
.book-details {
  padding: 30px;
  border-radius: 10px;
  margin-top: 100px;
  position: relative;
}
.book-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
  }
.book-title {
  margin-bottom: 20px;
  text-align: center;
  color: #0e4928;
  font-size: 34px;
  text-shadow: 2px 1px #000;
}

.book-cover-container {
  max-width: 340px;
  max-height: 340px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border: 3px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(50, 53, 51, 0.5);
}

.book-cover img {
    max-width: 340px;
    max-height: 340px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }

.review-rating, .review-text, .review-date {
  margin: 10px 0;
}

.loading {
  background-color: #004300;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.reviews-container {
  background-color: #f0f0f079;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(50, 53, 51, 0.3);
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 17px;
}

.buttons-container {
  position: absolute;
  top: 0;
  right: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.button-background {
  padding: 5px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border: 0.1px solid #cddbd2;
  margin-left: 10px;
}

.borrow-button, .reservation-cart-button, .add-review-button {
  border-radius: 15px;
  padding: 10px 15px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border: 2px solid #0e4928;
}

.add-review-button {
  display: block;
}
.book-info-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
</style>
