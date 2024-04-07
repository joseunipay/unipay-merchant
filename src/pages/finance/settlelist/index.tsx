import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, { Suspense, useRef, useState } from 'react';
import { fetchClearApplyQueryClearApplyPage } from '@/services/finance';
import { Card, Spin } from 'antd';
import Introduce from '../components/Introduce';
import { formatAmount } from '@/utils/format';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // 流水单号 申请金额/预计到账金额/提现手续费率/手续费率/结算手续费/申请时间/状态
  const columns: ProColumns<SettleListItem>[] = [
    {
      title: '流水单号',
      dataIndex: 'id',
    },
    {
      title: '申请金额',
      dataIndex: 'applyAmount',
      renderText: value => formatAmount(value)
    },
    {
      title: '预计到账金额',
      dataIndex: 'grantAmount',
      renderText: value => formatAmount(value)
    },
    {
      title: '提现手续费率',
      dataIndex: 'withdrawRate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '手续费率',
      dataIndex: 'serviceChargeRate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '结算手续费',
      dataIndex: 'clearChargeRage',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      dataIndex: 'applyAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '待结算',
          status: 'Default',
        },
        1: {
          text: '结算成功',
          status: 'Success',
        },
        2: {
          text: '结算失败',
          status: 'Error',
        },
        3: {
          text: '冻结中',
          status: 'Default',
        },
      }
    },
  ];

  return (
    <PageContainer title={<></>}>
      <Card>
        <Introduce />
        <ProTable<SettleListItem, TableListPagination>
          actionRef={actionRef}
          rowKey="key"
          search={false}
          request={async (
            params,
            sort,
            filter,
          ) => {
            const { data } = await fetchClearApplyQueryClearApplyPage({
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
