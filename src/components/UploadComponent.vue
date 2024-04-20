<template>
    <NavbarComponent />
    <div class="upload-container">
      <h2>Prześlij Media</h2>
      <form @submit.prevent="uploadFile">
        <label for="media-type">Typ mediów:</label>
        <select id="media-type" v-model="mediaType">
          <option value="ebook">E-book</option>
          <option value="audiobook">Audiobook</option>
        </select>

        <!-- Pola tekstowe dla tytułu, autora, roku wydania i gatunku -->
        <input type="text" placeholder="Tytuł" v-model="title" />
        <input type="text" placeholder="Autor" v-model="author" />
        <input type="number" placeholder="Rok wydania" v-model="publishYear" />
        <input type="text" placeholder="Gatunek" v-model="genre" />

        <textarea placeholder="Opis" v-model="description"></textarea>

        <label for="media-file">Plik mediów:</label>
        <input id="media-file" type="file" @change="handleFileUpload('file', $event)" />

        <label for="cover-image">Obraz okładki:</label>
        <input id="cover-image" type="file" @change="handleFileUpload('cover_image', $event)" />

        <button type="submit">Prześlij</button>
      </form>
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
      mediaFile: null,
      coverImage: null,
      mediaType: 'ebook', // Domyślnie ustawiony na 'ebook'
      title: '',
      author: '',
      publishYear: '',
      genre: '',
      description: ''
    }
  },
  methods: {
    handleFileUpload (type, event) {
      if (type === 'file') {
        this.mediaFile = event.target.files[0]
      } else if (type === 'cover_image') {
        this.coverImage = event.target.files[0]
      }
    },
    async uploadFile () {
      const formData = new FormData()
      formData.append('file', this.mediaFile)
      formData.append('cover_image', this.coverImage)
      formData.append('media_type', this.mediaType)
      formData.append('title', this.title)
      formData.append('author', this.author)
      formData.append('publish_year', this.publishYear)
      formData.append('genre', this.genre)
      formData.append('description', this.description)

      try {
        const response = await this.$axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response.data.message)
        // Obsługa po udanym przesłaniu
      } catch (error) {
        console.error('Błąd podczas przesyłania pliku:', error)
        // Obsługa błędu
      }
    }
  }
}
</script>
<style scoped>
.upload-container {
  background-color: rgba(255, 255, 255, 0.49); /* Lekko przeźroczyste tło */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 700px; /* Maksymalna szerokość kontenera */
  margin: 60px auto 0; /* Centrowanie i margines górny */
  border: 4px solid #0e4928;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh; /* Minimalna wysokość kontenera */
  text-align: center; /* Wyśrodkowanie tekstu */
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.upload-container h2 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}

.upload-container label {
  font-size: 17px;
  display: block; /* Etykiety w nowej linii */
  margin-top: 10px;
}

.upload-container input[type="text"],
.upload-container input[type="email"],
.upload-container input[type="number"],
.upload-container input[type="file"],
.upload-container textarea,
.upload-container select {
  margin-top: 10px;
  border-radius: 10px; /* Zaokrąglenie pól formularza */
  padding: 4px;
  border: 2px solid #0e4928;
  font-size: 17px;
  width: 100%; /* Szerokość dopasowana do kontenera */
}

.upload-container button {
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
  width: 100%; /* Szerokość dopasowana do kontenera */
}

.upload-container button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
