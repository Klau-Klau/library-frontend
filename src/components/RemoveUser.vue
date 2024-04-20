<template>
    <NavbarComponent />
    <div class="user-list-container">
      <h1 class="user-list-header">Lista użytkowników</h1>
      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }} {{ user.surname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button v-if="canDeleteUser(user)" @click="deleteUser(user.id)" class="delete-user-button">Usuń użytkownika</button>
              </td>
            </tr>
          </tbody>
        </table>
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
    this.fetchUsers()
  },
  methods: {
    fetchUsers () {
      axios.get('/api/users-delete')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.error('Błąd podczas pobierania użytkowników:', error)
        })
    },
    canDeleteUser (user) {
      // Administratorzy i pracownicy mogą być zawsze usuwani
      if (user.role === 'administrator' || user.role === 'pracownik') {
        return true
      }
      // Czytelnicy mogą być usuwani tylko jeśli nie mają aktywnych wypożyczeń
      return user.role === 'czytelnik' && !user.has_active_loans
    },

    deleteUser (userId) {
      if (confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
        axios.delete(`/api/delete_user/${userId}`)
          .then(() => {
            alert('Użytkownik został usunięty.')
            this.fetchUsers() // Ponownie pobierz listę użytkowników
          })
          .catch(error => {
            console.error('Błąd podczas usuwania użytkownika:', error)
            alert('Nie można usunąć tego użytkownika.')
          })
      }
    }
  }
}
</script>

  <style scoped>
.user-list-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 700px;
  margin: 100px auto;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 17px;
  text-align: center;
}

.user-list-header {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
}

.user-table table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #0e4928;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #4CAF50;
  color: white;
}

.user-table tr:nth-child(odd) {
  background-color: #f2f2f2;
}
.delete-user-button {
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

.delete-user-button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
