import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/main.css'

import moment from 'moment'




const app = createApp(App)

app.config.globalProperties.$filters = {
  dateFormat (date:string) {
    return moment(date).format('DD/MM/YYYY h:mm a')
  }
}

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
