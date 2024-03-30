import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, { Suspense, useRef, useState } from 'react';
import { fetchClearApplyQueryMchFundCheckPage } from '@/services/finance';
import { payTypeEnum } from '@/common/enum';
import { Card, Spin } from 'antd';
import IntroduceRow from '../components/IntroduceRow';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ReconciledListItem>[] = [
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
      dataIndex: 'channelClearAmount',
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
      <Card bordered={false}>
        <Suspense fallback={
          <div style={{ paddingTop: 100, textAlign: 'center' }}>
            <Spin size="large" />
          </div>}>
          <IntroduceRow loading={false} />
        </Suspense>
        <ProTable<ReconciledListItem, TableListPagination>
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
        />
      </Card>
    </PageContainer>
  );
};

export default TableList;
