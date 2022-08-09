import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { message, Upload, Form, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getUserInfo as getUser, modifyUserInfo } from '@/api/user';
import { baseURL } from '@/utils/axios';
import { useHistory } from 'react-router-dom';
const { TextArea } = Input;

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

const beforeUpload = (file) => {
  // 限制图片格式
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    return;
  }

  // 限制图片大小
  const isLt100KB = file.size < 100 * 1024;
  if (!isLt100KB) {
    message.error('Image must smaller than 100K!');
    return;
  }
};

const EditUser = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();
  const history = useHistory();

  // 保存修改后的用户信息
  const getUserInfo = async () => {
    const res = await getUser();
    setImageUrl(res?.data?.avatar);
    form.setFieldsValue({
      signature: res?.data?.signature ?? ''
    });
  };
  useEffect(() => {
    // 初始获取用户信息， 用于回显数据
    getUserInfo();
  }, []);

  const handleSave = async () => {
    const res = await modifyUserInfo({
      signature: form.getFieldsValue().signature,
      avatar: imageUrl
    });
    if (Number(res?.code ?? '') === 200) {
      message.success('修改成功');
      history.push('/');
    }
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      // 设置加载状态
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // 上传完成获取后端返回的图片url
      setImageUrl(info.file.response.data);
      // 取消加载状态
      setLoading(false);

      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <FormBox form={form}>
      <Form.Item label="上传头像">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://api.chennick.wang/api/upload" // 上传文件的后端地址
          headers={{ authorization: window.localStorage.getItem('token') }} // 设置请求头
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl.includes(baseURL) ? imageUrl : baseURL + imageUrl}
              alt="avatar"
              style={{
                width: '100%'
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item name="signature" label="个性签名">
        <TextArea
          showCount
          maxLength={50}
          style={{
            height: 80
          }}
        />
      </Form.Item>
      <Button type="primary" onClick={handleSave}>
        确定
      </Button>
    </FormBox>
  );
};

export default EditUser;

const FormBox = styled(Form)`
  width: 300px;
`;
