import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "vue3-particles";// 引入插件
import App from './App.vue'
const app=createApp(App)
app.use(Particles)
app.use(ElementPlus)
app.mount('#app')