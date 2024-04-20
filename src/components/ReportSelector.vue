<template>
  <NavbarComponent />
  <div class="report-selector-container">
    <h1 class="report-header">Wybierz Raport</h1>
    <div class="button-group">
      <button @click="goToReport('/reports/most-borrowed')" class="report-button">Najczęściej Wypożyczane Książki</button>
      <button @click="goToReport('/reports/loan-statistic')" class="report-button">Statystyki Wypożyczeń</button>
      <button @click="goToReport('/reports/book-ratings')" class="report-button">Oceny Książek</button>
    </div>
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue'
export default {
  components: {
    NavbarComponent
  },
  methods: {
    goToReport (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.report-selector-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
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

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.report-button {
  display: inline-block;
  padding: 6px 10px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 2px solid #0e4928;
  transition: background-color 0.3s;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
  width: 80%;
}

.report-button:hover {
  background-color: #7bce7d;
}
</style>
