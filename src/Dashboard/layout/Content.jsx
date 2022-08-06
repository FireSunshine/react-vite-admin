import React from 'react';
import { Layout } from 'antd';
import styled from '@emotion/styled';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/route';

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
  return (
    <Layout>
      <Layout.Header />
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
