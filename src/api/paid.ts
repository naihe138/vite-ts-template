import { http } from '~/utils/http'

export const paidApi = {
  createPayUrl(payload: IPayUrl) {
    return http.post<{ code: number; data: string }>('/pay/stripe/session/create', payload)
  },
}

// Generated by https://quicktype.io

export interface IMemberList {
  code: number
  msg: string
  data: IMemberListItem[]
}

export interface IMemberListItem {
  id: string
  product: string
  title: string
  payChannel: string
  creator: string
  createDate: number
  updater: null
  updateDate: null
  memberType: string
  price: number
  description: string
  sort: null
}

// Generated by https://quicktype.io

export interface IPayUrl {
  mode: string
  metadata: MetadataItem
  success_url: string
  cancel_url: string
  line_items: LineItem[]
}

export interface LineItem {
  quantity: number
  price: string
}

export interface MetadataItem {
  user_id: string
  price: string
}

// Generated by https://quicktype.io

export interface IPayInfo {
  code: number
  data: IPayInfoData
  msg: string
}

export interface IPayInfoData {
  chatStatistics: number
  chatVisualPersonStatistics: number
  createDate: string
  creator: number
  id: number
  membershipActive: boolean
  membershipEndDate: string
  membershipStartDate: string
  updateDate: string
  updater: number
}