<template>
  <NavbarComponent />
  <div class="user-list-page">
    <div class="user-list-container">
      <h1>Lista użytkowników</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <router-link :to="`/edit-user/${user.id}`">{{ user.name }} {{ user.surname }}</router-link>
          - <a href="mailto:{{ user.email }}">{{ user.email }}</a>
          <span v-if="user.role">({{ user.role }})</span>
        </li>
      </ul>
    </div>
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
      users: []
    }
  },
  created () {
    this.fetchAllUsers()
  },
  methods: {
    fetchAllUsers () {
      axios.get('/api/users')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.error('Błąd podczas pobierania listy użytkowników:', error)
        })
    }
  }
}
</script>

<style scoped>
.user-list-page {
  height: 100vh; /* Wysokość strony */
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-list-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 800px; /* Maksymalna szerokość kontenera */
  margin: 0 auto; /* Centrowanie */
  border: 4px solid #0e4928;
}
h1 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}
li {
  font-size: 18px;
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
