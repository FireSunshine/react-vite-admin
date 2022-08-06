import styled from '@emotion/styled';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [currentType, setCurrentType] = useState('login');
  const [form] = Form.useForm();
  const history = useHistory();
  const handleLogin = async () => {
    const formData = await form.validateFields();
    const res = await axios.post('/api/user/login', {
      username: formData.username,
      password: formData.password
    });
    if (Number(res?.data?.code ?? '') === 200) {
      history.go(0);
      window.localStorage.setItem('token', res?.data?.data?.token);
    } else {
      message.error(res?.data?.msg ?? '登录失败');
    }
  };
  const handleRegister = async () => {
    const formData = await form.validateFields();
    const res = await axios.post('/api/user/register', formData);
    if (Number(res?.data?.code ?? '') === 200) {
      setCurrentType('login');
    } else {
      message.error(res?.data?.msg ?? '注册失败');
    }
  };

  return (
    <LoginBox>
      <h1>{currentType === 'login' ? 'login' : 'register'}</h1>
      <Form layout="vertical" form={form}>
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '密码不能为空' }]}>
          <Input />
        </Form.Item>

        {currentType === 'login' && (
          <>
            <Button type="primary" block onClick={() => handleLogin()}>
              登录
            </Button>
            <Button type="link" block onClick={() => setCurrentType('register')}>
              没有账号？去注册
            </Button>
          </>
        )}

        {currentType === 'register' && (
          <>
            <Button type="primary" block onClick={handleRegister}>
              注册
            </Button>
            <Button type="link" block onClick={() => setCurrentType('login')}>
              已有账号， 去登录
            </Button>
          </>
        )}
      </Form>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.div`
  width: 400px;
  height: 400px;
  margin: 200px auto;
  padding: 16px;
  padding-top: 50px;
  font-size: 14px;
  background-color: rgb(246, 248, 250);
  border: 1px solid rgb(216, 222, 228);
  border-radius: 6px;
  text-align: center;
`;
