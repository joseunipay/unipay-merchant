import { Base64 } from 'js-base64';

/**
 * 得到token
 */
export function getProjectToken(): string {
  return localStorage.getItem(`${PROJECT_KEY}-token`) || '';
}

/**
 * 清空token
 */
export function rmProjectToken(): void {
  localStorage.removeItem(`${PROJECT_KEY}-token`);
  sessionStorage.removeItem(`${PROJECT_KEY}-lastPathMap`);
  sessionStorage.removeItem(`${PROJECT_KEY}-tabPages`);
}

/**
 * setItem
 * @param {*} value
 */
export function setProjectToken(value: string): void {
  return localStorage.setItem(`${PROJECT_KEY}-token`, value);
}

// 
export function base64encode(value: string): string {
  return Base64.encode(value);
}

/**
 * 获取地址的参数
 * @param {*} href 地址
 * @param {*} needDecode 是否url解码
 * @returns
 */
export const getPageQuery = (href = window?.location?.href, needDecode = true): Record<string, any> => {
  const reg = /([^&=]+)=([\w\W]*?)(&|$|#)/g;
  const { search, hash } = new URL(href);
  const args = [search, hash];
  let obj = {};
  for (let i = 0; i < args.length; i++) {
    const str = args[i];
    if (str) {
      const s = str.replace(/#|\//g, '');
      const arr = s.split('?');
      if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
          let res;
          while ((res = reg.exec(arr[i]))) {
            obj[res[1]] = needDecode ? decodeURIComponent(res[2]) : res[2];
          }
        }
      }
    }
  }
  return obj;
};