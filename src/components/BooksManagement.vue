<template>
  <NavbarComponent />
  <div class="book-management-container">
    <h1>Zarezerwowane Książki</h1>
    <div v-if="message" :class="`alert alert-${status}`">{{ message }}</div>
    <button @click="fetchReservedBooks" class="refresh-button">Odśwież Listę</button>

    <ul v-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        "{{ book.title }}" autorstwa {{ book.author }} - {{ book.status }}
        <button @click="markAsReadyForPickup(book.id)" class="manage-button">Oznacz jako Gotową do Odbioru</button>
      </li>
    </ul>
    <div v-else>
      Brak zarezerwowanych książek.
    </div>
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
      books: [],
      message: '',
      status: ''
    }
  },
  created () {
    this.fetchReservedBooks()
  },
  methods: {
    fetchReservedBooks () {
      axios.get('/api/reserved_books')
        .then(response => {
          this.books = response.data
        })
        .catch(error => {
          this.message = error.response.data.error || 'Wystąpił błąd podczas pobierania książek.'
          this.status = 'error'
        })
    },
    markAsReadyForPickup (copyId) {
      axios.post(`/api/book_ready_for_pickup/${copyId}`)
        .then(response => {
          this.message = response.data.message || 'Status książki został zmieniony.'
          this.status = 'success'
          this.fetchReservedBooks() // Ponowne pobranie listy po zmianie statusu
        })
        .catch(error => {
          this.message = error.response.data.error || 'Wystąpił błąd podczas zmiany statusu książki.'
          this.status = 'error'
        })
    }
  }
}
</script>

<style scoped>
.book-management-container {
  background-color: rgba(255, 255, 255, 0.49); /* Lekko przeźroczyste tło */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 900px; /* Maksymalna szerokość kontenera */
  margin: 80px auto; /* Centrowanie i margines górny */
  border: 4px solid #0e4928;
  text-align: left; /* Wyrównanie tekstu do lewej */
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

h1 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
  text-align: center; /* Wyśrodkowanie nagłówka */
}

.refresh-button, .manage-button {
  display: inline-block;
  padding: 6px 10px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
  border: 2px solid #0e4928;
  transition: background-color 0.3s; /* Efekt przejścia */
  font-size: 14px;
  cursor: pointer; /* Kursor wskazujący na przycisk */
  margin-top: 10px; /* Dodatkowy margines górny */
}

.refresh-button:hover, .manage-button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}

.alert-success {
  color: green;
}

.alert-error {
  color: red;
}
</style>
