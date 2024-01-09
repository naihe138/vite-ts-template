import { createPinia } from 'pinia'
import type { App } from 'vue'
import { persistPlugin } from 'pinia-misc'

export function setupPinia(app: App) {
  const pinia = createPinia()
  pinia.use(persistPlugin)
  app.use(pinia)
}
