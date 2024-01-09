import type { IMessage } from './message'
import type { GenderEnum, PublicEnum } from '~/enums'

export interface IDlife {
  id?: string

  sort?: number
  creator?: string
  name: string | undefined
  gender: GenderEnum
  age: number | undefined
  picture: string | undefined
  relation?: string | undefined
  hometown?: string | undefined
  background?: string | undefined
  createDate?: number
  type?: string
  /**
   * 称谓
   */
  appellation?: string

  /**
   * 信息补充
   */
  extraInfo?: string

  /**
   * chat gpt prompt
   */
  prompt?: string

  /**
   * 其他描述
   */
  description?: string | undefined
  voice?: string[]
  /**
   * 视频等其他资料
   */
  profile?: string[]

  /**
   * 视频生成开关
   */
  generateVideoSwitch?: boolean

  libraryName: string
  libraryId: string
  dlifeAvatar: string
}

export type IHotDlife = IDlife & {
  chatCount: number
  memoryCount: number
}

/**
 * 创建回忆
 */
export interface ICreateMemories {
  /**
   * 回忆的标题
   */
  title: string
  /**
   * 回忆的描述
   */
  description?: string
  /**
   * 是否公开
   */
  isPublic?: PublicEnum
  /**
   * 回忆选中的消息列表
   */
  messages: IMessage[]
  /**
 * 回忆的类型
 */
  type: 'video' | 'text'
  /**
   * 数字生命物的 id
   */
  visualPersonId: number | string | null
}

/**
 * 回忆列表
 */
export interface IMemories {
  id: number | string
  /**
   * 回忆的标题
   */
  title: string
  creator?: string
  /**
   * 回忆的描述
   */
  description?: string
  /**
   * 是否公开
   */
  isPublic?: PublicEnum
  /**
   * 回忆的类型
   */
  type: 'video' | 'text'
  /**
   * 回忆的消息
   */
  messageIds?: string[]
  messages?: IMessage[]
  /**
   * 如果 type 是 video，那么这里就是视频的地址
   */
  videoUrl?: string
  /**
   * 需要 YYYY-MM-DD HH:mm:ss 格式
   */
  createDate?: string | Date | number
  visualPersonId?: string | null

  dlifeName?: string
  dlifeAvatar?: string
  pulisherName?: string
  pulisherAvatar?: string
}

/**
 * 发现广场
 */
export interface ICreateDiscoverySquare {
  publisherId: number | string
  publisherAvatar: string
  publisherName: string
  /**
   * 发现广场的来源,是否是数字生命、用户自己创建的
   */
  source?: 'dlife' | 'user'
  /**
   * 发现广场的标题
   */
  title: string
  /**
   * 发现广场 媒体内容，可以选择多个，以及 图片、视频、音频
   */
  medias: {
    /**
     * 媒体的类型
     */
    type: 'image' | 'video' | 'audio'
    /**
     * 媒体的地址
     */
    source: string
  }[]
  /**
   * 发现广场的回忆列表
   */
  memoiryIds: string[]
  visualPersonId?: number | string | null
}

/**
 * 发现广场 列表
 */
export interface IDiscoverySquare {
  /**
   * 发现广场的来源,是否是数字生命、用户自己创建的
   */
  source?: 'dlife' | 'user'
  id: number | string
  publisherId: number | string
  dlifeName?: string
  dlifeAvatar?: string
  publisherAvatar: string
  publisherName: string
  publishedDate: string | Date | number
  /**
   * 发现广场的标题
   */
  title: string
  /**
   * 发现广场 媒体内容，可以选择多个，以及 图片、视频、音频
   */
  medias: {
    /**
       * 媒体的类型
       */
    type: 'image' | 'video' | 'audio'
    /**
       * 媒体的地址
       */
    source: string
  }[]
  /**
     * 发现广场的回忆列表(详情实体)
     */
  memories: IMemories[]
  memoiryIds: string[]
  /**
   * 点赞数
   */
  likeCount?: number
  /**
   * 分享数
   * */
  shareCount?: number
  /**
   * 评论数
   * */
  commentCount?: number

  /**
   * 是否点过赞
   */
  like: boolean
  visualPersonId: string
  lang?: string
}

export interface IComment {
  like?: boolean
  /**
   * 发现Id
   */
  discoveryId?: number | string
  /**
   * 评论文字
   */
  commentText: string
  /**
   * 评论用户的头像
   */
  commentUserAvatar: string
  /**
   * 评论用户的昵称
   */
  commentUserName: string
  /**
   * 时间
   */
  createDate: number
  /**
   * 点赞数
   */
  likeCount: number
  /**
   * 评论的id
   */
  id: number | string
  /**
   * 父级评论的id
   */
  parentId: number | null | string
  /**
   * 被回复的人的id
   */
  replyUserId?: number
  /**
   * 被回复的人的头像
   */
  replyUserAvatar?: string
  /**
   * 被回复的人的昵称
   */
  replyUserName?: string
}

export type ICreateComment = Omit<IComment, 'id' | 'createDate' | 'likeCount'>

export type ICommentTreeNode = IComment & {
  reply?: ICommentTreeNode[]
  level: number
}

export interface IHydrationData {
  raw: any
  qrcodeContent: string
  lang?: string
}

export interface ITopicCreate {
  backgroundImageUrl: string
  bannerImageUrl: string
  themeName: string
  visualPersonIds: string[]
}

export interface ITopicData {
  backgroundImageUrl: string
  bannerImageUrl: string
  createDate: string
  creator: number
  delFlag: number
  id: string
  themeName: string
  updateDate: string
  updater: number
  visualPersonIds: any[]
  visualPersonList: any[]
  description: string
}

export interface ILibrary {
  page: string
  limit: string
  orderField: null
  order: null
  libraryName: null
  description: string
  userId: null
  id: string
  visualPersonId: null
  enableDocumentAnnotate: null
}
