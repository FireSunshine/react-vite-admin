import { Menu, Layout } from 'antd';
import React, { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import styled from '@emotion/styled';
import routes from '@/route';
import { Link } from 'react-router-dom';

const Aside = () => {
  const [collapsed, setCollapsed] = useState(false);

  const renderNav = routes.map((item) => {
    return {
      label: item.label,
      key: item.key,
      icon: <item.icon />,
      children: item?.children.map((ele) => {
        if (ele.label.includes('编辑')) return;
        return {
          label: <Link to={ele.path}>{ele.label}</Link>,
          key: ele?.key
        };
      })
    };
  });
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Logo className="logo">
        <img alt="React logo" src={reactLogo} />
      </Logo>
      <Menu mode="inline" theme="dark" items={renderNav} />
    </Layout.Sider>
  );
};

export default Aside;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  text-align: center;
`;
