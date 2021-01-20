import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
import treeTable from 'vue-table-with-tree-grid'

//导入富文本编辑
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//导入NProgress包对应的JS和css
import NProgress from 'nprogress'//
import 'nprogress/nprogress.css'


//配置请求的根路径
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

//在request拦截器中展示进度条 NProgress.start()
//设置请求头，在之后的接口请求过程中，都要通过token的认证来获取数据
axios.interceptors.request.use(config => {
  //console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

//在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  //console.log(config)
  NProgress.done()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios



Vue.config.productionTip = false
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
Vue.component('tree-table', treeTable)




Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
