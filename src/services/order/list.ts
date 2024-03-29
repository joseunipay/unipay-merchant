import { request } from '@umijs/max';
import { HOST } from '../host'

// 支付订单列表
export async function fetchOrderQueryPayOrders(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${HOST}/order/queryPayOrders`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 异常订单列表
export async function fetchOrderQueryUnusualOrders(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${HOST}/order/queryUnusualOrders`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
