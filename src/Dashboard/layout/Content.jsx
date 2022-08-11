import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import styled from '@emotion/styled';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/route';
import { CaretDownOutlined } from '@ant-design/icons';

const Content = () => {
  const renderRoutes = () => {
    let res = [];
    function deep(arr) {
      arr.map((ele) => {
        res.push(<Route key={ele.key} path={ele.path} component={ele.component} exact />);
        if (ele.children) deep(ele.children);
      });
    }
    routes.map((ele) => {
      if (ele.children) deep(ele.children);
    });
    return res;
  };

  // 退出登录
  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <Layout>
      <Layout.Header>
        <DropdownBox overlay={<Menu items={[{ label: <div onClick={() => logout()}>退出登录</div>, key: '1' }]} />}>
          <span style={{ color: 'rgb(255, 255, 255)' }} onClick={(e) => e.preventDefault()}>
            Hi, {'admin'}
            <CaretDownOutlined />
          </span>
        </DropdownBox>
      </Layout.Header>
      <ContentBox>
        <Switch>
          {renderRoutes()}
          <Redirect from="/*" to="/" />
        </Switch>
      </ContentBox>
      <Foorter>sunshine</Foorter>
    </Layout>
  );
};

export default Content;

const Foorter = styled(Layout.Footer)`
  text-align: center;
`;
const ContentBox = styled(Layout.Content)`
  margin: 15px;
`;
const DropdownBox = styled(Dropdown)`
  float: right;
`;
