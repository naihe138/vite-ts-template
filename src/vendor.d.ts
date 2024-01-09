import type { ToastWrapperInstance } from 'vant/es/toast/types'

export declare global {
  export type ILoading = ToastWrapperInstance
}

declare module 'ai/vue' {
  /**
   * Shared types between the API and UI packages.
   */
  type OldMessage = {
    id: string
    createdAt?: Date
    content: string
    role: 'system' | 'user' | 'assistant' | 'function'
    /**
     * If the message has a role of `function`, the `name` field is the name of the function.
     * Otherwise, the name field should not be set.
     */
    name?: string
    /**
     * If the assistant role makes a function call, the `function_call` field
     * contains the function call name and arguments. Otherwise, the field should
     * not be set.
     */
    function_call?: string | ChatCompletionRequestMessageFunctionCall
  }

  export interface Message extends OldMessage {
    time?: number | string | Date
    type?: 'text' | 'audio' | 'card'
    audioLoading?: boolean
    /**
     * 是否是自己发出去的消息
     */
    self?: 0 | 1
    /**
     * 消息的头像
     */
    avatar?: string
    /**
     * 发送人
     */
    sender?: string
    /**
     * 发送对象（发送给谁）
     */
    to?: string
    /**
     * 当前消息的视频连接
     */
    videoUrl?: string
    /**
     * 是否显示小红点
     */
    dot?: number
    isPending?: boolean
    visualPersonId?: string

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
    creator?: string
    imageUrl?: string
    contentIds?: string[]
  }
}

export {}
