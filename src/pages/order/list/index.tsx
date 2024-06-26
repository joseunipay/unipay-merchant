import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Card, Form, InputNumber, Spin, message } from 'antd';
import React, { Suspense, useRef, useState } from 'react';
import { fetchOrderQueryPayOrders, fetchOrderQueryOrderDetail } from '@/services/order';
import { callbackStatusEnum, orderSourceEnum, orderStatusEnum, payTypeEnum } from '@/common/enum';
import dayjs from 'dayjs';
import { formatAmount } from '@/utils/format';
import Introduce from '../components/Introduce';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<OrderListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderId',
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      // valueType: 'formList',
      renderText(text) {
        return formatAmount(text)
      },
      renderFormItem: () => {
        return (
          <div style={{ display: 'flex' }}>
            <Form.Item name='orderAmount1'>
              <InputNumber />
            </Form.Item>
            <span>-</span>
            <Form.Item name='orderAmount2'>
              <InputNumber />
            </Form.Item>
          </div>
        )
      }
    },
    {
      title: '实际支付金额',
      dataIndex: 'payAmount',
      hideInSearch: true,
      renderText(text) {
        return formatAmount(text)
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTimeRange',
      render: (_, record) => {
        const v = record.createdAt;
        return dayjs(v).format('YYYY-MM-DD')
      }
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueEnum: orderStatusEnum,
      hideInSearch: true,
    },
    {
      title: '回调时间',
      dataIndex: 'callbackAt',
      valueType: 'dateTimeRange',
      render: (_, record) => {
        const v = record.createdAt;
        return dayjs(v).format('YYYY-MM-DD')
      }
    },
    {
      title: '回调状态',
      dataIndex: 'callbackStatus',
      valueEnum: callbackStatusEnum,
      hideInSearch: true,
    },
    {
      title: '订单来源',
      dataIndex: 'orderSource',
      valueEnum: orderSourceEnum,
    },
    {
      title: '通道ID',
      dataIndex: 'channelId',
    },
    {
      title: '通道支付类型',
      dataIndex: 'payType',
      valueEnum: payTypeEnum,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={async () => {
            // handleUpdateModalVisible(true);
            // setCurrentRow(record);

            await fetchOrderQueryOrderDetail({ orderId: record.orderId! })
          }}
        >
          查看
        </a>,
        record.orderStatus === 2 && record.callbackStatus === 3 && record.orderSource === 2 && (
          <a key="subscribeAlert" href="https://procomponents.ant.design/">
            补单
          </a>
        ),
      ],
    },
  ];

  return (
    <PageContainer title={<></>}>
      <Card bordered={false}>
        <Suspense fallback={
          <div style={{ paddingTop: 100, textAlign: 'center' }}>
            <Spin size="large" />
          </div>}>
          <Introduce />
        </Suspense>
        <ProTable<OrderListItem, TableListPagination>
          // headerTitle="查询表格"
          actionRef={actionRef}
          rowKey="orderId"
          search={{
            labelWidth: 120,
          }}
          request={async (
            params,
            sort,
            filter,
          ) => {
            const { data } = await fetchOrderQueryPayOrders({
              // current: params.current,
              // pageSize: params.pageSize,
              ...params
            })

            return {
              data: data.records
            }
          }}
          columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default TableList;
