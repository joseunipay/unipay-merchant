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
import { Form, InputNumber, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { fetchOrderQueryPayOrders } from '@/services/order/list';
import { payTypeEnum } from '@/common/enum';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'channelOrderId',
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      // valueType: 'formList',
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
      dataIndex: 'callNo',
      sorter: true,
      hideInSearch: true,
      // renderText: (val: string) => `${val}万`,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createdAt',
      valueType: 'dateTimeRange',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '已创建',
          status: 'Default',
        },
        2: {
          text: '已支付',
          status: 'Success',
        },
        3: {
          text: '支付超时',
          status: 'Error',
        },

      },
    },
    {
      title: '回调时间',
      sorter: true,
      dataIndex: 'callbackAt',
      valueType: 'dateTimeRange',
    },
    {
      title: '回调状态',
      dataIndex: 'callbackStatus',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '未回调',
          status: 'Default',
        },
        2: {
          text: '回调成功',
          status: 'Success',
        },
        3: {
          text: '回调失败',
          status: 'Error',
        },
      },
    },
    {
      title: '订单来源',
      dataIndex: 'orderSource',
      valueEnum: {
        1: {
          text: '收银台',
          status: 'Default',
        },
        2: {
          text: 'API接口',
          status: 'Default',
        }
      },
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
        search={{
          labelWidth: 120,
        }}
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
