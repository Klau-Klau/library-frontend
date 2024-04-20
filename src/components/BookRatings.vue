<template>
  <NavbarComponent />
  <div class="report-container">
    <h1 class="report-header">Oceny Książek</h1>
    <div class="report-table">
      <div class="ratings-section">
        <h2>Najwyżej Oceniane Książki</h2>
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Średnia Ocena</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in topRatedBooks" :key="book.title">
              <td>{{ book.title }}</td>
              <td>{{ formatRating(book.average_rating) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="ratings-section">
        <h2>Najniżej Oceniane Książki</h2>
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Średnia Ocena</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in lowestRatedBooks" :key="book.title">
              <td>{{ book.title }}</td>
              <td>{{ formatRating(book.average_rating) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue'

export default {
  components: {
    NavbarComponent
  },
  data () {
    return {
      topRatedBooks: [],
      lowestRatedBooks: []
    }
  },
  mounted () {
    this.fetchBookRatings()
  },
  methods: {
    fetchBookRatings () {
      this.$axios.get('/api/reports/book_ratings')
        .then(response => {
          this.topRatedBooks = response.data.top_rated_books
          this.lowestRatedBooks = response.data.lowest_rated_books
        })
        .catch(error => {
          console.error('Błąd podczas pobierania ocen książek:', error)
        })
    },
    formatRating (rating) {
      return isNaN(parseFloat(rating)) ? 0 : parseFloat(rating).toFixed(2)
    }
  }
}
</script>

<style scoped>
.report-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 100px auto;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 17px;
  text-align: center;
}

.report-header {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
}

.ratings-section {
  margin-bottom: 20px;
}

.report-table table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th,
.report-table td {
  border: 1px solid #0e4928;
  padding: 8px;
  text-align: left;
}

.report-table th {
  background-color: #4CAF50;
  color: white;
}

.report-table tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>
