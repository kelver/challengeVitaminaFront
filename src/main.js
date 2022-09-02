import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import './styles/app.css';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.component('DatePicker', Datepicker);

app.use(router).mount('#app')
