import { createApp, reactive, provide } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import mdb from 'mdb-ui-kit'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './index.css'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import VueVirtualScroller from 'vue3-virtual-scroller'

export const db = firebase.initializeApp({
  apiKey: 'AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU',
  authDomain: 'blv-vue3-tp.firebaseapp.com',
  databaseURL: 'https://blv-vue3-tp.firebaseio.com',
  projectId: 'blv-vue3-tp',
  storageBucket: 'blv-vue3-tp.appspot.com',
  messagingSenderId: '483828756147',
  appId: '1:483828756147:web:f09d50c6c8fce8c0974ac6',
  measurementId: 'G-LQYFPZCSD5'
}).firestore()

export const storage = firebase.storage()

// Настройки Sweetalert2
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

const app = createApp(App)
app.use(mdb)
app.use(store)
app.use(router)
app.use(VueSweetalert2, options)
app.use(VueVirtualScroller)
app.use(VuePlyr, {
  plyr: {}
})
app.mount('#app')
