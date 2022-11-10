// 封装多语言
// 1、引入插件
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 2、注册插件
Vue.use(VueI18n)

// 3、定义语言字典表
const messages = {
  zh: {
    morning: '早上好'
  },
  en: {
    morning: 'good morning'
  }
}

// 4/实例化插件
const i18n = new VueI18n({
  locale: 'en', // 设置默认语言
  messages
})

// 5、导出
export default i18n
