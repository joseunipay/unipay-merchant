import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, InputNumber, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { fetchOrderQueryUnusualOrders } from '@/services/order/list';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
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
      valueEnum: {
        1: {
          text: '支付宝H5',
          status: 'Default',
        },
        2: {
          text: '支付宝扫码',
          status: 'Default',
        },
        3: {
          text: '微信H5',
          status: 'Default',
        },
        4: {
          text: '微信扫码',
          status: 'Default',
        },
        5: {
          text: '云闪付H5',
          status: 'Default',
        },
        6: {
          text: '云闪付扫码',
          status: 'Default',
        },
        7: {
          text: 'QQ钱包',
          status: 'Default',
        },
        8: {
          text: '京东钱包',
          status: 'Default',
        },
        9: {
          text: '百度钱包',
          status: 'Default',
        },
        10: {
          text: '数字货币（OTC）',
          status: 'Default',
        },
        11: {
          text: '银联快捷',
          status: 'Default',
        },
        12: {
          text: '银联扫码',
          status: 'Default',
        }
      },
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
      <ProTable<TableListItem, TableListPagination>
        // headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       handleModalVisible(true);
        //     }}
        //   >
        //     <PlusOutlined /> 新建
        //   </Button>,
        // ]}
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
