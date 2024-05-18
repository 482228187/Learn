import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './vuexStore' 
import {createPinia} from 'pinia'
//导入依赖插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
//pinia挂载该插件
pinia.use(piniaPluginPersistedstate);
// 获取应用实例对象
const  app = createApp(App)
app.use(pinia)

app.use(store)
app.mount('#app')
