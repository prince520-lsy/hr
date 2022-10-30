import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// import defaultImg from './assets/common/bigUserHeader.png'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.directive('imgErr', {
  inserted(el, binding) {
    console.log(el, binding)
    el.addEventListener('error', function() {
      el.src = binding.value
      // el.src = defaultImg
    })
    el.src = el.src || binding.value
  },
  componentUpdated(el, binding) {
    el.addEventListener('error', function() {
      el.src = binding.value
      // el.src = defaultImg
    })
    el.src = el.src || binding.value
  }
})

// 注册全局组件
import PageTools from './components/PageTools/index.vue'
Vue.component('PageTools', PageTools)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

