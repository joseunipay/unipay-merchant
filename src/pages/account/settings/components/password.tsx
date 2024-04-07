import { Button, Input, message, Upload } from 'antd';
import React, { useState } from 'react';
import useStyles from './index.style';
import {
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
// import userWrapper from '@/utils/userStorageWrapper';
import { stringify } from 'querystring';
import { history } from '@umijs/max';
import { base64encode, rmProjectToken } from '@/utils/utils';
import { updateCurrentUserPwd } from '@/services/ant-design-pro/api';

const PasswordView: React.FC = () => {
  const { styles } = useStyles();
  const handleFinish = async (values: Record<string, any>) => {
    if(values.originalPwd === values.newPwd){
      message.error('原密码与新密码不能相同');
      return;
    }
    if(values.newPwd != values.confirmPwd){
      message.error('新密码与确认新密码不相同');
      return;
    }
    const {code, msg} = await updateCurrentUserPwd({originalPwd: base64encode(values.originalPwd), confirmPwd: base64encode(values.confirmPwd)});
    if(code == '0'){
      // userWrapper.cleanUserSession();
      rmProjectToken();
      message.success('修改密码成功,请重新登陆');
      const { search, pathname } = window.location;
      const urlParams = new URL(window.location.href).searchParams;
      /** 此方法会跳转到 redirect 参数所在的位置 */
      const redirect = urlParams.get('redirect');
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: pathname + search,
          }),
        });
      }
    }else{
      message.error(msg);
    }
  };
  
  return (
    <div className={styles.baseView}>
      <>
        <div className={styles.left}>
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
              searchConfig: {
                submitText: '修改密码',
              },
              render: (_, dom) => dom[1],
            }}
            hideRequiredMark
          >

            <ProFormText.Password
              width='md'
              name="originalPwd"
              label="原密码"
              rules={[
                {
                  required: true,
                  message: '请输入原密码',
                },
              ]}
            />
            <ProFormText.Password
              width='md'
              name="newPwd"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
            />
            <ProFormText.Password
              width='md'
              name="confirmPwd"
              label="确认新密码"
              rules={[
                {
                  required: true,
                  message: '请输入确认新密码',
                },
              ]}
            />
          </ProForm>
        </div>
      </>
    </div>
  );
};
export default PasswordView;
