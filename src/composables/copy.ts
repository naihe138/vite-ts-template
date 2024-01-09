import { showSuccessToast } from 'vant'
import ClipboardJS from 'clipboard'

const LANG = import.meta.env.VITE_LANG
type FnText = (target: any) => string
/**
 * 兼容所有安卓，苹果、微信浏览器的复制
 * @param setText 动态设置复制文本的函数
 * @returns {buttonRef, copyId}
 */
export const useCopy = (setText: FnText) => {
  let dom: HTMLInputElement | null = null
  const buttonRef = ref()
  let clipboard: ClipboardJS | null = null
  onMounted(() => {
    dom = document.querySelector('#useCopyText')
    if (!dom) {
      dom = document.createElement('input')
      dom.id = 'useCopyText'
      document.body.appendChild(dom)
      // 隐藏此输入框
      dom.style.position = 'fixed'
      dom.style.clip = 'rect(0 0 0 0)'
      dom.style.top = '-10px'
      dom.style.zIndex = '-10'
    }

    nextTick(() => {
      clipboard = new ClipboardJS(buttonRef.value, {
        text: setText,
      })
      clipboard.on('success', () => {
        showSuccessToast(LANG === 'en' ? 'copied successfully' : '复制成功')
      })

      clipboard.on('error', () => {
        showSuccessToast(LANG === 'en' ? 'copied failed' : '复制失败')
      })
    })
  })
  onUnmounted(() => {
    const useCopyTextDom = document.querySelector('#useCopyText')
    if (useCopyTextDom) {
      document.body.removeChild(useCopyTextDom)
      dom = null
    }
    clipboard && clipboard.destroy()
  })

  return {
    copyId: '#useCopyText',
    buttonRef,
  }
}
