import type { Ref } from 'vue'

export function useGenPosterQRCode(targetUrl: Ref<string>) {
  const QRCodeWrapperRef = ref<HTMLDivElement>()
  const QRCodeImageSrc = ref<string>()

  async function genQRCode(url: string) {
    const wrapperElem = QRCodeWrapperRef.value
    if (!wrapperElem)
      return

    const width = wrapperElem.clientWidth

    const { default: QRCode } = await import('qrcode')
    const dataUrl = await QRCode.toDataURL(url, {
      width,
      margin: 0,
    })

    QRCodeImageSrc.value = dataUrl
  }

  watch(
    targetUrl,
    async (url) => {
      await nextTick()
      await genQRCode(url)
    },
    {
      flush: 'post',
    },
  )

  return {
    QRCodeWrapperRef,
    QRCodeImageSrc,
  }
}
