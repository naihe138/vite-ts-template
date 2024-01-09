import type { Message } from 'ai'

export interface IChatMessage extends Message {
  type: 'text' | 'audio'
  time: number | string | Date
  /**
   * 是否是自己发出去的消息，0：不是，1：是
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
   * 是否显示小红点
  */
  dot?: number
  /**
    * 数字生命物的 id
  */
  visualPersonId?: string | null

  /**
   * 当前消息的视频链接
   */
  videoUrl?: string
  /**
   * 是否在生成视频
   */
  isGenVideo?: boolean
  /**
   * 生成视频的 AbortController
   */
  genVideoAbortController?: AbortController | null

  // audio 类型的消息
  /**
   * 是否正在转换为文字
  */
  isAudio2TextPending?: 0 | 1
  /**
   * 语音转文字的 AbortController
   */
  audio2TextAbortController?: AbortController | null
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
