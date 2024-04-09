// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { HOST } from '../host'

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(`${HOST}/current/user`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateCurrentUserBaseInfo(params: {
  avatarUrl: string, 
  realname: string, 
  sex: string, 
  enableGoogleAuth: 0 | 1,
  verifyCode: number;
  googleBarcode?: string;
}): Promise<{code: string, msg: string}>{
  return request(`${HOST}/current/user`,{
    method: 'PUT',
    params: {
      ...params,
    },
  });
}

export async function updateCurrentUserPwd(params: {originalPwd: string, confirmPwd: string}): Promise<{code: string, msg: string}>{
  return request(`/${HOST}/current/modifyPwd`,{
    method: 'PUT',
    params: {
      ...params,
    },
  });
}

/** 登录接口 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<ApiResult>(`${HOST}/anon/auth/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 退出登录接口 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${HOST}/current/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function googleAuthBarcode() {
  return request<Record<string, any>>('/api/current/googleAuthBarcode', {
    method: 'GET',
  });
}

// /** 登录接口 POST /api/login/account */
// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
//   return request<API.LoginResult>('/api/login/account', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }


/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
