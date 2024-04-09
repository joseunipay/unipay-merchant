import { UploadOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button, Input, message, Upload, QRCode } from 'antd';
import useStyles from './index.style';
import { googleAuthBarcode, updateCurrentUserBaseInfo } from '@/services/ant-design-pro/api';
import avatarImg from '../../../../../public/defava_m.png';
// import userWrapper from '@/utils/userStorageWrapper';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const isDev = process.env.NODE_ENV === 'development';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

const BaseView: React.FC = () => {
  const { styles } = useStyles();

  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser, fetchUserInfo } = initialState || {};

  const [showGoogleAuth, setShowGoogleAuth] = useState<boolean>(!!currentUser!.enableGoogleAuth ??false);


  const { data: authBarcode } = useRequest(googleAuthBarcode);

  const handleFinish = async (values: Record<string, any>) => {
    if (isDev) console.log('googleBarcode:', authBarcode);
    const { code, msg } = await updateCurrentUserBaseInfo({
      avatarUrl: values.avatarUrl,
      realname: values.realname,
      sex: values.sex,
      enableGoogleAuth: showGoogleAuth ? 1 : 0,
      verifyCode: values.verifyCode,
      googleBarcode: authBarcode,
    });
    if (code == '0') {
      message.success('更新基本信息成功');
      // userWrapper.cleanUserSession();

      const currentUser = await fetchUserInfo!();
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser }));
      });
      
      // userWrapper.setUserSession(newCurrentUser??{});
    } else {
      message.error(msg);
    }
  };

  const onChange = (checked: boolean) => {
    setShowGoogleAuth(checked);
  };

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <ProForm
          layout="vertical"
          onFinish={handleFinish}
          submitter={{
            searchConfig: {
              submitText: '更新基本信息',
            },
            render: (_, dom) => dom[1],
          }}
          initialValues={{
            ...currentUser
          }}
          hideRequiredMark
        >
          <ProFormText
            width="md"
            name="realname"
            label="真实姓名"
            rules={[
              {
                required: true,
                message: '请输入您的真实姓名!',
              },
            ]}
          />

          <ProFormRadio.Group
            options={[
              {
                value: 0,
                label: '未知',
              },
              {
                value: 1,
                label: '男',
              },
              {
                value: 2,
                label: '女',
              },
            ]}
            label="性别"
            name="sex"
          />

          <ProFormSwitch width="md" name='enableGoogleAuth' label='开启谷歌验证' fieldProps={{
            defaultChecked: false,
            checkedChildren: '开启',
            unCheckedChildren: '关闭',
            onChange: onChange
          }}
          //initialValue={currentUser?currentUser.enableGoogleAuth:0}
          />
          {showGoogleAuth ? (
            <ProForm.Item label='请使用google身份验证器扫描'>
              <QRCode value={authBarcode} />
              <ProFormText
                width="md"
                name="verifyCode"
                label="google验证码"
                rules={[
                  {
                    required: showGoogleAuth,
                    message: '请输入google验证码',
                  },
                ]}
              />
            </ProForm.Item>
          ) : null}
        </ProForm>
      </div>
      <div className={styles.right}>
        <AvatarView />
      </div>
    </div>
  );
};

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = () => {
  const { styles } = useStyles();
  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatarImg} alt="avatar" />
      </div>
      {/* <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload> */}
    </>
  )
};
export default BaseView;
