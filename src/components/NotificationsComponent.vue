<template>
  <NavbarComponent v-if="showNavbar" />
  <div :class="{'notifications-margin-container': applyMargin}">
    <!-- Tytuł umieszczony tuż przed przezroczystym kontenerem -->
    <h1 v-if="showTitle" class="notifications-title">Powiadomienia</h1>

    <!-- Przezroczysty kontener -->
    <div :class="{'transparent-container': showTransparentContainer}">
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <div v-if="!wantsNotifications">
          <p class="disabled-notifications">Otrzymywanie powiadomień zostało wyłączone</p>
        </div>
        <div v-else-if="notifications.length === 0 && reminders.length === 0">
          <p>Nie masz żadnych powiadomień ani przypomnień.</p>
        </div>
        <div v-else class="notification-content">
          <ul>
            <li v-for="notification in limitedNotifications" :key="notification.id">
              <p>{{ notification.content }}</p>
              <p>Data wysłania: {{ notification.date_of_sending }}</p>
            </li>
            <li v-for="reminder in limitedReminders" :key="reminder.id">
              <p>Przypomnienie: {{ reminder.type }} - {{ reminder.title }}</p>
              <p>Data wysłania: {{ reminder.date_of_sending }}</p>
            </li>
          </ul>
        </div>
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
      notifications: [],
      reminders: [],
      error: '',
      wantsNotifications: null
    }
  },
  props: {
    showTransparentContainer: {
      type: Boolean,
      default: true // Domyślnie nie pokazuje przezroczystego kontenera
    },
    limit: {
      type: Number,
      default: null // domyślnie nie ma limitu
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showNavbar: {
      type: Boolean,
      default: true // Domyślnie pokazuje Navbar
    },
    applyMargin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    limitedNotifications () {
      return this.limit ? this.notifications.slice(0, this.limit) : this.notifications
    },
    limitedReminders () {
      return this.limit ? this.reminders.slice(0, this.limit) : this.reminders
    }
  },
  created () {
    this.fetchNotifications()
  },
  methods: {
    fetchNotifications () {
      axios.get('/api/notifications')
        .then(response => {
          this.notifications = response.data.notifications
            .sort((a, b) => new Date(b.date_of_sending) - new Date(a.date_of_sending))
          this.reminders = response.data.reminders
            .sort((a, b) => new Date(b.date_of_sending) - new Date(a.date_of_sending))
          this.wantsNotifications = response.data.wants_notifications
        })
        .catch(error => {
          if (error.response && error.response.data.error) {
            this.error = error.response.data.error
          } else {
            console.error('Error fetching notifications:', error)
          }
        })
    }
  }
}
</script>
<style scoped>
.notification-content p {
    font-size: 14.5px;
    font-weight: bold; /*pogrubiona czcionka*/
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.disabled-notifications {
    font-size: 14.5px;
    font-weight: bold; /*pogrubiona czcionka*/
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.notifications-margin-container {
  margin-top: 100px;
  display: flex; /* Wyśrodkowanie w poziomie */
  flex-direction: column; /* Elementy ułożone pionowo */
  align-items: center; /* Centrowanie elementów w poziomie */
}

.notifications-title {
  /* Stylizacja tytułu */
  margin-bottom: 20px; /* Odstęp od przezroczystego kontenera */
  text-align: center;
  color: #0e4928; /* Kolor tekstu */
  font-size: 28px; /* Rozmiar czcionki */
  text-shadow: 1px 1px 1px #000; /* Cień tekstu */
}

.transparent-container {
  background-color: rgba(255, 255, 255, 0.4); /* Przezroczystość */
  border-radius: 10px; /* Zaokrąglone rogi */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Cień */
  padding: 10px; /* Wewnętrzny odstęp */
  max-width: 600px; /* Maksymalna szerokość */
  width: 100%; /* Szerokość dopasowana do treści */
  border: 4px solid #0e4928; /* Obramowanie */
}
</style>
