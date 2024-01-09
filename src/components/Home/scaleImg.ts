const BoxWidth = 314
const BoxHeight = 500
const ratio = BoxWidth / BoxHeight

interface IFit {
  width: string
  height: string
}
// 缓存数据避免重复请求网络
const cacheData: Record<string, IFit> = {}
export function useAutoFitImage(src: string): IFit {
  if (cacheData[src])
    return cacheData[src]

  const fitImage = reactive<IFit>({
    width: '100%',
    height: '100%',
  })
  const img = new Image()
  img.src = src
  img.onload = () => {
    const imgRatio = img.width / img.height
    if (imgRatio > ratio) {
      fitImage.height = '100%'
      fitImage.width = 'auto'
    }
    else if (imgRatio < ratio) {
      fitImage.height = 'auto'
      fitImage.width = '100%'
    }
    cacheData[src] = fitImage
  }
  return fitImage
}
