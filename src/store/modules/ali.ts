import { showFailToast } from 'vant'
import { aliApi } from '~/api/ali'

interface IAliState {
  /**
   * 阿里云语音转文字的 accessToken
   */
  audio2TextToken: string | null

  abortController: null | AbortController
}

export const useAliStore = defineStore('aliStore', {
  state: (): IAliState => ({
    audio2TextToken: null,
    abortController: null,
  }),
  actions: {
    async fetchToken() {
      const [err, res] = await to(aliApi.getToken())
      if (err)
        throw err

      this.audio2TextToken = res.data || null
    },
    async audio2text(audioBlob: Blob | File) {
      if (!audioBlob)
        return ''

      this.abortController = new AbortController()
      const [err, res] = await to(aliApi.audio2text(audioBlob, this.abortController))
      this.abortController = null

      if (err) {
        showFailToast(err.message)
        return ''
      }

      const content = res.data || ''
      return content
    },
    abortAudio2text() {
      this.abortController?.abort()
    },
  },
  getters: {
    token(state) {
      return state.audio2TextToken
    },
  },
})
