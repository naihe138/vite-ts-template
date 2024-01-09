import { showToast } from 'vant'
import { useUserStore } from '~/store'
import { getBrowserLang } from '~/utils/tools'

const { isEnglish } = getBrowserLang()
/**
 * 当用户点击的时候检查是否有token，没有token跳转登录页面
 * @returns fn
 */
export const useNeedToLogin = () => {
  const userStore = useUserStore()
  const router = useRouter()
  const token = userStore.getToken
  const needToLogin = (): boolean => {
    if (!token) {
      showToast({
        position: 'top',
        message: isEnglish ? 'Please log in' : '请您登录',
      })
      userStore.logout()
      router.push('/login')
    }
    return !!token
  }
  return needToLogin
}
