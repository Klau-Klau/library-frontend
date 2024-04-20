<template>
  <NavbarComponent />
  <div class="media-container">
    <h1 class="media-title">Dostępne Media</h1>
    <div v-for="media in mediaList" :key="media.id" class="media-item">
      <div class="media-cover-container">
        <img v-if="media.image_url" :src="media.image_url" alt="Obraz mediów" class="media-cover" />
        <div class="download-background">
        <a :href="`/api/download/${extractFileName(media.file_url)}`" target="_blank" class="download-link">Pobierz</a>
      </div>
      </div>
      <div class="media-info">
        <h3>{{ media.title }} ({{ media.media_type.toUpperCase() }})</h3>
        <p><strong>Autor:</strong> {{ media.author }}</p>
        <p><strong>Rok wydania:</strong> {{ media.publish_year }}</p>
        <p><strong>Gatunek:</strong> {{ media.genre }}</p>
        <p><strong>Opis:</strong> {{ media.description }}</p>
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
      mediaList: []
    }
  },
  created () {
    this.fetchMedia()
  },
  methods: {
    async fetchMedia () {
      try {
        const response = await this.$axios.get('/api/get_media')
        this.mediaList = response.data
      } catch (error) {
        console.error('Błąd podczas pobierania mediów:', error)
      }
    },
    extractFileName (url) {
      // URL obrazu NIE zawiera tokena SAS
      return url.split('/').pop().split('?')[0]
    }
  }
}
</script>

<style>
.media-container {
  margin-top: 100px; /* Margines górny dla kontenera mediów */
}

.media-title {
  text-align: center; /* Wyśrodkowanie tekstu */
  color: #0e4928;
  text-shadow: 2px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
  font-size: 35px;
}

.media-item {
  display: flex; /* Ustawienie Flexbox dla każdego elementu mediów */
  align-items: center; /* Wyrównanie elementów w pionie */
  margin-bottom: 20px;
  padding: 20px;
  border: 3px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(50, 53, 51, 0.5);
}
.media-cover-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.media-cover {
  width: 250px;
  height: 350px;
  margin-right: 20px; /* Zwiększony margines, aby oddzielić obraz od tekstu */
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.media-content {
  display: flex; /* Ustawienie Flexbox dla zawartości mediów */
}

.media-info {
  display: flex;
  flex-direction: column; /* Ustawienie kolumny dla tekstu */
  padding: 10px;
  border: 2px solid #0e4928;
  border-radius: 10px;
  box-shadow: 0 0 0 2.5px #cccccc;
  background-color: rgba(255, 255, 255, 0.3);
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.media-info p:last-child {
  text-align: justify; /* Justowanie tekstu opisu */
}
.download-background {
  /* Stylizacja tła każdego przycisku */
  display: flex; /* Ustawienie Flexbox */
  justify-content: center; /* Wyśrodkowanie w poziomie */
  align-items: center; /* Wyśrodkowanie w pionie */
  padding: 5px;
  background-color: white;
  border-radius: 15px;
  margin-top: 10px; /* Dodanie marginesu górnego */
}

.download-link {
  display: inline-block;
  padding: 5px 15px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 15px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
  border: 2px solid #0e4928;
  transition: background-color 0.3s; /* Dodanie efektu przejścia */
  font-size: 16px;
}

.download-link:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
