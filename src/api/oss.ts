// const isDev = import.meta.env.DEV
import axios from 'axios'

// export const ossApi = {
//   upload(file: File) {
//     const formData = new FormData()
//     formData.append('file', file)
//     // TODO: 此处后续需要修改 不是固定以 api 开头
//     return http.post<HttpResponse<string>>(`${isDev ? '/api' : ''}/aip/file/ali/file/upload`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       timeout: 2 * 60 * 1000,
//     })
//   },
// }

// const isDev = import.meta.env.DEV
export const ossApi = {
  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    // TODO: 此处后续需要修改 不是固定以 api 开头
    // return http.post<HttpResponse<string>>('/aip/file/ali/file/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   timeout: 2 * 60 * 1000,
    // })

    return axios.post<HttpResponse<string>>(`${import.meta.env.VITE_BASE_API_URL}/oss/ali/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 2 * 60 * 1000,
    })
  },
}
