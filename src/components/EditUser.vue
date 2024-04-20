<template>
  <NavbarComponent />
  <h1 class="edit-header">Edycja użytkownika</h1>
  <div class="edit-user-container">
    <div v-if="user">
      <form @submit.prevent="updateUser">
        <!-- Edycja imienia, nazwiska i emaila tylko dla administratora lub użytkownika edytującego siebie, który nie jest pracownikiem -->
        <div v-if="user.is_admin || (user.is_editing_self && !user.is_target_user_staff)">
          <div class="form-group">
            <label for="name"><strong>Imię:</strong></label>
            <input id="name" v-model="user.name" type="text">
          </div>
          <div class="form-group">
            <label for="surname"><strong>Nazwisko:</strong></label>
            <input id="surname" v-model="user.surname" type="text">
          </div>
          <div class="form-group">
            <label for="email"><strong>Email:</strong></label>
            <input id="email" v-model="user.email" type="email">
          </div>
        </div>

        <!-- Edycja powiadomień dostępna tylko dla czytelników -->
        <div v-if="user.role === 'czytelnik'" class="form-group">
          <label for="wants_notifications"><strong>Powiadomienia:</strong></label>
          <input id="wants_notifications" v-model="user.wants_notifications" type="checkbox">
        </div>

        <!-- Zmiana hasła dostępna dla wszystkich -->
        <div class="form-group">
          <label for="password"><strong>Nowe hasło:</strong></label>
          <input id="password" v-model="password" type="password">
        </div>
        <div class="form-group">
          <label for="confirm_password"><strong>Potwierdź hasło:</strong></label>
          <input id="confirm_password" v-model="confirmPassword" type="password">
        </div>

        <button type="submit" class="edit-button">Zapisz zmiany</button>
      </form>
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
      password: '',
      confirmPassword: ''
    }
  },
  created () {
    this.fetchUserData()
  },
  methods: {
    fetchUserData () {
      const userId = this.$route.params.userId
      axios.get(`/api/edit_user/${userId}`)
        .then(response => {
          this.user = response.data
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych użytkownika:', error)
        })
    },
    updateUser () {
      if (this.user.is_editing_self || this.user.is_admin) {
        if (this.password !== this.confirmPassword) {
          alert('Hasła nie są identyczne')
          return
        }
      }

      const userId = this.$route.params.userId
      const updateData = {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        wants_notifications: this.user.wants_notifications,
        password: this.password
      }

      axios.post(`/api/edit_user/${userId}`, updateData)
        .then(response => {
          alert(response.data.message)
        })
        .catch(error => {
          console.error('Błąd podczas aktualizacji danych użytkownika:', error)
        })
    }
  }
}
</script>
<style scoped>
.edit-user-container label {
  font-size: 17px;
}
.edit-user-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 20px auto;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 17px;
}
.edit-header {
  margin-top: 100px;
  text-align: center;
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}
.edit-user-container .form-group {
  margin-bottom: 8px;
}
.edit-user-container input[type="text"],
.edit-user-container input[type="email"],
.edit-user-container input[type="password"] {
  margin-left: 10px; /* margines z lewej strony dla pól tekstowych */
  border-radius: 5px; /* zaokrąglenie do pól formularza */
  padding: 4px;
  border: 2px solid #0e4928;
}
.edit-user-container input[type="checkbox"] {
  margin-left: 5px;
}
.edit-button {
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

.edit-button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
