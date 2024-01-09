import type { InjectionKey } from 'vue'

export const UpdateScrollbarFnSymbol: InjectionKey<(behavior?: ScrollIntoViewOptions['behavior']) => Promise<void>> = Symbol('updateScrollbarFn')
const LANG = import.meta.env.VITE_LANG
export const ERROR_MSG_CONTENT = LANG === 'en' ? 'network error, please try again later' : '网络错误，请稍后重试'

export const VIDEO_URL = 'https://aimental.oss-cn-beijing.aliyuncs.com/20230609/bfd362b9c906464db3874a85d7bd0fe5.mp4'
