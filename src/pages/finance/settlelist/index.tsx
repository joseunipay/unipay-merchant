import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { fetchClearApplyQueryClearApplyPage } from '@/services/finance';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // 流水单号 申请金额/预计到账金额/提现手续费率/手续费率/结算手续费/申请时间/状态
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '流水单号',
      dataIndex: 'id',
    },
    {
      title: '申请金额',
      dataIndex: 'id',
    },
    {
      title: '预计到账金额',
      dataIndex: 'grantAmount',
      valueType: 'percent',
      hideInSearch: true,
    },
    // todo
    {
      title: '提现手续费率',
      dataIndex: 'rate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '手续费率',
      dataIndex: 'rate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '结算手续费',
      dataIndex: 'rate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      hideInSearch: true,
      dataIndex: 'applyAt',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '待结算'
        },
        1: {
          text: '结算成功'
        },
        2: {
          text: '结算失败'
        },
        3: {
          text: '冻结中'
        },
      }
    },
  ];

  return (
    <PageContainer title={<></>}>
      <ProTable<TableListItem, TableListPagination>
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
