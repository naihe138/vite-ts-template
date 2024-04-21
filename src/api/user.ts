import type { GenderEnum } from '~/enums'
import type { IDlifeDescriptions, IOnlineAvatar } from '~/types/updateProfile'
import { http } from '~/utils/http'

export interface IProfilePayload {
  headUrl: string
  birthday?: string
  gender: GenderEnum
  nickname?: string | undefined
  prompt?: string
}

export interface IAccountPayload {
  nickname?: string
  username: string
  password: string
  captcha: string
}

export interface IMobilePayload {
  nickname?: string
  password?: string
  username?: string
  mobile: string
  captcha: string
  uuid: string
  mail: string
}

export type IGetCaptchaPayload = Pick<IMobilePayload, 'uuid' | 'mobile' | 'mail'>

export interface IChangePasswordPayload {
  password: string
  newPassword: string
  repeatNewPassword: string
}

export type IResetPasswordPayload = {
  password: string
} & Pick<IMobilePayload, 'uuid' | 'mobile' | 'captcha'>

export const userApi = {
  registerAuto() {
    return http.post('/sys/register/auto')
  },
  login(payload: IAccountPayload) {
    return http.post('/aid/sys/login', payload)
  },
  getAigcToken(payload: { appCode: string    'appSecret': string }) {
    return http.post('/aigc/auth', payload)
  },
  loginViaMobile(payload: IMobilePayload) {
    return http.post('/aid/sys/login/via-mobile', payload)
  },
  loginViaEmail(payload: IMobilePayload) {
    return http.post('/aid/sys/login/via-email', payload)
  },
  register(payload: IAccountPayload) {
    return http.post('/aid/sys/register', payload)
  },
  registerViaMobile(payload: IMobilePayload) {
    return http.post('/aid/sys/register', payload)
  },
  getBasicInfo() {
    return http.get('/sys/user/info')
  },
  updateProfile(payload: IProfilePayload) {
    // return http.post('/aid/sys/login/updateInfo', payload)
    return http.put('/aid/sys/user', payload)
  },
  // 更新信息并创建默认虚拟人，数字分数
  updateProfileWithDefaultDlife(payload: IProfilePayload) {
    return http.put('/aid/digital-life/visualPerson/updateDefaultVisualPerson', payload)
  },
  /**
   * 获取验证码
   */
  getCaptcha(payload: IGetCaptchaPayload) {
    const { uuid, mobile } = payload
    return http.get(`/aid/sys/mobile/captcha?uuid=${uuid}&mobile=${mobile}`)
  },
  /**
   * 获取验邮箱证码
   */
  getEmailCaptcha(payload: IGetCaptchaPayload) {
    const { uuid, mail } = payload
    return http.get(`/aid/sys/mail/captcha?uuid=${uuid}&mail=${mail}`)
  },
  // 账号密码的图形验证码
  getCountCaptcha(payload: IGetCaptchaPayload) {
    const { uuid } = payload
    return http.get(`/aid/sys/captcha?uuid=${uuid}`, {
      responseType: 'arraybuffer',
    })
  },
  changePassword(payload: IChangePasswordPayload) {
    return http.put('/aid/sys/user/password', payload)
  },
  resetPassword(payload: IResetPasswordPayload) {
    return http.put('/aid/sys/account/reset-password', payload)
  },
  // 获取在线头像库
  getOnlineAvatar() {
    return http.get<HttpResponse<IOnlineAvatar>>('/aid/digital-life/dlife-head-icons/queryList')
  },
  // 获取描述
  getDlifeDescriptions() {
    return http.get<HttpResponse<IDlifeDescriptions>>('/aid/digital-life/dlife-settings-descriptions/queryList')
  },
}
