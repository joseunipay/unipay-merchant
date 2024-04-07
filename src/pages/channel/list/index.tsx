import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Switch, message } from 'antd';
import React, { useRef, useState } from 'react';
import { fetchMerchantChannelQueryMerchantChannelPage, fetchMerchantChannelUpdateMerchantChannel, fetchCashierConfigQueryCashierConfigs } from '@/services/channel/list';
import { payTypeEnum } from '@/common/enum';
import { history, useRequest } from '@umijs/max';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleStatusChange = async (info: ChannelListItem) => {
    const params = {
      channelId: info.channelId,
      status: ~info.status + 2,
      id: info.id,
    }

    await fetchMerchantChannelUpdateMerchantChannel(params);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    message.success('操作成功')
  }

  const columns: ProColumns<ChannelListItem>[] = [
    {
      title: '通道ID',
      dataIndex: 'channelId',
    },
    {
      title: '支付类型',
      dataIndex: 'payType',
      valueEnum: payTypeEnum,
    },
    {
      title: '通道状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '停用'
        },
        1: {
          text: '启用'
        },
      },
      render: (_, record) => {
        return <Switch value={!!record.status} onChange={() => handleStatusChange(record)} />
      }
    },
    {
      title: '费率',
      dataIndex: 'rate',
      valueType: 'percent',
      hideInSearch: true,
    },
    
    {
      title: '开启时间',
      hideInSearch: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
    },
    // {
    //   title: '订单状态',
    //   dataIndex: 'orderStatus',
    //   hideInSearch: true,
    //   valueEnum: {
    //     1: {
    //       text: '已创建',
    //       status: 'Default',
    //     },
    //     2: {
    //       text: '已支付',
    //       status: 'Success',
    //     },
    //     3: {
    //       text: '支付超时',
    //       status: 'Error',
    //     },

    //   },
    // },
    {
      title: '通道金额',
      dataIndex: 'amountConfig',
      hideInSearch: true,
      // renderText: (val: string) => `${val}万`,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // handleUpdateModalVisible(true);
            // setCurrentRow(record);
            // run({
            //   channelId: record.channelId
            // })
            history.push(`/cashier?channelId=${record.id}`)
          }}
        >
          通道测试
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<ChannelListItem, TableListPagination>
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
          const { data } = await fetchMerchantChannelQueryMerchantChannelPage({
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
