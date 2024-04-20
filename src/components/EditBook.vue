<template>
  <NavbarComponent />
  <div class="edit-book-container">
    <h1 class="edit-header">Edytuj książkę</h1>
    <div class="search-form">
      <label>Wyszukaj książkę po ISBN:</label>
      <input v-model="searchIsbn" type="text">
      <button @click="searchBook" class="search-button">Wyszukaj</button>
    </div>
    <form v-if="bookFound" @submit.prevent="updateBook">
      <!-- Pola formularza -->
      <div class="form-group">
        <label>ISBN:</label>
        <input v-model="bookData.isbn" type="text" required>
      </div>
      <div class="form-group">
        <label>Tytuł:</label>
        <input v-model="bookData.title" type="text" required>
      </div>
      <div class="form-group">
        <label>Autor:</label>
        <input v-model="bookData.author" type="text" required>
      </div>
      <div class="form-group">
        <label>Gatunek:</label>
        <input v-model="bookData.genre" type="text" required>
      </div>
      <div class="form-group">
    <label>Opis:</label>
    <textarea v-model="bookData.description" class="description-textarea"></textarea>
  </div>
      <div class="form-group">
        <label>Rok publikacji:</label>
        <input v-model.number="bookData.publication_year" type="number" required>
      </div>
      <button type="submit" class="edit-button">Aktualizuj książkę</button>
    </form>
    <ul>
      <h2 v-if="bookData.copies && bookData.copies.length > 0">Egzemplarze:</h2>
      <li v-for="copy in bookData.copies" :key="copy.id">
        ID: {{ copy.id }}, Status: {{ copy.status }}
        <button
          v-if="copy.status === 'dostępna'"
          @click="deleteCopy(copy.id)"
          class="delete-button"
        >
          Usuń
        </button>
      </li>
    </ul>
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
      searchIsbn: '',
      bookFound: false,
      bookData: {
        book_id: null,
        isbn: '',
        title: '',
        author: '',
        genre: '',
        description: '',
        publication_year: null
      }
    }
  },
  methods: {
    searchBook () {
      axios.get(`/api/edit_book?isbn=${this.searchIsbn}`)
        .then(response => {
          this.bookData = response.data
          this.bookFound = true
        })
        .catch(error => {
          console.error('Error searching book:', error)
          this.bookFound = false
          alert('Książka nie została znaleziona.')
        })
    },
    updateBook () {
      axios.post('/api/edit_book', this.bookData)
        .then(response => {
          alert(response.data.message)
        })
        .catch(error => {
          console.error('Error updating book:', error)
          if (error.response && error.response.data) {
            alert(error.response.data.message)
          } else {
            alert('Wystąpił błąd podczas aktualizacji książki.')
          }
        })
    },
    deleteCopy (copyId) {
      axios.delete('/api/edit_book', { data: { copy_id: copyId } })
        .then(response => {
          alert(response.data.message)
          this.searchBook() // Ponowne wyszukiwanie książki, aby odświeżyć listę egzemplarzy
        })
        .catch(error => {
          console.error('Error deleting book copy:', error)
          if (error.response && error.response.data) {
            alert(error.response.data.message)
          } else {
            alert('Wystąpił błąd podczas usuwania egzemplarza książki.')
          }
        })
    }
  }
}
</script>
<style scoped>
.edit-book-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 4px auto;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 16px;
}

.edit-book-container .form-group {
  margin-bottom: 15px;
}
.edit-book-container .form-group .description-textarea {
    margin: 0 auto; /* Wyśrodkowanie pola tekstowego w poziomie */
    display: block;
    width: 90%; /* Szerokość pola tekstowego */
    height: 150px; /* Wysokość pola tekstowego */
    padding: 4px;
    border-radius: 10px;
    border: 2px solid #0e4928;
    font-size: 17px;
    resize: vertical; /* Umożliwienie zmiany rozmiaru w pionie */
  }
.edit-book-container input[type="text"],
.edit-book-container input[type="number"],
.edit-book-container textarea {
  padding: 4px;
  border-radius: 10px;
  border: 2px solid #0e4928;
  font-size: 17px;
  margin-left: 10px;
}

.edit-header {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
  text-align: center;
}

.edit-button {
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
  width: 100%;
}

.edit-button:hover {
  background-color: #7bce7d;
}
.search-button {
    display: inline-block;
    padding: 6px 10px;
    background-color: #4CAF50;
    color: white;
    border-radius: 8px; /* Zaokrąglenie rogów */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Cień */
    border: 2px solid #0e4928; /* Obramowanie */
    transition: background-color 0.3s; /* Animacja */
    font-size: 14px;
    cursor: pointer; /* Kursor */
    margin-top: 10px; /* Margines */
    margin-bottom: 10px;
    margin-left: 5px;
  }

  .search-button:hover {
    background-color: #7bce7d; /* Kolor przy najechaniu */
  }
  .description-textarea {
    height: 150px;
    width: 100%;
    padding: 4px;
    border-radius: 10px; /* Zaokrąglenie krawędzi */
    border: 2px solid #0e4928; /* Styl obramowania */
    font-size: 17px;
    resize: vertical;
  }
  .delete-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 12px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
}
.delete-button:hover {
  background-color: #ff8787;
}
</style>
