<template>
  <div class="home-component">
    <!-- komunikat po pomyślnym zalogowaniu -->
    <p v-if="loginMessage" class="login-message">{{ loginMessage }}</p>

    <!-- Centrowany kontener dla wyszukiwania książek -->
    <div class="search-container">
    <SearchBooks />
    </div>
    <div class="loan-area-button-container">
      <!-- Kontener dla przycisku 'Strefa wypożyczeń' -->
      <div v-if="user && user.role === 'pracownik'" class="button-background">
        <button @click="goToLoanArea">
          Strefa Wypożyczeń
        </button>
      </div>
      <div v-if="user && user.role === 'pracownik'" class="button-background">
    <button @click="goToDigitalContentUpload">
      Dodaj Cyfrowe Treści
    </button>
  </div>
  <div v-if="user && user.role === 'pracownik'" class="button-background">
      <button @click="goToApproveReviews">
        Oczekujące Opinie
      </button>
    </div>
    <div v-if="user && user.role === 'pracownik'" class="button-background">
    <button @click="goToEditUsers">
      Edytuj Użytkowników
    </button>
    </div>
    <div v-if="user && user.role === 'pracownik'" class="button-background">
    <button @click="goToSendNotification">
      Wyślij Powiadomienie
    </button>
  </div>
    </div>
    <div class="loan-area-button-container-down">
      <div v-if="user && user.role === 'pracownik'" class="button-background">
        <button @click="goToBooksManagement">
  Przygotuj Książki
</button>
    </div>
    <div v-if="user && user.role === 'pracownik'" class="button-background">
        <button @click="goToAddBook">
          Dodaj Książkę
        </button>
      </div>
      <div v-if="user && user.role === 'pracownik'" class="button-background">
        <button @click="goToEditBook">
          Edytuj Książki
        </button>
      </div>
  <div v-if="user && user.role === 'pracownik'" class="button-background">
    <button @click="goToReportSelector">
      Raporty
    </button>
  </div>
    </div>
    <div class="loan-area-button-container-czytelnik">
      <div v-if="user && user.role === 'czytelnik'" class="button-background">
        <button @click="goToMyBooks">
          Moje Książki
        </button>
      </div>
      <div v-if="user && user.role === 'czytelnik'" class="button-background">
        <button @click="goToMediaList">
          Cyfrowe Treści
        </button>
      </div>
      <div v-if="user && user.role === 'czytelnik'" class="button-background">
    <button @click="goToPayments">
      Opłać Kary
    </button>
  </div>
    </div>
    <div class="loan-area-button-container-admin">
      <div v-if="user && user.role === 'administrator'" class="button-background">
      <button @click="goToAddEmployee">
        Dodaj Pracownika
      </button>
    </div>
    <div v-if="user && user.role === 'administrator'" class="button-background">
      <button @click="goToEditUser">
        Edytuj Użytkowników
      </button>
    </div>
    <div v-if="user && user.role === 'administrator'" class="button-background">
      <button @click="goToDeleteUser">
        Usuń Użytkowników
      </button>
    </div>
    </div>
    <div v-if="user && user.role === 'czytelnik'" class="central-notifications-container">
    <div v-if="user" class="notifications-container">
      <h2 class="notifications-title">Ostatnie Powiadomienia</h2>
      <NotificationsComponent :limit="1" :showTitle="false" :showNavbar="false" :applyMargin="false" :showTransparentContainer="false"/>
      <button v-if="user && user.wants_notifications" class="more-notifications-button" @click="goToNotifications">Więcej powiadomień...</button>
  <button v-if="user && !user.wants_notifications" class="edit-notifications-button" @click="goToEditNotifications">Edytuj otrzymywanie powiadomień</button>
    </div>
    <div class="recommendations-container" v-if="user">
      <h2 class="recommendations-title">Rekomendacje dla Ciebie</h2>
      <!-- Wyświetlenie RecomendationsComponent tylko dla zalogowanych użytkowników -->
      <RecomendationsComponent :showTitle="false" />
    </div>
  </div>

    <div class="filters-container">
    </div>
    <div class="auth-buttons" :class="{'column-layout': user}">
  <button v-if="!user" @click="goToRegister">Zarejestruj się</button>
  <button v-if="!user" @click="goToLogin">Zaloguj się</button>
  <!-- Przycisk wylogowania -->
  <button  @click="logout">Wyloguj się</button>
  <!-- Przycisk przenoszący do koszyka rezerwacji -->
  <button v-if="user && user.role === 'czytelnik'" @click="goToReservationCart">Przejdź do koszyka rezerwacji</button>
  <button v-if="user" @click="goToUserProfile">Mój profil</button>
  <!-- Przycisk 'Strefa wypożyczeń' tylko dla pracowników -->
</div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchBooks from './SearchBooks.vue'
import NotificationsComponent from './NotificationsComponent.vue'
import RecomendationsComponent from './RecomendationsComponent.vue'

export default {
  components: {
    SearchBooks,
    NotificationsComponent,
    RecomendationsComponent
  },
  data () {
    return {
      loginMessage: '',
      showNavbar: false
    }
  },
  created () {
    console.log('Aktualny stan użytkownika:', this.$store.state.user)
    // Sprawdzenie, czy jest komunikat o pomyślnym zalogowaniu
    const queryParams = new URLSearchParams(window.location.search)
    const loginSuccess = queryParams.get('loginSuccess')
    if (loginSuccess === 'true') {
      this.loginMessage = 'Zalogowano pomyślnie'
    }
  },
  computed: {
    // mapState, aby uzyskać dostęp do stanu użytkownika z Vuex
    ...mapState(['user'])
  },
  methods: {
    goToDeleteUser () {
      this.$router.push({ path: '/remove-user' })
    },
    goToEditUser () {
      this.$router.push({ path: '/users' })
    },
    goToAddEmployee () {
      this.$router.push({ path: '/add-employee' })
    },
    goToReportSelector () {
      this.$router.push({ path: '/reports' })
    },
    goToEditNotifications () {
      this.$router.push({ name: 'EditUser', params: { userId: this.user.id } })
    },
    goToApproveReviews () {
      this.$router.push({ path: '/approve' })
    },
    goToMediaList () {
      this.$router.push({ path: '/book-media' })
    },
    goToDigitalContentUpload () {
      this.$router.push({ path: '/upload' })
    },
    goToPayments () {
      this.$router.push({ path: '/payment' })
    },
    goToSendNotification () {
      this.$router.push({ path: '/send-notification' })
    },
    goToNotifications () {
      this.$router.push({ path: '/notifications' })
    },
    goToEditUsers () {
      this.$router.push({ path: '/users' })
    },
    goToUserProfile () {
      this.$router.push({ name: 'UserProfile', params: { userId: this.user.id } })
    },
    goToBooksManagement () {
      this.$router.push({ path: '/manage-books' })
    },
    goToEditBook () {
      this.$router.push({ path: '/edit-book' }) // Przekierowanie do EditBook.vue
    },
    goToAddBook () {
      this.$router.push({ path: '/add-book' }) // Przekierowanie do AddBook.vue
    },
    goToMyBooks () {
      this.$router.push({ path: '/my-books' }) // Przekierowanie do MyBooks.vue
    },
    goToLoanArea () {
      this.$router.push({ path: '/loan' }) // Przekierowanie do LoanComponent.vue
    },
    goToLogin () {
      this.$router.push({ path: '/login' })
    },
    async logout () {
      try {
        const response = await this.$axios.post('/api/logout')
        if (response.data.success) {
          this.$store.commit('setUser', null) // Resetowanie stanu użytkownika w Vuex
          this.$router.push({ path: '/login' })
        }
      } catch (error) {
        console.error('Wystąpił błąd podczas wylogowywania:', error)
      }
    },
    async fetchData () {
      try {
        const response = await this.$axios.get('/api/user-data')
        this.$store.dispatch('setUserNotifications', response.data.wants_notifications)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },

    goToRegister () {
      this.$router.push({ path: '/register' })
    },
    goToReservationCart () {
      this.$router.push({ path: '/reservation-cart' }) // Ścieżka do koszyka rezerwacji
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
.home-component {
  position: relative;
  background-image: url('../../public/images/background.jpg');
  background-size: cover;
  min-height: 160vh;
  background-attachment: fixed;
}

.auth-buttons {
  position: absolute;
  top: 10px; /* Odstęp od góry */
  right: 10px; /* Odstęp od prawej */
  display: flex; /* Użycie Flexbox dla lepszego ustawienia przycisków */
  flex-direction: row; /* Ustawienie przycisków w poziomie */
  align-items: center; /* Wyrównanie przycisków do środka w pionie */
  justify-content: flex-end;
}

.auth-buttons button {
  margin-left: 5px; /* Dodaje margines lewy do każdego przycisku */
  border-radius: 15px;
  padding: 10px 15px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

  .auth-buttons button:last-child {
    margin-bottom: 0; /* Usuwa margines dolny od ostatniego przycisku */
    margin-left: 5px;
  }

  .auth-buttons.column-layout {
  flex-direction: column; /* Ustawienie pionowe dla zalogowanych użytkowników */
  margin-top: 10px;
}
.auth-buttons.column-layout button:first-child {
    margin-top: 0;
}
.auth-buttons button:first-child {
    margin-left: 0;
    margin-bottom: 0px;
}
.loan-area-button-container {
  position: absolute;
  top: 30px;
  right: -115px; /* Centrowanie poziome */
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px; /* Odstęp między przyciskami */
}
.loan-area-button-container-down {
  position: absolute;
  top: 95px;
  right: 224px; /* Centrowanie poziome */
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px; /* Odstęp między przyciskami */
}
.loan-area-button-container-czytelnik{
  position: absolute;
  top: 30px;
  right: 380px; /* Centrowanie poziome */
  transform: translateX(-50%); /* Precyzyjne wyśrodkowanie poziome */
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px; /* Odstęp między przyciskami */
}
.loan-area-button-container-admin{
  position: absolute;
  top: 30px;
  right: 240px; /* Centrowanie poziome */
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px; /* Odstęp między przyciskami */
}

.button-background {
  /* Stylizacja tła każdego przycisku */
  padding: 5px;
  background-color: white;
  border-radius: 15px;
}

.loan-area-button-container button {
  /* Stylizacja przycisków */
  border-radius: 15px;
  padding: 10px 15px;
  border: 2px solid #0e4928;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
.loan-area-button-container-down button {
  /* Stylizacja przycisków */
  border-radius: 15px;
  padding: 10px 15px;
  border: 2px solid #0e4928;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
.loan-area-button-container-czytelnik button {
  /* Stylizacja przycisków */
  border-radius: 15px;
  padding: 10px 15px;
  border: 2px solid #0e4928;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
.loan-area-button-container-admin button {
  /* Stylizacja przycisków */
  border-radius: 15px;
  padding: 10px 15px;
  border: 2px solid #0e4928;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
/* Stylizacja przycisku 'Dodaj książkę' */
.loan-area-button-container button:nth-child(2) {
  margin-left: 10px; /* margines lewy do przycisku 'Dodaj książkę' */
}
.auth-buttons.column-layout button:nth-last-child(1) {
  margin-top: 0px;
}

.auth-buttons.column-layout button {
  margin-bottom: 20px; /* Odstęp między przyciskami */
}

.edit-users-button-container button {
  border-radius: 15px;
  padding: 10px 15px;
  border: 2px solid #0e4928;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
.prepare-books-button {
  position: relative;
  left: 220px;
}
.button-background2 {
  /* Stylizacja tła każdego przycisku */
  padding: 5px;
  background-color: white;
  border-radius: 15px;
}
.central-notifications-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.central-notifications-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  position: relative; /* pozycjonowanie względne */
  top: -265px; /* Przesunięcie kontenera do góry */
  left: -255px;
}
.notifications-container {
  position: absolute; /* Pozycjonowanie absolutne */
  top: -94px; /* Odległość od góry strony */
  left: 515px; /* Odległość od prawej strony */
  width: 455px; /* Stała szerokość */
  height: 300px; /* Stała wysokość */
  background-color: rgba(255, 255, 255, 0.7); /* Białe, prześwitujące tło */
  padding: 10px; /* Wewnętrzny odstęp */
  border-radius: 10px; /* Zaokrąglone rogi */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Lekki cień */
  overflow: auto; /* pasek przewijania, gdy zawartość jest zbyt długa */
}
.notifications-title {
    text-align: center; /* Wyśrodkowanie tekstu */
    padding: 10px; /* wypełnienie wokół tekstu */
    margin-bottom: 20px; /* Odstęp od dolnej części */
    border-radius: 10px; /* Zaokrąglone rogi */
    color: #0e4928;
    text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
    font-size: 28px;
  }
  .more-notifications-button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #0e4928;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.recommendations-container {
  position: absolute; /* Pozycjonowanie absolutne */
  top: -94px; /* Odległość od góry strony */
  right: 5px; /* Odległość od prawej strony */
  width: 455px; /* Stała szerokość */
  height: 200px; /* Stała wysokość */
  background-color: rgba(255, 255, 255, 0.7); /* Białe, prześwitujące tło */
  padding: 10px; /* Wewnętrzny odstęp */
  border-radius: 10px; /* Zaokrąglone rogi */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Lekki cień */
  overflow: auto; /* pasek przewijania, gdy zawartość jest zbyt długa */
}
  .recommendations-title {
    text-align: center; /* Wyśrodkowanie tekstu */
    padding: 10px; /* wypełnienie wokół tekstu */
    margin-bottom: 20px; /* Odstęp od dolnej części */
    border-radius: 10px; /* Zaokrąglone rogi */
    color: #0e4928;
    text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
    font-size: 28px;
  }
.send-notification-button-container button {
    /* Stylizacja przycisku 'Wyślij Powiadomienie'*/
    border-radius: 15px;
    padding: 10px 15px;
    border: 2px solid #0e4928;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  .edit-notifications-button {
  /* Stylizacja przycisku 'Edytuj otrzymywanie powiadomień' */
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #0e4928;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
body{
  background: radial-gradient(circle at center, #92ec95 30%, #276b29 100%);
}
</style>
