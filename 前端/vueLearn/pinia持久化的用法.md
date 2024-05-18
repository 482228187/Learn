1.安装依赖包 

```
pnpm i pinia-plugin-persistedstate
```

2.在项目的main.js或者main.ts中导入 

```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
//导入依赖插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
//pinia挂载该插件
pinia.use(piniaPluginPersistedstate);
// 获取应用实例对象
const  app = createApp(App)
app.use(pinia)
app.mount('#app')

```

3.在store模块中开启pinia数据持久化 

```
import { defineStore } from "pinia";

const countA = defineStore("countA", {
// 开启pinia数据持久化 
  persist: true,
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {
    double() :number{
      return this.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }, 
  },
});

export default countA
```



