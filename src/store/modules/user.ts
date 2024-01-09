import type { IAccountPayload, IMobilePayload } from '~/api/user'
import { userApi } from '~/api/user'
import { FakeAvatars } from '~/constants'
import { GenderEnum } from '~/enums'
import to from 'await-to-js'

interface IUserState {
  token: string | null
  aigcToken: string | null
  loginInfo: IAccountPayload | null

  showGuide: boolean

  basicInfo: {
    id: number | string | null
    gender: number | null
    birthday: string | null | number
    headUrl: string
    mobile: string | null
    username: string
    nickname: string
    phone: string
    superAdmin: 0 | 1
    types: number[]
  }
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    token: null,
    aigcToken: null,
    loginInfo: null,

    showGuide: false,

    basicInfo: {
      birthday: null,
      gender: null,
      id: null,
      mobile: null,
      username: '',
      nickname: '',
      headUrl: '',
      phone: '',
      superAdmin: 0,
      types: [1],
    },
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setShowGuide(showGuide: boolean) {
      this.showGuide = showGuide
    },
    setBasicInfo(basicInfo: Partial<IUserState['basicInfo']>) {
      Object.assign(this.basicInfo, basicInfo)
    },
    setLoginInfo(loginInfo: IAccountPayload | null) {
      this.loginInfo = loginInfo
    },
    async login(payload: IAccountPayload) {
      const [err, res] = await to(userApi.login(payload))

      if (err)
        throw err

      const token = res.data?.data as string
      this.setToken(token)

      this.setLoginInfo(payload)
    },
    async getAIGCToken() {
      const [err, res] = await to(userApi.getAigcToken({
        appCode: 'AI_CHAT',
        appSecret: '1727711409841770496',
      }))
      if (err)
        throw err
      this.aigcToken = res.data.token
    },
    async loginViaMobile(payload: IMobilePayload) {
      const [err, res] = await to(userApi.loginViaMobile(payload))

      if (err)
        throw err

      const token = res.data?.data as string
      this.setToken(token)

      this.setLoginInfo(null)
    },
    async loginViaEmail(payload: IMobilePayload) {
      const [err, res] = await to(userApi.loginViaEmail(payload))

      if (err)
        throw err

      const token = res.data?.data as string
      this.setToken(token)

      this.setLoginInfo(null)
    },

    async registerAuto() {
      const [err, res] = await to(userApi.registerAuto())
      if (err) {
        this.setLoginInfo(null)
        throw err
      }
      else {
        this.token = res.data
      }
    },
    async register(payload: IAccountPayload) {
      const [err] = await to(userApi.register(payload))

      if (err) {
        this.setLoginInfo(null)
        throw err
      }
    },
    async registerViaMobile(payload: IMobilePayload) {
      const [err] = await to(userApi.registerViaMobile(payload))

      if (err) {
        this.setLoginInfo(null)
        throw err
      }
    },
    async getBasicInfo() {
      // const [err, res] = await to(userApi.getBasicInfo())
      // this.getAIGCToken()
      // if (err) {
      //   this.setLoginInfo(null)
      //   throw err
      // }

      // const data = res.data || {}
      this.setBasicInfo({})
    },
    logout() {
      this.$reset()
    },
    getCreator(dlifeId: string): string {
      if (this.basicInfo.id) {
        return this.basicInfo.id as string
      }
      else {
        let cId: any = localStorage.getItem(`chat-creator-${dlifeId}`)
        if (!cId) {
          cId = Math.random().toString().slice(3)
          localStorage.setItem(`chat-creator-${dlifeId}`, cId)
        }
        return cId
      }
    },
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getAigcToken(state) {
      return state.aigcToken
    },
    getAvatar(state) {
      return state.basicInfo.headUrl || FakeAvatars.avatar
    },
    getAge(state) {
      const { birthday } = state.basicInfo
      if (!birthday)
        return '未知'
      const now = new Date()
      const birth = new Date(birthday)
      const age = now.getFullYear() - birth.getFullYear()
      return age
    },
    getNickName(state) {
      const { username, nickname } = state.basicInfo
      return nickname || username || 'Anonymous'
    },
    getPhone(state) {
      return state.basicInfo.phone || '未绑定'
    },
    getId(state) {
      return state.basicInfo.id || '未绑定'
    },
    shouldUpdateProfile(state) {
      return !state.basicInfo.headUrl || !state.basicInfo.birthday
    },
    getShowGuide(state) {
      return state.showGuide
    },
    getGender(state) {
      return state.basicInfo.gender || GenderEnum.man
    },
    isAdmin(state) {
      return state.basicInfo.superAdmin === 1
    },
    isVip(state) {
      return state.basicInfo.types.includes(2)
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'loginInfo',
        paths: 'loginInfo',
        storage: window.localStorage,
        flush: 'async',
      },
      {
        key: 'extraUserState',
        paths: ['token', 'basicInfo', 'aigcToken'],
        storage: window.localStorage,
        flush: 'async',
      },
    ],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
