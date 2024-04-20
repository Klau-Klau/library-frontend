<template>
  <div>
    <h1>Lista Książek</h1>
    <ul>
      <li v-for="book in books" :key="book.book_id">
        {{ book.title }} - {{ book.author }}
        <!-- Przycisk Dodaj do koszyka widoczny tylko dla dostępnych książek -->
        <button v-if="book.available && user && user.role === 'czytelnik'" @click="addToCart(book.book_id)">
          Dodaj do koszyka
    </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      books: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created () {
    this.fetchBooks()
  },
  methods: {
    fetchBooks () {
      axios.get('http://localhost:5000/api/search_books')
        .then(response => {
          console.log(response.data.books)
          this.books = response.data.books
        })
        .catch(error => {
          console.error('There was an error fetching the books:', error)
        })
    },
    addToCart (bookId) {
      console.log('Próba dodania do koszyka książki z ID:', bookId)
      axios.post('http://localhost:5000/api/add_to_cart', { book_id: bookId }, { withCredentials: true })
        .then(response => {
          if (response.data.success) {
            alert(response.data.message) // Wyświetlenie informacji dla użytkownika
          }
        })
        .catch(error => {
          console.error('Błąd podczas dodawania do koszyka:', error)
          alert('Wystąpił błąd podczas dodawania książki do koszyka.')
        })
    }
  }
}
</script>
