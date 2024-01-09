import type { RoleEnum } from '~/enums/roleEnum'

interface IBaseMessage {
  id: string
  time: number | string | Date
  content: string
  type: 'text' | 'audio'
  /**
   * 是否是自己发出去的消息
   */
  self: 0 | 1
  /**
   * 消息的头像
   */
  avatar: string
  /**
   * 发送人
   */
  sender: string
  /**
   * 发送对象（发送给谁）
   */
  to: string | number | null
  /**
   * 当前消息是否是一条有错误的消息
   */
  hasError?: boolean
  /**
   * 当前消息的视频连接
   */
  videoUrl?: string
  /**
   * 是否显示小红点
   */
  dot?: number
  /**
   * 是否是一个假的、占位消息
   */
  dummy?: boolean
  /**
   * 数字生命物的 id
   */
  visualPersonId?: number | string | null

  /**
   * 是否正在转换为文字
   */
  isAudio2TextPending?: 0 | 1

  /**
   * 已读未读状态 1 已读 0 未读，默认已读
   */
  readStatus?: 0 | 1

  /**
   * 是否正在保存到服务器
   */
  isSaveIntoServer?: boolean
  /**
   * 是否正在生成视频
   */
  isGenVideo?: boolean

  /**
   * 是否正在 gpt 回复
   */
  isChatCompletion?: boolean

  /**
   * 是否在走整个流程
   */
  isPending?: boolean
}

export interface ITextMessage extends IBaseMessage {
  type: 'text'
}

/**
 * 本地消息的类型
 */
export interface IAudioMessage extends IBaseMessage {
  type: 'audio'
  /**
   * 语音消息的地址
   */
  audioUrl?: string | null
  /**
   * 语音消息的 Blob
   */
  audioBlob?: Blob
  /**
   * 是否已经转换为文字
   */
  hasTranscribed?: 0 | 1
  /**
   * 语音消息的时长
   */
  duration?: number
}

/**
 * both text and audio message
 */
export type IMessage = ITextMessage | IAudioMessage

/**
 * 用于发送到 chat gpt 的消息
 */
export interface IGptMessage {
  role: RoleEnum
  content: string
}
