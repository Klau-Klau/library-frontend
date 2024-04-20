<template>
  <NavbarComponent />
  <div class="report-container">
    <h1 class="report-header">Statystyki Wypożyczeń</h1>
    <div class="report-table">
      <table>
        <thead>
          <tr>
            <th>Tytuł Książki</th>
            <th>Liczba Wypożyczeń</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stat in loanStatistics" :key="stat.title">
            <td>{{ stat.title }}</td>
            <td>{{ stat.loan_count }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="loanStatistics.length === 0">
        Brak danych do wyświetlenia.
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
      loanStatistics: []
    }
  },
  mounted () {
    this.fetchLoanStatistics()
  },
  methods: {
    fetchLoanStatistics () {
      this.$axios.get('/api/reports/loan_statistics')
        .then(response => {
          this.loanStatistics = response.data.loan_statistics
        })
        .catch(error => {
          console.error('Błąd podczas pobierania statystyk wypożyczeń:', error)
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
  margin: 10px auto;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 16px;
  text-align: center;
}

.report-header {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
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
