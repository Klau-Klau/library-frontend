<template>
    <div>
      <h1 v-if="showTitle">Rekomendacje dla Ciebie</h1>
      <div v-if="loading">Ładowanie...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <ul v-if="recommendedBooks.length > 0">
        <li v-for="book in recommendedBooks" :key="book.book_id">
          <router-link :to="{ name: 'BookDetails', params: { id: book.book_id }}">
            {{ book.title }} - {{ book.author }} ({{ book.publication_year }})
          </router-link>
        </li>
      </ul>
      <div v-if="recommendedBooks.length === 0 && !loading">Nie znaleziono rekomendacji.</div>
    </div>
  </template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'RecommendationsComponent',
  data () {
    return {
      recommendedBooks: [],
      loading: false,
      error: ''
    }
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    fetchRecommendations () {
      this.loading = true
      this.error = ''
      this.recommendedBooks = []

      axios.get('/api/recommendations', { headers: { Authorization: `Bearer ${this.user.token}` } })
        .then(response => {
          this.recommendedBooks = response.data.recommended_books
        })
        .catch(error => {
          this.error = `Nie udało się pobrać rekomendacji: ${error.message}. Spróbuj ponownie później.`
        })

        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    if (this.user) {
      this.fetchRecommendations()
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}

/* Stylizacja tekstu rekomendacji */
div {
    font-size: 14.5px;
    font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
