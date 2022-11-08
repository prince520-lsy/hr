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

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 模拟数据代码，我们现在有直接的接口，所以不需要模拟数据。
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局自定义指令
/**
 *
 * 语法：
 * Vue.directive('自定义指令名', {
 * // inserted 只有在使用改指令的标签插入到html文档中的
 * 时候才会触发(仅此触发一次)
 *  inserted(el,binding){
 *    el: 指的是使用该指令的标签
 *    binding.value: 接收使用指令时传入的值
 *  },
 *  update是在传入的数据发生变化的时候触发
 *  update(el,binding){}
 * })
 *
 * 使用语法：v-自定义指令名
 *
 * */
// import defaultUrl from './assets/common/bigUserHeader.png'
Vue.directive('imgErr', {
  // inserted 函数只有在标签第一次插入到html结构中的时候 才会触发 并且只会触发这一次
  inserted(el, binding) {
    el.addEventListener('error', function() {
      console.log('图片报错了！', binding)
      el.src = binding.value
      // 为了使得我们封装的指令更加通用（不仅仅用在头像）
      // 标签的默认图片就不适合在这里写死了，因此默认图片
      // 可以在使用指令时传入。
    })
    // 如果后端返回的图片地址不存在(图片地址不存在的时候渲染图片的时候是不会报错的)，
    // 因此需要在监听错误事件的外面来设置图片默认值
    el.src = el.src || binding.value
  },
  // update 使用指令所在的组件数据发生变化触发，但是子组件数据发生变化时
  // update函数可能会触发也可能触发不了。
  // componentUpdated 当组件或者其子组件数据更新的时候就会触发该函数
  componentUpdated(el, binding) {
    el.addEventListener('error', function() {
      console.log('图片报错了！', binding)
      el.src = binding.value
    })
    el.src = el.src || binding.value
  }
})

// 注册全局组件
import PageTools from './components/PageTools/index.vue'
Vue.component('PageTools', PageTools)

import UploadExcel from './components/UploadExcel/index.vue'
Vue.component('UploadExcel', UploadExcel)
import UploadImage from './components/UploadImage/index.vue'
Vue.component('UploadImage', UploadImage)
/**
 * 全局过滤器
 * 作用：可以传入数据给过滤器，过滤器中对这个数据进行处理，然后返回处理后的数据.
 * 注册好全局过滤器后可以再项目中的任意vue文件中使用
 *
 * 语法：
 * Vue.filter('自定义过滤器名字',(val)=>{
 *    val: 默认接收到的参数，这个参数就是将来使用过滤器的时候传入的要处理的数据
 *    ... 处理数据
 *    return 处理后的数据  --- 一定要有返回
 * })
 * 使用语法：（过滤器只能用在动态属性(v-bind)和插值表达式中）
 *   要处理的数据变量 | 过滤器名字
 * | 表示一个管道符，意思就是要处理的变量通过管道符传入到过滤器中，过滤器的就可以通过回调函数的第一个参数接收
 *
 * */
// 需求：定义一个全局过滤器，格式化日期
// import { formatDate, add } from './filters/index'
// const obj = {
//   formatDate, add
// }
// 上面这个方法导入，需要自己构建一个对象，比较麻烦
// 如果js提供了可以直接一次性全部函数导入并在一个对象中的话就不用那么麻烦了
// 那么js有没有这样的方法呢 ？
// 答：有，语法如下：
// import * as 自定义变量名 from '导入的js文件路径'
// 这里的 * 表示匹配到js文件中所有导出的函数，但是因为js规范中不能把
// *当成一个变量使用的，因此我们需要通过as关键词对*重命名
// Vue.filter('formatDate', formatDate)
// Vue.filter('add', add)
import * as obj from './filters/index'
for (const key in obj) {
  // key: 是obj对象中的属性名
  // obj[key]: 是obj对象中key属性对应的值
  // 一次性注册全局过滤器
  Vue.filter(key, obj[key])
}
import myMixin from '@/mixin/index'
Vue.mixin(myMixin)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
