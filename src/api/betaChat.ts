import { http } from '~/utils/http'

export const betaChatApi = {
  getList() {
    return http.get<IList>('/sys/ai/psy/chat/suggestAi')
  },
  detail(id: string) {
    return http.get<IListDetail>(`/sys/ai/psy/${id}`)
  },
}

export interface IList {
  code: number
  msg: string
  data: IListItem[]
}

export interface IListDetail {
  code: number
  msg: string
  data: IListItem
}

export interface IListItem {
  id: string
  name: string
  prompt: string
  remark: string
  photos: string[]
  status: number
  creator: string
  createDate: string
  requestCount: null
  pluginIds: any[]
  pluginNames: null
  aiType: number
  assort: string
  labels: string[]
  chatUserCount: null
  greetings: any[]
  field: string
  gptConfig: null
  vcn: string
  prePluginId: null
  containChatContent: boolean
  containRentMood: boolean
  suggest: number
  background: null | string
  userType: number
}
