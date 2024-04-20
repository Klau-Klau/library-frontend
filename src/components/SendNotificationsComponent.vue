<template>
  <NavbarComponent />
  <div class="notification-container">
    <h1>Wyślij Powiadomienie</h1>
    <form @submit.prevent="sendNotification" class="notification-form">
      <div class="form-group">
        <label for="user"><strong>Użytkownik:</strong></label>
        <select id="user" v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }} {{ user.surname }} ({{ user.email }})
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="content"><strong>Treść:</strong></label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <button type="submit" class="send-button">Wyślij</button>
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
      users: [],
      selectedUser: '',
      content: ''
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    fetchUsers () {
      axios.get('/api/users')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.error('Error fetching users:', error)
        })
    },
    sendNotification () {
      const data = {
        user_id: this.selectedUser,
        content: this.content
      }
      axios.post('/api/send_notification', data)
        .then(response => {
          alert(response.data.message)
        })
        .catch(error => {
          console.error('Error sending notification:', error)
        })
    }
  }
}
</script>

<style scoped>
.notification-container {
  margin-top: 100px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 0 auto;
  border: 4px solid #0e4928;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

h1 {
  color: #0e4928;
  text-shadow: 1px 1px 1px #000;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 17px;
  margin-bottom: 5px;
}

.form-group select, .form-group textarea {
  width: 100%;
  border-radius: 10px;
  padding: 4px;
  border: 2px solid #0e4928;
  font-size: 17px;
}

.send-button {
  display: inline-block;
  padding: 7px 12px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 2px solid #0e4928;
  transition: background-color 0.3s;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
}

.send-button:hover {
  background-color: #7bce7d;
}
</style>
