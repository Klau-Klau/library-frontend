<template>
   <NavbarComponent />
  <div class="add-book-container">
    <h1>Dodaj książkę</h1>
    <form @submit.prevent="addBook" enctype="multipart/form-data">
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
        <input v-model="bookData.description" type="text" required>
      </div>
      <div class="form-group">
        <label>Rok wydania:</label>
        <input v-model="bookData.publication_year" type="number" required>
      </div>
      <div class="form-group">
        <label>Liczba egzemplarzy:</label>
        <input v-model.number="bookData.quantity" type="number" min="1" required>
      </div>
      <div class="form-group">
        <label for="cover_image">Okładka książki:</label>
        <input type="file" id="cover_image" ref="coverImage" required>
      </div>
      <button type="submit" class="submit-button">Dodaj książkę</button>
    </form>
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
      bookData: {
        isbn: '',
        title: '',
        author: '',
        genre: '',
        description: '',
        publication_year: '',
        quantity: 1
      },
      message: ''
    }
  },
  methods: {
    addBook () {
      const formData = new FormData()

      // Dodanie danych książki do obiektu formData
      for (const key in this.bookData) {
        formData.append(key, this.bookData[key])
      }

      // Dodanie obrazu okładki do obiektu formData
      const coverImageFile = this.$refs.coverImage.files[0]
      formData.append('cover_image', coverImageFile)

      axios.post('/api/add_book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.message = response.data.message
          // Resetowanie formularza po pomyślnym dodaniu książki
          this.resetFormData()
          alert(this.message) // Wyświetlanie komunikatu o sukcesie
        })
        .catch(error => {
          console.error('Error adding book:', error)
          this.handleError(error)
        })
    },
    resetFormData () {
      this.bookData = {
        isbn: '',
        title: '',
        author: '',
        genre: '',
        description: '',
        publication_year: '',
        quantity: 1
      }
      this.$refs.coverImage.value = '' // Resetowanie pola pliku
    },
    handleError (error) {
      if (error.response && error.response.data) {
        // Wyświetlanie komunikatu błędu z serwera
        this.message = error.response.data.message
        alert(this.message)
      } else {
        alert('Wystąpił błąd podczas dodawania książki.')
      }
    }
  }
}
</script>
<style scoped>
.add-book-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 11px auto 0;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-align: left;
}

.add-book-container h1 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  margin-bottom: 1px;
  font-size: 16px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
  padding: 4px;
  border-radius: 10px;
  border: 2px solid #0e4928;
  font-size: 15px;
}

.submit-button {
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

.submit-button:hover {
  background-color: #7bce7d;
}
</style>
