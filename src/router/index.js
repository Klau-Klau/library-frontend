import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import ReservationCart from '../components/ReservationCart.vue'
import BooksManagement from '../components/BooksManagement.vue'
import LoanComponent from '../components/LoanComponent.vue'
import MyBooks from '../components/MyBooks.vue'
import AddBook from '../components/AddBook.vue'
import EditBook from '../components/EditBook.vue'
import UserProfile from '../components/UserProfile.vue'
import EditUser from '../components/EditUser.vue'
import NotificationsComponent from '../components/NotificationsComponent.vue'
import SendNotificationsComponent from '../components/SendNotificationsComponent.vue'
import PaymentComponent from '../components/PaymentComponent.vue'
import MediaListComponent from '../components/MediaListComponent.vue'
import UploadComponent from '../components/UploadComponent.vue'
import ViewReviewsComponent from '../components/ViewReviewsComponent.vue'
import ReviewComponent from '../components/ReviewComponent.vue'
import ApproveComponent from '../components/ApproveComponent.vue'
import RecomendationsComponent from '../components/RecomendationsComponent.vue'
import MostBorrowedBooks from '../components/MostBorrowedBooks.vue'
import LoanStatistic from '../components/LoanStatistic.vue'
import BookRatings from '../components/BookRatings.vue'
import BookDetails from '../components/BookDetails.vue'
import UserList from '../components/UserList.vue'
import ReportSelector from '../components/ReportSelector.vue'
import AddEmployee from '../components/AddEmployee.vue'
import RemoveUser from '../components/RemoveUser.vue'

import store from '../store' // import Vuex store

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterComponent
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
      beforeEnter: (to, from, next) => {
        console.log('Czy użytkownik jest zalogowany:', store.state.user)
        if (store.state.user) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/reservation-cart',
      name: 'ReservationCart',
      component: ReservationCart,
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/manage-books',
      name: 'BooksManagement',
      component: BooksManagement,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'pracownik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/loan',
      name: 'LoanComponent',
      component: LoanComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'pracownik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/my-books',
      name: 'MyBooks',
      component: MyBooks,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'czytelnik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/add-book',
      name: 'AddBook',
      component: AddBook,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'pracownik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/edit-book',
      name: 'EditBook',
      component: EditBook,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'pracownik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/user/:userId',
      name: 'UserProfile',
      component: UserProfile,
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList,
      beforeEnter: (to, from, next) => {
        // Logika dotycząca dostępu do listy użytkowników
        if (store.state.user) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/edit-user/:userId',
      name: 'EditUser',
      component: EditUser,
      beforeEnter: (to, from, next) => {
        // Logika dotycząca dostępu do tej ścieżki
        if (store.state.user) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: NotificationsComponent
    },
    {
      path: '/send-notification',
      name: 'SendNotification',
      component: SendNotificationsComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'pracownik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/payment',
      name: 'Peyment',
      component: PaymentComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'czytelnik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/book-media',
      name: 'MediaList',
      component: MediaListComponent,
      props: true
    },
    {
      path: '/upload',
      name: 'UploadMedia',
      component: UploadComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/approve',
      name: 'ApproveComponent',
      component: ApproveComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'pracownik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/add-employee',
      name: 'AddEmployee',
      component: AddEmployee,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'administrator') {
          next()
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/remove-user',
      name: 'RemoveUser',
      component: RemoveUser,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'administrator') {
          next()
        } else {
          next({ path: '/' })
        }
      }
    },
    {
      path: '/view-review',
      name: 'ViewReviewsComponent',
      component: ViewReviewsComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/add-review/:bookId',
      name: 'ReviewComponent',
      component: ReviewComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'czytelnik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/recomendations',
      name: 'RecomendationsComponent',
      component: RecomendationsComponent,
      beforeEnter: (to, from, next) => {
        if (store.state.user && store.state.user.role === 'czytelnik') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    { path: '/reports', component: ReportSelector },
    { path: '/reports/most-borrowed', component: MostBorrowedBooks },
    { path: '/reports/loan-statistic', component: LoanStatistic },
    { path: '/reports/book-ratings', component: BookRatings },
    {
      path: '/books/:id',
      name: 'BookDetails',
      component: BookDetails
    }
  ]
})

export default router
