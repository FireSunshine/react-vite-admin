import styled from '@emotion/styled';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { modifyPassword as modify } from '@/api/user';
import { useHistory } from 'react-router-dom';

const ModifyPassword = () => {
  const [form] = Form.useForm();
  const rules = [{ required: true, message: '必填项' }];
  const history = useHistory();

  const handleSave = async () => {
    const formData = await form.validateFields();
    const res = await modify(formData);
    if (Number(res?.code) ?? 200) {
      message.success('修改成功');
      history.push('/');
    }
  };
  return (
    <FormBox form={form}>
      <h1>修改密码</h1>
      <Form.Item label="原始密码" name="old_pass" rules={rules}>
        <Input />
      </Form.Item>
      <Form.Item label="新密码" name="new_pass" rules={rules}>
        <Input />
      </Form.Item>
      <Form.Item label="确认新密码" name="new_pass2" rules={rules}>
        <Input />
      </Form.Item>
      <Button type="primary" onClick={() => handleSave()}>
        确认
      </Button>
    </FormBox>
  );
};

export default ModifyPassword;

const FormBox = styled(Form)`
  width: 300px;
`;
