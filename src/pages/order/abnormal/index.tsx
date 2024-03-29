import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, InputNumber, message } from 'antd';
import React, { useRef, useState } from 'react';
import { fetchOrderQueryUnusualOrders } from '@/services/order';
import { payTypeEnum } from '@/common/enum';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<OrderListItem[]>([]);

  const columns: ProColumns<OrderListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'channelOrderId',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      hideInSearch: true,
    },
    {
      title: '支付金额',
      dataIndex: 'callNo',
      hideInSearch: true,
      // renderText: (val: string) => `${val}万`,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTimeRange',
      hideInSearch: true,
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
    // {
    //   title: '回调时间',
    //   sorter: true,
    //   dataIndex: 'callbackAt',
    //   valueType: 'dateTimeRange',
    // },
    // {
    //   title: '回调状态',
    //   dataIndex: 'callbackStatus',
    //   hideInSearch: true,
    //   valueEnum: {
    //     1: {
    //       text: '未回调',
    //       status: 'Default',
    //     },
    //     2: {
    //       text: '回调成功',
    //       status: 'Success',
    //     },
    //     3: {
    //       text: '回调失败',
    //       status: 'Error',
    //     },
    //   },
    // },
    // {
    //   title: '订单来源',
    //   dataIndex: 'orderSource',
    //   valueEnum: {
    //     1: {
    //       text: '收银台',
    //       status: 'Default',
    //     },
    //     2: {
    //       text: 'API接口',
    //       status: 'Default',
    //     }
    //   },
    // },
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // handleUpdateModalVisible(true);
            // setCurrentRow(record);
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
    <PageContainer>
      <ProTable<OrderListItem, TableListPagination>
        actionRef={actionRef}
        rowKey="key"
        search={false}
        request={async (
          params,
          sort,
          filter,
        ) => {
          const { data } = await fetchOrderQueryUnusualOrders({
            // current: params.current,
            // pageSize: params.pageSize,
            ...params
          })

          return {
            data: data.records
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Button
            onClick={async () => {
              // await handleRemove(selectedRowsState);
              // setSelectedRows([]);
              // actionRef.current?.reloadAndRest?.();
            }}
          >
            批量补单
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default TableList;
