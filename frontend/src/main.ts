import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import router from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App)
.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
    },
})
.use(router)

.mount('#app')
