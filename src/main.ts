import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Aplly Prime Vue - UI library
app.use(PrimeVue)

// Apply Pinia (State management)
app.use(createPinia())
app.use(router)

app.mount('#app')
