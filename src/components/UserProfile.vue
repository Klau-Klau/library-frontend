<!-- UserProfile.vue -->
<template>
  <NavbarComponent />
  <div class="user-profile">
    <div class="profile-header">
      <h1>Profil Użytkownika</h1>
    </div>
    <div class="user-info" v-if="user">
      <ul>
        <li><strong>Imię:</strong> {{ user.name }}</li>
        <li><strong>Nazwisko:</strong> {{ user.surname }}</li>
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li><strong>Rola:</strong> {{ user.role }}</li>
      </ul>
      <router-link v-if="isCurrentUser" :to="{ name: 'EditUser', params: { userId: user.id }}" class="edit-button">Edytuj profil</router-link>
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
      user: null,
      isCurrentUser: false
    }
  },
  created () {
    this.fetchUserProfile()
  },
  methods: {
    fetchUserProfile () {
      const userId = this.$route.params.userId
      axios.get(`/api/user_profile/${userId}`)
        .then(response => {
          this.user = response.data
          this.checkIfCurrentUser()
        })
        .catch(error => {
          console.error('Error fetching user profile:', error)
          // Obsługa błędów
        })
    },

    checkIfCurrentUser () {
      const currentUserId = this.$store.state.user.id // stan użytkownika jest przechowywany w Vuex store
      this.isCurrentUser = this.user.id === currentUserId
    }

  }
}
</script>
<style scoped>
.profile-header {
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px; /* Odległość od kontenera z informacjami użytkownika */
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}

/* Styl dla głównego kontenera informacji użytkownika */
.user-info {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 0 auto 20px; /* Centrowanie i margines dolny */
  border: 4px solid #0e4928;
  font-size: 18px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.edit-button {
  display: inline-block;
  padding: 7px 12px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none; /* Brak podkreślenia */
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
  border: 2px solid #0e4928;
  transition: background-color 0.3s; /* Dodanie efektu przejścia */
  font-size: 15px;
  cursor: pointer;
  text-align: center; /* Wyśrodkowanie tekstu */
  margin-top: 15px; /* Dodatkowy margines górny */
}

.edit-button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
