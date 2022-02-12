/**
 * 获取当前环境
 * @return { string } env
 */
type IEnvs = 'dev' | 'sit' | 'uat' | 'prd';
export function getEnv(): IEnvs {
  const path = window.location.pathname;
  if (path.indexOf('devapp') > -1) {
    return 'dev';
  } else if (path.indexOf('sitapp') > -1) {
    return 'sit';
  } else if (path.indexOf('uatapp') > -1) {
    return 'uat';
  }
  return 'prd';
}

/**
 * 获取cookie
 * @param { string } key cookie名字
 * @return { string } cookie值
 */
export function getCookie(key: string): string | null {
  var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  var arr = document.cookie.match(reg);

  if (arr) {
    return arr[2];
  }

  return null;
}

/**
 * 设置cookie
 * @param { string } key cookie名字
 * @param { string } value cookie值
 * @param { object } options 配置
 */
export function setCookie(key: string, value: string, options?: Recordable): void {
  var opts = options || {};
  var date;

  if (!value) {
    opts.expires = -1;
  }

  if (typeof opts.expires === 'number') {
    date = new Date();
    opts.expires *= 1000;
    date.setTime(date.getTime() + opts.expires);
  }

  document.cookie = [
    encodeURIComponent(key) + '=' + encodeURIComponent(value),
    opts.expires ? '; expires=' + date.toUTCString() : '',
    '; path=' + (opts.path || '/'),
    opts.domain ? '; domain=' + opts.domain : '',
    opts.secure ? '; secure' : '',
  ].join('');
}

/**
 * 删除cookie
 * @param { string } key cookie名字
 */
export function delCookie(key) {
  setCookie(key, '');
}

/**
 * 获取localStorage
 * @param { string } key 键
 */
export function getLocalStorage(key: string) {
  let res: object | string = '';
  try {
    res = JSON.parse(localStorage.getItem(key) as string);
  } catch (err) {
    console.error(err);
  }
  return res;
}

/**
 * 设置localStorage
 * @param { string } key 键
 * @param { string | object } value 值
 */
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 删除localStorage
 * @param { string } key 键
 */
export function delLocalStorage(key) {
  localStorage.removeItem(key);
}

/**
 * 获取sessionStorage
 * @param { string } key 键
 */
export function getSessionStorage(key: string) {
  return JSON.parse(sessionStorage.getItem(key) || '');
}

/**
 * 设置sessionStorage
 * @param { string } key 键
 * @param { string | object } value 值
 */
export function setSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * 删除sessionStorage
 * @param { string } key 键
 */
export function delSessionStorage(key) {
  sessionStorage.removeItem(key);
}

/**
 * 获取 url query
 * @param { string } name query名称
 * @param { string } url 链接
 * @return { string } query
 */
export function getUrlQuery(name, url) {
  url = url || window.location.href;
  var urlDropHash = url.split('#')[0];
  var query = urlDropHash.split('?')[1] || '';
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = query.match(reg);

  if (r) {
    return decodeURIComponent(r[2]);
  }

  return null;
}

/**
 * 获取当前微信环境
 * type: 0 非微信; 1 公众号环境; 2 小程序环境
 */
let type = -1;
export const getBrowserEnv = () => {
  if (type !== -1) {
    return type;
  } else {
    const USER_AGENT = window.navigator.userAgent.toLowerCase();
    const IS_WECHAT = USER_AGENT.indexOf('micromessenger') > -1;
    const ready = function ready() {
      type = window.__wxjs_environment === 'miniprogram' ? 2 : 1;
    };
    if (IS_WECHAT) {
      // 判断是否在微信里面
      if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
        window.document.addEventListener('WeixinJSBridgeReady', ready, false);
      } else {
        ready();
      }
    } else {
      type = 0;
    }
  }
};
