import { PageContainer } from '@ant-design/pro-components';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { updatePersonalInfo } from './api';

type FieldType = {
  avatarUrl: null | string;
  mobileNumber: string;
  realName: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
  updatePersonalInfo(values)
    .then((result) => {
      message.success(result.msg);
    })
    .catch((err) => {
      message.error(err);
    });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const PersonalSetting = () => {
  return (
    <>
      <PageContainer
        header={{
          title: '个人信息设置',
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* 头像 */}
          {/* <Form.Item<FieldType> label="头像" name="avatarUrl">
            <p className=" text-[12px] mt-[4px] text-[#a699a6]">
              上传格式:jpgjpeg,png,webp <br /> 最大限制2MB
            </p>
          </Form.Item> */}

          {/* 真实姓名 */}
          <Form.Item<FieldType>
            label="真实姓名"
            name="realName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item<FieldType>
            label="手机号"
            name="mobileNumber"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          {/* 提交保存 */}
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    </>
  );
};

export default PersonalSetting;
