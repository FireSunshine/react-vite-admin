import React from 'react';
import Aside from './Aside';
import Content from './Content';
import { Layout } from 'antd';

const LayoutPanel = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Aside />
      <Content />
    </Layout>
  );
};

export default LayoutPanel;
