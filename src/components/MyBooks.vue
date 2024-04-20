<template>
   <NavbarComponent />
  <div class="my-books-page">
    <div class="my-books-container">
      <h1>Moje Zarezerwowane Książki</h1>
      <ul>
        <li v-for="book in reservedBooks" :key="book.reservation_id">
          {{ book.title }} - {{ book.author }}
        </li>
      </ul>

      <h1>Moje Wypożyczone Książki</h1>
      <ul>
        <li v-for="book in loanedBooks" :key="book.loan_id">
          {{ book.title }} - {{ book.author }}
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
      reservedBooks: [],
      loanedBooks: []
    }
  },
  created () {
    this.fetchBooks()
  },
  methods: {
    fetchBooks () {
      axios.get('/api/my_books')
        .then(response => {
          this.reservedBooks = response.data.reserved_books
          this.loanedBooks = response.data.loaned_books
        })
        .catch(error => {
          console.error('Error fetching books:', error)
        })
    }
  }
}
</script>

<style scoped>
.my-books-page {
  height: 100vh; /* Wysokość strony */
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-books-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 800px; /* Maksymalna szerokość kontenera */
  margin: 0 auto; /* Centrowanie */
  border: 4px solid #0e4928;
}
h1 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}
li {
  font-size: 18px;
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
