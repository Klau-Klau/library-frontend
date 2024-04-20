<template>
  <div class="search-results-container" v-if="searchResults.length > 0">
    <!-- Przycisk 'x' do zamykania listy wyników -->
    <button class="close-button" @click="closeSearchResults">x</button>

    <ul>
      <li v-for="book in searchResults" :key="book.id">
        <!-- Dodanie router-link do tytułu książki -->
        <router-link :to="{ name: 'BookDetails', params: { id: book.book_id }}">
  {{ book.title }}
</router-link>
        - {{ book.author }}
      </li>
    </ul>
  </div>
  <div class="search">
    <input v-model="searchQuery" class="search-input" placeholder="Odkryj swoją następną przygodę...">
    <button @click="searchBooks">Szukaj</button>
  </div>
    <div class="filters">
      <h2 class="filters-header">FILTRY</h2> <!-- Dodanie nagłówka Filtry -->
      <h3 class="genre-header">GATUNKI</h3>
      <ul>
    <li v-for="genre in genres" :key="genre">
      <input type="checkbox" :id="genre" v-model="selectedGenres[genre]" @change="updateSearchResults">
      <label :for="genre">{{ genre }}</label>
    </li>
  </ul>
  <h3 class="year-header">ROK WYDANIA</h3>
    <ul>
      <li v-for="yearRange in yearRanges" :key="yearRange">
        <input type="checkbox" :id="yearRange" v-model="selectedYearRanges[yearRange]" @change="updateSearchResults">
        <label :for="yearRange">{{ yearRange }}</label>
      </li>
    </ul>

    <h3 class="availability-header">DOSTĘPNOŚĆ</h3>
    <ul>
      <li v-for="availability in availabilities" :key="availability">
        <input type="checkbox" :id="availability" v-model="selectedAvailabilities[availability]" @change="updateSearchResults">
        <label :for="availability">{{ availability }}</label>
      </li>
    </ul>

    <h3 class="ratings-header">OCENY</h3>
    <ul>
      <li v-for="rating in ratings" :key="rating.value">
        <input type="radio" :id="'rating' + rating.value" :value="rating.value" v-model="selectedRating" @change="updateSearchResults">
        <label :for="'rating' + rating.value">{{ rating.label }}</label>
      </li>
    </ul>

    <h3 class="sorting-header">SORTOWANIE</h3>
    <ul>
      <li v-for="sortOption in sorts" :key="sortOption.value">
        <input type="radio" :id="'sort' + sortOption.value" :value="sortOption.value" v-model="selectedSort" @change="updateSearchResults">
        <label :for="'sort' + sortOption.value">{{ sortOption.label }}</label>
      </li>
    </ul>
  </div>
  </template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      searchQuery: '',
      searchResults: [],
      genres: ['Wszystkie gatunki', 'Dystopia', 'Fantasy', 'Historia sztuki', 'Klasyczna', 'Literatura obyczajowa', 'Literatura piękna', 'Poradnik', 'Thriller'],
      yearRanges: ['Wszystkie lata', '1875-1900', '1900-1925', '1925-1950', '1950-1975', '1975-2000', '2000-2024'],
      availabilities: ['Wszystkie', 'Dostępne', 'Niedostępne'],
      ratings: [
        { label: 'Wszystkie', value: '' },
        { label: '1+', value: '1' },
        { label: '2+', value: '2' },
        { label: '3+', value: '3' },
        { label: '4+', value: '4' }
      ],
      selectedRating: '',
      sorts: [
        { label: 'Najnowsze', value: 'newest' },
        { label: 'Najstarsze', value: 'oldest' },
        { label: 'Najwyżej oceniane', value: 'highest_rating' },
        { label: 'Najniżej oceniane', value: 'lowest_rating' },
        { label: 'Najpopularniejsze', value: 'most_popular' },
        { label: 'Najmniej popularne', value: 'least_popular' },
        { label: 'Alfabetycznie A-Z', value: 'alphabetical_a_z' },
        { label: 'Alfabetycznie Z-A', value: 'alphabetical_z_a' }
      ],
      selectedSort: '',
      selectedGenres: {},
      selectedYearRanges: {},
      selectedAvailabilities: {}
    }
  },
  mounted () {
    this.initializeSelectedGenres()
    this.initializeSelectedYearRanges()
    this.initializeSelectedAvailabilities()
  },
  methods: {
    searchBooks () {
      // Przygotowanie wartości filtrów
      const genreKeys = this.selectedGenres ? Object.keys(this.selectedGenres).filter(key => this.selectedGenres[key] && key !== 'Wszystkie gatunki').join(',') : ''
      let yearRangeKeys = this.selectedYearRanges ? Object.keys(this.selectedYearRanges).filter(key => this.selectedYearRanges[key]).join(',') : ''
      if (this.selectedYearRanges['Wszystkie lata']) {
        yearRangeKeys = '' // Usunięcie ograniczenia lat, jeśli zaznaczono "Wszystkie lata"
      }
      const availabilityKeys = this.selectedAvailabilities ? Object.keys(this.selectedAvailabilities).filter(key => this.selectedAvailabilities[key]).join(',') : ''

      // Tworzenie parametrów zapytania
      const queryParams = new URLSearchParams({
        search: this.searchQuery || '',
        genre: genreKeys,
        year: yearRangeKeys,
        availability: availabilityKeys,
        rating: this.selectedRating || '',
        sort: this.selectedSort || 'newest'
      }).toString()

      // Wykonanie żądania do API
      axios.get(`http://localhost:5000/api/search_books?${queryParams}`)
        .then(response => {
          this.searchResults = response.data.books
        })
        .catch(error => {
          console.error('Wystąpił błąd podczas wyszukiwania wyników:', error)
        })
    },
    closeSearchResults () {
      this.searchResults = [] // Wyczyszczenie listy wyników
    },
    initializeSelectedAvailabilities () {
      const availabilityInit = {}
      this.availabilities.forEach(availability => {
        availabilityInit[availability] = true
      })
      this.selectedAvailabilities = availabilityInit
    },
    initializeSelectedYearRanges () {
      const yearRangesInit = {}
      this.yearRanges.forEach(yearRange => {
        yearRangesInit[yearRange] = true // Domyślnie wszystkie lata są zaznaczone
      })
      this.selectedYearRanges = yearRangesInit // Aktualizacja danych
    },
    initializeSelectedGenres () {
      this.genres.forEach(genre => {
        this.selectedGenres[genre] = true // Bezpośrednie przypisanie
      })
    },

    updateSearchResults () {
      if (this.selectedGenres['Wszystkie gatunki']) {
        this.selectAll('genres')
      }
      if (this.selectedYearRanges['Wszystkie lata']) {
        this.selectAll('yearRanges')
      }
      if (this.selectedAvailabilities.Wszystkie) {
        this.selectAll('availabilities')
      }
      this.searchBooks()
    },

    selectAll (type) {
      if (type === 'genres') {
        this.genres.forEach(genre => {
          this.selectedGenres[genre] = true
        })
      } else if (type === 'yearRanges') {
        this.yearRanges.forEach(yearRange => {
          this.selectedYearRanges[yearRange] = true
        })
      }
      if (type === 'availabilities') {
        this.availabilities.forEach(availability => {
          this.selectedAvailabilities[availability] = true
        })
      }
    }
  }
}
</script>
<style>

.search {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 2rem auto 0; /* Dodanie górnego marginesu i ustawienie marginesu dolnego na 0 */
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    top: -60px;
  }

  .search input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 20px 0 0 20px;
  }

  .search button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    border-radius: 0 20px 20px 0;
    border-left: 1px solid #ccc; /* Dopasowanie ramki do inputa */
    border: 1px solid #ccc;
  }
  .filters {
  position: absolute; /* Absolutne pozycjonowanie po lewej stronie */
  top: 0;
  left: 0;
  width: 200px; /* Szerokość kontenera filtrów */
  padding: 20px;
  box-sizing: border-box;
}
.genre-header, .year-header, .availability-header, .ratings-header, .sorting-header {
  color: white;
}

.filters label {
  color: white;
  text-shadow: 0px 0px 0px #000, 0.1px 1px 0.1px #000, 0.1px 0.1px 1px #000, 1px 0.1px 0.1px #000;
}
.filters ul {
  list-style: none;
  padding: 0;
  margin: 10px 0; /* Margines dla odstępu między listami */
}

.filters li {
  cursor: pointer; /* Kursor wskazujący, że elementy listy są klikalne */
  margin-bottom: 5px; /* Odstęp między elementami listy */
}
.search {
    display: flex; /* Włączenie Flexbox dla kontenera */
    justify-content: center; /* Wyśrodkowanie zawartości w poziomie */
    align-items: center; /* Wyśrodkowanie zawartości w pionie */
    height: 100vh;
  }
  .filters-header {
  font-size: 20px;
  font-weight: bold; /* Czcionka pogrubiona */
  margin-bottom: 15px; /* Odstęp od listy filtrów */
  color: #fefffe;
}
.search-results-container {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; /* Szerokość kontenera wyników */
  max-height: 60%; /* Maksymalna wysokość kontenera wyników */
  overflow-y: auto; /* Włączenie przewijania, jeśli zawartość przekracza maksymalną wysokość */
  background-color: rgba(255, 255, 255, 0.9); /* Białe, lekko przezroczyste tło */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Delikatny cień dla podkreślenia */
  border-radius: 10px; /* Zaokrąglenie rogów */
  z-index: 1000;
}

/* Styl dla elementów listy wewnątrz kontenera wyników */
.search-results-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results-container {
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-height: 60%;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
.genre-header {
  font-size: 15px;
  font-weight: bold; /* Czcionka pogrubiona */
  color: #c5ffc9;
  margin-top: 20px; /* Górny margines*/
  margin-bottom: 10px; /* Dolny margines dla odstępu od listy filtrów */
}
.year-header {
  font-size: 15px;
  font-weight: bold; /* Czcionka pogrubiona */
  color: #c5ffc9;
  margin-top: 20px;
  margin-bottom: 10px; /* Dolny margines dla odstępu od listy filtrów */
}

.availability-header {
  font-size: 15px;
  font-weight: bold; /* Czcionka pogrubiona */
  color: #c5ffc9;
  margin-top: 20px; /* Górny margines dla odstępu od poprzedzających elementów */
  margin-bottom: 10px; /* Dolny margines dla odstępu od listy filtrów */
}
/* Styl dla nagłówka OCENY */
.ratings-header {
  font-size: 15px;
  font-weight: bold; /* Czcionka pogrubiona */
  color: #c5ffc9;
  margin-top: 20px; /* Górny margines dla odstępu od poprzedzających elementów */
  margin-bottom: 10px; /* Dolny margines dla odstępu od listy filtrów */
}
/* Styl dla nagłówka SORTOWANIE */
.sorting-header {
  font-size: 15px;
  font-weight: bold; /* Czcionka pogrubiona */
  color: #a5e7a9;
  margin-top: 20px; /* Górny margines dla odstępu od poprzedzających elementów */
  margin-bottom: 10px; /* Dolny margines dla odstępu od listy filtrów */
}

</style>
