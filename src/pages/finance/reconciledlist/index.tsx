import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Form, InputNumber, Switch, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { fetchClearApplyQueryMchFundCheckPage } from '@/services/finance';
import { payTypeEnum } from '@/common/enum';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // 对账时间 ,通道ID,支付类型,订单数,支付订单数,成功率,订单金额,结算金额
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '通道ID',
      dataIndex: 'channelId',
    },
    {
      title: '支付类型',
      dataIndex: 'payType',
      valueType: 'select',
      valueEnum: payTypeEnum,
      hideInSearch: true,
    },
    {
      title: '订单数',
      dataIndex: 'orderSum',
      hideInSearch: true,
    },
    {
      title: '支付订单数',
      dataIndex: 'orderSuccessCount',
      // valueType: 'percent',
      hideInSearch: true,
    },
    // todo
    {
      title: '成功率',
      dataIndex: 'orderSuccessRate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'orderSumAmount',
      // valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '结算金额',
      dataIndex: 'checkedAt',
      // valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '对账时间',
      dataIndex: 'checkedAt',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer title={<></>}>
      <ProTable<TableListItem, TableListPagination>
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (
          params,
          sort,
          filter,
        ) => {
          const { data } = await fetchClearApplyQueryMchFundCheckPage({
            // current: params.current,
            // pageSize: params.pageSize,
            ...params
          })

          return {
            data: data.records
          }
        }}
        columns={columns}
      // rowSelection={{
      //   onChange: (_, selectedRows) => {
      //     setSelectedRows(selectedRows);
      //   },
      // }}
      />
    </PageContainer>
  );
};

export default TableList;
