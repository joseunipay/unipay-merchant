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
  console.log(PROJECT_KEY, 'PROJECT_KEY')
  return localStorage.setItem(`${PROJECT_KEY}-token`, value);
}