import {
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Card, Spin, message } from 'antd';
import { Suspense, type FC } from 'react';
import { fakeSubmitForm } from './service';
import useStyles from './style.style';
import IntroduceRow from './IntroduceRow';
import { fakeChartData } from '@/pages/dashboard/analysis/service';
const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });
  const { loading, data } = useRequest(fakeChartData);
  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };
  return (
    <PageContainer title={<></>}>
      <Card bordered={false}>
        <Suspense fallback={
          <div style={{ paddingTop: 100, textAlign: 'center' }}>
            <Spin size="large" />
          </div>}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} />
        </Suspense>
        <div>
          <h3>商户结算手续费=结算金额*比例手续费+固定手续费</h3>
          <div>如：申请结算10000元，手续费1%，固定手续费10元。</div>
          <div>综合手续费=10000*1%+10 为110元</div>
        </div>
        <ProForm
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormDigit
            label='申请结算金额'
            name="applyAmount"
            placeholder="请输入"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `¥${value || 0}`,
              parser: (value) => Number(value ? value.replace('¥', '') : '0'),
            }}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default BasicForm;
