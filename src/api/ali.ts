import { http } from '~/utils/http'

export const aliApi = {
  /**
   * get audio to text token
   */
  getToken() {
    return http.get<HttpResponse<string>>('/aid/digital-life/aliCloud/token')
  },
  audio2text(pcmBlob: Blob | File, abortController?: AbortController) {
    const body = new FormData()
    body.append('audio', pcmBlob)

    return http.post<HttpResponse<string>>('/sys/ali/speechRecognition', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      signal: abortController?.signal,
    })
  },
}
