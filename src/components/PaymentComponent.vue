<template>
  <NavbarComponent />
  <div>
    <h1 class="debt-title">Twoje kary</h1>
    <div v-if="allPaymentsInfo.length" class="payment-container">
      <h2>Lista wszystkich płatności:</h2>
      <ul>
      <li v-for="payment in allPaymentsInfo" :key="payment.payment_id">
          "{{ payment.book_title }}" autorstwa {{ payment.book_author }}
          - kwota: {{ payment.amount }} zł, status: {{ payment.status }}
          <span v-if="payment.status === 'oczekująca' && payment.loan_status === 'książka przetrzymana'">
            - Musisz zwrócić książkę, aby uiścić opłatę
          </span>
        </li>
      </ul>
      </div>
      <div class="payment-container">
      <h3>Kwota do zapłaty:</h3>
      <input type="text" v-model="amount" placeholder="Kwota do zapłaty" disabled />
      <div v-show="amount > 0">
        <div class="card-section">
        <div id="card-element"></div> <!-- Element Stripe do wprowadzania danych karty -->
        <div id="card-errors" role="alert"></div> <!-- Wyświetla błędy wprowadzania karty -->
        <button @click="handlePayment" :disabled="!amount" class="payment-button">Zapłać</button>
      </div>
      </div>
    </div>
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
      amount: '', // Kwota długu
      stripe: null,
      card: null,
      currentUserId: null, // ID zalogowanego użytkownika
      allPaymentsInfo: [] // Lista wszystkich informacji o płatnościach
    }
  },
  async mounted () {
    this.stripe = Stripe('pk_test_51OXsZtIG0JJr5IMEjMkApPF9MtRVQKCNbASavH2iTLG6gsC6nrAW2bfPsHd7nLvKrn031qbl5D3UiUeI7rdBZQsI00YwOxf55S')
    const elements = this.stripe.elements()
    this.card = elements.create('card')
    this.card.mount('#card-element')
    this.currentUserId = this.getCurrentUserId()
    if (this.currentUserId) {
      await this.fetchUserDebt(this.currentUserId)
    } else {
      console.error('ID użytkownika nie jest dostępne.')
    }
    this.card.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    })
  },
  methods: {
    getCurrentUserId () {
      return this.$store.state.user ? this.$store.state.user.id : null
    },
    async fetchUserDebt (userId) {
      try {
        const response = await this.$axios.get(`/api/user_debt/${userId}`)
        this.amount = response.data.total_debt
        this.allPaymentsInfo = response.data.all_payments_info
        console.log(this.allPaymentsInfo)
      } catch (error) {
        console.error('Błąd podczas pobierania długu użytkownika:', error)
      }
    },

    async handlePayment () {
      if (!this.amount) {
        alert('Kwota nie jest określona')
        return
      }

      try {
        await this.updatePaymentStatus()
        alert('Płatność zakończona sukcesem i status płatności został zaktualizowany!')
      } catch (error) {
        console.error('Błąd podczas aktualizacji statusu płatności:', error)
      }
    },
    async updatePaymentStatus () {
      try {
        console.log('Wysyłane paymentIds:', this.paymentIds)
        await this.$axios.post('/api/update_multiple_payments', {
          paymentIds: this.paymentIds, // Lista ID płatności
          status: 'opłacona'
        })
        alert('Statusy płatności zostały zaktualizowane na opłacona.')
      } catch (error) {
        console.error('Błąd podczas aktualizacji statusów płatności:', error)
      }
    }

  }
}
</script>
<style>
.debt-title {
  margin-top: 100px;
  text-align: center; /* Wyśrodkowanie tekstu poziomo */
  color: #0e4928;
  text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
}

.card-section {
  margin: 20px 0;
}

#card-element {
  margin-bottom: 10px;
}

/* Stylizacja Stripe Elements */
.StripeElement {
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
.payments-list h2 {
  text-align: center;
}

.payments-list ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
.payment-container {
  background-color: rgba(255, 255, 255, 0.49);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 800px; /* Maksymalna szerokość kontenera */
  margin: 20px auto; /* Centrowanie z dodatkowym marginesem górnym i dolnym */
  border: 4px solid #0e4928;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.payments-list h2, .payment-details h3 {
  text-align: center;
}
.payment-button {
  display: inline-block;
  padding: 5px 15px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none; /* Usunięcie podkreślenia */
  border-radius: 8px; /* Zaokrąglenie rogów */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Dodanie cienia */
  border: 2px solid #0e4928;
  transition: background-color 0.3s; /* Dodanie efektu przejścia */
  font-size: 13px;
  cursor: pointer;
}

.payment-button:hover {
  background-color: #7bce7d; /* Zmiana koloru tła przy najechaniu */
}
</style>
