
import { createApp } from "vue"
import PaginaPrincipal from './PaginaPrincipal.vue'
import SimpleAlert from "sweetalert2"

createApp(PaginaPrincipal).mount('#app')
PaginaPrincipal.use(SimpleAlert)

