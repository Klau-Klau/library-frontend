<template>
  <NavbarComponent />
  <div class="search-user-and-books">
    <h1>Książki gotowe do odbioru i do zwrotu</h1>
    <div v-if="message" :class="`alert alert-${status}`">{{ message }}</div>
    <form @submit.prevent="searchBooksForUser" class="search-form">
      <div>
        <label for="email"><strong>Adres email użytkownika:</strong></label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <button type="submit">Szukaj</button>
    </form>

    <div v-if="booksReadyForPickup.length > 0">
      <h2>Książki gotowe do odbioru:</h2>
      <ul>
        <li v-for="book in booksReadyForPickup" :key="book.id">
          {{ book.title }} autorstwa {{ book.author }} - {{ book.status }}
          <button @click="loanBook(book.id)">Wypożycz</button>
        </li>
      </ul>
    </div>

    <div v-if="loanedBooks.length > 0">
      <h2>Wypożyczone książki:</h2>
      <ul>
        <li v-for="book in loanedBooks" :key="book.id">
          {{ book.title }} autorstwa {{ book.author }} - {{ book.status }}
          <button @click="returnBook(book.id)">Zwrot</button>
        </li>
      </ul>
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
      email: '',
      booksReadyForPickup: [],
      loanedBooks: [],
      message: '',
      status: ''
    }
  },
  methods: {
    returnBook (copyId) {
      axios.post(`/api/return_book/${copyId}`)
        .then(response => {
          this.message = response.data.message || 'Książka została zwrócona.'
          this.status = 'success'
          this.searchBooksForUser() // odśwież listę książek
        })
        .catch(error => {
          this.status = 'error'
          if (error.response && error.response.data) {
            this.message = error.response.data.message
          } else {
            this.message = 'Wystąpił błąd podczas zwrotu książki.'
          }
        })
    },
    searchBooksForUser () {
      axios.get('/api/mark_as_loan', { params: { email: this.email } })
        .then(response => {
          this.status = 'success'
          this.booksReadyForPickup = response.data.books.filter(book => book.status === 'do odbioru')
          this.loanedBooks = response.data.books.filter(book => book.loaned)
          if (this.booksReadyForPickup.length === 0 && this.loanedBooks.length === 0) {
            this.message = 'Brak książek gotowych do odbioru lub wypożyczonych dla tego użytkownika.'
          } else {
            this.message = ''
          }
        })
        .catch(error => {
          this.status = 'error'
          this.books = []
          if (error.response && error.response.data) {
            this.message = error.response.data.message
          } else {
            this.message = 'Wystąpił błąd podczas wyszukiwania książek.'
          }
        })
    },
    loanBook (copyId) {
      axios.post('/api/mark_as_loan', { copy_id: copyId })
        .then(response => {
          this.message = 'Książka została wypożyczona.'
          this.status = 'success'
          this.searchBooksForUser()
        })
        .catch(error => {
          this.status = 'error'
          if (error.response && error.response.data) {
            this.message = error.response.data.message
          } else {
            this.message = 'Wystąpił błąd podczas wypożyczania książki.'
          }
        })
    }
  }
}
</script>

<style>
.search-user-and-books {
  background-color: rgba(255, 255, 255, 0.49); /* Lekko przeźroczyste tło */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 900px; /* Maksymalna szerokość kontenera */
  margin: 80px auto 0; /* Centrowanie i margines górny */
  border: 4px solid #0e4928;
  text-align: left; /* Wyrównanie do lewej */
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.search-user-and-books h1{
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
  text-align: center; /* Wyśrodkowanie nagłówków */
}

.search-user-and-books label {
  font-size: 17px;
}

.search-user-and-books input[type="email"] {
  margin-top: 10px;
  border-radius: 10px; /* Zaokrąglenie pól formularza */
  padding: 4px;
  border: 2px solid #0e4928;
  font-size: 17px;
}

.search-user-and-books button {
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
  margin-top: 15px; /* Dodatkowy margines górny */
}

.search-user-and-books button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}

.alert-success {
  color: green;
}

.alert-error {
  color: red;
}
</style>
