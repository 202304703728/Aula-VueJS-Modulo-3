
import { createApp } from "vue"
import PaginaPrincipal from './PaginaPrincipal.vue'
//import VueSimpleAlert from "vue3-simple-alert"
import SimpleAlert from "sweetalert2"

createApp(PaginaPrincipal).mount('#app')

//PaginaPrincipal.use(VueSimpleAlert, { reverseButtons: true })
PaginaPrincipal.use(SimpleAlert)

