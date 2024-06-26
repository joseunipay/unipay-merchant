import { request } from '@umijs/max';
import { HOST } from '../host'

// 支付订单列表
export async function fetchOrderQueryPayOrders(params: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListApiResult>(`${HOST}/order/queryPayOrders`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 异常订单列表
export async function fetchOrderQueryUnusualOrders(params: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListApiResult>(`${HOST}/order/queryUnusualOrders`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 商户订单统计
export async function fetchOrderMchOrderStatistics(params: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<OrderMatchApiResult>(`${HOST}/order/mchOrderStatistics`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

// 查询订单详情
export async function fetchOrderQueryOrderDetail(params: { orderId: string }, options?: { [key: string]: any }) {
  return request<OrderMatchApiResult>(`${HOST}/order/queryOrderDetail`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

// 查询订单详情
export async function fetchOrderCreateOrder(params: Record<string, any>, options?: { [key: string]: any }) {
  return request<ApiResult>(`${HOST}/order/createOrder`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}