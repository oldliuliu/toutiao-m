import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import '@/styles/reset.less'
import 'vant/lib/index.less'
// 加载全局css样式
import '@/styles/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
import MyIcon from '@/components/MyIcon.vue'

// Object.keys一次性把filters/index.js中所有的按需要导出全部导出来
// 作为obj属性
import * as obj from '@/filters'
import FollowUser from '@/components/FollowUser.vue'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.use(Vant)
Vue.component('MyIcon', MyIcon)
Vue.component(FollowUser.name, FollowUser)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
/* const list = document.querySelectorAll('*')
list.forEach(item => {
  item.onscroll = function (e) {
    console.log(e.target)
  }
}) */
