import axios from 'axios'
import { getBrowserLang } from './tools'

interface IPhoneItem {
  phone: string
  nameCn: string
  nameEn: string
}

export type TIPhoneItem = Record<string, IPhoneItem>
export type IPhoneColumn = { text: string, value: string }[]
const { isEnglish } = getBrowserLang()
let cacheColumns: IPhoneColumn = null as any
let cachePhonePrefixData: TIPhoneItem = null as any
const VITE_BASE_LOCAL_URL = import.meta.env.VITE_BASE_LOCAL_URL
export const getPhonePrefixData = async () => {
  if (cacheColumns) {
    return {
      cacheColumns,
      cachePhonePrefixData,
    }
  }

  const { data } = await axios.get<any>(`${VITE_BASE_LOCAL_URL}json/phone.json`)
  cacheColumns = Object.keys(data).map((k) => {
    const item = data[k]
    return { text: isEnglish ? item.nameEn : item.nameCn, value: item.phone }
  })
  cachePhonePrefixData = data
  return {
    cacheColumns,
    cachePhonePrefixData,
  }
}
