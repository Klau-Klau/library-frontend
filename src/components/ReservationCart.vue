<template>
  <NavbarComponent />
  <div>
    <h1 class="reservation-header">Koszyk Rezerwacji</h1>
    <div class="reservation-container">
      <div v-if="cartItems.length > 0">
        <form @submit.prevent="submitReservation">
          <ul>
            <li v-for="item in cartItems" :key="item.book_id">
              {{ item.title }} - {{ item.author }}
              <input type="checkbox" v-model="selectedBooks" :value="item.book_id">
              <input type="number" v-model.number="item.quantity" min="1" class="quantity-input">
              <button @click="updateCartQuantity(item.book_copy_ids[0], item.quantity)" class="cart-button">Aktualizuj ilość</button>
<button @click="removeFromCart(item.book_id)" class="cart-button">Usuń z koszyka</button>
            </li>
          </ul>
          <div class="button-container">
    <div class="button-background">
      <button type="submit" class="submit-button">Rezerwuj zaznaczone</button>
    </div>
  </div>
        </form>
      </div>
      <div v-else>
        <p>Twój koszyk jest pusty.</p>
      </div>
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
      cartItems: [], // Dane książek w koszyku
      selectedBooks: [] // Zaznaczone książki do rezerwacji
    }
  },
  mounted () {
    this.fetchCartItems()
  },
  methods: {
    fetchCartItems () {
      axios.get('/api/reservation_cart')
        .then(response => {
          this.cartItems = response.data
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych koszyka:', error)
        })
    },
    submitReservation () {
      const selectedBookCopyIds = this.selectedBooks.map(bookId => {
        return this.cartItems.find(item => item.book_id === bookId).book_copy_ids[0]
      })
      axios.post('/api/reserve_book', { bookCopyIds: selectedBookCopyIds })
        .then(response => {
          console.log(response.data.message)

          // Usuwanie zarezerwowanych książek z cartItems
          this.cartItems = this.cartItems.filter(item => !this.selectedBooks.includes(item.book_id))

          this.selectedBooks = []
        })
        .catch(error => {
          console.error('Błąd podczas rezerwacji książek:', error)
        })
    },
    updateCartQuantity (bookCopyId, quantity) {
      axios.post(`/api/update_cart_quantity/${bookCopyId}`, { quantity })
        .then(response => {
          // Obsługa odpowiedzi
          console.log(response.data.message)
        })
        .catch(error => {
          // Obsługa błędu
          console.error('Błąd podczas aktualizacji ilości:', error)
        })
    },
    removeFromCart (bookId) {
      axios.post(`/api/remove_from_cart/${bookId}`)
        .then(response => {
          this.cartItems = this.cartItems.filter(item => item.book_id !== bookId)
          console.log(response.data.message)
        })
        .catch(error => {
          console.error('Błąd podczas usuwania książki:', error.response.data.message)
        })
    }

  }
}
</script>
<style scoped>
.reservation-header {
  margin-top: 100px;
  text-align: center;
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}
.reservation-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 900px;
  margin: 20px auto;
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 18px;
}
.quantity-input {
  width: 30px;
  padding: 5px; /*wewnętrzny odstęp dla lepszego wyglądu */
  text-align: center; /* Wyśrodkowanie tekstu w polu */
  font-size: 14px;
  margin-right: 10px;
  border: 1px solid #000c05;
  margin-top: 10px;
}
.cart-button {
  display: inline-block;
  padding: 5px 15px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none; /* Usunięcie podkreślenia */
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
  border: 2px solid #0e4928;
  transition: background-color 0.3s; /* Dodanie efektu przejścia */
  font-size: 13px; /* Zmiana rozmiaru czcionki */
  cursor: pointer;
  margin-right: 10px; /* margines po prawej stronie */
}

.cart-button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}

.submit-button {
  display: block;
  margin: 5px;
  padding: 10px 20px;
  background-color: #4CAF50; /* Zielone tło */
  color: white; /* Biały tekst */
  text-decoration: none; /* Brak podkreślenia */
  border-radius: 15px; /* Zaokrąglenie rogów */
  border: 2px solid #0e4928; /* Zielona obwódka */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Cień */
  font-size: 14px; /* Rozmiar tekstu */
  cursor: pointer; /* Kursor wskazujący na możliwość kliknięcia */
  height: auto; /* Wysokość automatyczna */
  line-height: 1.5;
}

.submit-button:hover {
  background-color: #7bce7d; /* Jasnozielone tło przy najechaniu */
}

/* Styl tła przycisku */
.button-background {
  padding: 0;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border: 0.1px solid #cddbd2;
  text-align: center; /* Wyśrodkowanie przycisku wewnątrz */
  margin: 20px auto; /* Centrowanie i ustawienie marginesów */
  max-width: fit-content; /* Dostosowanie szerokości do zawartości */
  display: inline-block; /* tło tylko wokół przycisku, a nie na całej szerokości */
}
.button-container {
  text-align: center;
  margin-top: 20px;
}
</style>
