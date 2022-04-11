import { AxiosRequestConfig } from 'axios';
import { ref, UnwrapRef, Ref } from 'vue';
import { http } from '../utils/http';

export type UseRequestOptions = {
  // 是否立即触发
  immediate?: Boolean;
  // 格式化
  formatResult?: (data: any) => any;
};

export function useRequest<Q = Recordable, R = Recordable>(
  url: string,
  data: Q,
  config?: AxiosRequestConfig & UseRequestOptions,
) {
  const response = ref<R | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const { immediate, formatResult } = config || {};
  const run = (requestBody: Recordable = {}) => {
    loading.value = true;
    const rConfig = (config || {}) as AxiosRequestConfig;
    const mergeBody = { ...data, ...requestBody };
    const ret = http(url, mergeBody, rConfig);
    return ret
      .then((res) => {
        const result = formatResult ? formatResult(res) : res;
        loading.value = false;
        error.value = null;
        response.value = result;
        return response;
      })
      .catch((err) => {
        loading.value = false;
        error.value = err;
        response.value = null;
        return Promise.reject(err);
      });
  };
  if (immediate) {
    run();
  }
  const _response = response as Ref<UnwrapRef<R>>;
  return { data: _response, error, loading, run };
}
