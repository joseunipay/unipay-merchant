import { QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Dropdown, Tabs } from 'antd';
import { useState } from 'react';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return <UmiSelectLang />;
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};

const items = [
  {
    key: '1',
    label: '消息',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: '通知',
    children: 'Content of Tab Pane 2',
  }
]
export const Notice = () => {
  const [active, setActive] = useState('1');
  return (
    <Dropdown
      getPopupContainer={(target) => target.parentElement || document.body}
      dropdownRender={() => {
        return (
          // <div >
            <Tabs
              activeKey={active}
              // defaultActiveKey="1"
              items={items}
              onChange={setActive}
              style={{
                background: '#fff'
              }}
            />
          // </div>
        )
      }}
    >
      {/* <a onClick={(e) => e.preventDefault()}> */}
      <BellOutlined style={{ height: 26, }} onClick={(e) => e.preventDefault()} />
      {/* </a> */}
    </Dropdown>
    // </div>
  );
}
