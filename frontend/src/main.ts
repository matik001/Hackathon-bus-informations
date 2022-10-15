import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App)
.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
    },
})
.mount('#app')
