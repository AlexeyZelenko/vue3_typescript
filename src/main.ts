import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import '@/assets/global.css'

createApp(App)
  .use(store)
  .use(router)
  .use(VuePlyr, {
    plyr: {}
  })
  .mount('#app')
