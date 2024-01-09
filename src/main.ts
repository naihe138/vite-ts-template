import { createApp } from 'vue'
import { Lazyload } from 'vant'
import dayjs from 'dayjs'
import zhCN from 'dayjs/locale/zh-cn'

import { setupPinia } from './modules/pinia'
import { setupHead } from './modules/head'

import { loadFont } from './modules/font'

import App from './App.vue'
import { setupRouter } from './router'

import '@unocss/reset/tailwind-compat.css'
import './styles/main.css'
import 'uno.css'

import 'vant/es/toast/style'
import 'vant/es/image-preview/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

async function bootstrap() {
  const app = createApp(App)

  app.use(Lazyload)

  setupPinia(app)
  setupHead(app)
  setupRouter(app)

  // 全局语言包加载
  // await loadLang(app)

  app.mount('#app')

  loadFont()

  dayjs.locale(zhCN)
}

bootstrap().catch(console.error)
