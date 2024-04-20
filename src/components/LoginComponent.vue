<template>
  <NavbarComponent />
  <div class="login-container">
    <h1>Logowanie</h1>
    <div v-if="messages.length">
      <div v-for="(message, index) in messages" :key="index" class="alert">
        {{ message }}
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email"><strong>Email:</strong></label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password"><strong>Hasło:</strong></label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Zaloguj</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavbarComponent from './NavbarComponent.vue'
export default {
  components: {
    NavbarComponent
  },
  data () {
    return {
      email: '',
      password: '',
      messages: []
    }
  },
  computed: {
    // mapState, aby uzyskać dostęp do stanu użytkownika z Vuex
    ...mapState(['user'])
  },
  created () {
    console.log('Sprawdzanie zalogowanego użytkownika w LoginComponent:', this.$store.state.user)
    if (this.$store.state.user) {
      this.$router.push({ path: '/' }) // Przekierowanie na stronę główną
    }
  },
  methods: {
    async submitForm () {
      try {
        const response = await this.$axios.post('/api/login', {
          email: this.email,
          password: this.password
        })
        if (response.data.success) {
          this.$store.commit('setUser', response.data.user_info) // Aktualizacja stanu użytkownika w Vuex
          this.$router.push({ path: '/', query: { login: 'success' } })
        } else {
          this.messages.push('Nieprawidłowy email lub hasło.')
        }
      } catch (error) {
        console.error('Wystąpił błąd podczas logowania:', error)
        this.messages.push('Wystąpił błąd podczas próby logowania.')
      }
    }
  }
}
</script>
<style scoped>
.login-container {
  background-color: rgba(255, 255, 255, 0.49); /* Lekko przeźroczyste tło */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 800px; /* Maksymalna szerokość kontenera */
  margin: 0 auto; /* Centrowanie */
  border: 4px solid #0e4928;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh; /* Minimalna wysokość kontenera */
  text-align: center; /* Wyśrodkowanie tekstu */
  margin-top: 150px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.login-container h1 {
  color: #0e4928; /* Ciemnozielony kolor */
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}

.login-container label {
  font-size: 17px;
}

.login-container input[type="email"],
.login-container input[type="password"] {
  margin-left: 10px; /*  margines z lewej strony dla pól tekstowych */
  border-radius: 10px; /* delikatne zaokrąglenie do pól formularza */
  padding: 4px;
  border: 2px solid #0e4928;
  font-size: 17px;
  margin-top: 10px;
}

.login-container button {
  display: inline-block;
  padding: 6px 10px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none; /* Brak podkreślenia */
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
  border: 2px solid #0e4928;
  transition: background-color 0.3s; /* Dodanie efektu przejścia */
  font-size: 14px;
  cursor: pointer;
  text-align: center; /* Wyśrodkowanie tekstu */
  margin-top: 15px; /* Dodatkowy margines górny */
}

.login-container button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
