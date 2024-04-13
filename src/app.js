import { createApp } from 'vue'
import './app.css'
import { createPinia } from 'pinia'
import { createPersistedState }  from 'pinia-plugin-persistedstate'
import TaroStorage from "./store/taroStorage";

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
const pinia = createPinia()
pinia.use(
    createPersistedState({
      storage: new TaroStorage(),
    })
)
App.use(pinia)
export default App
