declare type Nullable<T> = T | null

declare interface ErrorResponse {
  status: number
  data?: {
    code: number
    /**
     * 错误描述
     */
    msg: string
  }
}

/**
 * 普通的响应数据
 */
declare interface HttpResponse<T = any> {
  code: number
  data?: T
  /**
   * 错误描述
   */
  message: string
  time: number
}

/**
 * 带列表的响应数据
 */
declare interface HttpResponseList<T = any> {
  code: number
  message?: string
  data?: {
    /**
     * 列表数据类对象
     */
    list?: T[]
    /**
     * 总记录数
     */
    total?: number
  }
}

declare interface BasePagePayload {
  /**
   * 请求第几页
   */
  current: number
  /**
   * 每页最大返回数
   */
  pageSize: number
}

declare interface Element {
  style: CSSStyleDeclaration
}
