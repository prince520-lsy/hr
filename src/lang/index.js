// 封装多语言
// 1、引入插件
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 2、注册插件
Vue.use(VueI18n)
// 引入elementUI的语言字典表
import elZh from 'element-ui/lib/locale/lang/zh-CN'
import elEn from 'element-ui/lib/locale/lang/en'
// 引入导航的自定义语言包
import comZh from './zh'
import comEn from './en'

// 3、定义语言字典表
const message = {
  zh: {
    morning: '早上好',
    ...elZh,
    ...comZh
  },
  en: {
    morning: 'good morning',
    ...elEn,
    ...comEn
  }
}

// 4/实例化插件
const i18n = new VueI18n({
  locale: localStorage.getItem('curlang') || 'zh', // 设置默认语言
  messages: message
})

// 5、导出
export default i18n
