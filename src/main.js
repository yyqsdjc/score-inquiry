import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element.js'
import '@/styles/index.less'
import axios from 'axios'
// 注册全局变量
Vue.prototype.$http = axios

// 添加拦截器，返回res.data，方便在页面中少套一层data
axios.interceptors.response.use((res) => {
  return res.data
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
