import { showLoadingToast } from 'vant'
import { useUserStore } from '~/store'

export function useAutoRefreshToken() {
  const userStore = useUserStore()
  const isRefreshing = ref(true)
  if (userStore.getToken && userStore.getId) {
    isRefreshing.value = false
    userStore.getBasicInfo()
    return
  }

  const refreshToken = async () => {
    const loading = showLoadingToast({
      message: 'Trying login', // '正在尝试自动登录',
      forbidClick: true,
      duration: 0,
    })

    // try {
    //   await userStore.registerAuto()
    //   await userStore.getBasicInfo()
    // }
    // catch (err) {
    //   // @ts-expect-error ignore
    //   showFailToast(err.message)
    // }
    // finally {
    //   loading.close()
    //   isRefreshing.value = false
    // }
    loading.close()
    isRefreshing.value = false
  }

  refreshToken()

  return isRefreshing
}
