<template>
    <NavbarComponent />
    <div class="register-container">
      <h1>Dodaj Pracownika</h1>
      <div v-if="messages.length">
        <div v-for="message in messages" :key="message" class="alert">
          {{ message }}
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name"><strong>Imię:</strong></label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="surname"><strong>Nazwisko:</strong></label>
          <input type="text" id="surname" v-model="surname" required>
        </div>
        <div class="form-group">
          <label for="email"><strong>Email:</strong></label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password"><strong>Hasło:</strong></label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Dodaj Pracownika</button>
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
      name: '',
      surname: '',
      email: '',
      password: '',
      messages: []
    }
  },
  methods: {
    async submitForm () {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordPattern.test(this.password)) {
        this.messages = ['Hasło musi składać się z minimum 8 znaków, zawierać małe i duże litery, cyfry oraz znaki specjalne (@, $, !, %, *, ?, &).']
        return
      }
      if (!/^[A-Z][a-z]{1,}$/.test(this.name) || !/^[A-Z][a-z]{1,}$/.test(this.surname)) {
        this.messages = ['Imię i nazwisko muszą zaczynać się z wielkiej litery i zawierać przynajmniej 2 litery.']
        return
      }

      try {
        const response = await this.$axios.post('/api/add_employee', {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password
        })
        if (response.data.success) {
          // Resetowanie pól formularza
          this.name = ''
          this.surname = ''
          this.email = ''
          this.password = ''
          this.messages = ['Pracownik został pomyślnie dodany. Możesz dodać kolejnego.']
        } else {
          this.messages = [response.data.error]
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.messages = [error.response.data.error]
        } else {
          this.messages = ['Wystąpił błąd podczas próby dodawania pracownika.']
        }
      }
    }
  }
}
</script>

  <style scoped>
  .register-container {
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

  .register-container h1 {
    color: #0e4928;
    text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
  }

  .register-container label {
    font-size: 17px;
  }

  .register-container input[type="text"],
  .register-container input[type="email"],
  .register-container input[type="password"] {
    margin-left: 10px; /* Dodanie marginesu z lewej strony dla pól tekstowych */
    border-radius: 10px; /* Dodanie delikatnych zaokrągleń do pól formularza */
    padding: 4px;
    border: 2px solid #0e4928;
    font-size: 17px;
    margin-top: 10px;
  }

  .register-container button {
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
    cursor: pointer; /* Dodanie kursora*/
    text-align: center; /* Wyśrodkowanie tekstu */
    margin-top: 15px; /* Dodatkowy margines górny */
  }

  .register-container button:hover {
    background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
  }
  .form-group {
    display: flex;
    align-items: center; /* Wyrównanie elementów w pionie */
    margin-bottom: 15px; /* Odstęp między grupami formularza */
  }

  .form-group label {
    width: 20%;
    text-align: right; /* Wyśrodkowanie tekstu do prawej */
    margin-right: 10px;
    font-size: 17px;
  }

  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="password"] {
    flex-grow: 1;
    margin-left: 10px;
    border-radius: 10px;
    padding: 4px;
    border: 2px solid #0e4928;
    font-size: 17px;
  }
  </style>
