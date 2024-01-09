import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import type { Composer, I18n } from 'vue-i18n'
import { getBrowserLang } from '~/utils/tools'

// import { Locale } from 'vant'
// 引入英文语言包
// import enUS from 'vant/es/locale/lang/en-US'

const { language } = getBrowserLang()

interface IConfig {
  defaultLang: 'zh-cn' | 'en'
  fallbackLang: string
  langArray: {
    name: string
    value: string
  }[]
}

const config = reactive<IConfig>({
  // 默认语言，可选值<zh-cn|en>
  defaultLang: language,
  // 当在默认语言包找不到翻译时，继续在 fallbackLang 语言包内查找翻译
  fallbackLang: 'zh-cn',
  // 支持的语言列表
  langArray: [
    { name: 'zh-cn', value: '中文简体' },
    { name: 'en', value: 'English' },
  ],
})

// eslint-disable-next-line import/no-mutable-exports
export let i18n: { global: Composer }

export async function loadLang(app: App) {
  const locale = config.defaultLang
  // if (locale === 'en')
  //   Locale.use('en-US', enUS)
  // 加载框架全局语言包
  const lang = await import(`./globs-${locale}.ts`)
  const langMessage = lang.default ?? {}

  // 加载页面自定义的
  const pageLang = await import(`./${locale}/index.ts`)
  const pageLangMessage = pageLang.default ?? {}

  const messages = {
    [locale]: {
      ...langMessage,
      ...pageLangMessage,
    },
  }
  i18n = createI18n({
    locale,
    legacy: false, // 组合式api
    globalInjection: true, // 挂载$t,$d等到全局
    fallbackLocale: config.fallbackLang,
    messages,
  })

  app.use(i18n as I18n)
  return i18n
}

const setLang = (lang: 'zh-cn' | 'en') => {
  if (config.defaultLang === lang)
    return

  localStorage.setItem('my-language', lang)
  /*
  * 语言包是按需加载的,比如默认语言为中文,则只在app实例内加载了中文语言包,所以切换语言需要进行 reload
  */
  location.reload()
}

export function useLangConfig(): { config: IConfig; setLang: (lang: 'zh-cn' | 'en') => void } {
  return { config, setLang }
}
