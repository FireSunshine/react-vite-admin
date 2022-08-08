import React, { useState, useEffect } from 'react';
import AddEditForm from './components/AddEditForm';
import { Form, Space, Button, message } from 'antd';
import dayjs from 'dayjs';
import { getCostType as type, editCostType, getAccountInfo } from '@/api/account';
import { useHistory, useParams } from 'react-router-dom';

const EditAccount = () => {
  // 账单基本信息
  const [accountInfo, setAccountInfo] = useState({});
  const history = useHistory();
  // 将form传给子表单
  const [form] = Form.useForm();

  // 获取编辑账单的id
  const { id } = useParams();

  // 所有的消费类型
  const [costAllType, setCostAllType] = useState([]);

  // 获取账单的消费类型
  const getCostType = async () => {
    const res = await type();
    // 所有的消费类型，后面需要根据支出和收入区分
    setCostAllType(res?.data?.list ?? []);
  };

  // 获取账单的详情
  const getAccountDetail = async (id) => {
    const res = await getAccountInfo(id);
    setAccountInfo(res?.data);
  };

  useEffect(() => {
    getCostType();
    getAccountDetail({ id });
  }, []);

  // 重置表单，清空表单数据
  const resetForm = () => {
    form.resetFields();
  };

  // 提交表单，执行保存操作
  const handleSave = async () => {
    // 验证带有rules 的输入框
    const formData = await form.validateFields();
    const params = {
      id: Number(id),
      amount: formData.amount.toFixed(2), // 账单金额小数点后保留两位
      type_id: Number(formData.type_id), // 账单种类id
      type_name: costAllType.find((item) => item.id === Number(formData.type_id)).name, // 账单种类名称
      date: dayjs(formData.date).unix() * 1000, // 时间传时间戳
      pay_type: Number(formData.pay_type), // 账单类型传 1 或 2
      remark: formData.remark || '' // 备注
    };
    // 请求保存接口
    const res = await editCostType(params);
    if (Number(res?.code ?? '') === 200) {
      message.success('更新成功');
      // 跳转账单列表
      history.push('/account/accountList/');
    }
  };
  return (
    <div>
      编辑账单
      <AddEditForm form={form} costAllType={costAllType} accountInfo={accountInfo} />
      <Space size={24}>
        <Button onClick={resetForm}>重置</Button>
        <Button type="primary" onClick={handleSave}>
          确定
        </Button>
      </Space>
    </div>
  );
};

export default EditAccount;
