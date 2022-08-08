/**
 * 添加账单和编辑账单的公用表单
 */
import React, { useEffect, useState } from 'react';
import { Form, Select, DatePicker, InputNumber, Input } from 'antd';
import styled from '@emotion/styled';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;

const AddEditForm = ({ form, costAllType, accountInfo }) => {
  // 表单验证规则
  const rules = [
    {
      required: true,
      message: 'Please input '
    }
  ];

  // 筛选后的消费类型
  const [costType, setCostType] = useState([]);

  // 根据 账单类型 筛选 消费类型
  const changeAccountType = (e) => {
    // '1' -- 支出；  '2' -- 收入
    // costType里面的 type 字段 是 '1' 和 '2', 根据e筛选
    setCostType(costAllType.filter((item) => item.type === e));

    // 写法 二
    // let list = [];
    // costAllType.forEach((item) => {
    //   if (item.type === e) {
    //     list.push(item);
    //   }
    // });
    // setCostType(list);
  };

  useEffect(() => {
    // 如果是编辑，则需要回显数据
    if (accountInfo) {
      setCostType(costAllType.filter((item) => item.type === accountInfo?.pay_type?.toString()));
      form.setFieldsValue({
        amount: Number(accountInfo?.amount),
        pay_type: accountInfo?.pay_type?.toString(),
        type_id: accountInfo?.type_id,
        remark: accountInfo?.remark,
        date: moment(Number(accountInfo?.date))
      });
    }
  }, [accountInfo, costAllType]);

  return (
    <FormBox form={form}>
      <Form.Item name="amount" label="订单金额" rules={rules}>
        {/* min： 最小值为1； */}
        <InputNumber min={1} placeholder="请输入订单金额" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="pay_type" label="账单类型" rules={rules}>
        <Select placeholder="请输入账单类型" onChange={(e) => changeAccountType(e)}>
          <Option value={'1'}>支出</Option>
          <Option value={'2'}>收入</Option>
        </Select>
      </Form.Item>
      <Form.Item name="type_id" label="消费类型" rules={rules}>
        <Select placeholder="请输入消费类型">
          {costType.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="date" label="消费时间" rules={rules}>
        <DatePicker placeholder="请输入消费时间" style={{ width: '100%' }} onChange={(e) => console.log(e)} />
      </Form.Item>
      <Form.Item name="remark" label="账单备注" rules={rules}>
        <TextArea
          showCount
          maxLength={50}
          style={{
            height: 80
          }}
        />
      </Form.Item>
    </FormBox>
  );
};

export default AddEditForm;

const FormBox = styled(Form)`
  width: 400px;
`;
