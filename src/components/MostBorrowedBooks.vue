<template>
  <NavbarComponent />
  <div class="report-container">
    <h1 class="report-header">Najczęściej Wypożyczane Książki</h1>
    <div class="report-table">
      <table>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>Liczba Wypożyczeń</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.title">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.loan_count }}</td>
          </tr>
        </tbody>
      </table>
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
      books: []
    }
  },
  mounted () {
    this.fetchMostBorrowedBooks()
  },
  methods: {
    fetchMostBorrowedBooks () {
      this.$axios.get('/api/reports/most_borrowed_books')
        .then(response => {
          this.books = response.data
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error)
        })
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
}

.report-header {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
  text-align: center;
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
