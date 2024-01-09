export const transformSize = (size: number) => {
  size = size || 0
  if (size === 0)
    return '0KB'

  const kb = 1024
  const unit = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(size) / Math.log(kb))
  // let unit = size < 1024 ? 'KB' : size < 1024*1024 ? 'MB'
  return `${(size / kb ** i).toPrecision(3)} ${unit[i]}`
}

const VITE_LANG = import.meta.env.VITE_LANG

export type TLanguage = 'zh-cn' | 'en'
export const getBrowserLang = (): { language: TLanguage; isEnglish: boolean } => {
  const storeLang = localStorage.getItem('my-language')
  let isEnglish = storeLang === 'en'
  if (storeLang === 'zh-cn' || storeLang === 'en')
    return { language: storeLang, isEnglish }

  const browserLang = navigator.language ? navigator.language : (navigator as any).browserLanguage
  let defaultBrowserLang: TLanguage = 'zh-cn'
  const bl = browserLang.toLowerCase()
  if (bl === 'us' || bl === 'en' || bl === 'en_us')
    defaultBrowserLang = 'en'
  else
    defaultBrowserLang = 'zh-cn'

  if (VITE_LANG === 'en')
    defaultBrowserLang = 'en'

  localStorage.setItem('my-language', defaultBrowserLang)
  isEnglish = defaultBrowserLang === 'en'
  return { language: defaultBrowserLang, isEnglish }
}

export function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = () => {
      resolve(1)
    }
    script.onerror = () => {
      reject(new Error(`无法加载脚本 ${url}`))
    }
    document.head.appendChild(script)
  })
}

export function loadCSS(url: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  document.head.appendChild(link)
}
