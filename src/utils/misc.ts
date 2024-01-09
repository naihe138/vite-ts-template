import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import { showSuccessToast } from 'vant'
import type { Ref } from 'vue'
import { GenderEnum } from '~/enums'

dayjs.extend(durationPlugin)

export function createBgStyle(bgImage: string) {
  return readonly({
    backgroundImage: `url('${bgImage}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  })
}

/**
 * Create a logger function
 * @param scope - The scope of the logger
 */
export function createLogger(scope = '') {
  return (...args: any[]) => {
    console.log(`[${scope}]`, ...args)
  }
}

export function num2unit(num: number): string {
  const THOUSAND = 1000
  const units = ['千', '万', '十万', '百万', '千万', '亿']
  const index = Math.floor(Math.log10(num)) - Math.log10(THOUSAND)
  return units[index] || ''
}

export function formatLargeNumer(num?: number | string | null) {
  if (!num)
    return num

  num = Number(num)

  if (num < 1000)
    return num
  if (num < 10000)
    return `${Math.floor(num / 1000)}k`
  return `${Math.floor(num / 10000)}w`
}

function createUidFn() {
  let uid = 0
  return () => {
    return ++uid
  }
}

/**
 * Generate unique id using closure with a simple number counter
 */
export const u = createUidFn()

export function calcDuration(duration?: number): string {
  duration ||= 1

  const d = dayjs.duration(duration, 'seconds')
  const h = d.hours()
  const m = d.minutes()
  const s = d.seconds()

  const matrix: [number, string][] = [
    [h, ' h '],
    [m, ' \' '],
    [s, ' \'\' '],
  ]

  const result = matrix
    .filter(([v]) => v > 0)
    .map(([v, unit]) => `${v}${unit}`)
    .join('')

  return result
}

export function extractErrorMsg(err: Error | null, res: Response) {
  return err?.message || `${res.status} ${res.statusText}` || 'Unknown Error'
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function getGenderLabel(gender: GenderEnum) {
  return gender === GenderEnum.man ? '男' : gender === GenderEnum.women ? '女' : '未知'
}

export const copyText = async (str: string, silent = false) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(str)
    }
    else {
      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      // 隐藏此输入框
      textarea.style.position = 'fixed'
      textarea.style.clip = 'rect(0 0 0 0)'
      textarea.style.top = '10px'
      // 赋值
      textarea.value = str
      // 选中
      textarea.select()
      // 复制
      document.execCommand('copy', true)
      // 移除输入框
      document.body.removeChild(textarea)
    }
    if (!silent)
      showSuccessToast('复制成功')
  }
  catch (error) {
    if (!silent)
      showSuccessToast('复制失败')
  }
}

export function loadImage(img: string | File) {
  const src = typeof img === 'string' ? img : URL.createObjectURL(img)

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      resolve(image)
      if (typeof img !== 'string')
        URL.revokeObjectURL(src)
    }
    image.onerror = reject
  })
}

export const startTypingTextEffect = (content: string, textRef: Ref<string>, speed = 50) => {
  const text = content ?? ''

  return new Promise<void>((resolve) => {
    const stepper = () => {
      const val = textRef.value
      if (val.length < text.length) {
        textRef.value += text[val.length]
        setTimeout(stepper, speed)
      }
      else {
        resolve()
      }
    }

    stepper()
  })
}

export const isPc = (): boolean => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
    return false
  else
    return true
}

export const getAudioDuration = (url: string, duration?: number): Promise<number> => {
  if (duration)
    return Promise.resolve(duration)

  return new Promise((resolve, reject) => {
    let audio: any = new Audio(url)
    audio.addEventListener('loadedmetadata', () => {
      const duration = audio.duration
      console.log(`音频时长：${duration} 秒`)
      resolve(duration)
      audio = null
    })

    audio.addEventListener('error', (err: any) => {
      reject(err)
    })
    audio.load()
  })
}
